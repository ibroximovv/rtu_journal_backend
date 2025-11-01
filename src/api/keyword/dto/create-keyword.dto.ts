import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateKeywordDto {
    @ApiProperty({ example: "Keyword" })
    @IsString()
    keyword_text: string;
}
