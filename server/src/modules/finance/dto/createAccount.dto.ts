import {
  IsAlpha,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Column } from 'typeorm';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  type: string;
  @IsNumber()
  @Column()
  balance: string;
}
