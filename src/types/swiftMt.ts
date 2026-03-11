export type SwiftMtResponse =
  | { valid: false }
  | { valid: true; type: string; category: number; group: string; description: string };

export type SwiftMtListItem = {
  type: string;
  category: number;
  group: string;
  description: string;
};
