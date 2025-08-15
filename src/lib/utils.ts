import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyOptions = {
  BDT: "৳",
  USD: "$",
  GBP: "£",
  EUR: "€",
  YEN: "¥",
};

export type TCurrencyKey = keyof typeof currencyOptions;
