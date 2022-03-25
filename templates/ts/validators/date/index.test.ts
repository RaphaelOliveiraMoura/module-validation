import { dateValidator } from '.';

describe('dateValidator', () => {
  type UseCases = [string, string, string | null][];

  const useCases: UseCases = [
    ['invalid pattern', 'invalid-pattern', 'Data inválida'],
    ['invalid year', '01/01/2', 'Data inválida'],
    ['invalid date', '01/50/2000', 'Data inválida'],
    ['valid date', '01/01/2000', null],
    ['empty string', '', null]
  ];

  useCases.forEach(([title, value, expectedError]) =>
    it(`case: (${title})`, () => {
      const error = dateValidator(value);
      expect(error).toStrictEqual(expectedError);
    })
  );
});
