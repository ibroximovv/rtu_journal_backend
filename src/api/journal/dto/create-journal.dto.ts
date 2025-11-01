import { ApiProperty } from "@nestjs/swagger";
import { StatusEnum } from "@prisma/client";
import { IsBoolean, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateJournalDto {
    @ApiProperty({ example: 'Journal title' })
    @IsString()
    title: string

    @ApiProperty({ example: 'Journal abbreviation' })
    @IsString()
    abbreviation: string

    @ApiProperty({ example: 'Journal ISSN', required: false })
    @IsOptional()
    @IsString()
    ISSN?: string

    @ApiProperty({ example: 'Journal description', required: false })
    @IsOptional()
    @IsString()
    description?: string

    @ApiProperty({ example: 'Journal publisher', required: false })
    @IsOptional()
    @IsString()
    publisher?: string

    @ApiProperty({ example: 'Journal website url', required: false })
    @IsOptional()
    @IsString()
    website_url?: string

    @ApiProperty({ example: true })
    @IsBoolean()
    isActive: boolean

    @ApiProperty({ example: 'Journal image', required: false })
    @IsOptional()
    @IsString()
    image?: string
}
