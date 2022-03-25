import { ValidationSchema, Validator } from '..';

export async function validateSchemaRecursive(
  validateSchema: ValidationSchema,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  objectToValidate: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutableErrors: any,
  mutableIsValid: { valid: boolean },
  customParams: unknown
) {
  const validateEntries = Object.entries(validateSchema);

  for (const [key, value] of validateEntries) {
    const isValidateFunction = typeof value === 'function';

    if (isValidateFunction) {
      const validateFunction = value as Validator;

      const validatorError = await validateFunction(
        objectToValidate[key],
        customParams
      );

      if (validatorError) {
        Object.assign(mutableIsValid, { valid: false });
      }

      Object.assign(mutableErrors, { [key]: validatorError });

      continue;
    }

    if (!mutableErrors[key]) Object.assign(mutableErrors, { [key]: {} });
    await validateSchemaRecursive(
      value as ValidationSchema,
      objectToValidate[key] || {},
      mutableErrors[key],
      mutableIsValid,
      customParams
    );
  }
}
