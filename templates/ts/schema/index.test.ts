import { createSchemaValidator } from '.';

import { composite, emailValidator, requiredValidator } from '..';

describe('ValidationSchema', () => {
  it('should return errors map to nested objects', async () => {
    const schema = {
      id: requiredValidator,
      profile: { name: requiredValidator, age: requiredValidator }
    };
    const schemaValidator = createSchemaValidator(schema);

    const objectToValidate = {};

    expect(await schemaValidator(objectToValidate)).toStrictEqual({
      isValid: false,
      errors: {
        id: 'Campo obrigatório',
        profile: { name: 'Campo obrigatório', age: 'Campo obrigatório' }
      }
    });
  });

  it('should validate schema with composition of validators', async () => {
    const schema = { email: composite([requiredValidator, emailValidator]) };
    const schemaValidator = createSchemaValidator(schema);

    expect(await schemaValidator({})).toStrictEqual({
      isValid: false,
      errors: { email: 'Campo obrigatório' }
    });

    expect(await schemaValidator({ email: 'invalid-email' })).toStrictEqual({
      isValid: false,
      errors: { email: 'Email inválido' }
    });
  });

  it('should call validator passing object to validate as default context', async () => {
    const validatorSpy = jest.fn(() => null);

    const schema = { name: validatorSpy };
    const schemaValidator = createSchemaValidator(schema);

    const objectToValidate = { name: 'some-data' };

    expect(await schemaValidator(objectToValidate)).toStrictEqual({
      isValid: true,
      errors: { name: null }
    });

    expect(validatorSpy).toHaveBeenCalledWith(
      objectToValidate.name,
      objectToValidate
    );
  });

  it('should be able to pass a custom context', async () => {
    const validatorSpy = jest.fn(() => null);

    type CustomContextType = { custom: string };

    const schema = { name: validatorSpy };
    const schemaValidator = createSchemaValidator<CustomContextType>(schema);

    const objectToValidate = { name: 'some-data' };
    const customContext = { custom: 'params' };

    expect(
      await schemaValidator(objectToValidate, customContext)
    ).toStrictEqual({
      isValid: true,
      errors: { name: null }
    });

    expect(validatorSpy).toHaveBeenCalledWith(
      objectToValidate.name,
      customContext
    );
  });
});
