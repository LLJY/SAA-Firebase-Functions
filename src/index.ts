import * as functions from 'firebase-functions';
import * as methods from './methods';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest(methods.helloWorld);
export const signUp = functions.https.onRequest(methods.signUp);
export const login = functions.https.onRequest(methods.login);
