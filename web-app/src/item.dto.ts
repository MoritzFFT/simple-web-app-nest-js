import { IsString, IsInt, Min } from 'class-validator';

export class ItemDto {
  @IsString()
  name: string;
  @IsInt()
  @Min(0)
  value: number;
}
