import type { HttpClient } from '../client.js';
import type { HttpStatusResponse, HttpStatusListItem } from '../types/httpStatus.js';

export interface HttpStatusNamespace {
  (value: string): Promise<HttpStatusResponse>;
  list(): Promise<HttpStatusListItem[]>;
}

export function createHttpStatusNamespace(client: HttpClient): HttpStatusNamespace {
  const httpStatus = ((value: string) =>
    client.get<HttpStatusResponse>('/v0/http-status', { value })
  ) as HttpStatusNamespace;

  httpStatus.list = () =>
    client.get<HttpStatusListItem[]>('/v0/http-status/list');

  return httpStatus;
}
