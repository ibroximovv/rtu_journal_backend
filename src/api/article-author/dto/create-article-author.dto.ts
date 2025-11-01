import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateArticleAuthorDto {
    @ApiProperty({ example: 1 })
    @IsString()
    article_id: number;

    @ApiProperty({ example: 1 })
    @IsString()
    author_id: number;

    @ApiProperty({ example: 1, required: false })
    @IsOptional()
    author_order?: number;
}
