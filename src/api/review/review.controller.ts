import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PaginationQueryDto } from 'src/dto/pagination.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createReviewDto: CreateReviewDto, @Req() req: Request) {
    return this.reviewService.createWithUser(createReviewDto, req);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.reviewService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.reviewService.findOne({ id });
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update({ id }, updateReviewDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.reviewService.remove({ id });
  }
}
