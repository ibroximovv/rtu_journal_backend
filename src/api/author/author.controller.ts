import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PaginationQueryDto } from 'src/dto/pagination.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { RolesDecorator } from 'src/common/role.decorator';
import { RolesGuard } from 'src/guard/role/role.guard';
import { UserRole } from '@prisma/client';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) { }

  @RolesDecorator(UserRole.ADMIN, UserRole.USER, UserRole.STUDENT)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post('with-user')
  createWidthUser(@Body() createAuthorDto: CreateAuthorDto, @Req() req: Request) {
    return this.authorService.createWidthUser(createAuthorDto, req);
  }

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.authorService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.authorService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update({ id }, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.authorService.remove({ id });
  }
}
