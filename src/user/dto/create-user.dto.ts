import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

// typescript에서 string이라는걸 지정하는데 굳이 또 지정해줘야하나?
// runtime validation
export class CreateUserDto {
  @IsEmail()
  @MinLength(10)
  @MaxLength(100)
  email: string;

  @MinLength(2)
  @MaxLength(100)
  @IsString()
  nickname: string;

  @MinLength(8)
  @IsString()
  password: string;
}
