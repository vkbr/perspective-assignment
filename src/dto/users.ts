import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { parseWithValidation } from './helper';

export class CreateUserRequestDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  static parse(json: Object) {
    return parseWithValidation(CreateUserRequestDto, json);
  }
}
