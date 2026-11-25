import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { ThemeProvider } from "./context/ThemeContext";
import "./i18n";

const savedDarkMode = localStorage.getItem("darkMode");
document.documentElement.classList.toggle(
  "dark",
  savedDarkMode === null || savedDarkMode === "true"
);

const app = (
  <ThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);

ReactDOM.createRoot(document.getElementById("root")!).render(app);