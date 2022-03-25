import { completeNameValidator } from '.';

describe('completeNameValidator', () => {
  type UseCases = [string, string, string | null][];

  const useCases: UseCases = [
    ['just first name', 'Raphael', 'Digite seu nome completo'],
    ['small first name', 'R Oliveira', 'Digite seu nome completo'],
    ['small second name', 'Raphael O', 'Digite seu nome completo'],
    ['complete name', 'Raphael de Oliveira', null],
    ['empty string', '', null]
  ];

  useCases.forEach(([title, value, expectedError]) =>
    it(`case: (${title})`, () => {
      const error = completeNameValidator(value);
      expect(error).toStrictEqual(expectedError);
    })
  );
});
