import type { HttpClient } from '../client.js';
import type { LanguageResponse, LanguageListItem } from '../types/language.js';

export interface LanguageNamespace {
  (value: string): Promise<LanguageResponse>;
  list(): Promise<LanguageListItem[]>;
}

export function createLanguageNamespace(client: HttpClient): LanguageNamespace {
  const language = ((value: string) =>
    client.get<LanguageResponse>('/v0/language', { value })
  ) as LanguageNamespace;

  language.list = () => client.get<LanguageListItem[]>('/v0/language/list');

  return language;
}
