import "./App.css";

import { useMemo } from "react";
import moment from "moment";

import useFetchYogaClassesData from "./hooks/useFetchYogaClassesData";
import { YogaClass } from "./types/YogaClass";
import Button from "./components/Button";
import SelectionBar from "./components/SelectionBar";
import Schedule from "./components/Schedule";

enum TIME {
  All,
  Morning,
  Day,
  Evening,
}

function App() {
  const selectedDate = moment("18/10/24", "DD/MM/YY");
  const selectedTime = TIME.Morning as TIME;

  let yogaClassesData = useFetchYogaClassesData<YogaClass>(
    selectedDate.format("DD/MM/YY")
  );

  console.log("All classes", yogaClassesData.length);
  yogaClassesData.forEach((yogaClass) => {
    console.log(JSON.stringify(yogaClass));
  });

  yogaClassesData = useMemo(() => {
    console.log("filtering data ");
    const morningTreshold = moment(selectedDate).set("hour", 11);
    const eveningTreshold = moment(selectedDate).set("hour", 15);

    return yogaClassesData.filter((yogaClass) => {
      switch (selectedTime) {
        case TIME.Morning:
          return yogaClass.momentDate.isBefore(morningTreshold);
        case TIME.Day:
          return yogaClass.momentDate.isBetween(
            morningTreshold,
            eveningTreshold
          );
        case TIME.Evening:
          return yogaClass.momentDate.isAfter(eveningTreshold);
        default:
          return true;
      }
    });
  }, [yogaClassesData, selectedDate, selectedTime]);

  console.log("Filtered classes", yogaClassesData.length, selectedTime);
  yogaClassesData.forEach((yogaClass) => {
    console.log(JSON.stringify(yogaClass));
  });

  return (
    <>
      <Button>My button :)</Button>
      <Schedule />
    </>
  );
}

export default App;
