import { ValidationResult, ValidationSchema } from '..';
import { validateSchemaRecursive } from './validateSchemaRecursive';

type SchemaValidatorDefaultParams = {
  context: unknown;
};

export function schemaValidator<T = SchemaValidatorDefaultParams>(
  validateSchema: ValidationSchema
) {
  return async (
    objectToValidate: unknown,
    customParams: T
  ): Promise<ValidationResult> => {
    const mutableErrors = {};
    const mutableIsValid = { valid: true };

    await validateSchemaRecursive(
      validateSchema,
      objectToValidate,
      mutableErrors,
      mutableIsValid,
      { ...customParams }
    );

    return {
      errors: mutableErrors,
      isValid: mutableIsValid.valid
    };
  };
}
