import isEmail from 'validator/lib/isEmail';

import { Validator } from '../..';

export const EmailErrors = {
  INVALID_PATTERN: 'Email inválido',
  INVALID_TYPE: 'Email inválido'
};

export const emailValidator: Validator = value => {
  if (!value) return null;

  if (typeof value !== 'string') return EmailErrors.INVALID_TYPE;

  if (!isEmail(value)) return EmailErrors.INVALID_PATTERN;

  return null;
};
