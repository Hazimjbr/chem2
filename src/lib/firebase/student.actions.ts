'use server';

import { initializeApp, getApps, deleteApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
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


export async function addStudent(studentData: {
    studentName: string,
    username: string,
    password_clear: string,
    courses: string[],
    courseIds: string[],
    phone1: string,
    phone2: string,
}) {
    const { studentName, username, password_clear, courses, courseIds, phone1, phone2 } = studentData;
    const email = `${username}@gmail.com`;

    // Create a unique name for the secondary app to avoid conflicts.
    const secondaryAppName = `secondary-app-${Date.now()}`;
    
    try {
        // Initialize a temporary, secondary Firebase app.
        const secondaryApp = initializeApp(firebaseConfig, secondaryAppName);
        const secondaryAuth = getAuth(secondaryApp);
        
        // Create the user with the secondary app's auth instance.
        const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password_clear);
        const user = userCredential.user;

        // Immediately sign out the newly created user from this temporary auth instance.
        await signOut(secondaryAuth);
        
        // Delete the temporary app instance once we're done with it.
        await deleteApp(secondaryApp);

        // Now, store the student's information in Firestore using the main db instance.
        // The document ID will be the UID from the newly created user.
        await setDoc(doc(db, 'students', user.uid), {
            studentName,
            username,
            email,
            password: password_clear, // Store the clear password for admin reference as requested.
            courses,
            courseIds,
            phone1,
            phone2,
            createdAt: new Date(),
        });
        
        return { success: true, message: 'تم إنشاء حساب الطالب بنجاح', userId: user.uid };

    } catch (error: any) {
        console.error("Error creating student:", error);
        
        // Clean up the secondary app if it exists, even on failure.
        const secondaryApp = getApps().find(app => app.name === secondaryAppName);
        if (secondaryApp) {
            await deleteApp(secondaryApp);
        }

        let errorMessage = 'حدث خطأ غير متوقع أثناء إنشاء الحساب.';
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'اسم المستخدم هذا موجود بالفعل. الرجاء اختيار اسم آخر.';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'كلمة المرور ضعيفة جدًا. يجب أن تكون 6 أحرف على الأقل.';
        }
        
        return { success: false, message: errorMessage };
    }
}
