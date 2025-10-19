
import { doc, getDoc, setDoc, deleteDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import type { ApprovedUser } from '../types';

const APP_ID = 'numl-scholar-app';
const BASE_PATH = `/artifacts/${APP_ID}/public/data`;

const adminDocRef = doc(db, `${BASE_PATH}/config/admin`);
const approvedUsersCollectionRef = collection(db, `${BASE_PATH}/approvedUsers`);

export const isFirstUser = async (): Promise<boolean> => {
  try {
    const docSnap = await getDoc(adminDocRef);
    return !docSnap.exists();
  } catch (error) {
    console.error("Error checking for first user:", error);
    return false;
  }
};

export const setAdminUid = async (uid: string): Promise<void> => {
  try {
    await setDoc(adminDocRef, { uid });
    // Also add admin to approved users
    await addApprovedUser(uid);
  } catch (error) {
    console.error("Error setting admin UID:", error);
  }
};

export const isUserAdmin = async (uid: string): Promise<boolean> => {
  try {
    const docSnap = await getDoc(adminDocRef);
    return docSnap.exists() && docSnap.data().uid === uid;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

export const isUserApproved = async (uid: string): Promise<boolean> => {
  try {
    const userDocRef = doc(approvedUsersCollectionRef, uid);
    const docSnap = await getDoc(userDocRef);
    return docSnap.exists();
  } catch (error) {
    console.error("Error checking user approval status:", error);
    return false;
  }
};

export const getApprovedUsers = async (): Promise<ApprovedUser[]> => {
  try {
    const querySnapshot = await getDocs(approvedUsersCollectionRef);
    return querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as ApprovedUser));
  } catch (error) {
    console.error("Error getting approved users:", error);
    return [];
  }
};

export const addApprovedUser = async (uid: string): Promise<void> => {
  if (!uid || uid.trim() === '') {
    throw new Error("UID cannot be empty.");
  }
  try {
    const userDocRef = doc(approvedUsersCollectionRef, uid);
    await setDoc(userDocRef, { addedAt: serverTimestamp() });
  } catch (error) {
    console.error("Error adding approved user:", error);
    throw error;
  }
};

export const removeApprovedUser = async (uid: string): Promise<void> => {
  try {
    const userDocRef = doc(approvedUsersCollectionRef, uid);
    await deleteDoc(userDocRef);
  } catch (error) {
    console.error("Error removing approved user:", error);
    throw error;
  }
};
