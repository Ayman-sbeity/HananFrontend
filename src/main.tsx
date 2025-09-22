import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ItemProvider } from "./context/ItemContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ItemProvider>
      <App />
    </ItemProvider>
  </StrictMode>
);
