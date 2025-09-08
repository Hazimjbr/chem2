
'use server';

import { initializeApp, getApps, deleteApp, FirebaseApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { doc, setDoc, collection, getDocs, query, orderBy, Timestamp, updateDoc, writeBatch, where, deleteDoc } from 'firebase/firestore';
import { db } from './config';
import { manageUser } from './functions';

const firebaseConfig = {
  "projectId": "chem1-93ct1",
  "appId": "1:478091867826:web:52e564e2a5b42f70ed7bab",
  "storageBucket": "chem1-93ct1.appspot.com",
  "apiKey": "AIzaSyD5meKUxkfCEJJ9n6Mi-LdXmBtRmT76xy8",
  "authDomain": "chem1-93ct1.firebaseapp.com",
  "messagingSenderId": "478091867826"
};

// A function to safely get or create the secondary app
const getSecondaryApp = (): FirebaseApp => {
    const appName = "secondary-admin-app";
    const existingApp = getApps().find(app => app.name === appName);
    if (existingApp) {
        return existingApp;
    }
    return initializeApp(firebaseConfig, appName);
}

// A function to safely delete the secondary app
const deleteSecondaryApp = async () => {
    const appName = "secondary-admin-app";
    const existingApp = getApps().find(app => app.name === appName);
    if (existingApp) {
        try {
            await deleteApp(existingApp);
        } catch (e) {
            console.error("Could not delete secondary app instance:", e);
        }
    }
}


export async function addStudent(studentData: {
    studentName: string,
    username: string,
    email: string,
    password_clear: string,
    courses: string[],
    courseIds: string[],
    phone1?: string,
    phone2?: string,
}) {
    const { studentName, username, email, password_clear, courses, courseIds, phone1, phone2 } = studentData;

    let user: User | null = null;
    try {
        const secondaryApp = getSecondaryApp();
        const secondaryAuth = getAuth(secondaryApp);
        
        const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password_clear);
        user = userCredential.user;
        
        // It's important to sign out from the secondary app to avoid conflicts
        await signOut(secondaryAuth);
        await deleteSecondaryApp(); // Clean up the app after successful creation

        await setDoc(doc(db, 'students', user.uid), {
            studentName,
            username,
            email,
            password_clear,
            courses,
            courseIds,
            phone1: phone1 || '',
            phone2: phone2 || '',
            activeDeviceId: '', // Initialize with no active device
            createdAt: Timestamp.now(),
        });
        
        return { success: true, message: 'تم إنشاء حساب الطالب بنجاح', userId: user.uid };

    } catch (error: any) {
        console.error("Error creating student:", error);
        
        // Ensure cleanup happens even on error
        await deleteSecondaryApp();

        let errorMessage = 'حدث خطأ غير متوقع أثناء إنشاء الحساب.';
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'اسم المستخدم هذا موجود بالفعل. الرجاء اختيار اسم آخر.';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'كلمة المرور ضعيفة جدًا. يجب أن تكون 6 أحرف على الأقل.';
        } else if (user) {
             errorMessage = 'تم إنشاء الحساب في نظام المصادقة ولكن فشل حفظه في قاعدة البيانات.';
        }
        
        return { success: false, message: errorMessage };
    }
}

export async function getStudents() {
    try {
        const studentsRef = collection(db, 'students');
        const q = query(studentsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const students = await Promise.all(querySnapshot.docs.map(async (doc) => {
            const data = doc.data();

            // Fetch devices for this student
            const devicesRef = collection(db, 'registeredDevices');
            const qDevices = query(devicesRef, where("studentId", "==", doc.id));
            const devicesSnapshot = await getDocs(qDevices);
            const devices = devicesSnapshot.docs.map(d => ({ id: d.id, deviceId: d.data().deviceId }));

            return {
                id: doc.id,
                studentName: data.studentName,
                username: data.username,
                email: data.email,
                password_clear: data.password_clear,
                courses: data.courses || [],
                courseIds: data.courseIds || [],
                phone1: data.phone1 || '',
                phone2: data.phone2 || '',
                activeDeviceId: data.activeDeviceId || '',
                createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
                devices: devices,
            };
        }));
        
        return { success: true, data: students };
    } catch (error: any) {
        console.error("Error getting students:", error);
        let detailedMessage = "فشل في جلب بيانات الطلاب.";
        if (error.code === 'permission-denied') {
            detailedMessage = "فشل في جلب بيانات الطلاب: صلاحيات غير كافية.";
        }
        return { success: false, message: detailedMessage };
    }
}


export async function updateStudent(studentId: string, dataToUpdate: {
    studentName: string;
    phone1: string;
    phone2: string;
    courseIds: string[];
    courses: string[];
}) {
    try {
        const studentRef = doc(db, 'students', studentId);
        await updateDoc(studentRef, dataToUpdate);
        return { success: true, message: 'تم تحديث بيانات الطالب بنجاح' };
    } catch (error) {
        console.error("Error updating student:", error);
        return { success: false, message: 'فشل في تحديث بيانات الطالب' };
    }
}


export async function deleteStudent(studentId: string) {
    try {
        // Step 1: Delete the user from Firebase Authentication via the Cloud Function
        const deleteAuthResult: any = await manageUser({ action: 'deleteUser', uid: studentId });
        if (deleteAuthResult.data.message.includes('Error')) {
             console.warn(`Could not delete user from Auth: ${deleteAuthResult.data.message}. Continuing with Firestore deletion.`);
        }

        // Step 2: Delete Firestore data in a batch
        const batch = writeBatch(db);

        // Delete the student document itself
        const studentRef = doc(db, 'students', studentId);
        batch.delete(studentRef);

        // Delete all registered devices for the student
        const devicesRef = collection(db, 'registeredDevices');
        const qDevices = query(devicesRef, where("studentId", "==", studentId));
        const devicesSnapshot = await getDocs(qDevices);
        devicesSnapshot.forEach(doc => batch.delete(doc.ref));

        // Delete all pending devices requests for the student
        const pendingDevicesRef = collection(db, 'pendingDevices');
        const qPending = query(pendingDevicesRef, where("studentId", "==", studentId));
        const pendingSnapshot = await getDocs(qPending);
        pendingSnapshot.forEach(doc => batch.delete(doc.ref));

        // Delete user progress data
        const progressRef = doc(db, 'user-progress', studentId);
        batch.delete(progressRef);

        await batch.commit();
        
        return { success: true, message: 'تم حذف الطالب وبياناته بالكامل بنجاح.' };
    } catch (error) {
        console.error("Error deleting student data:", error);
        return { success: false, message: 'فشل في حذف بيانات الطالب.' };
    }
}

export async function revokeStudentSessions(studentId: string) {
    try {
        const result: any = await manageUser({ action: 'revokeSession', uid: studentId });
        return { success: true, message: result.data.message };
    } catch (error: any) {
        console.error("Error revoking sessions:", error);
        return { success: false, message: error.message || 'فشل في إبطال الجلسات' };
    }
}
