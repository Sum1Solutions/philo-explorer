import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DevVersions from "./pages/DevVersions";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <DevVersions />
  </React.StrictMode>
);
