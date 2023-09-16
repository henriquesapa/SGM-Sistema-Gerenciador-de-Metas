"use client";

export function dateFormat(date: Date) {
  return Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    month: "short",
    timeZoneName: "short",
    year: "numeric",
    timeZone: "America/Porto_Velho",
  }).format(date);
}
