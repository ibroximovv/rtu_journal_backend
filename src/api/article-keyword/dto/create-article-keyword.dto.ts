import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CreateArticleKeywordDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    article_id: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    keyword_id: number;
}
