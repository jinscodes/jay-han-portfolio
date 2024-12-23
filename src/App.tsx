import { createContext, Dispatch, SetStateAction, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "src/Layout";
import Contact from "src/pages/Contact";
import FAQ from "src/pages/FAQ";
import Home from "src/pages/Home";
import Info from "src/pages/Info";
import Projects from "src/pages/Projects";

interface LocationContextType {
  curMenu: string;
  setCurMenu: Dispatch<SetStateAction<string>>;
}

export const LocationContext = createContext<LocationContextType>({
  curMenu: "/",
  setCurMenu: () => {},
});

function App() {
  const [curMenu, setCurMenu] = useState("");

  return (
    <BrowserRouter>
      <LocationContext.Provider
        value={{ curMenu: curMenu, setCurMenu: setCurMenu }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/info" element={<Info />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
          </Route>
        </Routes>
      </LocationContext.Provider>
    </BrowserRouter>
  );
}

export default App;
