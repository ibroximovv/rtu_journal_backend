import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class AuthorService extends BaseService<PrismaService['author'], CreateAuthorDto, UpdateAuthorDto> {
  constructor(readonly prisma: PrismaService) {
    super(prisma, prisma.author)
  }
  async createWidthUser(createAuthorDto: CreateAuthorDto, req: Request) {
    try {
      const user = await this.prisma.user.findFirst({ where: { id: req['user'].id } })
      if (!user) throw new BadRequestException('User not found')
      const data = {
        ...createAuthorDto,
        user_id: user.id
      }
      return await super.create(data);
    } catch (error) {
      throw error;
    }
  }
}
