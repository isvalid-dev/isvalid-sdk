export type CurrencyResponse =
  | { valid: false }
  | {
      valid: true;
      format: 'alpha' | 'numeric';
      code: string;
      numericCode: string;
      name: string;
      minorUnit: number | null;
    };

export interface CurrencyListItem {
  code: string;
  numericCode: string;
  name: string;
  minorUnit: number | null;
}
