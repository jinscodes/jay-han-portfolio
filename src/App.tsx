import Main from "@layouts/Main";
import Splash from "@layouts/Splash";
import { useState } from "react";

function App() {
  const [splash, setSplash] = useState(true);

  setTimeout(() => {
    setSplash(false);
  }, 2500);

  return (
    <>
      {splash && <Splash />}
      {!splash && <Main />}
    </>
  );
}

export default App;
