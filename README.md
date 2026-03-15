# @isvalid-dev/sdk

TypeScript SDK for the [isvalid.dev](https://isvalid.dev) validation API.

## Features

- **Zero dependencies** — native `fetch` only (Node 18+, browsers)
- **Full TypeScript types** for every endpoint response
- **ESM + CJS** dual export
- **Tiny** — ~2 KB minified + brotli
- **Automatic retry** with exponential backoff for 429/5xx
- **Custom error classes** for auth and rate limit errors

## Installation

```bash
npm install @isvalid-dev/sdk
```

## Quick Start

Get your free API key at [isvalid.dev/getting-started](https://isvalid.dev/getting-started).

```typescript
import { createClient } from '@isvalid-dev/sdk';

const iv = createClient({ apiKey: 'your-api-key' });

// Simple validation
const email = await iv.email('user@example.com', { checkMx: true });
// => { valid: true, local: 'user', domain: 'example.com', mxValid: true }

const iban = await iv.iban('DE89370400440532013000');
// => { valid: true, countryCode: 'DE', bankName: 'Commerzbank', ... }

const vat = await iv.vat('DE123456789', { checkVies: true });
// => { valid: true, countryCode: 'DE', isEU: true, vies: { checked: true, valid: true, ... } }
```

## Namespaced Methods

Some endpoints support callable + property access pattern:

```typescript
// LEI
const lei = await iv.lei('5493001KJTIIGC8Y1R12');
const search = await iv.lei.search('Apple', { country: 'US', limit: 5 });
const lous = await iv.lei.lous();

// Country / Currency / Language
const country = await iv.country('PL');
const countries = await iv.country.list();

const currency = await iv.currency('USD');
const currencies = await iv.currency.list();

const language = await iv.language('en');
const languages = await iv.language.list();

// IATA
const flight = await iv.iata.flight('LH1234');
const airline = await iv.iata.airline('LH');
const airlines = await iv.iata.airline.list();
const airport = await iv.iata.airport('WAW');

// Timezone
const tz = await iv.timezone('Europe/Warsaw');
// => { valid: true, timezone: 'Europe/Warsaw', utcOffset: '+01:00', abbreviation: 'CET', isDST: false }
const timezones = await iv.timezone.list({ region: 'Europe' });

// MIME Type
const mime = await iv.mimeType('application/json');
// => { valid: true, mime: 'application/json', type: 'application', subtype: 'json', extensions: ['json'], ... }
const byExt = await iv.mimeType.ext('pdf');
const mimes = await iv.mimeType.list({ type: 'image' });

// HTTP Status
const status = await iv.httpStatus('404');
// => { valid: true, code: 404, reasonPhrase: 'Not Found', category: 'client-error' }
const statuses = await iv.httpStatus.list();

// SWIFT MT
const mt = await iv.swiftMt('MT103');
// => { valid: true, type: 'MT103', category: 1, group: 'Customer Payments & Cheques', description: 'Single Customer Credit Transfer' }
const mtList = await iv.swiftMt.list({ category: 1 });

// UN/LOCODE
const locode = await iv.locode('PLWAW');
// => { valid: true, locode: 'PLWAW', country: 'PL', name: 'Warszawa', found: true, ... }
const locodes = await iv.locode.list({ country: 'PL' });

// HS Code (Harmonized System)
const hs = await iv.hsCode('8471');
// => { valid: true, code: '8471', level: 'heading', description: '...', ... }
const hsList = await iv.hsCode.list({ chapter: '84', level: 'heading' });

// GS1 Prefix
const gs1 = await iv.gs1Prefix('590');
// => { valid: true, prefix: '590', country: 'Poland' }
const gs1List = await iv.gs1Prefix.list();

// Industry (NAICS / NACE)
const ind = await iv.industry('5112', { system: 'naics' });
// => { valid: true, system: 'NAICS', code: '5112', description: '...', ... }
const indList = await iv.industry.list({ system: 'naics', level: 'sector' });
```

## Country-Specific Endpoints

```typescript
// Poland
await iv.pl.pesel('44051401358');
await iv.pl.regon('012345678', { lookup: true });
await iv.pl.krs('0000123456', { lookup: true });
await iv.pl.ceidg('5252344078', { lookup: true });
await iv.pl.pkd('62.01.Z');

// Brazil
await iv.br.cnpj('11.222.333/0001-81');
await iv.br.cpf('123.456.789-09');

// Other
await iv.au.abn('51824753556');
await iv.es.nif('12345678Z');
await iv.in.gstin('27AAPFU0939F1ZV');
await iv.us.npi('1234567893');
await iv.gb.sortCode('12-34-56');
```

## Network & Financial

```typescript
// Network
await iv.net.ip('192.168.1.1');
await iv.net.mac('00:1B:44:11:3A:B7');
await iv.net.port('443');
// => { valid: true, port: 443, range: 'well-known', serviceName: 'HTTPS', ... }
const ports = await iv.net.port.list();

// Financial
await iv.isin('US0378331005');
await iv.dti('B1234567Z');
await iv.bic('DEUTDEFF');
await iv.cusip('037833100');
await iv.creditCard('4111111111111111');  // POST endpoint
```

## All Simple Endpoints

```typescript
iv.email(value, opts?)     iv.iban(value, opts?)      iv.isin(value)
iv.dti(value)              iv.vat(value, opts?)       iv.gps(value)
iv.phone(value, opts?)     iv.url(value)              iv.ean(value)
iv.isbn(value)             iv.issn(value)             iv.bic(value)
iv.cusip(value)            iv.cfi(value)              iv.mic(value)
iv.nuts(value)             iv.uuid(value, opts?)      iv.jwt(value)
iv.vin(value)              iv.imei(value)             iv.semver(value)
iv.color(value)            iv.boolean(value)          iv.date(value, opts?)
iv.btcAddress(value)       iv.postalCode(value, opts?)
iv.aba(value)              iv.containerCode(value)    iv.sscc(value)
iv.gln(value)              iv.qr(value)               iv.creditCard(number)
iv.cas(value)              iv.eori(value, opts?)      iv.orcid(value, opts?)
iv.doi(value, opts?)       iv.barcode(value, opts?)   iv.base64(value)
iv.ethAddress(value)       iv.cron(value)             iv.domain(value)
iv.regex(pattern, opts?)   iv.duns(value, opts?)       iv.timestamp(value)
```

## Configuration

```typescript
const iv = createClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.isvalid.dev',  // default
  timeout: 15000,                       // default: 10000 (10s)
  retry: {
    maxRetries: 5,                      // default: 3
    initialDelayMs: 1000,               // default: 500
    maxDelayMs: 30000,                  // default: 10000
    retryOn: [429, 500, 502, 503],      // default
  },
});

// Disable retry
const iv = createClient({ apiKey: '...', retry: false });
```

## Error Handling

```typescript
import { IsValidError, IsValidAuthError, IsValidRateLimitError } from '@isvalid-dev/sdk';

try {
  await iv.email('test@example.com');
} catch (err) {
  if (err instanceof IsValidRateLimitError) {
    console.log('Rate limited, retry after:', err.retryAfter, 'seconds');
  } else if (err instanceof IsValidAuthError) {
    console.log('Invalid API key');
  } else if (err instanceof IsValidError) {
    console.log('API error:', err.status, err.body.error);
  }
}
```

## Type Safety

All responses are discriminated unions based on `valid`:

```typescript
const result = await iv.iban('PL61109010140000071219812874');

if (result.valid) {
  // TypeScript knows all fields are available
  console.log(result.countryCode);  // 'PL'
  console.log(result.bankName);     // string | null
} else {
  // result is { valid: false }
}
```

## API Reference

Full endpoint documentation: [isvalid.dev/docs](https://isvalid.dev/docs)

## License

MIT
