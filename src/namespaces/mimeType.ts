import type { HttpClient } from '../client.js';
import type { MimeTypeResponse, MimeTypeExtResponse, MimeTypeListItem } from '../types/mimeType.js';

export interface MimeTypeNamespace {
  (value: string): Promise<MimeTypeResponse>;
  ext(value: string): Promise<MimeTypeExtResponse>;
  list(opts?: { type?: string }): Promise<MimeTypeListItem[]>;
}

export function createMimeTypeNamespace(client: HttpClient): MimeTypeNamespace {
  const mimeType = ((value: string) =>
    client.get<MimeTypeResponse>('/v0/mime-type', { value })
  ) as MimeTypeNamespace;

  mimeType.ext = (value: string) =>
    client.get<MimeTypeExtResponse>('/v0/mime-type/ext', { value });

  mimeType.list = (opts?: { type?: string }) =>
    client.get<MimeTypeListItem[]>('/v0/mime-type/list', { type: opts?.type });

  return mimeType;
}
