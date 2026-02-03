import { StrictMode } from "react";
import videojs from "video.js";

import ErrorBoundary from "./component/utils/ErrorBoundary.jsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { Provider } from "react-redux";
videojs.log.level("off");
const originalLog = console.log;
console.log = function (...args) {
  // block logs from videojs-http-source-selector
  if (
    typeof args[0] === "string" &&
    args[0].includes("videojs-http-source-selector")
  ) {
    return;
  }
  // block logs like "player.techName_:Html5"
  if (typeof args[0] === "string" && args[0].includes("player.techName_")) {
    return;
  }
  originalLog.apply(console, args);
};

createRoot(document.getElementById("root")).render(
  
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
 
);
