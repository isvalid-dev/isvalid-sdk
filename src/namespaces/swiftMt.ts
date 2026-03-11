import type { HttpClient } from '../client.js';
import type { SwiftMtResponse, SwiftMtListItem } from '../types/swiftMt.js';

export interface SwiftMtNamespace {
  (value: string): Promise<SwiftMtResponse>;
  list(opts?: { category?: number }): Promise<SwiftMtListItem[]>;
}

export function createSwiftMtNamespace(client: HttpClient): SwiftMtNamespace {
  const swiftMt = ((value: string) =>
    client.get<SwiftMtResponse>('/v0/swift-mt', { value })
  ) as SwiftMtNamespace;

  swiftMt.list = (opts?: { category?: number }) =>
    client.get<SwiftMtListItem[]>('/v0/swift-mt/list', { category: opts?.category?.toString() });

  return swiftMt;
}
