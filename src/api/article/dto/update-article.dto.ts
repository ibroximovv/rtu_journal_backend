
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';
import { StatusEnum } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
    @ApiPropertyOptional({ enum: StatusEnum, default: StatusEnum.PENDING, required: false })
    @IsEnum(StatusEnum)
    status?: StatusEnum;
}
