export type IpResponse =
  | { valid: false }
  | {
      valid: true;
      version: 4 | 6;
      type: string;
      expanded?: string;
    };

export type MacResponse =
  | { valid: false }
  | {
      valid: true;
      normalized: string;
      type: string;
      isLocal: boolean;
      isBroadcast: boolean;
    };
