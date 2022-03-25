import { Validator } from '../..';

export const DateErrors = {
  INVALID_DATE: 'Data inválida'
};

export const dateValidator: Validator = (value: string) => {
  if (!value) return null;

  const [day, month, year] = value.split('/').map(Number);
  const dateString = `${year}/${month}/${day}`;

  if (String(year).length !== 4) return DateErrors.INVALID_DATE;

  const dateInstance = new Date(dateString);
  const isValid = dateInstance.toString() !== 'Invalid Date';

  return !isValid ? DateErrors.INVALID_DATE : null;
};
