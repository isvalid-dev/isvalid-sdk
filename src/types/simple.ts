export type EmailResponse =
  | { valid: false }
  | { valid: true; local: string; domain: string; mxValid?: boolean };

export type IbanResponse =
  | { valid: false }
  | {
      valid: true;
      countryCode: string;
      countryName: string;
      bban: string;
      isEU: boolean;
      formatted: string;
      bankCode: string | null;
      bankName: string | null;
      bankBic: string | null;
    };

export type IsinResponse =
  | { valid: false }
  | {
      valid: true;
      countryCode: string;
      countryName: string | null;
      nsin: string;
      cusip: string | null;
      checkDigit: string;
      found: boolean | null;
      dataSource?: 'firds' | 'openfigi' | 'firds+openfigi';
      name?: string | null;
      fisn?: string | null;
      cfiCode?: string | null;
      currency?: string | null;
      tradingVenue?: string | null;
      issuerLei?: string | null;
      maturityDate?: string | null;
      status?: string | null;
      ticker?: string | null;
      exchCode?: string | null;
      securityType?: string | null;
      marketSector?: string | null;
      figi?: string | null;
      compositeFIGI?: string | null;
    };

export type DtiResponse =
  | { valid: false }
  | {
      valid: true;
      normalized: string;
      payload: string;
      checkChar: string;
      found: boolean | null;
      identifierType?: string;
      name?: string | null;
      shortName?: string | null;
      dtiType?: number | null;
    };

export type VatResponse =
  | { valid: false }
  | {
      valid: true;
      normalized: string;
      countryCode: string;
      countryName: string;
      isEU: boolean;
      vies?: {
        checked: boolean;
        valid?: boolean;
        name?: string | null;
        address?: string | null;
        reason?: string;
      };
    };

export type GpsResponse =
  | { valid: false }
  | {
      valid: true;
      format: 'dd' | 'dms' | 'ddm' | 'geo-uri';
      lat: number;
      lon: number;
      latDir: 'N' | 'S';
      lonDir: 'E' | 'W';
      dms: { lat: string; lon: string };
    };

export type PhoneResponse =
  | { valid: false }
  | {
      valid: true;
      countryCode: string | null;
      callingCode: string;
      nationalNumber: string;
      type: string;
      e164: string;
      national: string;
      international: string;
    };

export type UrlResponse =
  | { valid: false }
  | {
      valid: true;
      protocol: string;
      domain: string;
      path: string;
      query: Record<string, string | string[]>;
      port: string | null;
      hash: string | null;
    };

export type EanResponse =
  | { valid: false }
  | {
      valid: true;
      format: string;
      prefix?: string;
      prefixCountry?: string;
      upcA?: string;
      indicator?: string;
    };

export type IsbnResponse =
  | { valid: false }
  | {
      valid: true;
      format: 'ISBN-10' | 'ISBN-13';
      isbn10: string | null;
      isbn13: string;
    };

export type IssnResponse =
  | { valid: false }
  | { valid: true; issn: string };

export type BicResponse =
  | { valid: false }
  | {
      valid: true;
      bankCode: string;
      countryCode: string;
      countryName: string | null;
      locationCode: string;
      branchCode: string | null;
      bankName: string | null;
      city: string | null;
      branch: string | null;
    };

export type CusipResponse =
  | { valid: false }
  | {
      valid: true;
      issuerNumber: string;
      issueNumber: string;
      checkDigit: string;
    };

export type CfiResponse =
  | { valid: false }
  | {
      valid: true;
      cfi: string;
      category: string;
      categoryName: string;
      group: string;
      groupName: string | null;
      attributes: Array<{
        position: number;
        code: string;
        name: string | null;
        value: string | null;
      }>;
    };

export type MicResponse =
  | { valid: false }
  | {
      valid: true;
      found: boolean;
      mic?: string;
      operatingMic?: string;
      name?: string;
      type?: string;
      status?: string;
      countryCode?: string;
      countryName?: string | null;
      city?: string;
      website?: string | null;
    };

export type NutsResponse =
  | { valid: false }
  | {
      valid: true;
      code: string;
      level: number;
      country: string;
      countryName: string | null;
      regionName: string | null;
    };

export type UuidResponse =
  | { valid: false }
  | { valid: true; version: number };

export type JwtResponse =
  | { valid: false }
  | {
      valid: true;
      algorithm: string;
      header: Record<string, unknown>;
      payload: Record<string, unknown>;
      issuedAt: string | null;
      expiresAt: string | null;
      expired: boolean | null;
    };

export type VinResponse =
  | { valid: false }
  | {
      valid: true;
      wmi: string;
      vds: string;
      checkDigit: string;
      vin: string;
      country: string | null;
      region: string | null;
      manufacturer: string | null;
      modelYearCandidates: number[];
      serialNumber: string;
    };

export type ImeiResponse =
  | { valid: false }
  | { valid: true; tac: string; snr: string; checkDigit: string };

export type SemverResponse =
  | { valid: false }
  | {
      valid: true;
      major: number;
      minor: number;
      patch: number;
      prerelease: string[] | null;
      build: string[] | null;
    };

export type ColorResponse =
  | { valid: false }
  | {
      valid: true;
      format: string;
      r: number;
      g: number;
      b: number;
      h: number;
      s: number;
      l: number;
      alpha: number;
      hex: string;
    };

export type BooleanResponse =
  | { valid: false }
  | { valid: true; normalized: boolean };

export type DateResponse =
  | { valid: false }
  | { valid: true; iso: string };

export type BtcAddressResponse =
  | { valid: false }
  | { valid: true; type: string };

export type PostalCodeResponse =
  | { valid: false }
  | {
      valid: true;
      country?: string;
      countryName?: string | null;
      format?: string;
      location?: {
        city: string;
        region: string | null;
        subregion: string | null;
        lat: number | null;
        lon: number | null;
      } | null;
      matchingCountries?: Array<{
        country: string;
        countryName: string | null;
        format: string;
      }>;
    };

export type AbaResponse =
  | { valid: false }
  | { valid: true; routingNumber: string; checkDigit: string };

export type Iso6346Response =
  | { valid: false }
  | {
      valid: true;
      ownerCode: string;
      equipmentCategory: string;
      serialNumber: string;
      checkDigit: string;
    };

export type SsccResponse =
  | { valid: false }
  | {
      valid: true;
      extensionDigit: string;
      gsPrefix: string;
      serialRef: string;
      checkDigit: string;
    };

export type GlnResponse =
  | { valid: false }
  | { valid: true; prefix: string; locationRef: string; checkDigit: string };

export type QrResponse = {
  valid: boolean;
  format?: string;
  data?: Record<string, unknown>;
  error?: string;
};

export type CreditCardResponse =
  | { valid: false }
  | { valid: true; type: string };
