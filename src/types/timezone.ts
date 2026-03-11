export type TimezoneResponse =
  | { valid: false }
  | {
      valid: true;
      timezone: string;
      region: string | null;
      utcOffset: string;
      abbreviation: string | null;
      isDST: boolean;
    };

export type TimezoneListItem = {
  timezone: string;
  region: string | null;
  utcOffset: string;
  abbreviation: string | null;
  isDST: boolean;
};
