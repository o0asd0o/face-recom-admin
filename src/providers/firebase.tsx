import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
} from "firebase/firestore";

import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytes
} from 'firebase/storage';

import {
  createUserWithEmailAndPassword,
  getAuth,
  NextOrObserver,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}; 

// Initialize Firebase
initializeApp(firebaseConfig);
const firestoreRef = getFirestore();
const authRef = getAuth();

export const productsCollection = collection(firestoreRef, "products");
export const webPagesCollection = collection(firestoreRef, "webPages");
export const usersCollection = collection(firestoreRef, "users");
export const customersCollection = collection(firestoreRef, "customers");
export const restoOwnersCollection = collection(firestoreRef, "users");

export const signInEmailPassword = (email: string, password: string) =>
  signInWithEmailAndPassword(authRef, email, password);
  export const registerWithEmailPassword = (
  email: string,
  password: string
) =>
  createUserWithEmailAndPassword(
    authRef,
    email,
    password
  );
export const resetPasswordThruEmail = (email: string) => sendPasswordResetEmail(authRef, email)
export const signOut = () => firebaseSignOut(authRef);
export const onAuthStateChanged = (user: NextOrObserver<User>) =>
  firebaseOnAuthStateChanged(authRef, user);

// uploading images
const storage = getStorage();

const uploadImage = async (directory: string, file: File) => {
  const storageRef = ref(storage, `${directory}/${file.name}`);
  const snapshot = await uploadBytes(
    storageRef,
    file
  );
  const downloadURL = await getDownloadURL(
    snapshot.ref
  );

  return downloadURL
};

export const uploadUsersImage = async (file: File) => await uploadImage('users', file);
export const uploadProductImage = async (file: File) => await uploadImage('products', file);
export const uploadWebPageImage = async (file: File) => await uploadImage('webPages', file);