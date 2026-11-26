import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainDashboard from "./pages/MainDashboard";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <MainDashboard />
  </React.StrictMode>
);
