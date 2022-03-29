import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCompetitionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly year: number;

  @IsBoolean()
  @IsNotEmpty()
  open: boolean;

  @IsBoolean()
  @IsNotEmpty()
  started: boolean;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
}
