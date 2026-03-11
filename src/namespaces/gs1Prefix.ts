import type { HttpClient } from '../client.js';
import type { Gs1PrefixResponse, Gs1PrefixListResponse } from '../types/gs1Prefix.js';

export interface Gs1PrefixNamespace {
  (value: string): Promise<Gs1PrefixResponse>;
  list(): Promise<Gs1PrefixListResponse>;
}

export function createGs1PrefixNamespace(client: HttpClient): Gs1PrefixNamespace {
  const gs1Prefix = ((value: string) =>
    client.get<Gs1PrefixResponse>('/v0/gs1-prefix', { value })
  ) as Gs1PrefixNamespace;

  gs1Prefix.list = () =>
    client.get<Gs1PrefixListResponse>('/v0/gs1-prefix/list');

  return gs1Prefix;
}
