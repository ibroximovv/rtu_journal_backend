import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateArticleDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    issue_id: number

    @ApiProperty({ example: "Article title" })
    @IsString()
    title: string

    @ApiProperty({ example: "Article abstract", required: false })
    @IsOptional()
    @IsString()
    abstract?: string

    @ApiProperty({ example: "Article doi", required: false })
    @IsOptional()
    @IsString()
    doi?: string

    @ApiProperty({ example: "Article submission date", required: false })
    @IsOptional()
    @IsString()
    submission_date?: string

    @ApiProperty({ example: "Article acceptance date", required: false })
    @IsOptional()
    @IsString()
    acceptance_date?: string

    @ApiProperty({ example: "Article published date", required: false })
    @IsOptional()
    @IsString()
    published_date?: string

    @ApiProperty({ example: 1, required: false })
    @IsOptional()
    @IsNumber()
    page_start?: number

    @ApiProperty({ example: 10, required: false })
    @IsNumber()
    page_end?: number

    @ApiProperty({ example: 1, required: false })
    @IsOptional()
    @IsNumber()
    category_id?: number

    @ApiProperty({ example: 1 })
    @IsNumber()
    isActive: boolean

    @ApiProperty({ example: 'Article image', required: false })
    @IsOptional()
    @IsString()
    image?: string
}