/* Farbrampe der Balkensegmente.
   Wird sowohl im DOM (Balken, Legende, Liste) als auch auf dem Canvas
   (PDF-Report, Instagram-Stories) verwendet – deshalb liegt sie hier und
   nicht in einer CSS-Datei. */

/** Dunkel → hell. Reihenfolge entspricht der Ausgabenliste. */
export const RAMP_LIGHT = [
  "#0a0a0a",
  "#2b2b2b",
  "#4a4a4a",
  "#6a6a6a",
  "#8a8a8a",
  "#a8a8a8",
  "#c4c4c4",
  "#dcdcdc",
] as const;

/** Hell → dunkel, das Gegenstück für den Dark Mode. */
export const RAMP_DARK = [
  "#f5f5f5",
  "#d8d8d8",
  "#bcbcbc",
  "#a0a0a0",
  "#858585",
  "#6a6a6a",
  "#525252",
  "#3d3d3d",
] as const;

/** Signalfarben: Volt für den Überschuss, Rot für das Defizit. */
export const YELLOW = "#f2ff00";
export const RED = "#ff3d00";

/** Graustufen der Landingpage-Demo (neun Stufen, immer hell). */
export const GRAYS = [
  "#0a0a0a",
  "#2e2e2e",
  "#4a4a4a",
  "#666666",
  "#848484",
  "#a3a3a3",
  "#c1c1c1",
  "#d9d9d9",
  "#e8e8e8",
];

export const shade = (i: number, dark: boolean): string => (dark ? RAMP_DARK : RAMP_LIGHT)[i % 8];

/** Schriftfarbe mit ausreichendem Kontrast auf der übergebenen Fläche. */
export const inkOn = (hex: string): string => {
  const n = parseInt(hex.slice(1), 16);
  const l = 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return l > 140 ? "#0a0a0a" : "#ffffff";
};
