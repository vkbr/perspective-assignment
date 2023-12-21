import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const parseWithValidation = <C extends object, V>(
  cls: ClassConstructor<C>,
  plain: V | V[],
): Promise<C> => {
  return new Promise((res, rej) => {
    const parsed = plainToInstance(cls, plain);
    validate(parsed).then((validationErrors) => {
      if (validationErrors.length > 0) {
        rej(validationErrors);
      } else {
        res(parsed);
      }
    });
  });
};
