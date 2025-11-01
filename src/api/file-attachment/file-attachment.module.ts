import { Module } from '@nestjs/common';
import { FileAttachmentService } from './file-attachment.service';
import { FileAttachmentController } from './file-attachment.controller';

@Module({
  controllers: [FileAttachmentController],
  providers: [FileAttachmentService],
})
export class FileAttachmentModule {}
