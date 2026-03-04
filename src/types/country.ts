export type CountryResponse =
  | { valid: false }
  | {
      valid: true;
      value: string;
      format: 'alpha-2' | 'alpha-3' | 'numeric';
      alpha2: string;
      alpha3: string;
      numeric: string;
      name: string;
    };

export interface CountryListItem {
  alpha2: string;
  alpha3: string;
  numeric: string;
  name: string;
}
