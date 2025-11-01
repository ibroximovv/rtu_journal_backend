
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateJournalDto } from './create-journal.dto';
import { StatusEnum } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateJournalDto extends PartialType(CreateJournalDto) {
    @ApiProperty({ example: StatusEnum.ACCEPTED, enum: StatusEnum, required: false })
    @IsOptional()
    @IsEnum(StatusEnum)
    status?: StatusEnum;
}
