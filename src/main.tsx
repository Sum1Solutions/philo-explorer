import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Explorer from "./pages/Explorer";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <div className="min-h-screen bg-background text-foreground">
      <Explorer />
    </div>
  </React.StrictMode>
);
