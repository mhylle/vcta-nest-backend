import {MaxLength, IsNotEmpty, IsEmail, IsString, IsNumber, IS_BIC, IsBoolean} from 'class-validator';
import {Prop} from '@nestjs/mongoose';

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
}
