import type { HttpClient } from '../client.js';
import type { IndustryResponse, IndustryListResponse } from '../types/industry.js';

export interface IndustryNamespace {
  (value: string, opts?: { system?: string }): Promise<IndustryResponse>;
  list(opts: { system: string; level?: string; parent?: string }): Promise<IndustryListResponse>;
}

export function createIndustryNamespace(client: HttpClient): IndustryNamespace {
  const industry = ((value: string, opts?: { system?: string }) =>
    client.get<IndustryResponse>('/v0/industry', {
      value,
      system: opts?.system,
    })
  ) as IndustryNamespace;

  industry.list = (opts: { system: string; level?: string; parent?: string }) =>
    client.get<IndustryListResponse>('/v0/industry/list', {
      system: opts.system,
      level: opts?.level,
      parent: opts?.parent,
    });

  return industry;
}
