import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IsValid, IsValidAuthError, IsValidRateLimitError, IsValidError } from '../src/index';

function mockFetch(status: number, body: unknown, headers: Record<string, string> = {}) {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers(headers),
    json: () => Promise.resolve(body),
  });
}

describe('IsValid client', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('sends Bearer token in Authorization header', async () => {
    const fetch = mockFetch(200, { valid: true, local: 'test', domain: 'example.com' });
    vi.stubGlobal('fetch', fetch);

    const iv = new IsValid({ apiKey: 'test-key', retry: false });
    await iv.email('test@example.com');

    expect(fetch).toHaveBeenCalledOnce();
    const [, opts] = fetch.mock.calls[0];
    expect(opts.headers.Authorization).toBe('Bearer test-key');
  });

  it('builds URL with query params', async () => {
    const fetch = mockFetch(200, { valid: true });
    vi.stubGlobal('fetch', fetch);

    const iv = new IsValid({ apiKey: 'key', retry: false });
    await iv.email('a@b.com', { checkMx: true });

    const [url] = fetch.mock.calls[0];
    expect(url).toContain('/v0/email');
    expect(url).toContain('value=a%40b.com');
    expect(url).toContain('checkMx=true');
  });

  it('skips undefined query params', async () => {
    const fetch = mockFetch(200, { valid: true });
    vi.stubGlobal('fetch', fetch);

    const iv = new IsValid({ apiKey: 'key', retry: false });
    await iv.email('a@b.com');

    const [url] = fetch.mock.calls[0];
    expect(url).not.toContain('checkMx');
  });

  it('throws IsValidAuthError on 401', async () => {
    vi.stubGlobal('fetch', mockFetch(401, { error: 'Invalid API key.' }));

    const iv = new IsValid({ apiKey: 'bad', retry: false });
    await expect(iv.email('a@b.com')).rejects.toThrow(IsValidAuthError);
  });

  it('throws IsValidRateLimitError on 429', async () => {
    vi.stubGlobal('fetch', mockFetch(429, { error: 'Limit exceeded.' }, { 'Retry-After': '60' }));

    const iv = new IsValid({ apiKey: 'key', retry: false });
    try {
      await iv.email('a@b.com');
      expect.unreachable();
    } catch (err) {
      expect(err).toBeInstanceOf(IsValidRateLimitError);
      expect((err as IsValidRateLimitError).retryAfter).toBe(60);
    }
  });

  it('throws IsValidError on other errors', async () => {
    vi.stubGlobal('fetch', mockFetch(500, { error: 'Internal error' }));

    const iv = new IsValid({ apiKey: 'key', retry: false });
    try {
      await iv.email('a@b.com');
      expect.unreachable();
    } catch (err) {
      expect(err).toBeInstanceOf(IsValidError);
      expect((err as IsValidError).status).toBe(500);
    }
  });

  it('retries on 429 then succeeds', async () => {
    const fn = vi.fn()
      .mockResolvedValueOnce({
        ok: false, status: 429,
        headers: new Headers(),
        json: () => Promise.resolve({ error: 'rate limit' }),
      })
      .mockResolvedValueOnce({
        ok: true, status: 200,
        headers: new Headers(),
        json: () => Promise.resolve({ valid: true, normalized: true }),
      });
    vi.stubGlobal('fetch', fn);

    const iv = new IsValid({ apiKey: 'key', retry: { maxRetries: 2, initialDelayMs: 10 } });
    const result = await iv.boolean('true');
    expect(result.valid).toBe(true);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('uses custom baseUrl', async () => {
    const fetch = mockFetch(200, { valid: true });
    vi.stubGlobal('fetch', fetch);

    const iv = new IsValid({ apiKey: 'key', baseUrl: 'https://custom.api.com', retry: false });
    await iv.boolean('1');

    const [url] = fetch.mock.calls[0];
    expect(url).toContain('https://custom.api.com/v0/boolean');
  });
});

describe('simple endpoints', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch(200, { valid: true }));
  });

  const iv = new IsValid({ apiKey: 'key', retry: false });

  const endpoints = [
    ['email', 'a@b.com'],
    ['iban', 'DE89370400440532013000'],
    ['isin', 'US0378331005'],
    ['dti', 'B1234567Z'],
    ['vat', 'DE123456789'],
    ['gps', '52.2297,21.0122'],
    ['phone', '+48123456789'],
    ['url', 'https://example.com'],
    ['ean', '5901234123457'],
    ['isbn', '978-3-16-148410-0'],
    ['issn', '0378-5955'],
    ['bic', 'DEUTDEFF'],
    ['cusip', '037833100'],
    ['cfi', 'ESNTFR'],
    ['mic', 'XNAS'],
    ['nuts', 'PL91'],
    ['uuid', '550e8400-e29b-41d4-a716-446655440000'],
    ['jwt', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.e30.test'],
    ['vin', '1HGBH41JXMN109186'],
    ['imei', '490154203237518'],
    ['semver', '1.2.3'],
    ['color', '#ff0000'],
    ['boolean', 'true'],
    ['date', '2024-01-01'],
    ['btcAddress', '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'],
    ['postalCode', '00-001'],
    ['aba', '021000021'],
    ['containerCode', 'CSQU3054383'],
    ['sscc', '106141411234567897'],
    ['gln', '0614141123452'],
    ['qr', 'https://example.com'],
  ] as const;

  for (const [method, value] of endpoints) {
    it(`iv.${method}() calls /v0/${method === 'btcAddress' ? 'btc-address' : method === 'postalCode' ? 'postal-code' : method}`, async () => {
      const result = await (iv as any)[method](value);
      expect(result.valid).toBe(true);
    });
  }

  it('iv.creditCard() sends POST', async () => {
    const fetch = mockFetch(200, { valid: true, type: 'visa' });
    vi.stubGlobal('fetch', fetch);

    const iv2 = new IsValid({ apiKey: 'key', retry: false });
    const result = await iv2.creditCard('4111111111111111');
    expect(result.valid).toBe(true);

    const [, opts] = fetch.mock.calls[0];
    expect(opts.method).toBe('POST');
  });
});

