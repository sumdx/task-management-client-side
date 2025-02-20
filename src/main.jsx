import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router";
import Root from "./Layout/Root.jsx";
import About from "./Pages/About.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Dashboard from "./Layout/Dashboard.jsx";

const routes = (
  <Routes>
    <Route path="/" element={<Root/>}>
      <Route path="/about" element={<About/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/about" element={<Signup/>}/>
    </Route>
    <Route path="dashboard" element={<Dashboard/>}>

    </Route>
  </Routes>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>{routes}</BrowserRouter>
  </StrictMode>
);
