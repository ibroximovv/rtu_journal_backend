import { Injectable } from '@nestjs/common';
import { CreateVolumeDto } from './dto/create-volume.dto';
import { UpdateVolumeDto } from './dto/update-volume.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class VolumeService extends BaseService<PrismaService['volume'], CreateVolumeDto, UpdateVolumeDto> {
  constructor(readonly prisma: PrismaService) {
    super(prisma, prisma.volume)
  }
}
