import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './config';

const functions = getFunctions(app);

// This cloud function handles multiple user management actions.
export const manageUser = httpsCallable(functions, 'manageUser');
