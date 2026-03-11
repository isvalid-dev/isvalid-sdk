export type IndustryResponse =
  | { valid: false; error?: string; suggestedSystem?: string }
  | {
      valid: true;
      system: string;
      edition: string;
      code: string;
      description: string;
      level: string;
      parent: string | null;
      hierarchy: Array<{ code: string; description: string }>;
    };

export interface IndustryListItem {
  code: string;
  level: string;
  parent: string | null;
  description: string;
}

export type IndustryListResponse = IndustryListItem[];
