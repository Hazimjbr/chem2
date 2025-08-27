
'use server';

import { db } from './config';
import { collection, query, where, getDocs, addDoc, Timestamp, writeBatch, doc, getDoc, deleteDoc } from 'firebase/firestore';

interface RegistrationInput {
    studentId: string;
    deviceId: string;
}

interface RegistrationResult {
    status: 'registered' | 'already-exists' | 'pending' | 'error';
    message: string;
}

export async function registerDevice(input: RegistrationInput): Promise<RegistrationResult> {
    const { studentId, deviceId } = input;
    
    try {
        const registeredDevicesRef = collection(db, 'registeredDevices');
        const pendingDevicesRef = collection(db, 'pendingDevices');

        // Check if device is already registered
        const registeredQuery = query(registeredDevicesRef, where("studentId", "==", studentId), where("deviceId", "==", deviceId));
        const registeredSnapshot = await getDocs(registeredQuery);
        if (!registeredSnapshot.empty) {
            return { status: 'already-exists', message: 'هذا الجهاز معتمد بالفعل' };
        }

        // Check if any device is registered for this student
        const anyRegisteredQuery = query(registeredDevicesRef, where("studentId", "==", studentId));
        const anyRegisteredSnapshot = await getDocs(anyRegisteredQuery);

        if (anyRegisteredSnapshot.empty) {
            // This is the student's first device, register it automatically
            await addDoc(registeredDevicesRef, {
                studentId,
                deviceId,
                registeredAt: Timestamp.now(),
            });
            return { status: 'registered', message: 'تم تسجيل جهازك الأول بنجاح' };
        }

        // Student has registered devices, but this is a new one. Check if it's pending.
        const pendingQuery = query(pendingDevicesRef, where("studentId", "==", studentId), where("deviceId", "==", deviceId));
        const pendingSnapshot = await getDocs(pendingQuery);
        if (!pendingSnapshot.empty) {
            return { status: 'pending', message: 'تم إرسال طلب الموافقة على هذا الجهاز مسبقًا وهو قيد المراجعة' };
        }
        
        // This is a new, non-pending device. Add it to the pending list.
        await addDoc(pendingDevicesRef, {
            studentId,
            deviceId,
            requestedAt: Timestamp.now(),
        });
        
        return { status: 'pending', message: 'هذا جهاز جديد تم إرسال طلب للموافقة عليه من قبل المسؤول' };

    } catch (error) {
        console.error("Device registration error:", error);
        return { status: 'error', message: 'حدث خطأ في خوادمنا أثناء التحقق من جهازك' };
    }
}


export async function getPendingDevices() {
    try {
        const pendingDevicesRef = collection(db, 'pendingDevices');
        const q = query(pendingDevicesRef);
        const querySnapshot = await getDocs(q);

        const pendingDevices = await Promise.all(querySnapshot.docs.map(async (d) => {
            const data = d.data();
            const studentDocRef = doc(db, 'students', data.studentId);
            const studentDoc = await getDoc(studentDocRef);
            const studentName = studentDoc.exists() ? studentDoc.data().studentName : 'طالب غير معروف';

            return {
                id: d.id,
                studentId: data.studentId,
                deviceId: data.deviceId,
                studentName: studentName,
                requestedAt: (data.requestedAt as Timestamp).toDate().toLocaleString('ar-JO'),
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

        // 1. Add the new device to registeredDevices
        const newDeviceRef = doc(collection(db, 'registeredDevices'));
        batch.set(newDeviceRef, {
            studentId,
            deviceId,
            registeredAt: Timestamp.now(),
        });

        // 2. Delete the request from pendingDevices
        const pendingDeviceRef = doc(db, 'pendingDevices', pendingDeviceId);
        batch.delete(pendingDeviceRef);
        
        await batch.commit();

        return { success: true, message: 'تمت الموافقة على الجهاز بنجاح' };
    } catch (error) {
        console.error("Error approving device:", error);
        return { success: false, message: 'فشل في الموافقة على الجهاز' };
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
