import { IsEmail, IsString, IsOptional, MinLength, IsMobilePhone } from 'class-validator';


export class RegisterDto {
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsMobilePhone()
    phoneNumber?: string;
  
    @IsString()
    @MinLength(8)
    password: string;
}