import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateCommentDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @MaxLength(155)
  @IsString()
  content: string;
}
