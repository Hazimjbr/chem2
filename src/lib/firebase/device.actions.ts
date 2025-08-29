
'use server';

import { db } from './config';
import { collection, query, where, getDocs, addDoc, Timestamp, writeBatch, doc, deleteDoc, orderBy, getDoc, limit } from 'firebase/firestore';
import type { AppUser } from '@/context/CurriculumContext';
import { manageUser } from './functions';

interface RegistrationInput {
    user: AppUser;
    deviceId: string;
}

interface RegistrationResult {
    status: 'registered' | 'already-exists' | 'pending' | 'error';
    message: string;
}

export async function registerDevice(input: RegistrationInput): Promise<RegistrationResult> {
    const { user, deviceId } = input;

    if (user.role === 'admin') {
        return { status: 'registered', message: `أهلاً بك أيها المدير ${user.displayName}` };
    }
    
    const studentId = user.uid;

    try {
        const registeredDevicesRef = collection(db, 'registeredDevices');
        const pendingDevicesRef = collection(db, 'pendingDevices');

        const specificDeviceQuery = query(
            registeredDevicesRef,
            where("studentId", "==", studentId),
            where("deviceId", "==", deviceId),
            limit(1)
        );
        const specificDeviceSnapshot = await getDocs(specificDeviceQuery);
        if (!specificDeviceSnapshot.empty) {
            return { status: 'already-exists', message: 'هذا الجهاز معتمد بالفعل' };
        }
        
        const anyDeviceQuery = query(
            registeredDevicesRef,
            where("studentId", "==", studentId),
            limit(1)
        );
        const anyDeviceSnapshot = await getDocs(anyDeviceQuery);
        
        if (anyDeviceSnapshot.empty) {
             await addDoc(registeredDevicesRef, {
                studentId,
                deviceId,
                studentName: user.displayName,
                registeredAt: Timestamp.now(),
            });
            return { status: 'registered', message: 'تم تسجيل جهازك الأول بنجاح' };
        }

        const pendingQuery = query(
            pendingDevicesRef, 
            where("studentId", "==", studentId), 
            where("deviceId", "==", deviceId),
            limit(1)
        );
        const pendingSnapshot = await getDocs(pendingQuery);
        if (!pendingSnapshot.empty) {
            return { status: 'pending', message: 'تم إرسال طلب الموافقة على هذا الجهاز مسبقًا وهو قيد المراجعة' };
        }

        await addDoc(pendingDevicesRef, {
            studentId,
            deviceId,
            studentName: user.displayName,
            requestedAt: Timestamp.now(),
        });
        
        return { status: 'pending', message: 'هذا جهاز جديد. تم إرسال طلب للموافقة عليه من قبل المسؤول.' };

    } catch (error) {
        console.error("Device registration error:", error);
        return { status: 'error', message: 'حدث خطأ في خوادمنا أثناء التحقق من جهازك' };
    }
}


export async function getPendingDevices() {
    try {
        const pendingDevicesRef = collection(db, 'pendingDevices');
        const q = query(pendingDevicesRef, orderBy("requestedAt", "desc"));
        const querySnapshot = await getDocs(q);

        const pendingDevices = querySnapshot.docs.map((d) => {
            const data = d.data();
            return {
                id: d.id,
                studentId: data.studentId,
                deviceId: data.deviceId,
                studentName: data.studentName || 'طالب غير معروف',
                requestedAt: (data.requestedAt as Timestamp).toDate().toLocaleString('ar-JO'),
            };
        });

        return { success: true, data: pendingDevices };
    } catch (error) {
        console.error("Error getting pending devices:", error);
        return { success: false, message: 'فشل في جلب الأجهزة قيد المراجعة' };
    }
}

export async function approveDevice(pendingDeviceId: string, studentId: string, deviceId: string) {
    try {
        const batch = writeBatch(db);
        
        const pendingDeviceRef = doc(db, 'pendingDevices', pendingDeviceId);
        const pendingDoc = await getDoc(pendingDeviceRef);
        if (!pendingDoc.exists()) {
             throw new Error("Pending device request not found.");
        }
        const studentName = pendingDoc.data().studentName || 'طالب غير معروف';

        const newDeviceRef = doc(collection(db, 'registeredDevices'));
        batch.set(newDeviceRef, {
            studentId,
            deviceId,
            studentName,
            registeredAt: Timestamp.now(),
        });

        batch.delete(pendingDeviceRef);
        
        await batch.commit();

        return { success: true, message: 'تمت الموافقة على الجهاز وإضافته بنجاح' };
    } catch (error) {
        console.error("Error approving device:", error);
        return { success: false, message: 'فشل في الموافقة على الجهاز' };
    }
}

export async function approveAndReplaceDevice(pendingDeviceId: string, studentId: string, deviceId: string) {
    try {
        const pendingDeviceRef = doc(db, 'pendingDevices', pendingDeviceId);
        const pendingDocSnap = await getDoc(pendingDeviceRef);
        if (!pendingDocSnap.exists()) {
            throw new Error("Pending device request not found.");
        }
        const studentName = pendingDocSnap.data().studentName || 'طالب غير معروف';
        
        // 1. Delete all old devices for the student
        const devicesRef = collection(db, 'registeredDevices');
        const q = query(devicesRef, where("studentId", "==", studentId));
        const oldDevicesSnapshot = await getDocs(q);
        const deletePromises = oldDevicesSnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        // 2. Add the new device
        await addDoc(collection(db, 'registeredDevices'), {
            studentId,
            deviceId,
            studentName,
            registeredAt: Timestamp.now(),
        });
        
        // 3. Delete the pending request
        await deleteDoc(pendingDeviceRef);

        // 4. After successfully changing the database, revoke user sessions
        await manageUser({ action: 'revokeSession', uid: studentId });

        return { success: true, message: 'تم استبدال الجهاز بنجاح وإبطال صلاحية الجلسات القديمة.' };
    } catch (error: any) {
        console.error("Error in approveAndReplaceDevice:", error);
        return { success: false, message: `فشلت عملية الاستبدال الكاملة: ${error.message}` };
    }
}


export async function rejectDevice(pendingDeviceId: string) {
     try {
        const pendingDeviceRef = doc(db, 'pendingDevices', pendingDeviceId);
        await deleteDoc(pendingDeviceRef);
        return { success: true, message: 'تم رفض الطلب بنجاح' };
    } catch (error) {
        console.error("Error rejecting device:", error);
        return { success: false, message: 'فشل في رفض الطلب' };
    }
}
