import { Injectable } from '@nestjs/common';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class JournalService extends BaseService<PrismaService['journal'], CreateJournalDto, UpdateJournalDto> {
  constructor(readonly prisma: PrismaService) {
    super(prisma, prisma.journal)
  }

  async createWithUser(createJournalDto: CreateJournalDto, req: Request) {
    const data = {
      ...createJournalDto,
      user_id: req['user'].id,
    };
    return await super.create(data);
  }

}
