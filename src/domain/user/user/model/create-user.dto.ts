import {IsBoolean, IsNotEmpty, IsString, MaxLength,} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    readonly givenName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    readonly familyName: string;

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    readonly password: string;

    @IsBoolean()
    mustChangePassword: boolean;
}
