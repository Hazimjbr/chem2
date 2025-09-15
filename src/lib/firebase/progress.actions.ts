
'use server';

import { db } from './config';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, writeBatch } from 'firebase/firestore';
import type { QuizResult } from '@/components/quiz';

// --- User Progress Structure ---
// /user-progress/{userId}
//   - completedLessons: string[] (array of lessonIds)
//   - quizHistory: QuizResult[]
//   - quizStates: { [lessonId]: QuizState }

// --- Quiz State Saving ---

export async function saveUserQuizState(userId: string, lessonId: string, state: any) {
  try {
    const progressRef = doc(db, 'user-progress', userId);
    await updateDoc(progressRef, {
      [`quizStates.${lessonId}`]: state
    });
  } catch (error: any) {
    if (error.code === 'not-found') {
      // Document doesn't exist, create it first
      const progressRef = doc(db, 'user-progress', userId);
      await setDoc(progressRef, {
        quizStates: {
          [lessonId]: state
        }
      }, { merge: true });
    } else {
      console.error("Error saving quiz state:", error);
    }
  }
}

export async function getUserQuizState(userId: string, lessonId: string): Promise<any | null> {
  try {
    const progressRef = doc(db, 'user-progress', userId);
    const docSnap = await getDoc(progressRef);
    if (docSnap.exists()) {
      return docSnap.data().quizStates?.[lessonId] || null;
    }
    return null;
  } catch (error) {
    console.error("Error getting quiz state:", error);
    return null;
  }
}

export async function clearUserQuizState(userId: string, lessonId: string) {
    try {
        const progressRef = doc(db, 'user-progress', userId);
        await updateDoc(progressRef, {
            [`quizStates.${lessonId}`]: null
        });
    } catch (error) {
        console.error("Error clearing quiz state:", error);
    }
}


// --- Quiz Result Saving ---

export async function saveUserQuizResult(userId: string, result: QuizResult) {
  try {
    const progressRef = doc(db, 'user-progress', userId);
    
    // Atomically add the new result to the 'quizHistory' array.
    await updateDoc(progressRef, {
      quizHistory: arrayUnion(result)
    });

    // If the quiz score is 80% or higher, also mark the lesson as complete.
    if (result.score >= 0.8) {
      await updateDoc(progressRef, {
        completedLessons: arrayUnion(result.lessonId)
      });
    }

  } catch (error: any) {
     if (error.code === 'not-found') {
        const progressRef = doc(db, 'user-progress', userId);
        const dataToSet: any = { quizHistory: [result] };
        if (result.score >= 0.8) {
          dataToSet.completedLessons = [result.lessonId];
        }
        await setDoc(progressRef, dataToSet);
     } else {
        console.error("Error saving quiz result:", error);
     }
  }
}


// --- Interactive Question Tracking ---
export async function saveInteractiveResult(userId: string, result: QuizResult) {
  try {
    const progressRef = doc(db, 'user-progress', userId);
    // Use a separate field to avoid mixing with main quiz history if needed later
    await updateDoc(progressRef, {
      interactiveHistory: arrayUnion(result)
    });
  } catch (error: any) {
     if (error.code === 'not-found') {
        const progressRef = doc(db, 'user-progress', userId);
        await setDoc(progressRef, { interactiveHistory: [result] });
     } else {
        console.error("Error saving interactive result:", error);
     }
  }
}

// --- Fetching Progress Data ---
export async function getUserProgress(userId: string) {
    try {
        const progressRef = doc(db, 'user-progress', userId);
        const docSnap = await getDoc(progressRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }
        return null;
    } catch (error) {
        console.error("Error getting user progress:", error);
        return null;
    }
}
