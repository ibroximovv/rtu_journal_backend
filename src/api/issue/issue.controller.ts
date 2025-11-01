import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { IssueService } from './issue.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { PaginationQueryDto } from 'src/dto/pagination.dto';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) { }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createIssueDto: CreateIssueDto) {
    return this.issueService.create(createIssueDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.issueService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.issueService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateIssueDto: UpdateIssueDto) {
    return this.issueService.update({ id }, updateIssueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.issueService.remove({ id });
  }
}
