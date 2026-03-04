import type { HttpClient } from '../client.js';
import type { SortCodeResponse } from '../types/gb.js';

export interface GbNamespace {
  sortCode(value: string): Promise<SortCodeResponse>;
}

export function createGbNamespace(client: HttpClient): GbNamespace {
  return {
    sortCode: (value: string) => client.get<SortCodeResponse>('/v0/gb/sort-code', { value }),
  };
}
