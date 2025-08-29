
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChangedListener, signOutUser } from '@/lib/firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { getOrCreateDeviceId } from '@/lib/device-id';
import { registerDevice } from '@/lib/firebase/device.actions';

type Curriculum = 'tawjihi' | 'igcse' | null;

export interface AppUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    role: 'student' | 'admin' | null;
}

interface VerificationResult {
    success: boolean;
    message: string;
    title?: string;
    variant?: 'default' | 'destructive';
}

interface AppContextType {
  curriculum: Curriculum;
  isSelected: boolean;
  selectCurriculum: (curriculum: NonNullable<Curriculum>) => void;
  clearCurriculum: () => void;
  currentUser: AppUser | null;
  isLoading: boolean;
  handleLogin: (user: FirebaseUser) => Promise<VerificationResult>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Hardcoded admin UIDs for client-side role check
const ADMIN_UIDS = ['uPqBUQ3i18fTta4f4tu2fTCyNKO2'];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [curriculum, setCurriculum] = useState<Curriculum>(null);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Function to fetch user details from Firestore
  const fetchAppUser = async (user: FirebaseUser): Promise<AppUser | null> => {
      // 1. First, check if the user is a hardcoded admin.
      if (ADMIN_UIDS.includes(user.uid)) {
          return { uid: user.uid, email: user.email, role: 'admin', displayName: 'Admin' };
      }
      
      // 2. If not an admin, check if they are a student.
      try {
          const studentDocRef = doc(db, 'students', user.uid);
          const studentDoc = await getDoc(studentDocRef);
          if (studentDoc.exists()) {
               const studentData = studentDoc.data();
               return { 
                   uid: user.uid, 
                   email: user.email, 
                   role: 'student',
                   displayName: studentData.studentName || user.email,
              };
          } else {
              // 3. If not found in students or admins, they are an unknown user.
              console.warn(`User ${user.uid} is authenticated but not found in 'students' collection or admin list.`);
              return null; 
          }
      } catch (error) {
          // This might happen due to security rules if a non-student/non-admin tries to log in
          console.error("Error fetching user data from Firestore:", error);
          return null;
      }
  }

  useEffect(() => {
    try {
      const savedCurriculum = localStorage.getItem('selectedCurriculum') as Curriculum;
      if (savedCurriculum) {
        setCurriculum(savedCurriculum);
      }
    } catch (error) {
        console.error("Failed to load curriculum from local storage:", error);
    }

    const unsubscribe = onAuthStateChangedListener(async (user: FirebaseUser | null) => {
        setIsLoading(true);
        if (user) {
            // This listener will now simply set the user state based on the login flow.
            // The handleLogin function will be the main point of entry for new logins.
             const appUser = await fetchAppUser(user);
             setCurrentUser(appUser); // This will be null if user is not found, effectively logging them out.
        } else {
            setCurrentUser(null);
            clearCurriculum();
        }
        setIsLoading(false);
    });
    
    setIsLoaded(true);
    return () => unsubscribe();
  }, []);

  const selectCurriculum = (selected: NonNullable<Curriculum>) => {
    try {
        localStorage.setItem('selectedCurriculum', selected);
        setCurriculum(selected);
    } catch (error) {
        console.error("Failed to save curriculum to local storage:", error);
    }
  };
  
  const clearCurriculum = () => {
    try {
        localStorage.removeItem('selectedCurriculum');
        setCurriculum(null);
    } catch (error) {
         console.error("Failed to clear curriculum from local storage:", error);
    }
  }

  const handleLogin = async (user: FirebaseUser): Promise<VerificationResult> => {
      const appUser = await fetchAppUser(user);

      if (!appUser) {
          await signOutUser();
          return { success: false, title: "مستخدم غير معروف", message: "هذا الحساب غير مسجل في النظام", variant: 'destructive' };
      }
      
      const deviceId = getOrCreateDeviceId();
      const verificationResult = await registerDevice({ user: appUser, deviceId });

      if (verificationResult.status === 'registered' || verificationResult.status === 'already-exists') {
          setCurrentUser(appUser);
          return { success: true, message: `أهلاً بك، ${appUser.displayName}!` };
      } else {
          await signOutUser();
          setCurrentUser(null);
          return { 
              success: false, 
              title: verificationResult.status === 'pending' ? 'جهازك قيد المراجعة' : 'خطأ في التحقق',
              message: verificationResult.message,
              variant: verificationResult.status === 'error' ? 'destructive' : 'default',
          };
      }
  }
  
  if (!isLoaded) {
    return null;
  }

  return (
    <AppContext.Provider value={{ 
        curriculum, 
        isSelected: !!curriculum, 
        selectCurriculum, 
        clearCurriculum,
        currentUser,
        isLoading,
        handleLogin,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
