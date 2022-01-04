import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @MaxLength(155)
  @IsString()
  content: string;

  @IsInt()
  userId: number;

  @IsInt()
  boardId: number;
}
