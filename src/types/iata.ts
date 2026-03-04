export type IataFlightResponse =
  | { valid: false }
  | {
      valid: true;
      airlineCode: string;
      flightNumber: string;
      suffix: string | null;
    };

export type IataAirlineResponse =
  | { valid: false }
  | {
      valid: true;
      found: boolean;
      iataCode?: string;
      icaoCode?: string | null;
      name?: string;
      country?: string | null;
    };

export interface IataAirlineListItem {
  iataCode: string;
  icaoCode: string | null;
  name: string;
  country: string | null;
}

export type IataAirportResponse =
  | { valid: false }
  | {
      valid: true;
      found: boolean;
      iataCode?: string;
      name?: string;
      city?: string | null;
      country?: string | null;
    };
