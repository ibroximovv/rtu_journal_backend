-- CreateEnum
CREATE TYPE "StatusEnum" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "FileTypeEnum" AS ENUM ('PDF', 'DOC', 'DOCX', 'WORD');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER', 'STUDENT');

-- CreateTable
CREATE TABLE "Journal" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "abbreviation" TEXT,
    "ISSN" TEXT,
    "description" TEXT,
    "publisher" TEXT,
    "website_url" TEXT,
    "image" TEXT,
    "status" "StatusEnum" NOT NULL DEFAULT 'PENDING',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Journal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Volume" (
    "id" SERIAL NOT NULL,
    "journal_id" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "volume_number" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Volume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" SERIAL NOT NULL,
    "volume_id" INTEGER NOT NULL,
    "issue_number" INTEGER,
    "publication_date" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "issue_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT,
    "doi" TEXT,
    "submission_date" TIMESTAMP(3),
    "acceptance_date" TIMESTAMP(3),
    "published_date" TIMESTAMP(3),
    "page_start" INTEGER,
    "page_end" INTEGER,
    "status" "StatusEnum" NOT NULL DEFAULT 'PENDING',
    "category_id" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "image" TEXT,
    "user_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "affiliation" TEXT,
    "email" TEXT,
    "orcid" TEXT,
    "user_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleAuthor" (
    "id" SERIAL NOT NULL,
    "article_id" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,
    "author_order" INTEGER,
    "user_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArticleAuthor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" SERIAL NOT NULL,
    "keyword_text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleKeyword" (
    "id" SERIAL NOT NULL,
    "article_id" INTEGER NOT NULL,
    "keyword_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArticleKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileAttachment" (
    "id" SERIAL NOT NULL,
    "article_id" INTEGER NOT NULL,
    "file_path" TEXT NOT NULL,
    "file_type" "FileTypeEnum" NOT NULL DEFAULT 'PDF',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FileAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileAttachmentJournal" (
    "id" SERIAL NOT NULL,
    "file_path" TEXT NOT NULL,
    "file_type" "FileTypeEnum" NOT NULL DEFAULT 'PDF',
    "journal_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FileAttachmentJournal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "UserRole" DEFAULT 'USER',
    "email" TEXT,
    "full_name" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "article_id" INTEGER NOT NULL,
    "reviewer_id" INTEGER NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "review_date" TIMESTAMP(3),
    "comments" TEXT,
    "decision" TEXT,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_doi_key" ON "Article"("doi");

-- CreateIndex
CREATE UNIQUE INDEX "Author_email_key" ON "Author"("email");

-- CreateIndex
CREATE INDEX "ArticleAuthor_article_id_author_id_idx" ON "ArticleAuthor"("article_id", "author_id");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleAuthor_article_id_author_id_key" ON "ArticleAuthor"("article_id", "author_id");

-- CreateIndex
CREATE INDEX "ArticleKeyword_article_id_keyword_id_idx" ON "ArticleKeyword"("article_id", "keyword_id");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleKeyword_article_id_keyword_id_key" ON "ArticleKeyword"("article_id", "keyword_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Review_article_id_reviewer_id_idx" ON "Review"("article_id", "reviewer_id");

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Volume" ADD CONSTRAINT "Volume_journal_id_fkey" FOREIGN KEY ("journal_id") REFERENCES "Journal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_volume_id_fkey" FOREIGN KEY ("volume_id") REFERENCES "Volume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_issue_id_fkey" FOREIGN KEY ("issue_id") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleAuthor" ADD CONSTRAINT "ArticleAuthor_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleAuthor" ADD CONSTRAINT "ArticleAuthor_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleAuthor" ADD CONSTRAINT "ArticleAuthor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleKeyword" ADD CONSTRAINT "ArticleKeyword_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleKeyword" ADD CONSTRAINT "ArticleKeyword_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "Keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileAttachment" ADD CONSTRAINT "FileAttachment_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileAttachmentJournal" ADD CONSTRAINT "FileAttachmentJournal_journal_id_fkey" FOREIGN KEY ("journal_id") REFERENCES "Journal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
