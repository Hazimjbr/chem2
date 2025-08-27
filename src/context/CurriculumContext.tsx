
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChangedListener, signOutUser } from '@/lib/firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

type Curriculum = 'tawjihi' | 'igcse' | null;

interface AppUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    role: 'student' | 'admin' | null;
}

interface AppContextType {
  curriculum: Curriculum;
  isSelected: boolean;
  selectCurriculum: (curriculum: NonNullable<Curriculum>) => void;
  clearCurriculum: () => void;
  currentUser: AppUser | null;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [curriculum, setCurriculum] = useState<Curriculum>(null);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCurriculum = localStorage.getItem('selectedCurriculum') as Curriculum;
      if (savedCurriculum) {
        setCurriculum(savedCurriculum);
      }
    } catch (error) {
        console.error("Failed to load curriculum from local storage:", error);
    }
    setIsLoaded(true);

    const unsubscribe = onAuthStateChangedListener(async (user: FirebaseUser | null) => {
        if (user) {
            // Check if the user is an admin first
            const adminDocRef = doc(db, 'admins', user.uid);
            const adminDoc = await getDoc(adminDocRef);

            if (adminDoc.exists()) {
                setCurrentUser({ uid: user.uid, email: user.email, role: 'admin', displayName: 'Admin' });
            } else {
                // If not an admin, assume student and fetch student data
                const studentDocRef = doc(db, 'students', user.uid);
                const studentDoc = await getDoc(studentDocRef);
                if (studentDoc.exists()) {
                     const studentData = studentDoc.data();
                     setCurrentUser({ 
                         uid: user.uid, 
                         email: user.email, 
                         role: 'student',
                         displayName: studentData.studentName || user.email,
                    });
                } else {
                    // This is an edge case: user exists in Auth but not in our DBs.
                    // This could happen if DB write failed. For safety, sign them out.
                    console.warn(`User ${user.uid} exists in Auth but not in Firestore. Signing out.`);
                    await signOutUser();
                    setCurrentUser(null);
                }
            }
        } else {
            setCurrentUser(null);
            clearCurriculum(); // Clear curriculum on sign out
        }
        setIsLoading(false);
    });

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
        isLoading
    }}>
      {!isLoading && children}
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
