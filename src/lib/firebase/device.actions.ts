
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
        
        const studentDocRef = doc(db, 'students', studentId);
        const studentDoc = await getDoc(studentDocRef);
        const studentName = studentDoc.exists() ? studentDoc.data().studentName : 'طالب غير معروف';

        const newDeviceRef = doc(collection(db, 'registeredDevices'));
        batch.set(newDeviceRef, {
            studentId,
            deviceId,
            studentName,
            registeredAt: Timestamp.now(),
        });

        const pendingDeviceRef = doc(db, 'pendingDevices', pendingDeviceId);
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
        const batch = writeBatch(db);

        // 1. Find all existing registered devices for the student
        const registeredDevicesRef = collection(db, 'registeredDevices');
        const q = query(registeredDevicesRef, where("studentId", "==", studentId));
        const querySnapshot = await getDocs(q);
        
        // 2. Schedule them for deletion
        querySnapshot.forEach(doc => {
            batch.delete(doc.ref);
        });

        // 3. Get student name from the pending request itself (more reliable)
        const pendingDeviceRef = doc(db, 'pendingDevices', pendingDeviceId);
        const pendingDoc = await getDoc(pendingDeviceRef);
        if (!pendingDoc.exists()) {
             throw new Error("Pending device request not found.");
        }
        const studentName = pendingDoc.data().studentName || 'طالب غير معروف';
        
        // 4. Add the new device
        const newDeviceRef = doc(collection(db, 'registeredDevices'));
        batch.set(newDeviceRef, {
            studentId,
            deviceId,
            studentName,
            registeredAt: Timestamp.now(),
        });
        
        // 5. Delete the pending request
        batch.delete(pendingDeviceRef);

        // 6. Commit all database changes
        await batch.commit();

        // 7. Revoke user sessions
        await manageUser({ action: 'revokeSession', uid: studentId });

        return { success: true, message: 'تم استبدال الجهاز وإبطال الجلسات القديمة بنجاح.' };

    } catch (error: any) {
        console.error("Error approving and replacing device:", error);
        let errorMessage = 'فشل في عملية الموافقة والاستبدال.';
        if (error.message) {
            errorMessage += ` السبب: ${error.message}`;
        }
        return { success: false, message: errorMessage };
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
