import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ArticleKeywordService } from './article-keyword.service';
import { CreateArticleKeywordDto } from './dto/create-article-keyword.dto';
import { UpdateArticleKeywordDto } from './dto/update-article-keyword.dto';
import { PaginationQueryDto } from 'src/dto/pagination.dto';

@Controller('article-keyword')
export class ArticleKeywordController {
  constructor(private readonly articleKeywordService: ArticleKeywordService) { }

  @Post()
  create(@Body() createArticleKeywordDto: CreateArticleKeywordDto) {
    return this.articleKeywordService.create(createArticleKeywordDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.articleKeywordService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.articleKeywordService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateArticleKeywordDto: UpdateArticleKeywordDto) {
    return this.articleKeywordService.update({ id }, updateArticleKeywordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.articleKeywordService.remove({ id });
  }
}
