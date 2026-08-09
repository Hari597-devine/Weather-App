import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import "./styles/weather.css";

// Get root element safely
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Create React root
const root = createRoot(rootElement);

// Render App
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);