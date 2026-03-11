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

export type NetPortResponse =
  | { valid: false }
  | {
      valid: true;
      port: number;
      range: string;
      wellKnown: boolean;
      serviceName: string | null;
      protocol: string | null;
      description: string | null;
    };

export type NetPortListItem = {
  port: number;
  serviceName: string;
  protocol: string;
  description: string;
};
