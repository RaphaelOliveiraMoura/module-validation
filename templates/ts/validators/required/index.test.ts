import { requiredValidator } from '.';

describe('requiredValidator', () => {
  type UseCases = [string, unknown, string | null][];

  const useCases: UseCases = [
    ['null', null, 'Campo obrigatório'],
    ['empty string', '', 'Campo obrigatório'],
    ['undefined', undefined, 'Campo obrigatório'],
    ['false', false, 'Campo obrigatório'],
    ['string with space', ' ', 'Campo obrigatório'],
    ['filled string', 'filled', null],
    ['empty array', [], null]
  ];

  useCases.forEach(([title, value, expectedError]) =>
    it(`case: (${title})`, () => {
      const error = requiredValidator(value);
      expect(error).toStrictEqual(expectedError);
    })
  );
});
