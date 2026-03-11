export type Gs1PrefixResponse =
  | { valid: false; prefix?: string; error?: string }
  | {
      valid: true;
      prefix: string;
      country: string;
      inputType?: string;
    };

export interface Gs1PrefixListItem {
  rangeStart: string;
  rangeEnd: string;
  country: string;
}

export type Gs1PrefixListResponse = Gs1PrefixListItem[];
