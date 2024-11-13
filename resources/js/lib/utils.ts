import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// utils/getEnumOptions.ts
export const getEnumOptions = (enumObj: Record<string, string>) => {
    return Object.entries(enumObj).map(([key, value]) => ({
      label: key, // Enum key
      value: value, // Enum value
    }));
  };
