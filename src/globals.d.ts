// Minimal global types for fetch API — available in Node 18+ and browsers.
// We don't include full DOM lib to keep the SDK compatible with all runtimes.

declare function fetch(input: string, init?: RequestInit): Promise<Response>;
declare function setTimeout(callback: () => void, ms: number): unknown;

declare class AbortSignal {
  static timeout(ms: number): AbortSignal;
}

interface RequestInit {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  signal?: AbortSignal;
}

interface Headers {
  get(name: string): string | null;
}

interface Response {
  ok: boolean;
  status: number;
  statusText: string;
  headers: Headers;
  json(): Promise<unknown>;
}

declare class URL {
  constructor(path: string, base: string);
  searchParams: URLSearchParams;
  toString(): string;
}

declare class URLSearchParams {
  set(name: string, value: string): void;
}
