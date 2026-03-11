import type { HttpClient } from '../client.js';
import type { TimezoneResponse, TimezoneListItem } from '../types/timezone.js';

export interface TimezoneNamespace {
  (value: string): Promise<TimezoneResponse>;
  list(opts?: { region?: string }): Promise<TimezoneListItem[]>;
}

export function createTimezoneNamespace(client: HttpClient): TimezoneNamespace {
  const timezone = ((value: string) =>
    client.get<TimezoneResponse>('/v0/timezone', { value })
  ) as TimezoneNamespace;

  timezone.list = (opts?: { region?: string }) =>
    client.get<TimezoneListItem[]>('/v0/timezone/list', { region: opts?.region });

  return timezone;
}
