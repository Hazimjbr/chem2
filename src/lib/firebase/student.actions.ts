
'use server';

import { initializeApp, getApps, deleteApp, FirebaseApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { doc, setDoc, collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './config';

// This is the same config object used for the client-side app.
// We are re-using it here to create a temporary, secondary Firebase app instance
// for the sole purpose of creating a new user without signing out the admin.
const firebaseConfig = {
  "projectId": "chem1-93ct1",
  "appId": "1:478091867826:web:52e564e2a5b42f70ed7bab",
  "storageBucket": "chem1-93ct1.appspot.com",
  "apiKey": "AIzaSyD5meKUxkfCEJJ9n6Mi-LdXmBtRmT76xy8",
  "authDomain": "chem1-93ct1.firebaseapp.com",
  "messagingSenderId": "478091867826"
};


// Helper to get or create a secondary app instance
const getSecondaryApp = (): FirebaseApp => {
    // A more robust way to handle secondary app instances on the server during development
    const appName = "secondary-admin-app-for-creation";
    const existingApp = getApps().find(app => app.name === appName);
    if (existingApp) {
        return existingApp;
    }
    return initializeApp(firebaseConfig, appName);
}

export async function addStudent(studentData: {
    studentName: string,
    username: string,
    password_clear: string,
    courses: string[],
    courseIds: string[],
    phone1?: string,
    phone2?: string,
}) {
    const { studentName, username, password_clear, courses, courseIds, phone1, phone2 } = studentData;
    const email = `${username.toLowerCase()}@chemzim.com`;

    let secondaryApp: FirebaseApp | null = null;
    let user: User | null = null;
    try {
        secondaryApp = getSecondaryApp();
        const secondaryAuth = getAuth(secondaryApp);
        
        const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password_clear);
        user = userCredential.user;
        
        // IMPORTANT: We must sign out from the secondary app instance to avoid session conflicts.
        await signOut(secondaryAuth);

        await setDoc(doc(db, 'students', user.uid), {
            studentName,
            username,
            email,
            password_clear,
            courses,
            courseIds,
            phone1: phone1 || '',
            phone2: phone2 || '',
            createdAt: Timestamp.now(),
        });
        
        return { success: true, message: 'تم إنشاء حساب الطالب بنجاح', userId: user.uid };

    } catch (error: any) {
        console.error("Error creating student:", error);
        
        // If user was created in Auth but failed to save to Firestore, we should ideally delete the Auth user.
        // However, this is a complex operation that requires admin SDK.
        // For now, we return a specific error message.
        
        let errorMessage = 'حدث خطأ غير متوقع أثناء إنشاء الحساب.';
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'اسم المستخدم هذا موجود بالفعل. الرجاء اختيار اسم آخر.';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'كلمة المرور ضعيفة جدًا. يجب أن تكون 6 أحرف على الأقل.';
        } else if (user) {
             errorMessage = 'تم إنشاء الحساب في نظام المصادقة ولكن فشل حفظه في قاعدة البيانات. الرجاء حذف المستخدم يدويًا من قسم المصادقة والمحاولة مرة أخرى.';
        }
        
        // Clean up the secondary app instance if it's no longer needed, especially on serverless environments.
        // Note: In a persistent server, you might want to reuse the instance.
        if(secondaryApp){
             try { await deleteApp(secondaryApp); } catch(e) { console.error("Could not delete secondary app", e); }
        }

        return { success: false, message: errorMessage };
    }
}


export async function signUpStudent(studentData: {
    studentName: string,
    username: string,
    password: string,
    phone?: string,
}): Promise<{success: boolean; message: string; user?: User}> {
    const { studentName, username, password, phone } = studentData;
    const email = `${username.toLowerCase()}@chemzim.com`;

    // Here we use the main auth instance since the user is not logged in yet.
    try {
        const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'students', user.uid), {
            studentName,
            username,
            email,
            courseIds: ['tawjihi_2008'],
            courses: ['توجيهي 2008'],
            phone1: phone || '',
            phone2: '',
            createdAt: Timestamp.now(),
        });
        
        return { success: true, message: 'تم إنشاء حسابك بنجاح', user };

    } catch (error: any) {
        console.error("Error signing up student:", error);
        let errorMessage = 'حدث خطأ غير متوقع أثناء إنشاء الحساب.';
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'اسم المستخدم هذا موجود بالفعل. الرجاء اختيار اسم آخر.';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'كلمة المرور ضعيفة جدًا. يجب أن تكون 6 أحرف على الأقل.';
        }
        
        return { success: false, message: errorMessage };
    }
}


export async function getStudents() {
    try {
        const studentsRef = collection(db, 'students');
        const q = query(studentsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const students = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                studentName: data.studentName,
                username: data.username,
                email: data.email,
                courses: data.courses || [],
                phone1: data.phone1 || '',
                phone2: data.phone2 || '',
                createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
            };
        });
        
        return { success: true, data: students };
    } catch (error) {
        console.error("Error getting students:", error);
        return { success: false, message: "فشل في جلب بيانات الطلاب." };
    }
}
