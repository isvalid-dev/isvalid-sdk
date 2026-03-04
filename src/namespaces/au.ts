import type { HttpClient } from '../client.js';
import type { AbnResponse } from '../types/au.js';

export interface AuNamespace {
  abn(value: string): Promise<AbnResponse>;
}

export function createAuNamespace(client: HttpClient): AuNamespace {
  return {
    abn: (value: string) => client.get<AbnResponse>('/v0/au/abn', { value }),
  };
}
