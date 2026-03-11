export type HttpStatusResponse =
  | { valid: false }
  | { valid: true; code: number; reasonPhrase: string; category: string };

export type HttpStatusListItem = {
  code: number;
  reasonPhrase: string;
  category: string;
};
