import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import Transfer from "./components/Transfer";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="transfer" element={<Transfer />} />
      </Routes>
    </Router>
  </StrictMode>
);
