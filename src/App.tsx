import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "src/Layout";
import Contact from "src/pages/Contact";
import FAQ from "src/pages/FAQ";
import Home from "src/pages/Home";
import Info from "src/pages/Info";
import Projects from "src/pages/Projects";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/info" element={<Info />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
