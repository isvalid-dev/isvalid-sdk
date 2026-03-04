import { IsValidError, IsValidAuthError, IsValidRateLimitError } from './errors.js';

export interface RetryConfig {
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  retryOn?: number[];
}

export interface IsValidConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
  retry?: RetryConfig | false;
}

const DEFAULT_BASE_URL = 'https://api.isvalid.dev';
const DEFAULT_TIMEOUT = 10_000;
const DEFAULT_RETRY: Required<RetryConfig> = {
  maxRetries: 3,
  initialDelayMs: 500,
  maxDelayMs: 10_000,
  retryOn: [429, 500, 502, 503],
};

function resolveRetry(cfg: RetryConfig | false | undefined): Required<RetryConfig> | false {
  if (cfg === false) return false;
  if (!cfg) return DEFAULT_RETRY;
  return {
    maxRetries: cfg.maxRetries ?? DEFAULT_RETRY.maxRetries,
    initialDelayMs: cfg.initialDelayMs ?? DEFAULT_RETRY.initialDelayMs,
    maxDelayMs: cfg.maxDelayMs ?? DEFAULT_RETRY.maxDelayMs,
    retryOn: cfg.retryOn ?? DEFAULT_RETRY.retryOn,
  };
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function backoffDelay(attempt: number, initial: number, max: number): number {
  const base = initial * 2 ** attempt;
  const jitter = Math.random() * initial;
  return Math.min(base + jitter, max);
}

export class HttpClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly retry: Required<RetryConfig> | false;
  private readonly timeout: number;

  constructor(config: IsValidConfig) {
    this.baseUrl = (config.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, '');
    this.apiKey = config.apiKey;
    this.retry = resolveRetry(config.retry);
    this.timeout = config.timeout ?? DEFAULT_TIMEOUT;
  }

  async get<T>(path: string, params?: Record<string, string | undefined>): Promise<T> {
    const url = this.buildUrl(path, params);
    return this.request<T>(url, { method: 'GET' });
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const url = this.buildUrl(path);
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  private buildUrl(path: string, params?: Record<string, string | undefined>): string {
    const url = new URL(path, this.baseUrl);
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        if (v !== undefined) url.searchParams.set(k, v);
      }
    }
    return url.toString();
  }

  private async request<T>(url: string, init: RequestInit): Promise<T> {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.apiKey}`,
      Accept: 'application/json',
      ...(init.headers as Record<string, string> | undefined),
    };

    const maxAttempts = this.retry ? this.retry.maxRetries + 1 : 1;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const res = await fetch(url, {
        ...init,
        headers,
        signal: AbortSignal.timeout(this.timeout),
      });

      if (res.ok) {
        return (await res.json()) as T;
      }

      if (this.retry && attempt < this.retry.maxRetries && this.retry.retryOn.includes(res.status)) {
        const retryAfterHeader = res.headers.get('Retry-After');
        const retryMs = retryAfterHeader
          ? parseInt(retryAfterHeader, 10) * 1000
          : backoffDelay(attempt, this.retry.initialDelayMs, this.retry.maxDelayMs);
        await delay(retryMs);
        continue;
      }

      const body = await res.json().catch(() => ({ error: res.statusText })) as { error: string };

      if (res.status === 401) throw new IsValidAuthError(body);
      if (res.status === 429) {
        const ra = res.headers.get('Retry-After');
        throw new IsValidRateLimitError(body, ra ? parseInt(ra, 10) : null);
      }
      throw new IsValidError(res.status, body);
    }

    throw new IsValidError(0, { error: 'Max retries exceeded' });
  }
}
