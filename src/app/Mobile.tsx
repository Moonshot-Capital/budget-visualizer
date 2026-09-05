import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../utils/cn";
import type { ToastState } from "./state";

/** Fixe Leiste unten (< 900 px): Saldo plus Knopf zum Hinzufügen. */
export function MobileBar({
  label,
  value,
  isDeficit,
  addLabel,
  onAdd,
}: {
  label: string;
  value: string;
  isDeficit: boolean;
  addLabel: string;
  onAdd: () => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 px-4 py-3 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-fg-subtle">{label}</p>
          <p className={cn("text-xl font-black tabular-nums", isDeficit ? "text-alert" : "text-fg")}>{value}</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex h-12 items-center gap-2 rounded-full bg-volt px-5 text-sm font-bold text-ink shadow-volt active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
          {addLabel}
        </button>
      </div>
    </div>
  );
}

/** Bottom-Sheet für das Ausgabenformular auf kleinen Bildschirmen. */
export function BottomSheet({
  open,
  title,
  closeLabel,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  closeLabel: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm lg:hidden"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[92vh] overflow-y-auto rounded-t-3xl border-t border-line bg-card p-5 pb-8 lg:hidden"
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line-strong" />
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold tracking-tight">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label={closeLabel}
                className="grid h-9 w-9 place-items-center rounded-full text-fg-subtle hover:bg-surface-2 hover:text-fg"
              >
                ×
              </button>
            </div>
            <div className="mt-5">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/** Meldung unten mit optionaler Aktion (z. B. „Rückgängig“). */
export function Toast({ state, onDismiss }: { state: ToastState; onDismiss: () => void }) {
  return (
    <AnimatePresence>
      {state && (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-24 left-1/2 z-50 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-4 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-lift lg:bottom-8"
        >
          <span className="truncate">{state.message}</span>
          {state.actionLabel && (
            <button
              type="button"
              onClick={() => {
                state.onAction?.();
                onDismiss();
              }}
              className="shrink-0 font-black uppercase tracking-wider text-volt"
            >
              {state.actionLabel}
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
