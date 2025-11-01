import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PaginationQueryDto } from 'src/dto/pagination.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post('with-user')
  createWithUser(@Body() createArticleDto: CreateArticleDto, @Req() req: Request) {
    return this.articleService.createWithUser(createArticleDto, req);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.articleService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.articleService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update({ id }, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.articleService.remove({ id });
  }
}
