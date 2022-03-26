// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnknownValue = any;

type MapObject<T = unknown, Deeper = true> = Deeper extends true
  ? { [key: string]: MapObject | T }
  : { [key: string]: T };

export type Validator<Value = UnknownValue, Context = UnknownValue> = (
  value: Value,
  context?: Context
) => (string | null) | Promise<string | null>;

export type ValidationSchema<Context = UnknownValue> = MapObject<
  Validator<UnknownValue, Context>
>;

export type ValidationSchemaResult = {
  isValid: boolean;
  errors: MapObject<string | null>;
};

export type CreateSchemaValidator = <CustomContext = UnknownValue>(
  schema: ValidationSchema
) => (
  objectToValidate: UnknownValue,
  context?: CustomContext
) => Promise<ValidationSchemaResult>;
