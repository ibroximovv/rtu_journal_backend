import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class CreateIssueDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    volume_id: number

    @ApiProperty({ example: 1, required: false })
    @IsOptional()
    @IsNumber()
    issue_number?: number

    @ApiProperty({ example: 2025, required: false })
    @IsOptional()
    @IsNumber()
    publication_date?: number
}
