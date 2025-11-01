import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VolumeService } from './volume.service';
import { CreateVolumeDto } from './dto/create-volume.dto';
import { UpdateVolumeDto } from './dto/update-volume.dto';
import { PaginationQueryDto } from 'src/dto/pagination.dto';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('volume')
export class VolumeController {
  constructor(private readonly volumeService: VolumeService) { }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createVolumeDto: CreateVolumeDto) {
    return this.volumeService.create(createVolumeDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.volumeService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.volumeService.findOne({ id });
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateVolumeDto: UpdateVolumeDto) {
    return this.volumeService.update({ id }, updateVolumeDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.volumeService.remove({ id });
  }
}
