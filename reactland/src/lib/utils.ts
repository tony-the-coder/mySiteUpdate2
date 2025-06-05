// reactland/src/lib/utils.ts
import type { ClassValue } from "clsx"; // Type-only import for ClassValue
import { clsx } from "clsx";           // Regular import for clsx function
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}