import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('VN')
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
