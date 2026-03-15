export type PeselResponse =
  | { valid: false }
  | {
      valid: true;
      birthDate: string;
      gender: 'male' | 'female';
      isOver15: boolean;
      isOver18: boolean;
      isOver21: boolean;
    };

export interface RegonLookup {
  checked: boolean;
  found?: boolean;
  reason?: string;
  name?: string | null;
  nip?: string | null;
  voivodeship?: string | null;
  district?: string | null;
  community?: string | null;
  city?: string | null;
  postalCode?: string | null;
  street?: string | null;
  houseNumber?: string | null;
  flatNumber?: string | null;
  activityEndDate?: string | null;
}

export type RegonResponse =
  | { valid: false }
  | { valid: true; type: 'entity' | 'local-unit'; regon?: RegonLookup };

export interface KrsAddress {
  city: string | null;
  voivodeship: string | null;
  street: string | null;
  houseNumber: string | null;
  flatNumber: string | null;
  postalCode: string | null;
  country: string | null;
  website: string | null;
}

export interface KrsLookup {
  checked: boolean;
  found?: boolean;
  reason?: string;
  krs?: string | null;
  registry?: string;
  name?: string | null;
  legalForm?: string | null;
  nip?: string | null;
  regon?: string | null;
  hasOppStatus?: boolean | null;
  registeredAt?: string | null;
  dataAsOf?: string | null;
  lastEntryAt?: string | null;
  address?: KrsAddress | null;
}

export type KrsResponse =
  | { valid: false }
  | { valid: true; number: string; krs?: KrsLookup };

export type CeidgResponse =
  | { valid: false }
  | {
      valid: true;
      nip: string;
      ceidg?: {
        checked: boolean;
        found?: boolean;
        reason?: string;
        status?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        businessName?: string | null;
        regon?: string | null;
        city?: string | null;
        postalCode?: string | null;
        street?: string | null;
        houseNumber?: string | null;
        flatNumber?: string | null;
        startDate?: string | null;
        pkd?: string[];
        primaryPkd?: string | null;
      };
    };

export type PkdResponse =
  | { valid: false; error?: string }
  | {
      valid: true;
      code: string;
      name: string;
      section: string;
      sectionName: string;
      division: string;
      divisionName: string | null;
      group: string;
      groupName: string | null;
      class: string;
      className: string | null;
    };
