-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "cachedJobFeed" JSONB DEFAULT '[]',
ADD COLUMN     "feedUpdatedAt" TIMESTAMP(3);
