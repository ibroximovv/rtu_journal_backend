import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { JournalModule } from './journal/journal.module';
import { VolumeModule } from './volume/volume.module';
import { IssueModule } from './issue/issue.module';
import { ArticleModule } from './article/article.module';
import { ArticleAuthorModule } from './article-author/article-author.module';
import { AuthorModule } from './author/author.module';
import { KeywordModule } from './keyword/keyword.module';
import { ArticleKeywordModule } from './article-keyword/article-keyword.module';
import { ReviewModule } from './review/review.module';
import { ArticleMulterController } from 'src/infrastructure/multer/article/article-multer.controller';
import { JournalMulterController } from 'src/infrastructure/multer/journal/journal-multer.controller';
import { ImageMulterController } from 'src/infrastructure/multer/image/image-multer.controller';
import { FileAttachmentModule } from './file-attachment/file-attachment.module';
import { FileAttachmentJournalModule } from './file-attachment-journal/file-attachment-journal.module';

@Module({
  imports: [AuthModule, JwtModule.register({
    global: true,
    secret: config.JWT_SECRET,
    signOptions: { expiresIn: '4h' },
  }), PrismaModule, CategoryModule, JournalModule, VolumeModule, IssueModule, ArticleModule, ArticleAuthorModule, AuthorModule, KeywordModule, ArticleKeywordModule, ReviewModule, FileAttachmentModule, FileAttachmentJournalModule],
  controllers: [ArticleMulterController, JournalMulterController, ImageMulterController],
  providers: [],
})
export class AppModule {}
