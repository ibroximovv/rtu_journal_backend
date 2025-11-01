import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class ReviewService extends BaseService<PrismaService['review'], CreateReviewDto, UpdateReviewDto> {
  constructor(readonly prisma: PrismaService) {
    super(prisma, prisma.review)
  }
  async createWithUser(createReviewDto: CreateReviewDto, req: Request) {
    try {
      const findone = await this.prisma.user.findFirst({ where: { id: req['user'].id } })
      if (!findone) throw new BadRequestException('User not found!');
      const article = await this.prisma.article.findFirst({ where: { id: createReviewDto.article_id } })
      if (!article) throw new BadRequestException('Article not found!');
      const data = {
        ...createReviewDto,
        reviewer_id: req['user'].id
      }
      return await super.create(data)
    } catch (error) {
      throw error
    }
  }
}
