
'use server';

import { db } from './config';
import { collection, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore';

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
