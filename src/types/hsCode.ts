export type HsCodeResponse =
  | { valid: false; code?: string; level?: string; error?: string }
  | {
      valid: true;
      code: string;
      level: string;
      description: string;
      formatted: string;
      chapter?: { code: string; description: string } | null;
      heading?: { code: string; description: string } | null;
    };

export interface HsCodeListItem {
  code: string;
  level: string;
  description: string;
}

export type HsCodeListResponse = HsCodeListItem[];
