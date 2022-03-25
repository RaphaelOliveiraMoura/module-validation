import { emailValidator, requiredValidator } from '../validators';

import { composite } from '../composite';
import { schemaValidator } from '.';

describe('Validation > Schema', () => {
  it('should test composition of validators nested', async () => {
    const validator = schemaValidator({
      loading: composite([requiredValidator]),
      imageUrl: composite([requiredValidator]),
      personal: {
        email: composite([requiredValidator, emailValidator]),
        optionalEmail: composite([emailValidator]),
        optionalEmail2: composite([emailValidator]),
        name: composite([requiredValidator]),
        age: composite([requiredValidator])
      },
      private: {
        married: composite([requiredValidator]),
        happy: composite([requiredValidator]),
        password: composite([requiredValidator])
      }
    });

    expect(await validator({}, { context: {} })).toStrictEqual({
      isValid: false,
      errors: {
        loading: 'Campo obrigatório',
        imageUrl: 'Campo obrigatório',
        personal: {
          email: 'Campo obrigatório',
          name: 'Campo obrigatório',
          age: 'Campo obrigatório',
          optionalEmail: null,
          optionalEmail2: null
        },
        private: {
          married: 'Campo obrigatório',
          happy: 'Campo obrigatório',
          password: 'Campo obrigatório'
        }
      }
    });

    expect(
      await validator(
        {
          personal: { optionalEmail2: 'invalid' },
          private: { happy: true }
        },
        { context: {} }
      )
    ).toStrictEqual({
      isValid: false,
      errors: {
        loading: 'Campo obrigatório',
        imageUrl: 'Campo obrigatório',
        personal: {
          email: 'Campo obrigatório',
          name: 'Campo obrigatório',
          age: 'Campo obrigatório',
          optionalEmail: null,
          optionalEmail2: 'Email inválido'
        },
        private: {
          married: 'Campo obrigatório',
          happy: null,
          password: 'Campo obrigatório'
        }
      }
    });

    expect(
      await validator(
        {
          loading: true,
          imageUrl: 'https://link.com.br',
          personal: {
            email: 'raphael@gmail.com',
            name: 'raphael',
            age: 22
          },
          private: {
            married: true,
            happy: true,
            password: '12345678'
          }
        },
        { context: {} }
      )
    ).toStrictEqual({
      isValid: true,
      errors: {
        loading: null,
        imageUrl: null,
        personal: {
          email: null,
          name: null,
          age: null,
          optionalEmail: null,
          optionalEmail2: null
        },
        private: {
          married: null,
          happy: null,
          password: null
        }
      }
    });
  });
});
