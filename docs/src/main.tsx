import { createRoot } from "react-dom/client";
import "katex/dist/katex.min.css";
import "./index.css";
import "./docs.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>,
);
