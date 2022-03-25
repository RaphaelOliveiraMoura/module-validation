import { Validator } from '../..';

export const CompareErrors = {
  NOT_EQUAL: 'Campos devem ser iguais'
};

type CompareValidatorBuilder = (valueToCompare: string) => Validator;

export const compareValidatorBuilder: CompareValidatorBuilder =
  valueToCompare => value => {
    if (value !== valueToCompare) {
      return CompareErrors.NOT_EQUAL;
    }

    return null;
  };
