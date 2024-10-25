import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig"; // Assure-toi d'importer correctement ta config Firebase
import moment from "moment";

import { RawData } from "../types/YogaClass";

const CLASSES_COLLECTION = "classes";

const useFetchYogaClasses = <YogaClass>(date: string) => {
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
          date: rawYogaClass.date + " " + rawYogaClass.time,
          momentDate: moment(
            rawYogaClass.date + " " + rawYogaClass.time,
            "DD/MM/YY h:mm A"
          ),
          duration: +rawYogaClass.duration,
          name: rawYogaClass.name,
          studio: rawYogaClass.studio,
          city: rawYogaClass.city,
          price: +rawYogaClass.price,
          url: "",
        } as YogaClass;
      });

      setData(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [date]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return data;
};

export default useFetchYogaClasses;
