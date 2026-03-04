import type { HttpClient } from '../client.js';
import type { NifResponse } from '../types/es.js';

export interface EsNamespace {
  nif(value: string): Promise<NifResponse>;
}

export function createEsNamespace(client: HttpClient): EsNamespace {
  return {
    nif: (value: string) => client.get<NifResponse>('/v0/es/nif', { value }),
  };
}
