import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateAuthorDto {
    @ApiProperty({ example: "John" })
    @IsString()
    first_name: string;

    @ApiProperty({ example: "Doe" })
    @IsString()
    last_name: string;

    @ApiProperty({ example: "University of Example", required: false })
    @IsOptional()
    @IsString()
    affiliation?: string;

    @ApiProperty({ example: "john.doe@example.com", required: false })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ example: "123456789", required: false })
    @IsOptional()
    @IsString()
    orcid?: string;
}
