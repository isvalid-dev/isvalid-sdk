export type AbnResponse =
  | { valid: false }
  | { valid: true; normalized: string };
