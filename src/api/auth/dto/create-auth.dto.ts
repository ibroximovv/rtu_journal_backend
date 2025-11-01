import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

export class CreateAuthDto {
    @ApiProperty({ example: 'Full name'})
    @IsString()
    full_name: string;

    @ApiProperty({ example: 'username' })
    @IsString()
    username: string;

    @ApiProperty({ example: 'password' })
    @IsString()
    password: string;

    @ApiProperty({ enum: UserRole, example: UserRole.USER, required: false })
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

    @ApiProperty({ example: 'email@gmail.com', required: false })
    @IsOptional()
    @IsEmail()
    email?: string;   
}
