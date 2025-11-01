
import { PartialType } from '@nestjs/swagger';
import { CreateFileAttachmentJournalDto } from './create-file-attachment-journal.dto';

export class UpdateFileAttachmentJournalDto extends PartialType(CreateFileAttachmentJournalDto) {}
