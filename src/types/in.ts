export type GstinResponse =
  | { valid: false }
  | {
      valid: true;
      stateCode: string;
      stateName: string | null;
      pan: string;
      entityType: string;
      checkDigit: string;
    };
