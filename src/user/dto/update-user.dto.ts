import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @MinLength(2)
  @MaxLength(100)
  @IsString()
  nickname: string;
}
