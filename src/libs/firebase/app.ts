import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "@firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { firebaseConfig } from "./config";

// avoid initializing twice
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache(
    /*settings*/ { tabManager: persistentMultipleTabManager() },
  ),
});
export const auth = getAuth();
export const analytics = getAnalytics(app);
export default app;

export const functions = getFunctions(app);
export const getCallableFunction = <T, R>(name: string) =>
  httpsCallable<T, R>(functions, name);
