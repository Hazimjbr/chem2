
'use server';

import { db } from './config';
import { collection, query, where, getDocs, addDoc, Timestamp, writeBatch, doc, deleteDoc, orderBy, getDoc, limit, updateDoc } from 'firebase/firestore';
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
            const batch = writeBatch(db);
            // Add to registered devices
            const newDeviceRef = doc(collection(db, 'registeredDevices'));
            batch.set(newDeviceRef, {
                studentId,
                deviceId,
                studentName: user.displayName,
                registeredAt: Timestamp.now(),
            });
            // Set as active device
            const studentRef = doc(db, 'students', studentId);
            batch.update(studentRef, { activeDeviceId: deviceId });
            
            await batch.commit();

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

        const pendingDevices = await Promise.all(querySnapshot.docs.map(async (d) => {
            const data = d.data();
            const studentRef = doc(db, 'students', data.studentId);
            const studentDoc = await getDoc(studentRef);
            const studentCourses = studentDoc.exists() ? studentDoc.data().courses || ['دورة غير محددة'] : ['طالب غير موجود'];

            return {
                id: d.id,
                studentId: data.studentId,
                deviceId: data.deviceId,
                studentName: data.studentName || 'طالب غير معروف',
                requestedAt: (data.requestedAt as Timestamp).toDate().toLocaleString('ar-JO'),
                studentCourses,
            };
        }));

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

        // Add the new device
        const newDeviceRef = doc(collection(db, 'registeredDevices'));
        batch.set(newDeviceRef, {
            studentId,
            deviceId,
            studentName,
            registeredAt: Timestamp.now(),
        });
        
        // Also set this as the active device for the student
        const studentRef = doc(db, 'students', studentId);
        batch.update(studentRef, { activeDeviceId: deviceId });

        // Delete the pending request
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
        const studentDocRef = doc(db, 'students', studentId);
        const studentDoc = await getDoc(studentDocRef);
        const studentName = studentDoc.exists() ? studentDoc.data().studentName : 'طالب غير معروف';

        const batch = writeBatch(db);

        // 1. Delete all old registered devices for the student
        const registeredDevicesRef = collection(db, 'registeredDevices');
        const qOldDevices = query(registeredDevicesRef, where("studentId", "==", studentId));
        const oldDevicesSnapshot = await getDocs(qOldDevices);
        oldDevicesSnapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });

        // 2. Delete all pending requests for the student
        const pendingDevicesRef = collection(db, 'pendingDevices');
        const qPending = query(pendingDevicesRef, where("studentId", "==", studentId));
        const pendingSnapshot = await getDocs(qPending);
        pendingSnapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
        
        // 3. Add the new device
        const newDeviceRef = doc(collection(db, 'registeredDevices'));
        batch.set(newDeviceRef, {
            studentId,
            deviceId,
            studentName,
            registeredAt: Timestamp.now(),
        });
        
        // 4. Set the new device as the single active device
        batch.update(studentDocRef, { activeDeviceId: deviceId });
        
        // Commit all database changes
        await batch.commit();

        // 5. After successfully changing the database, revoke user sessions
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

export async function deleteDevice(deviceId: string, studentId: string) {
    try {
        const devicesRef = collection(db, 'registeredDevices');
        const q = query(devicesRef, where("studentId", "==", studentId), where("deviceId", "==", deviceId), limit(1));
        const deviceSnapshot = await getDocs(q);

        if (deviceSnapshot.empty) {
            return { success: false, message: 'الجهاز المطلوب حذفه غير موجود.' };
        }
        
        const docToDeleteRef = deviceSnapshot.docs[0].ref;
        await deleteDoc(docToDeleteRef);

        const studentRef = doc(db, 'students', studentId);
        const studentDoc = await getDoc(studentRef);
        
        // If the deleted device was the active one
        if (studentDoc.exists() && studentDoc.data().activeDeviceId === deviceId) {
            // Find another registered device to set as active
            const remainingDevicesQuery = query(devicesRef, where("studentId", "==", studentId), limit(1));
            const remainingDevicesSnapshot = await getDocs(remainingDevicesQuery);

            if (!remainingDevicesSnapshot.empty) {
                const newActiveDeviceId = remainingDevicesSnapshot.docs[0].data().deviceId;
                await updateDoc(studentRef, { activeDeviceId: newActiveDeviceId });
            } else {
                // If no other devices are left, clear the activeDeviceId
                await updateDoc(studentRef, { activeDeviceId: '' });
            }
        }

        await manageUser({ action: 'revokeSession', uid: studentId });

        return { success: true, message: 'تم حذف الجهاز بنجاح، وتم تسجيل خروج الطالب من جميع الجلسات.' };
    } catch (error: any) {
        console.error("Error deleting device:", error);
        let errorMessage = `فشل حذف الجهاز: ${error.message}`;
        if (error.code === 'permission-denied') {
            errorMessage = 'فشل حذف الجهاز: صلاحيات غير كافية.';
        }
        return { success: false, message: errorMessage };
    }
}
