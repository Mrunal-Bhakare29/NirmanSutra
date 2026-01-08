// firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfpUMKZp_Q_CVU7-7_9_Z2qPrwKj0hXd8",
  authDomain: "myapp-3a0d1.firebaseapp.com",
  projectId: "myapp-3a0d1",
  storageBucket: "myapp-3a0d1.appspot.com",
  messagingSenderId: "312313397512",
  appId: "1:312313397512:android:af45bdf926584154d26cbd",
};

// ✅ Ensure only one app instance
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Ensure only one auth instance with persistence
let auth;
if (getApps().length === 0) {
  // first time only
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  // already initialized, just get it
  auth = getAuth(app);
}

const db = getFirestore(app);

export { app, auth, db };
