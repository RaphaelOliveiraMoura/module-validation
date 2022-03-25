import { emailValidator } from '.';

describe('emailValidator', () => {
  type UseCases = [string, unknown, string | null][];

  const useCases: UseCases = [
    ['invalid pattern', 'invalid-pattern', 'Email inválido'],
    ['without @', 'email.com.br', 'Email inválido'],
    ['without .', 'email@com', 'Email inválido'],
    ['invalid type', true, 'Email inválido'],
    ['valid email', 'valid-email@gmail.com', null],
    ['empty string', '', null]
  ];

  useCases.forEach(([title, value, expectedError]) =>
    it(`case: (${title})`, () => {
      const error = emailValidator(value);
      expect(error).toStrictEqual(expectedError);
    })
  );
});
