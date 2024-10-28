import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig"; // Assure-toi d'importer correctement ta config Firebase
import moment from "moment";

import { RawData, YogaClass } from "../types/YogaClass";

const CLASSES_COLLECTION = "classes";

const useFetchYogaClasses = (date: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [data, setData] = useState<YogaClass[]>([]);

  const fetchData = useCallback(async () => {
    console.log("fetching data...");

    try {
      const dateQuery = query(
        collection(db, CLASSES_COLLECTION),
        where("date", "==", date)
      );

      const querySnapshot = await getDocs(dateQuery);
      const items = querySnapshot.docs.map((doc) => {
        const rawYogaClass = doc.data() as RawData;
        return {
          id: doc.id,
          date: moment(
            rawYogaClass.date + " " + rawYogaClass.time,
            "DD/MM/YY h:mm A"
          ),
          duration: +rawYogaClass.duration,
          name: rawYogaClass.name,
          studio: rawYogaClass.studio,
          city: rawYogaClass.city,
          price: +rawYogaClass.price,
          url: rawYogaClass.url,
        } as YogaClass;
      });

      setIsLoading(false);
      if (items.length > 0) {
        setData(items);
        setHasData(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  }, [date]);

  useEffect(() => {
    setIsLoading(true);
    setHasData(false);
    fetchData();
  }, [fetchData]);

  return { data: data, isLoading, hasData };
};

export default useFetchYogaClasses;
