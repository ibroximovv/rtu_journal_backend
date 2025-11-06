import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class ArticleService extends BaseService<PrismaService['article'], CreateArticleDto, UpdateArticleDto> {
  constructor(readonly prisma: PrismaService) {
    super(prisma, prisma.article)
  }
  async createWithUser(createArticleDto: CreateArticleDto, req: Request) {
    const user_id = req['user'].id
    const findone = await this.prisma.user.findFirst({ where: { id: user_id } })
    if (!findone) throw new BadRequestException('User not found!')
    const data = {
      ...createArticleDto,
      user_id
    }
    return await super.create(data)
  }
}
