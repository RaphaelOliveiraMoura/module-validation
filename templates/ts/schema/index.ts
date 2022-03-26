import { validateSchemaRecursive } from './validateSchemaRecursive';

import { CreateSchemaValidator } from '..';

export const createSchemaValidator: CreateSchemaValidator =
  schema => async (objectToValidate, customContext) => {
    const mutableErrors = {};
    const mutableIsValid = { valid: true };
    const context = customContext || objectToValidate;

    await validateSchemaRecursive(
      schema,
      objectToValidate,
      mutableErrors,
      mutableIsValid,
      { ...context }
    );

    return {
      errors: mutableErrors,
      isValid: mutableIsValid.valid
    };
  };
