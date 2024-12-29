import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @IsBoolean()
  @IsNotEmpty()
  isStudent: boolean;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  createdAt: string;

  @IsString()
  @IsNotEmpty()
  updatedAt: string;
}