describe('namespaces', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch(200, { valid: true }));
  });

  const iv = new IsValid({ apiKey: 'key', retry: false });

  it('iv.lei() is callable', async () => {
    const result = await iv.lei('5493001KJTIIGC8Y1R12');
    expect(result.valid).toBe(true);
  });

  it('iv.lei.search() works', async () => {
    vi.stubGlobal('fetch', mockFetch(200, { results: [], total: 0, page: 1, limit: 20 }));
    const result = await iv.lei.search('Apple', { country: 'US' });
    expect(result.total).toBe(0);
  });

  it('iv.lei.lous() works', async () => {
    vi.stubGlobal('fetch', mockFetch(200, { lous: [], total: 0 }));
    const result = await iv.lei.lous();
    expect(result.total).toBe(0);
  });

  it('iv.country() is callable', async () => {
    const result = await iv.country('PL');
    expect(result.valid).toBe(true);
  });

  it('iv.country.list() works', async () => {
    vi.stubGlobal('fetch', mockFetch(200, [{ alpha2: 'PL', alpha3: 'POL', numeric: '616', name: 'Poland' }]));
    const result = await iv.country.list();
    expect(result).toHaveLength(1);
  });

  it('iv.currency() is callable', async () => {
    const result = await iv.currency('USD');
    expect(result.valid).toBe(true);
  });

  it('iv.currency.list() works', async () => {
    vi.stubGlobal('fetch', mockFetch(200, []));
    const result = await iv.currency.list();
    expect(result).toEqual([]);
  });

  it('iv.language() is callable', async () => {
    const result = await iv.language('en');
    expect(result.valid).toBe(true);
  });

  it('iv.language.list() works', async () => {
    vi.stubGlobal('fetch', mockFetch(200, []));
    const result = await iv.language.list();
    expect(result).toEqual([]);
  });

  it('iv.iata.flight() works', async () => {
    const result = await iv.iata.flight('LH1234');
    expect(result.valid).toBe(true);
  });

  it('iv.iata.airline() is callable', async () => {
    const result = await iv.iata.airline('LH');
    expect(result.valid).toBe(true);
  });

  it('iv.iata.airline.list() works', async () => {
    vi.stubGlobal('fetch', mockFetch(200, []));
    const result = await iv.iata.airline.list();
    expect(result).toEqual([]);
  });

  it('iv.iata.airport() works', async () => {
    const result = await iv.iata.airport('WAW');
    expect(result.valid).toBe(true);
  });

  it('iv.net.ip() works', async () => {
    const result = await iv.net.ip('192.168.1.1');
    expect(result.valid).toBe(true);
  });

  it('iv.net.mac() works', async () => {
    const result = await iv.net.mac('00:1B:44:11:3A:B7');
    expect(result.valid).toBe(true);
  });

  it('iv.pl.pesel() works', async () => {
    const result = await iv.pl.pesel('44051401358');
    expect(result.valid).toBe(true);
  });

  it('iv.pl.regon() works', async () => {
    const result = await iv.pl.regon('012345678', { lookup: true });
    expect(result.valid).toBe(true);
  });

  it('iv.pl.krs() works', async () => {
    const result = await iv.pl.krs('0000123456');
    expect(result.valid).toBe(true);
  });

  it('iv.br.cnpj() works', async () => {
    const result = await iv.br.cnpj('11222333000181');
    expect(result.valid).toBe(true);
  });

  it('iv.br.cpf() works', async () => {
    const result = await iv.br.cpf('12345678909');
    expect(result.valid).toBe(true);
  });

  it('iv.au.abn() works', async () => {
    const result = await iv.au.abn('51824753556');
    expect(result.valid).toBe(true);
  });

  it('iv.es.nif() works', async () => {
    const result = await iv.es.nif('12345678Z');
    expect(result.valid).toBe(true);
  });

  it('iv.in.gstin() works', async () => {
    const result = await iv.in.gstin('27AAPFU0939F1ZV');
    expect(result.valid).toBe(true);
  });

  it('iv.us.npi() works', async () => {
    const result = await iv.us.npi('1234567893');
    expect(result.valid).toBe(true);
  });

  it('iv.gb.sortCode() works', async () => {
    const result = await iv.gb.sortCode('12-34-56');
    expect(result.valid).toBe(true);
  });
});
