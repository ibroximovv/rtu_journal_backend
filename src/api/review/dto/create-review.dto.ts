import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsOptional, IsString } from "class-validator";

export class CreateReviewDto {
    @ApiProperty({example: 1})
    @IsInt()
    article_id: number;

    @ApiProperty({example: 1})
    @IsInt()
    reviewer_id: number;

    @ApiProperty({example: 1})
    @IsInt()
    count: number;

    @ApiProperty({example: "2025-01-01", required: false})
    @IsOptional()
    @IsDate()
    review_date?: Date;

    @ApiProperty({example: "Review", required: false})
    @IsOptional()
    @IsString()
    comments?: string;

    @ApiProperty({example: "Accept", required: false})
    @IsOptional()
    @IsString()
    decision?: string;
}
