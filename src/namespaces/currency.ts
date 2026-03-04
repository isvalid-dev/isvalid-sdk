import type { HttpClient } from '../client.js';
import type { CurrencyResponse, CurrencyListItem } from '../types/currency.js';

export interface CurrencyNamespace {
  (value: string): Promise<CurrencyResponse>;
  list(): Promise<CurrencyListItem[]>;
}

export function createCurrencyNamespace(client: HttpClient): CurrencyNamespace {
  const currency = ((value: string) =>
    client.get<CurrencyResponse>('/v0/currency', { value })
  ) as CurrencyNamespace;

  currency.list = () => client.get<CurrencyListItem[]>('/v0/currency/list');

  return currency;
}
