import type { HttpClient } from '../client.js';
import type { LeiResponse, LeiSearchOptions, LeiSearchResponse, LeiLousResponse } from '../types/lei.js';

export interface LeiNamespace {
  (value: string): Promise<LeiResponse>;
  search(query: string, opts?: LeiSearchOptions): Promise<LeiSearchResponse>;
  lous(): Promise<LeiLousResponse>;
}

export function createLeiNamespace(client: HttpClient): LeiNamespace {
  const lei = ((value: string) =>
    client.get<LeiResponse>('/v0/lei', { value })
  ) as LeiNamespace;

  lei.search = (query: string, opts?: LeiSearchOptions) =>
    client.get<LeiSearchResponse>('/v0/lei/search', {
      q: query,
      country: opts?.country,
      entityStatus: opts?.entityStatus,
      page: opts?.page?.toString(),
      limit: opts?.limit?.toString(),
    });

  lei.lous = () => client.get<LeiLousResponse>('/v0/lei/lous');

  return lei;
}
