import { HttpClient } from './client.js';
import type { IsValidConfig } from './client.js';
import { createLeiNamespace } from './namespaces/lei.js';
import type { LeiNamespace } from './namespaces/lei.js';
import { createCountryNamespace } from './namespaces/country.js';
import type { CountryNamespace } from './namespaces/country.js';
import { createCurrencyNamespace } from './namespaces/currency.js';
import type { CurrencyNamespace } from './namespaces/currency.js';
import { createLanguageNamespace } from './namespaces/language.js';
import type { LanguageNamespace } from './namespaces/language.js';
import { createIataNamespace } from './namespaces/iata.js';
import type { IataNamespace } from './namespaces/iata.js';
import { createNetNamespace } from './namespaces/net.js';
import type { NetNamespace } from './namespaces/net.js';
import { createPlNamespace } from './namespaces/pl.js';
import type { PlNamespace } from './namespaces/pl.js';
import { createBrNamespace } from './namespaces/br.js';
import type { BrNamespace } from './namespaces/br.js';
import { createAuNamespace } from './namespaces/au.js';
import type { AuNamespace } from './namespaces/au.js';
import { createEsNamespace } from './namespaces/es.js';
import type { EsNamespace } from './namespaces/es.js';
import { createInNamespace } from './namespaces/in.js';
import type { InNamespace } from './namespaces/in.js';
import { createUsNamespace } from './namespaces/us.js';
import type { UsNamespace } from './namespaces/us.js';
import { createGbNamespace } from './namespaces/gb.js';
import type { GbNamespace } from './namespaces/gb.js';
import { createHsCodeNamespace } from './namespaces/hsCode.js';
import type { HsCodeNamespace } from './namespaces/hsCode.js';
import { createGs1PrefixNamespace } from './namespaces/gs1Prefix.js';
import type { Gs1PrefixNamespace } from './namespaces/gs1Prefix.js';
import { createIndustryNamespace } from './namespaces/industry.js';
import type { IndustryNamespace } from './namespaces/industry.js';
import { createTimezoneNamespace } from './namespaces/timezone.js';
import type { TimezoneNamespace } from './namespaces/timezone.js';
import { createMimeTypeNamespace } from './namespaces/mimeType.js';
import type { MimeTypeNamespace } from './namespaces/mimeType.js';
import { createHttpStatusNamespace } from './namespaces/httpStatus.js';
import type { HttpStatusNamespace } from './namespaces/httpStatus.js';
import { createSwiftMtNamespace } from './namespaces/swiftMt.js';
import type { SwiftMtNamespace } from './namespaces/swiftMt.js';
import { createLocodeNamespace } from './namespaces/locode.js';
import type { LocodeNamespace } from './namespaces/locode.js';
import type {
  EmailResponse, IbanResponse, IsinResponse, DtiResponse, VatResponse,
  GpsResponse, PhoneResponse, UrlResponse, EanResponse, IsbnResponse,
  IssnResponse, BicResponse, CusipResponse, CfiResponse, MicResponse,
  NutsResponse, UuidResponse, JwtResponse, VinResponse, ImeiResponse,
  SemverResponse, ColorResponse, BooleanResponse, DateResponse,
  BtcAddressResponse, PostalCodeResponse, AbaResponse, ContainerCodeResponse,
  SsccResponse, GlnResponse, QrResponse, CreditCardResponse,
  CasResponse, EoriResponse, OrcidResponse, DoiResponse, BarcodeResponse,
  Base64Response, EthAddressResponse, CronResponse, DomainResponse, RegexResponse,
  DunsResponse, TimestampResponse,
} from './types/simple.js';

export class IsValid {
  private readonly client: HttpClient;

  readonly lei: LeiNamespace;
  readonly country: CountryNamespace;
  readonly currency: CurrencyNamespace;
  readonly language: LanguageNamespace;
  readonly iata: IataNamespace;
  readonly net: NetNamespace;
  readonly pl: PlNamespace;
  readonly br: BrNamespace;
  readonly au: AuNamespace;
  readonly es: EsNamespace;
  readonly in: InNamespace;
  readonly us: UsNamespace;
  readonly gb: GbNamespace;
  readonly hsCode: HsCodeNamespace;
  readonly gs1Prefix: Gs1PrefixNamespace;
  readonly industry: IndustryNamespace;
  readonly timezone: TimezoneNamespace;
  readonly mimeType: MimeTypeNamespace;
  readonly httpStatus: HttpStatusNamespace;
  readonly swiftMt: SwiftMtNamespace;
  readonly locode: LocodeNamespace;

