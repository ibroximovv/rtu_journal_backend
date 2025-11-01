import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { FileAttachmentJournalService } from './file-attachment-journal.service';
import { CreateFileAttachmentJournalDto } from './dto/create-file-attachment-journal.dto';
import { UpdateFileAttachmentJournalDto } from './dto/update-file-attachment-journal.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { RolesGuard } from 'src/guard/role/role.guard';
import { RolesDecorator } from 'src/common/role.decorator';
import { UserRole } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('file-attachment-journal')
export class FileAttachmentJournalController {
  constructor(private readonly fileAttachmentJournalService: FileAttachmentJournalService) { }

  @RolesDecorator(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createFileAttachmentJournalDto: CreateFileAttachmentJournalDto, @Req() req: Request) {
    return this.fileAttachmentJournalService.create(createFileAttachmentJournalDto, req);
  }

  @Get()
  findAll() {
    return this.fileAttachmentJournalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.fileAttachmentJournalService.findOne(id);
  }

  @RolesDecorator(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFileAttachmentJournalDto: UpdateFileAttachmentJournalDto, @Req() req: Request) {
    return this.fileAttachmentJournalService.updateFile(id, updateFileAttachmentJournalDto, req);
  }

  @RolesDecorator(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.fileAttachmentJournalService.deleteFile(id);
  }
}
