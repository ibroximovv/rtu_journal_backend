import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArticleAuthorDto } from './dto/create-article-author.dto';
import { UpdateArticleAuthorDto } from './dto/update-article-author.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class ArticleAuthorService extends BaseService<PrismaService['articleAuthor'], CreateArticleAuthorDto, UpdateArticleAuthorDto> {
  constructor(readonly prisma: PrismaService) {
    super(prisma, prisma.articleAuthor)
  }

  async createWithUser(createArticleAuthorDto: CreateArticleAuthorDto, req: Request) {
    try {
      const user = await this.prisma.user.findFirst({ where: { id: req['user'].id } })
      if (!user) throw new BadRequestException('User not found!')

      const data = {
        ...createArticleAuthorDto,
        user_id: user.id
      }
      return await super.create(data);
    } catch (error) {
      throw error;
    }
  }
}
