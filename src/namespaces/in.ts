import type { HttpClient } from '../client.js';
import type { GstinResponse } from '../types/in.js';

export interface InNamespace {
  gstin(value: string): Promise<GstinResponse>;
}

export function createInNamespace(client: HttpClient): InNamespace {
  return {
    gstin: (value: string) => client.get<GstinResponse>('/v0/in/gstin', { value }),
  };
}
