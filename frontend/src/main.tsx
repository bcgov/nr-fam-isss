import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { getBranding } from "./utils/Branding";
import "./styles/index.scss";

// Some Carbon rules key off the attribute rather than the wrapper class, so
// both are set. See the <Theme> note in App.tsx.
document.documentElement.dataset.carbonTheme = "white";

// index.html carries FAM's title; a deployment branded through env.json renames the tab.
const { acronym, name } = getBranding();
document.title = `${acronym} - ${name}`;

const container = document.getElementById("app");
if (!container) {
    throw new Error("No #app element to mount into - check index.html.");
}

createRoot(container).render(
    <StrictMode>
        <App />
    </StrictMode>
);
