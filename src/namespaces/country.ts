import type { HttpClient } from '../client.js';
import type { CountryResponse, CountryListItem } from '../types/country.js';

export interface CountryNamespace {
  (value: string): Promise<CountryResponse>;
  list(): Promise<CountryListItem[]>;
}

export function createCountryNamespace(client: HttpClient): CountryNamespace {
  const country = ((value: string) =>
    client.get<CountryResponse>('/v0/country', { value })
  ) as CountryNamespace;

  country.list = () => client.get<CountryListItem[]>('/v0/country/list');

  return country;
}
