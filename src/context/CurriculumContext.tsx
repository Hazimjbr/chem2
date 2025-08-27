
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

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [curriculum, setCurriculum] = useState<Curriculum>(null);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Function to fetch user details from Firestore
  const fetchAppUser = async (user: FirebaseUser): Promise<AppUser | null> => {
      // Check if the user is an admin first
      if (user.email === 'h75jbr@gmail.com') {
          return { uid: user.uid, email: user.email, role: 'admin', displayName: 'Admin' };
      }
      const adminDocRef = doc(db, 'admins', user.uid);
      const adminDoc = await getDoc(adminDocRef);

      if (adminDoc.exists()) {
          return { uid: user.uid, email: user.email, role: 'admin', displayName: adminDoc.data().displayName || 'Admin' };
      } else {
          // If not an admin, assume student and fetch student data
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
              return null; // User not found in admins or students
          }
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
        if (user) {
            const appUser = await fetchAppUser(user);
             if (appUser) {
                // If user is valid, we still need to verify the device on next login.
                // For now, we just set them.
                setCurrentUser(appUser);
            } else {
                // User exists in Auth but not in our DBs, or is not the owner.
                console.warn(`User ${user.uid} exists in Auth but not in Firestore or is unauthorized. Signing out.`);
                await signOutUser();
                setCurrentUser(null);
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
          await signOutUser();
          return { success: false, title: "مستخدم غير معروف", message: "هذا الحساب غير مسجل في النظام" };
      }
      
      const deviceId = getOrCreateDeviceId();
      const verificationResult = await registerDevice({ user: appUser, deviceId });

      if (verificationResult.status === 'registered' || verificationResult.status === 'already-exists') {
          setCurrentUser(appUser); // Set the current user only on successful verification
          return { success: true, message: `أهلاً بك، ${appUser.displayName}!` };
      } else {
          // Device is pending or an error occurred
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
