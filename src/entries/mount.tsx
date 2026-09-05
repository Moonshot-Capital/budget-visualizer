import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { SettingsProvider } from "../i18n";
import "../index.css";

/** Gemeinsamer Einstiegspunkt aller Seiten. */
export function mount(page: ReactNode) {
  const el = document.getElementById("root");
  if (!el) throw new Error("#root fehlt im HTML");
  createRoot(el).render(
    <StrictMode>
      <SettingsProvider>{page}</SettingsProvider>
    </StrictMode>,
  );
}
