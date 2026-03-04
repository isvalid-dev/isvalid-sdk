import type { HttpClient } from '../client.js';
import type { CnpjResponse, CpfResponse } from '../types/br.js';

export interface BrNamespace {
  cnpj(value: string): Promise<CnpjResponse>;
  cpf(value: string): Promise<CpfResponse>;
}

export function createBrNamespace(client: HttpClient): BrNamespace {
  return {
    cnpj: (value: string) => client.get<CnpjResponse>('/v0/br/cnpj', { value }),
    cpf: (value: string) => client.get<CpfResponse>('/v0/br/cpf', { value }),
  };
}
