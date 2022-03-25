import { Validator } from '../..';

export const RequiredArrayErrors = {
  REQUIRED: 'Campo obrigatório'
};

export const requiredArrayValidator: Validator = value => {
  if (!value) {
    return RequiredArrayErrors.REQUIRED;
  }

  if (!Array.isArray(value)) {
    return RequiredArrayErrors.REQUIRED;
  }

  if (value.length === 0) {
    return RequiredArrayErrors.REQUIRED;
  }

  return null;
};
