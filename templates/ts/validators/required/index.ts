import { Validator } from '../..';

export const RequiredErrors = {
  REQUIRED: 'Campo obrigatório'
};

export const requiredValidator: Validator = value => {
  if (!value) {
    return RequiredErrors.REQUIRED;
  }

  if (typeof value === 'string' && !value.trim()) {
    return RequiredErrors.REQUIRED;
  }

  return null;
};
