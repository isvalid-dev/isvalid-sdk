import type { HttpClient } from '../client.js';
import type { LocodeResponse, LocodeListItem } from '../types/locode.js';

export interface LocodeNamespace {
  (value: string): Promise<LocodeResponse>;
  list(opts: { country: string }): Promise<LocodeListItem[]>;
}

export function createLocodeNamespace(client: HttpClient): LocodeNamespace {
  const locode = ((value: string) =>
    client.get<LocodeResponse>('/v0/locode', { value })
  ) as LocodeNamespace;

  locode.list = (opts: { country: string }) =>
    client.get<LocodeListItem[]>('/v0/locode/list', { country: opts.country });

  return locode;
}
