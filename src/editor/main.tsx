import "@/packages/ui/styles.css"
import { createRoot } from "react-dom/client";
import { App } from "@/app/editor/app";

createRoot(document.getElementById("root") as Element).render(
  <App />
);