  constructor(config: IsValidConfig) {
    this.client = new HttpClient(config);

    this.lei = createLeiNamespace(this.client);
    this.country = createCountryNamespace(this.client);
    this.currency = createCurrencyNamespace(this.client);
    this.language = createLanguageNamespace(this.client);
    this.iata = createIataNamespace(this.client);
    this.net = createNetNamespace(this.client);
    this.pl = createPlNamespace(this.client);
    this.br = createBrNamespace(this.client);
    this.au = createAuNamespace(this.client);
    this.es = createEsNamespace(this.client);
    this.in = createInNamespace(this.client);
    this.us = createUsNamespace(this.client);
    this.gb = createGbNamespace(this.client);
    this.hsCode = createHsCodeNamespace(this.client);
    this.gs1Prefix = createGs1PrefixNamespace(this.client);
    this.industry = createIndustryNamespace(this.client);
    this.timezone = createTimezoneNamespace(this.client);
    this.mimeType = createMimeTypeNamespace(this.client);
    this.httpStatus = createHttpStatusNamespace(this.client);
    this.swiftMt = createSwiftMtNamespace(this.client);
    this.locode = createLocodeNamespace(this.client);
  }

  // --- Simple endpoints ---

  email(value: string, opts?: { checkMx?: boolean }): Promise<EmailResponse> {
    return this.client.get('/v0/email', { value, checkMx: opts?.checkMx?.toString() });
  }

  iban(value: string, opts?: { countryCode?: string }): Promise<IbanResponse> {
    return this.client.get('/v0/iban', { value, countryCode: opts?.countryCode });
  }

  isin(value: string): Promise<IsinResponse> {
    return this.client.get('/v0/isin', { value });
  }

  dti(value: string): Promise<DtiResponse> {
    return this.client.get('/v0/dti', { value });
  }

  vat(value: string, opts?: { countryCode?: string; checkVies?: boolean }): Promise<VatResponse> {
    return this.client.get('/v0/vat', {
      value,
      countryCode: opts?.countryCode,
      checkVies: opts?.checkVies?.toString(),
    });
  }

  gps(value: string): Promise<GpsResponse> {
    return this.client.get('/v0/gps', { value });
  }

  phone(value: string, opts?: { countryCode?: string }): Promise<PhoneResponse> {
    return this.client.get('/v0/phone', { value, countryCode: opts?.countryCode });
  }

  url(value: string): Promise<UrlResponse> {
    return this.client.get('/v0/url', { value });
  }

  ean(value: string): Promise<EanResponse> {
    return this.client.get('/v0/ean', { value });
  }

  isbn(value: string): Promise<IsbnResponse> {
    return this.client.get('/v0/isbn', { value });
  }

  issn(value: string): Promise<IssnResponse> {
    return this.client.get('/v0/issn', { value });
  }

  bic(value: string): Promise<BicResponse> {
    return this.client.get('/v0/bic', { value });
  }

  cusip(value: string): Promise<CusipResponse> {
    return this.client.get('/v0/cusip', { value });
  }

  cfi(value: string): Promise<CfiResponse> {
    return this.client.get('/v0/cfi', { value });
  }

  mic(value: string): Promise<MicResponse> {
    return this.client.get('/v0/mic', { value });
  }

  nuts(value: string): Promise<NutsResponse> {
    return this.client.get('/v0/nuts', { value });
  }

  uuid(value: string, opts?: { version?: number }): Promise<UuidResponse> {
    return this.client.get('/v0/uuid', { value, version: opts?.version?.toString() });
  }

  jwt(value: string): Promise<JwtResponse> {
    return this.client.get('/v0/jwt', { value });
  }

  vin(value: string): Promise<VinResponse> {
    return this.client.get('/v0/vin', { value });
  }

  imei(value: string): Promise<ImeiResponse> {
    return this.client.get('/v0/imei', { value });
  }

  semver(value: string): Promise<SemverResponse> {
    return this.client.get('/v0/semver', { value });
  }

  color(value: string): Promise<ColorResponse> {
    return this.client.get('/v0/color', { value });
  }

  boolean(value: string): Promise<BooleanResponse> {
    return this.client.get('/v0/boolean', { value });
  }

  date(value: string, opts?: { format?: string }): Promise<DateResponse> {
    return this.client.get('/v0/date', { value, format: opts?.format });
  }

