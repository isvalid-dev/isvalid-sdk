import type { HttpClient } from '../client.js';
import type { HsCodeResponse, HsCodeListResponse } from '../types/hsCode.js';

export interface HsCodeNamespace {
  (value: string): Promise<HsCodeResponse>;
  list(opts?: { chapter?: string; level?: string }): Promise<HsCodeListResponse>;
}

export function createHsCodeNamespace(client: HttpClient): HsCodeNamespace {
  const hsCode = ((value: string) =>
    client.get<HsCodeResponse>('/v0/hs-code', { value })
  ) as HsCodeNamespace;

  hsCode.list = (opts?: { chapter?: string; level?: string }) =>
    client.get<HsCodeListResponse>('/v0/hs-code/list', {
      chapter: opts?.chapter,
      level: opts?.level,
    });

  return hsCode;
}
