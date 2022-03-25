import { compareValidatorBuilder } from '.';

describe('compareValidatorBuilder', () => {
  type UseCases = [string, string, string, string | null][];

  const useCases: UseCases = [
    ['diferent strings', '123', '1234', 'Campos devem ser iguais'],
    ['equal strings', '123', '123', null]
  ];

  useCases.forEach(([title, value1, value2, expectedError]) =>
    it(`case: (${title})`, () => {
      const error = compareValidatorBuilder(value1)(value2);
      expect(error).toStrictEqual(expectedError);
    })
  );
});
