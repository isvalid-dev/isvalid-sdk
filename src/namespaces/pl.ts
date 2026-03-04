import type { HttpClient } from '../client.js';
import type { PeselResponse, RegonResponse, KrsResponse } from '../types/pl.js';

export interface PlNamespace {
  pesel(value: string): Promise<PeselResponse>;
  regon(value: string, opts?: { lookup?: boolean }): Promise<RegonResponse>;
  krs(value: string, opts?: { lookup?: boolean }): Promise<KrsResponse>;
}

export function createPlNamespace(client: HttpClient): PlNamespace {
  return {
    pesel: (value: string) =>
      client.get<PeselResponse>('/v0/pl/pesel', { value }),
    regon: (value: string, opts?) =>
      client.get<RegonResponse>('/v0/pl/regon', {
        value,
        lookup: opts?.lookup?.toString(),
      }),
    krs: (value: string, opts?) =>
      client.get<KrsResponse>('/v0/pl/krs', {
        value,
        lookup: opts?.lookup?.toString(),
      }),
  };
}
