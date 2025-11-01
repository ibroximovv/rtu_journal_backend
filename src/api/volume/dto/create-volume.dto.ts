import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class CreateVolumeDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    journal_id: number

    @ApiProperty({ example: 2025 })
    @IsNumber()
    year: number

    @ApiProperty({ example: 1, required: false })
    @IsOptional()
    @IsNumber()
    volume_number?: number
}
