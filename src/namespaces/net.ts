import type { HttpClient } from '../client.js';
import type { IpResponse, MacResponse } from '../types/net.js';

export interface NetNamespace {
  ip(value: string): Promise<IpResponse>;
  mac(value: string): Promise<MacResponse>;
}

export function createNetNamespace(client: HttpClient): NetNamespace {
  return {
    ip: (value: string) => client.get<IpResponse>('/v0/net/ip', { value }),
    mac: (value: string) => client.get<MacResponse>('/v0/net/mac', { value }),
  };
}
