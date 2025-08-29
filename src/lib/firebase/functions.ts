
'use client';

import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './config';

const functions = getFunctions(app);

export const addAdminRole = httpsCallable(functions, 'addAdminRole');
