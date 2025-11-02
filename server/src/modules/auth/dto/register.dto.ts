import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsEmail()
    email: string;

    @MinLength(6)
    @IsString()
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}