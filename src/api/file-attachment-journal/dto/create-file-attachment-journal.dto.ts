import { ApiProperty } from "@nestjs/swagger";
import { FileTypeEnum } from "@prisma/client";
import { IsEnum, IsInt, IsString } from "class-validator";

export class CreateFileAttachmentJournalDto {
    @ApiProperty({example: 'journal_1.pdf'})
    @IsString()
    file_path: string;

    @ApiProperty({enum: FileTypeEnum, example: FileTypeEnum.PDF})
    @IsEnum(FileTypeEnum)
    file_type: FileTypeEnum;

    @ApiProperty({example: 1})
    @IsInt()
    journal_id: number;
}
