export type MapObject<T = unknown, Deeper = true> = Deeper extends true
  ? { [key: string]: MapObject | T }
  : { [key: string]: T };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Validator<T = any> = (
  value: T,
  context?: unknown
) => (string | null) | Promise<string | null>;

export type ValidationResult = {
  isValid: boolean;
  errors: MapObject<string | null>;
};

export type ValidationSchema = MapObject<Validator>;
