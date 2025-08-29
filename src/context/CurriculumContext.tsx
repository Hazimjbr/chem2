
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
      // Prioritize admin check to avoid unnecessary student doc reads for admins
      if (ADMIN_UIDS.includes(user.uid)) {
          return { uid: user.uid, email: user.email, role: 'admin', displayName: 'Admin' };
      }
      
      // If not an admin, try to fetch student data
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
              // User exists in Auth but not in our students collection
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
          return { success: false, title: "مستخدم غير معروف", message: "هذا الحساب غير مسجل في النظام", variant: 'destructive' };
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
