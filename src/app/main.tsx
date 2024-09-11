import ReactDOM from "react-dom/client";
import App from "./App";
import "../shared/assets/styles/global.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
} else {
  console.error("Failed to find the root element.");
}
