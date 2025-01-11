import React from "react";
import { createRoot } from "react-dom/client"; // Use createRoot instead of ReactDOM.render
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container); // Create a root using createRoot
root.render(<App />); // Render the App component
