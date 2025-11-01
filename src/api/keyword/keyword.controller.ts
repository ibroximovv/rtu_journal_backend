import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { PaginationQueryDto } from 'src/dto/pagination.dto';

@Controller('keyword')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) { }

  @Post()
  create(@Body() createKeywordDto: CreateKeywordDto) {
    return this.keywordService.create(createKeywordDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.keywordService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.keywordService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateKeywordDto: UpdateKeywordDto) {
    return this.keywordService.update({ id }, updateKeywordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.keywordService.remove({ id });
  }
}
