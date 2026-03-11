export type MimeTypeResponse =
  | { valid: false; type?: string; subtype?: string }
  | {
      valid: true;
      mime: string;
      type: string;
      subtype: string;
      extensions: string[];
      compressible: boolean | null;
      charset: string | null;
      source: string | null;
    };

export type MimeTypeExtResponse =
  | { valid: false; extension?: string }
  | {
      valid: true;
      extension: string;
      mimeTypes: Array<{
        mime: string;
        type: string;
        subtype: string;
        extensions: string[];
        compressible: boolean | null;
        charset: string | null;
        source: string | null;
      }>;
    };

export type MimeTypeListItem = {
  mime: string;
  type: string;
  subtype: string;
  extensions: string[];
};
