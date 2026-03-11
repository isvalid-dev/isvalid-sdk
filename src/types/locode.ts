export type LocodeResponse =
  | { valid: false }
  | {
      valid: true;
      locode: string;
      country: string;
      location: string;
      name: string | null;
      nameAscii: string | null;
      subdivision: string | null;
      functions: string[];
      iata: string | null;
      coordinates: string | null;
      found: boolean;
    };

export type LocodeListItem = {
  locode: string;
  country: string;
  location: string;
  name: string;
  nameAscii: string;
  subdivision: string | null;
  functions: string[];
  iata: string | null;
  coordinates: string | null;
};
