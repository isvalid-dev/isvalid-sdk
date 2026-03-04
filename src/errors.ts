export class IsValidError extends Error {
  readonly status: number;
  readonly body: { error: string };

  constructor(status: number, body: { error: string }) {
    super(body.error);
    this.name = 'IsValidError';
    this.status = status;
    this.body = body;
  }
}

export class IsValidAuthError extends IsValidError {
  constructor(body: { error: string }) {
    super(401, body);
    this.name = 'IsValidAuthError';
  }
}

export class IsValidRateLimitError extends IsValidError {
  readonly retryAfter: number | null;

  constructor(body: { error: string }, retryAfter: number | null = null) {
    super(429, body);
    this.name = 'IsValidRateLimitError';
    this.retryAfter = retryAfter;
  }
}
