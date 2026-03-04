export type LanguageResponse =
  | { valid: false }
  | {
      valid: true;
      format: 'alpha-2' | 'alpha-3';
      alpha2: string | null;
      alpha3: string;
      name: string;
    };

export interface LanguageListItem {
  alpha2: string | null;
  alpha3: string;
  name: string;
}
