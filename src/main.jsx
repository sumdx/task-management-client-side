import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router";
import Root from "./Layout/Root.jsx";
import About from "./Pages/About.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Dashboard from "./Layout/Dashboard.jsx";
import AllTasks from "./Pages/AllTasks.jsx";
import AllTaskTest from "./Pages/AllTaskTest.jsx";

const routes = (
  <Routes>
    <Route path="/" element={<Root/>}>
      <Route path="/about" element={<About/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/about" element={<Signup/>}/>
    </Route>
    <Route path="dashboard" element={<Dashboard/>}>
     <Route path="all-tasks" element={<AllTasks/>}/>
     <Route path="all-tasks2" element={<AllTaskTest/>}/>
    </Route>
  </Routes>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>{routes}</BrowserRouter>
  </StrictMode>
);
