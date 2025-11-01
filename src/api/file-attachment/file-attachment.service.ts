import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateFileAttachmentDto } from './dto/create-file-attachment.dto';
import { UpdateFileAttachmentDto } from './dto/update-file-attachment.dto';
import { join } from 'path';
import * as fs from 'fs';
import { Request } from 'express';

@Injectable()
export class FileAttachmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateFileAttachmentDto, req: Request) {
    const article = await this.prisma.article.findUnique({
      where: { id: createDto.article_id },
    });
    if (!article) throw new BadRequestException('Article not found!');

    const protocol = req.protocol;
    const host = req.get('host');
    const fullPath = `${protocol}://${host}/${createDto.file_path}`;

    const created = await this.prisma.fileAttachment.create({
      data: {
        ...createDto,
        file_path: fullPath,
      },
    });

    return {
      success: true,
      message: '✅ Fayl muvaffaqiyatli saqlandi',
      data: created,
    };
  }

  async findAll() {
    const files = await this.prisma.fileAttachment.findMany({
      include: {
        article: {
          select: { id: true, title: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      count: files.length,
      files,
    };
  }

  async findOne(id: number) {
    const file = await this.prisma.fileAttachment.findUnique({
      where: { id },
      include: { article: true },
    });
    if (!file) throw new NotFoundException('Fayl topilmadi');
    return {
      statusCode: 200,
      message: '✅ Fayl topildi',
      file,
    };
  }

  async updateFile(id: number, dto: UpdateFileAttachmentDto, req: Request) {
    const file = await this.prisma.fileAttachment.findUnique({ where: { id } });
    if (!file) throw new NotFoundException('Fayl topilmadi');

    if (dto.file_path && dto.file_path !== file.file_path) {
      const oldFileName = file.file_path.split('/uploads/')[1];
      const oldPath = join(process.cwd(), 'uploads', oldFileName);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const protocol = req.protocol;
    const host = req.get('host');
    const fullPath = dto.file_path
      ? `${protocol}://${host}/${dto.file_path}`
      : file.file_path;

    const updated = await this.prisma.fileAttachment.update({
      where: { id },
      data: {
        ...dto,
        file_path: fullPath,
      },
    });

    return {
      statusCode: 200,
      message: '♻️ Fayl ma’lumotlari yangilandi',
      updated,
    };
  }

  async deleteFile(id: number) {
    const file = await this.prisma.fileAttachment.findUnique({ where: { id } });
    if (!file) throw new NotFoundException('Fayl topilmadi');

    const filePathPart = file.file_path.split('/uploads/')[1];
    const filePath = join(process.cwd(), 'uploads', filePathPart);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await this.prisma.fileAttachment.delete({ where: { id } });
    return {
      statusCode: 200,
      message: '🗑️ Fayl muvaffaqiyatli o‘chirildi',
    };
  }

  async findByArticle(articleId: number) {
    const files = await this.prisma.fileAttachment.findMany({
      where: { article_id: articleId },
      orderBy: { createdAt: 'desc' },
    });

    return {
      statusCode: 200,
      count: files.length,
      files,
    };
  }
}