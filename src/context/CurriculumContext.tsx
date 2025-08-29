
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

// Define admin by a more stable identifier like email.
const ADMIN_EMAIL = 'h75jbr@gmail.com';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [curriculum, setCurriculum] = useState<Curriculum>(null);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Function to fetch user details and determine role
  const fetchAppUser = async (user: FirebaseUser): Promise<AppUser | null> => {
      // 1. Check if the user is the admin by email.
      if (user.email === ADMIN_EMAIL) {
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
              // 3. If not found, they are an unknown user.
              console.warn(`User ${user.uid} (${user.email}) is authenticated but not found in 'students' collection or admin list.`);
              return null; 
          }
      } catch (error) {
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
             const appUser = await fetchAppUser(user);
             setCurrentUser(appUser);
             if (!appUser) {
                // If fetchAppUser returns null (not a known student or admin), sign them out.
                await signOutUser();
             }
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
          await signOutUser(); // Ensure they are signed out if not recognized
          return { success: false, title: "مستخدم غير معروف", message: "هذا الحساب غير مسجل في النظام", variant: 'destructive' };
      }
      
      // If user is admin, bypass device checks.
      if (appUser.role === 'admin') {
          setCurrentUser(appUser);
          return { success: true, message: `أهلاً بك أيها المدير!` };
      }

      // Proceed with device checks only for students.
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
