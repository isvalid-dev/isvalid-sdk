export type NifResponse =
  | { valid: false }
  | { valid: true; type: string; normalized: string };
