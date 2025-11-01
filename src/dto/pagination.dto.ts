import { ApiPropertyOptional } from "@nestjs/swagger";
import { FileTypeEnum, StatusEnum, UserRole } from "@prisma/client";

import { IsNumberString, IsOptional, IsString, IsIn, IsEnum } from "class-validator";

export class PaginationQueryDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number (default 1)' })
  @IsOptional()
  @IsNumberString()
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, description: 'Items per page (default 10)' })
  @IsOptional()
  @IsNumberString()
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Search keyword (kim)', required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Comma separated searchable fields (fullName,phoneNumber)',
    required: false
  })
  @IsOptional()
  @IsString()
  searchFields?: string;

  @ApiPropertyOptional({ example: 'createdAt', description: 'Sort by field' })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({ example: 'asc', description: 'Sort order, asc or desc' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';

  @ApiPropertyOptional({ enum: StatusEnum, description: 'Status -> Article, Journal', required: false })
  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;

  @ApiPropertyOptional({ enum: FileTypeEnum, description: 'File type -> PDF, DOC, DOCX, WORD', required: false })
  @IsOptional()
  @IsEnum(FileTypeEnum)
  fileType?: FileTypeEnum;

  @ApiPropertyOptional({ enum: UserRole, description: 'User role -> ADMIN, USER, STUDENT', required: false })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({  description: 'Filter by full name', required: false })
  @IsOptional()
  fullName?: string;
}
