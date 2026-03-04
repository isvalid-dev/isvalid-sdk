import type { HttpClient } from '../client.js';
import type {
  IataFlightResponse, IataAirlineResponse, IataAirlineListItem, IataAirportResponse,
} from '../types/iata.js';

export interface IataAirlineNamespace {
  (value: string): Promise<IataAirlineResponse>;
  list(): Promise<IataAirlineListItem[]>;
}

export interface IataNamespace {
  flight(value: string): Promise<IataFlightResponse>;
  airline: IataAirlineNamespace;
  airport(value: string): Promise<IataAirportResponse>;
}

export function createIataNamespace(client: HttpClient): IataNamespace {
  const airline = ((value: string) =>
    client.get<IataAirlineResponse>('/v0/iata/airline', { value })
  ) as IataAirlineNamespace;

  airline.list = () => client.get<IataAirlineListItem[]>('/v0/iata/airline/list');

  return {
    flight: (value: string) =>
      client.get<IataFlightResponse>('/v0/iata/flight', { value }),
    airline,
    airport: (value: string) =>
      client.get<IataAirportResponse>('/v0/iata/airport', { value }),
  };
}
