import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateBoardDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
