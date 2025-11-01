import { Module } from '@nestjs/common';
import { FileAttachmentJournalService } from './file-attachment-journal.service';
import { FileAttachmentJournalController } from './file-attachment-journal.controller';

@Module({
  controllers: [FileAttachmentJournalController],
  providers: [FileAttachmentJournalService],
})
export class FileAttachmentJournalModule {}
