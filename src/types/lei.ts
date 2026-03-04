export interface LeiEntity {
  legalName: string;
  country: string | null;
  entityStatus: string | null;
  registrationStatus: string | null;
  category: string | null;
  initialRegistrationDate: string | null;
  lastUpdate: string | null;
  nextRenewal: string | null;
  managingLou: string | null;
}

export interface LeiLou {
  lei: string;
  name: string;
  country: string | null;
  status: string | null;
}

export type LeiResponse =
  | { valid: false }
  | {
      valid: true;
      lei: string;
      louCode: string;
      checkDigits: string;
      found: boolean | null;
      dataSource: 'gleif-db' | 'gleif-api' | null;
      entity: LeiEntity | null;
      lou: LeiLou | null;
    };

export interface LeiSearchOptions {
  country?: string;
  entityStatus?: string;
  page?: number;
  limit?: number;
}

export interface LeiSearchResult {
  lei: string;
  legalName: string;
  country: string | null;
  entityStatus: string | null;
  registrationStatus: string | null;
  category: string | null;
}

export interface LeiSearchResponse {
  results: LeiSearchResult[];
  page: number;
  limit: number;
  total: number;
}

export interface LeiLouItem {
  louCode: string;
  lei: string;
  name: string;
  country: string | null;
  status: string | null;
}

export interface LeiLousResponse {
  lous: LeiLouItem[];
  total: number;
}
