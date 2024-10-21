import { useState, useEffect, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig"; // Assure-toi d'importer correctement ta config Firebase

const useFirestoreData = <T extends { id: string }>(collectionName: string) => {
  console.log("in useFirestoreData");

  const [data, setData] = useState<T[]>([]);

  const fetchData = useCallback(async () => {
    console.log("fetching data...");

    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const items = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as T)
      );
      setData(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [collectionName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return data;
};

export default useFirestoreData;
