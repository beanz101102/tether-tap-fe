import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../app";

function useFirestoreWrite() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const writeData = async (
    collectionPath: string,
    docId: string,
    inputData: any,
  ) => {
    try {
      setIsLoading(true);
      const docRef = doc(db, collectionPath, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await setDoc(docRef, inputData, { merge: true });
      } else {
        await setDoc(docRef, inputData);
      }
    } catch (err: any) {
      setError(err.message);
      console.error("Error writing document: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    writeData,
    isLoading,
    error,
  };
}

export default useFirestoreWrite;
