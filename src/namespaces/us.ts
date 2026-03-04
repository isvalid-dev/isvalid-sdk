import type { HttpClient } from '../client.js';
import type { NpiResponse } from '../types/us.js';

export interface UsNamespace {
  npi(value: string): Promise<NpiResponse>;
}

export function createUsNamespace(client: HttpClient): UsNamespace {
  return {
    npi: (value: string) => client.get<NpiResponse>('/v0/us/npi', { value }),
  };
}
