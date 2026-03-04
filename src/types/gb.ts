export type SortCodeResponse =
  | { valid: false }
  | { valid: true; normalized: string; formatted: string };