  btcAddress(value: string): Promise<BtcAddressResponse> {
    return this.client.get('/v0/btc-address', { value });
  }

  postalCode(value: string, opts?: { countryCode?: string }): Promise<PostalCodeResponse> {
    return this.client.get('/v0/postal-code', { value, countryCode: opts?.countryCode });
  }

  aba(value: string): Promise<AbaResponse> {
    return this.client.get('/v0/aba', { value });
  }

  containerCode(value: string): Promise<ContainerCodeResponse> {
    return this.client.get('/v0/container-code', { value });
  }

  sscc(value: string): Promise<SsccResponse> {
    return this.client.get('/v0/sscc', { value });
  }

  gln(value: string): Promise<GlnResponse> {
    return this.client.get('/v0/gln', { value });
  }

  qr(value: string): Promise<QrResponse> {
    return this.client.get('/v0/qr', { value });
  }

  creditCard(number: string): Promise<CreditCardResponse> {
    return this.client.post('/v0/credit-card', { number });
  }

  cas(value: string): Promise<CasResponse> {
    return this.client.get('/v0/cas', { value });
  }

  eori(value: string, opts?: { check?: boolean }): Promise<EoriResponse> {
    return this.client.get('/v0/eori', { value, check: opts?.check?.toString() });
  }

  orcid(value: string, opts?: { lookup?: boolean }): Promise<OrcidResponse> {
    return this.client.get('/v0/orcid', { value, lookup: opts?.lookup?.toString() });
  }

  doi(value: string, opts?: { lookup?: boolean }): Promise<DoiResponse> {
    return this.client.get('/v0/doi', { value, lookup: opts?.lookup?.toString() });
  }

  barcode(value: string, opts?: { type?: string }): Promise<BarcodeResponse> {
    return this.client.get('/v0/barcode', { value, type: opts?.type });
  }

  base64(value: string): Promise<Base64Response> {
    return this.client.get('/v0/base64', { value });
  }

  ethAddress(value: string): Promise<EthAddressResponse> {
    return this.client.get('/v0/eth-address', { value });
  }

  cron(value: string): Promise<CronResponse> {
    return this.client.get('/v0/cron', { value });
  }

  domain(value: string): Promise<DomainResponse> {
    return this.client.get('/v0/domain', { value });
  }

  regex(pattern: string, opts?: { flags?: string }): Promise<RegexResponse> {
    return this.client.post('/v0/regex', { pattern, flags: opts?.flags });
  }

  duns(value: string, opts?: { lookup?: boolean }): Promise<DunsResponse> {
    return this.client.get('/v0/duns', { value, lookup: opts?.lookup?.toString() });
  }

  timestamp(value: string): Promise<TimestampResponse> {
    return this.client.get('/v0/timestamp', { value });
  }
}

export function createClient(config: IsValidConfig): IsValid {
  return new IsValid(config);
}

export { IsValidError, IsValidAuthError, IsValidRateLimitError } from './errors.js';
export type { IsValidConfig, RetryConfig } from './client.js';
export * from './types/index.js';

export type { LeiNamespace } from './namespaces/lei.js';
export type { CountryNamespace } from './namespaces/country.js';
export type { CurrencyNamespace } from './namespaces/currency.js';
export type { LanguageNamespace } from './namespaces/language.js';
export type { IataNamespace, IataAirlineNamespace } from './namespaces/iata.js';
export type { NetNamespace } from './namespaces/net.js';
export type { PlNamespace } from './namespaces/pl.js';
export type { BrNamespace } from './namespaces/br.js';
export type { AuNamespace } from './namespaces/au.js';
export type { EsNamespace } from './namespaces/es.js';
export type { InNamespace } from './namespaces/in.js';
export type { UsNamespace } from './namespaces/us.js';
export type { GbNamespace } from './namespaces/gb.js';
export type { HsCodeNamespace } from './namespaces/hsCode.js';
export type { Gs1PrefixNamespace } from './namespaces/gs1Prefix.js';
export type { IndustryNamespace } from './namespaces/industry.js';
export type { TimezoneNamespace } from './namespaces/timezone.js';
export type { MimeTypeNamespace } from './namespaces/mimeType.js';
export type { HttpStatusNamespace } from './namespaces/httpStatus.js';
export type { SwiftMtNamespace } from './namespaces/swiftMt.js';
export type { LocodeNamespace } from './namespaces/locode.js';
export type { NetPortNamespace } from './namespaces/net.js';
