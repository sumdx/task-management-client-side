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
import AuthProvider from "./Provider/AuthProvider.jsx";
import PrivateRoute from "./Provider/PrivateRoute.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const routes = (
  <Routes>
    <Route path="/" element={<Root />}>
      <Route path="/about" element={<About />} />
    </Route>  
    
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/signup" element={<Signup/>}></Route>
  
    <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
      <Route path="all-tasks" element={<PrivateRoute><AllTasks /></PrivateRoute>} />
    </Route>
  </Routes>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{routes}</BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
