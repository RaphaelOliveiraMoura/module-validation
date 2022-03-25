import { Validator } from '../..';

const MIN_NAME_LENGTH = 2;

export const CompleteNameErrors = {
  INVALID_PATTERN: 'Digite seu nome completo'
};

export const completeNameValidator: Validator<string> = value => {
  if (!value) return null;

  const [firstName, secondName] = value.split(' ');

  if (!firstName || firstName.length < MIN_NAME_LENGTH) {
    return CompleteNameErrors.INVALID_PATTERN;
  }

  if (!secondName || secondName.length < MIN_NAME_LENGTH) {
    return CompleteNameErrors.INVALID_PATTERN;
  }

  return null;
};
