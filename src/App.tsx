import "./App.css";

import useFetchYogaClassesData from "./hooks/useFetchYogaClassesData";
import { YogaClass } from "./types/YogaClass";
import Button from "./components/Button";

function App() {
  const dataDay = useFetchYogaClassesData<YogaClass>("18/10/24");
  dataDay.forEach((doc) => {
    console.log(doc);
  });

  return (
    <>
      <Button>My button :)</Button>
    </>
  );
}

export default App;
