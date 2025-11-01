import { Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class IssueService extends BaseService<PrismaService['issue'], CreateIssueDto, UpdateIssueDto>{
  constructor(readonly prisma: PrismaService) {
    super(prisma, prisma.issue)
  }
}
