export type CnpjResponse =
  | { valid: false }
  | { valid: true; normalized: string; type: 'matriz' | 'filial' };

export type CpfResponse =
  | { valid: false }
  | { valid: true; normalized: string };
