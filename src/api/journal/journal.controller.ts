import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { JournalService } from './journal.service';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { PaginationQueryDto } from 'src/dto/pagination.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { RolesGuard } from 'src/guard/role/role.guard';
import { RolesDecorator } from 'src/common/role.decorator';
import { UserRole } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @RolesDecorator(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createJournalDto: CreateJournalDto, @Req() req: Request) {
    return this.journalService.createWithUser(createJournalDto, req);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.journalService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.journalService.findOne(+id);
  }

  @RolesDecorator(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJournalDto: UpdateJournalDto) {
    return this.journalService.update(+id, updateJournalDto);
  }

  @RolesDecorator(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.journalService.remove(+id);
  }
}
