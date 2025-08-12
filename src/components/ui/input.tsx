import * as React from "react";

export function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-md border bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-black/20 focus:ring-2 focus:ring-black/10 ${className}`}
      {...props}
    />
  );
}
