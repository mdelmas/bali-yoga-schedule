import "./App.css";

import useFirestoreData from "./hooks/useFirestoreData";
import { YogaClass } from "./types/YogaClass";
import Button from "./components/Button";

function App() {
  const data = useFirestoreData<YogaClass>("classes");
  console.log(data);

  return (
    <>
      <Button>My button :)</Button>
    </>
  );
}

export default App;
