import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationQueryDto } from 'src/dto/pagination.dto';
import { RolesDecorator } from 'src/common/role.decorator';
import { RolesGuard } from 'src/guard/role/role.guard';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { UserRole } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @RolesDecorator(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.categoryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne({ id });
  }

  @RolesDecorator(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update({ id }, updateCategoryDto);
  }

  @RolesDecorator(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryService.remove({ id });
  }
}
