import { Validator } from '..';

export const composite =
  (validators: Validator[]): Validator =>
  async (value: unknown) => {
    for (const validator of validators) {
      const error = await validator(value);

      if (error) return error;
    }

    return null;
  };
