import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../utils/cn";
import { inkOn, shade } from "../lib/ramp";
import { Button } from "../components/ui";
import type { Dict } from "../i18n/de";
import type { Expense } from "../lib/types";

type Props = {
  expenses: Expense[];
  dark: boolean;
  t: Dict;
  money: (n: number) => string;
  pctText: (n: number) => string;
  currencySymbol: string;
  editingId: string | null;
  onEdit: (id: string | null) => void;
  onSave: (id: string, name: string, amount: number) => void;
  onMove: (from: number, to: number) => void;
  onRemove: (id: string) => void;
};

export function ExpenseList({
  expenses,
  dark,
  t,
  money,
  pctText,
  currencySymbol,
  editingId,
  onEdit,
  onSave,
  onMove,
  onRemove,
}: Props) {
  const [dragId, setDragId] = useState<string | null>(null);
  const [dropId, setDropId] = useState<string | null>(null);

  if (!expenses.length) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-line px-6 py-12 text-center text-sm text-fg-subtle">
        {t.app.emptyList}
      </div>
    );
  }

  const maxAmount = Math.max(...expenses.map((e) => e.amount), 1);

  return (
    <ul className="space-y-2" role="list">
      <AnimatePresence initial={false}>
        {expenses.map((e, i) => (
          <motion.li
            key={e.id}
            layout
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 14, height: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            {editingId === e.id ? (
              <EditRow
                expense={e}
                t={t}
                currencySymbol={currencySymbol}
                onCancel={() => onEdit(null)}
                onSave={(name, amount) => onSave(e.id, name, amount)}
              />
            ) : (
              <div
                draggable
                onDragStart={(ev) => {
                  setDragId(e.id);
                  ev.dataTransfer.effectAllowed = "move";
                }}
                onDragOver={(ev) => {
                  ev.preventDefault();
                  setDropId(e.id);
                }}
                onDragLeave={() => setDropId((d) => (d === e.id ? null : d))}
                onDrop={(ev) => {
                  ev.preventDefault();
                  setDropId(null);
                  const from = expenses.findIndex((x) => x.id === dragId);
                  if (from >= 0 && from !== i) onMove(from, i);
                }}
                onDragEnd={() => {
                  setDragId(null);
                  setDropId(null);
                }}
                className={cn(
                  "group flex items-center gap-3 rounded-xl border bg-card px-3 py-2.5 transition-all",
                  dropId === e.id ? "border-volt-deep" : "border-line",
                  dragId === e.id && "opacity-40",
                )}
              >
                <span
                  className="grid h-7 w-7 shrink-0 cursor-grab place-items-center rounded-md text-[10px] font-black tabular-nums active:cursor-grabbing"
                  style={{ background: shade(i, dark), color: inkOn(shade(i, dark)) }}
                  title={t.app.yourExpensesDesc}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <button
                  type="button"
                  onClick={() => onEdit(e.id)}
                  aria-label={`${t.app.edit}: ${e.name}`}
                  className="min-w-0 flex-1 text-left"
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="truncate text-[11px] font-bold uppercase tracking-wider text-fg-muted">
                      {e.name}
                    </span>
                    <span className="shrink-0 text-sm font-extrabold tabular-nums">
                      {money(e.amount)}
                      <span className="ml-1.5 text-xs font-semibold text-fg-subtle">{pctText(e.amount)}</span>
                    </span>
                  </span>
                  <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-surface-3">
                    <span
                      className="block h-full rounded-full transition-[width] duration-500"
                      style={{ width: `${(e.amount / maxAmount) * 100}%`, background: shade(i, dark) }}
                    />
                  </span>
                </button>

                <div className="flex shrink-0 items-center gap-0.5">
                  <MiniButton label={t.app.moveUp} disabled={i === 0} onClick={() => onMove(i, i - 1)}>
                    ↑
                  </MiniButton>
                  <MiniButton
                    label={t.app.moveDown}
                    disabled={i === expenses.length - 1}
                    onClick={() => onMove(i, i + 1)}
                  >
                    ↓
                  </MiniButton>
                  <MiniButton label={t.app.delete} danger onClick={() => onRemove(e.id)}>
                    ×
                  </MiniButton>
                </div>
              </div>
            )}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

function MiniButton({
  children,
  label,
  onClick,
  disabled,
  danger,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "grid h-7 w-7 place-items-center rounded-md text-sm font-bold transition-colors",
        "text-fg-subtle hover:bg-surface-2 hover:text-fg disabled:opacity-25 disabled:hover:bg-transparent",
        danger && "hover:bg-alert/10 hover:text-alert",
      )}
    >
      {children}
    </button>
  );
}

function EditRow({
  expense,
  t,
  currencySymbol,
  onSave,
  onCancel,
}: {
  expense: Expense;
  t: Dict;
  currencySymbol: string;
  onSave: (name: string, amount: number) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(expense.name);
  const [amount, setAmount] = useState(String(expense.amount));
  const amountRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = window.setTimeout(() => {
      amountRef.current?.focus();
      amountRef.current?.select();
    }, 30);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        const a = parseFloat(amount);
        onSave(name.trim(), Number.isFinite(a) && a >= 0 ? a : expense.amount);
      }}
      onKeyDown={(ev) => {
        if (ev.key === "Escape") onCancel();
      }}
      className="rounded-xl border-2 border-fg bg-card p-4"
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_140px]">
        <label className="block">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-fg-muted">
            {t.app.expenseNameLabel}
          </span>
          <input
            value={name}
            maxLength={60}
            onChange={(ev) => setName(ev.target.value)}
            className="mt-1.5 h-11 w-full rounded-lg border-2 border-line bg-surface-2 px-3 text-base font-semibold text-fg transition-colors focus:border-fg focus:bg-surface focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-fg-muted">
            {t.app.expenseAmountLabel}
          </span>
          <span className="relative mt-1.5 block">
            <input
              ref={amountRef}
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={amount}
              onChange={(ev) => setAmount(ev.target.value)}
              className="h-11 w-full rounded-lg border-2 border-line bg-surface-2 px-3 pr-9 text-base font-extrabold tabular-nums text-fg transition-colors focus:border-fg focus:bg-surface focus:outline-none"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-fg-subtle">
              {currencySymbol}
            </span>
          </span>
        </label>
      </div>
      <div className="mt-3 flex gap-2">
        <Button type="submit" size="sm" variant="contrast">
          {t.app.save}
        </Button>
        <button
          type="button"
          onClick={onCancel}
          className="h-9 rounded-full px-4 text-[13px] font-bold text-fg-muted transition-colors hover:text-fg"
        >
          {t.app.cancel}
        </button>
      </div>
    </form>
  );
}
