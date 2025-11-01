import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { ArticleAuthorService } from './article-author.service';
import { CreateArticleAuthorDto } from './dto/create-article-author.dto';
import { UpdateArticleAuthorDto } from './dto/update-article-author.dto';
import { PaginationQueryDto } from 'src/dto/pagination.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('article-author')
export class ArticleAuthorController {
  constructor(private readonly articleAuthorService: ArticleAuthorService) { }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post('with-user')
  createWidthUser(@Body() createArticleAuthorDto: CreateArticleAuthorDto, @Req() req: Request) {
    return this.articleAuthorService.createWithUser(createArticleAuthorDto, req);
  }

  @Post()
  create(@Body() createArticleAuthorDto: CreateArticleAuthorDto) {
    return this.articleAuthorService.create(createArticleAuthorDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.articleAuthorService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.articleAuthorService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateArticleAuthorDto: UpdateArticleAuthorDto) {
    return this.articleAuthorService.update({ id }, updateArticleAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.articleAuthorService.remove({ id });
  }
}
