import * as React from "react";

type DialogContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DialogContext = React.createContext<DialogContextType | null>(null);

export function Dialog({ open, onOpenChange, children }: { open: boolean; onOpenChange?: (open: boolean) => void; children: React.ReactNode }) {
  const [internalOpen, setInternalOpen] = React.useState(open);
  React.useEffect(() => setInternalOpen(open), [open]);
  const setOpen = (v: boolean) => {
    setInternalOpen(v);
    onOpenChange?.(v);
  };
  return <DialogContext.Provider value={{ open: internalOpen, setOpen }}>{children}</DialogContext.Provider>;
}

export function DialogContent({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(DialogContext);
  if (!ctx?.open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={() => ctx.setOpen(false)} />
      <div className={`relative z-10 mx-auto mt-16 w-full max-w-lg rounded-xl bg-white p-4 shadow-xl ${className}`}>{children}</div>
    </div>
  );
}

export function DialogHeader({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mb-2 ${className}`}>{children}</div>;
}

export function DialogTitle({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>;
}

export function DialogDescription({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>;
}
