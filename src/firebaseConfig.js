import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import "firebase/firestore";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBP_-uwxC4yF8T3PtFqBzC0eYkNmg2kyXs",
  authDomain: "lopl-1bba4.firebaseapp.com",
  projectId: "lopl-1bba4",
  storageBucket: "lopl-1bba4.firebasestorage.app",
  messagingSenderId: "233847147737",
  appId: "1:233847147737:web:9ae685466263ca09e902c8",
};
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const auth = getAuth(FIREBASE_APP);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
const database = getDatabase(FIREBASE_APP);
export { database };

const db = firebase.firestore();
export { db };
