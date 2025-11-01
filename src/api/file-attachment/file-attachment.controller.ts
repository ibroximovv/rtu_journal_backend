import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { FileAttachmentService } from './file-attachment.service';
import { CreateFileAttachmentDto } from './dto/create-file-attachment.dto';
import { UpdateFileAttachmentDto } from './dto/update-file-attachment.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { RolesDecorator } from 'src/common/role.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/guard/role/role.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('file-attachment')
export class FileAttachmentController {
  constructor(private readonly fileAttachmentService: FileAttachmentService) { }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createFileAttachmentDto: CreateFileAttachmentDto, @Req() req: Request) {
    return this.fileAttachmentService.create(createFileAttachmentDto, req);
  }

  @Get()
  findAll() {
    return this.fileAttachmentService.findAll();
  }

  @Get('article/:articleId')
  findByArticle(@Param('articleId') articleId: number) {
    return this.fileAttachmentService.findByArticle(articleId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.fileAttachmentService.findOne(id);
  }

  @RolesDecorator(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFileAttachmentDto: UpdateFileAttachmentDto, @Req() req: Request) {
    return this.fileAttachmentService.updateFile(id, updateFileAttachmentDto, req);
  }

  @RolesDecorator(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.fileAttachmentService.deleteFile(id);
  }
}
