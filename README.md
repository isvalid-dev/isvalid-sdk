# @isvalid-dev/sdk

TypeScript SDK for the [isvalid.dev](https://isvalid.dev) validation API.

## Features

- **Zero dependencies** — native `fetch` only (Node 18+, browsers)
- **Full TypeScript types** for every endpoint response
- **ESM + CJS** dual export
- **Tiny** — ~1.5 KB minified + brotli
- **Automatic retry** with exponential backoff for 429/5xx
- **Custom error classes** for auth and rate limit errors

## Installation

```bash
npm install @isvalid-dev/sdk
```

## Quick Start

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
```

## Country-Specific Endpoints

```typescript
// Poland
await iv.pl.pesel('44051401358');
await iv.pl.regon('012345678', { lookup: true });
await iv.pl.krs('0000123456', { lookup: true });

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
iv.aba(value)              iv.iso6346(value)          iv.sscc(value)
iv.gln(value)              iv.qr(value)               iv.creditCard(number)
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
