import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getEasterDate(year: number): Date {
  const f = Math.floor,
    G = year % 19,
    C = f(year / 100),
    H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
    I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
    J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
    L = I - J,
    month = 3 + f((L + 40) / 44),
    day = L + 28 - 31 * f(month / 4);
  return new Date(year, month - 1, day);
}

export function isItalianHoliday(date: Date): boolean {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  if (
    (day === 1 && month === 0) ||
    (day === 6 && month === 0) ||
    (day === 25 && month === 3) ||
    (day === 1 && month === 4) ||
    (day === 2 && month === 5) ||
    (day === 15 && month === 7) ||
    (day === 1 && month === 10) ||
    (day === 8 && month === 11) ||
    (day === 25 && month === 11) ||
    (day === 26 && month === 11)
  ) {
    return true;
  }

  const easter = getEasterDate(year);
  const easterMonday = new Date(easter);
  easterMonday.setDate(easter.getDate() + 1);

  if (
    (day === easter.getDate() && month === easter.getMonth()) ||
    (day === easterMonday.getDate() && month === easterMonday.getMonth())
  ) {
    return true;
  }

  return false;
}
