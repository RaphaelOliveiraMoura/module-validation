import { requiredArrayValidator } from '.';

describe('requiredArrayValidator', () => {
  type UseCases = [string, unknown, string | null][];

  const useCases: UseCases = [
    ['filled array', [1], null],
    ['empty array', [], 'Campo obrigatório'],
    ['empty string', '', 'Campo obrigatório'],
    ['invalid array type', true, 'Campo obrigatório']
  ];

  useCases.forEach(([title, value, expectedError]) =>
    it(`case: (${title})`, () => {
      const error = requiredArrayValidator(value);
      expect(error).toStrictEqual(expectedError);
    })
  );
});
