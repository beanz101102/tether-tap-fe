import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../app";

function useFirestoreRead(collectionPath: string, docId: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!docId) return;
    const fetchData = async () => {
      try {
        const docRef = doc(db, collectionPath, docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          setError("No such document!");
        }
      } catch (err: any) {
        console.error(`err get ${collectionPath}`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionPath, docId]);

  return { data, loading, error };
}

export default useFirestoreRead;
