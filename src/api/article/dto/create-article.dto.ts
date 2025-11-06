import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateArticleDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    issue_id: number

    @ApiProperty({ example: "The Impact of Artificial Intelligence on Modern Education" })
    @IsString()
    title: string

    @ApiProperty({ example: "This paper explores how AI tools enhance learning experiences and teacher productivity.", required: false })
    @IsOptional()
    @IsString()
    abstract?: string

    @ApiProperty({ example: "10.1234/ai.2025.001", required: false })
    @IsOptional()
    @IsString()
    doi?: string

    @ApiProperty({ example: "2025-11-03T12:34:56Z", required: false })
    @IsOptional()
    @IsString()
    submission_date?: string

    @ApiProperty({ example: "2025-11-04T12:34:56Z", required: false })
    @IsOptional()
    @IsString()
    acceptance_date?: string

    @ApiProperty({ example: "2025-11-06T12:34:56Z", required: false })
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

    @ApiProperty({ example: true })
    @IsBoolean()
    isActive: boolean

    @ApiProperty({ example: 'http://journal.rtudarsjadvali.uz/uploads/image/image-1762415019023-309813695.jpg', required: false })
    @IsOptional()
    @IsString()
    image?: string
}