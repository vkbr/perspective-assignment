import { ValidationError } from 'class-validator';
import { parseWithValidation } from '../../src/dto/helper';
import { CreateUserRequestDto } from '../../src/dto/users';

describe('dto/helper', () => {
  it('throws on invalid input', () => {
    const invalidEmail = parseWithValidation(CreateUserRequestDto, {
      email: 'invalid',
      name: 'some',
    });
    const invalidName = parseWithValidation(CreateUserRequestDto, {
      email: 'some@example.com',
      name: '',
    });
    invalidEmail.catch((errors: any[]) => {
      expect(errors.length).toBe(1);
      errors.every((error) => expect(error).toBeInstanceOf(ValidationError));
    });
    invalidName.catch((errors: any[]) => {
      expect(errors.length).toBe(1);
      errors.every((error) => expect(error).toBeInstanceOf(ValidationError));
    });
  });
});
