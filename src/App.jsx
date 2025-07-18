import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Story from "./pages/Story";
import HeaderPage from "./components/HeaderPage";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="story" element={<Story />} />
          <Route path="header" element={<HeaderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
