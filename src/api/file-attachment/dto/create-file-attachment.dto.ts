import { ApiProperty } from "@nestjs/swagger";
import { FileTypeEnum } from "@prisma/client";
import { IsEnum, IsInt, IsString } from "class-validator";

export class CreateFileAttachmentDto {
    @ApiProperty({ enum: FileTypeEnum, example: FileTypeEnum.PDF })
    @IsEnum(FileTypeEnum)
    file_type: FileTypeEnum;

    @ApiProperty({ example: 1 })
    @IsInt()
    article_id: number;

    @ApiProperty({ example: 'file_path' })
    @IsString()
    file_path: string;
}
