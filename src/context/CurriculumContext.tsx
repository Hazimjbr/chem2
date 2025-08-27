
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChangedListener } from '@/lib/firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

type Curriculum = 'tawjihi' | 'igcse' | null;

interface AppUser {
    uid: string;
    email: string | null;
    role: 'student' | 'admin' | null;
    // Add other user-specific data here later, e.g., name, courseIds
}

interface AppContextType {
  curriculum: Curriculum;
  isSelected: boolean;
  selectCurriculum: (curriculum: NonNullable<Curriculum>) => void;
  clearCurriculum: () => void;
  
  // New auth state
  currentUser: AppUser | null;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [curriculum, setCurriculum] = useState<Curriculum>(null);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
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
            // User is signed in, check their role
            const adminDocRef = doc(db, 'admins', user.uid);
            const adminDoc = await getDoc(adminDocRef);

            if (adminDoc.exists()) {
                setCurrentUser({ uid: user.uid, email: user.email, role: 'admin' });
            } else {
                // For now, assume anyone not an admin is a student
                // Later, we can add a check to the 'students' collection
                setCurrentUser({ uid: user.uid, email: user.email, role: 'student' });
            }
        } else {
            // User is signed out
            setCurrentUser(null);
        }
        setIsLoading(false);
    });

    // Cleanup subscription on unmount
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
