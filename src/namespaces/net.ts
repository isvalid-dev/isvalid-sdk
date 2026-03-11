import type { HttpClient } from '../client.js';
import type { IpResponse, MacResponse, NetPortResponse, NetPortListItem } from '../types/net.js';

export interface NetPortNamespace {
  (value: string): Promise<NetPortResponse>;
  list(): Promise<NetPortListItem[]>;
}

export interface NetNamespace {
  ip(value: string): Promise<IpResponse>;
  mac(value: string): Promise<MacResponse>;
  port: NetPortNamespace;
}

export function createNetNamespace(client: HttpClient): NetNamespace {
  const port = ((value: string) =>
    client.get<NetPortResponse>('/v0/net/port', { value })
  ) as NetPortNamespace;

  port.list = () => client.get<NetPortListItem[]>('/v0/net/port/list');

  return {
    ip: (value: string) => client.get<IpResponse>('/v0/net/ip', { value }),
    mac: (value: string) => client.get<MacResponse>('/v0/net/mac', { value }),
    port,
  };
}
