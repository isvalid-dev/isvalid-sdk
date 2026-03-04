export type NpiResponse =
  | { valid: false }
  | { valid: true; normalized: string };
