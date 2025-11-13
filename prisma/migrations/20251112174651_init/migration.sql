/*
  Warnings:

  - You are about to drop the column `description` on the `Certification` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Project` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Certification` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Certification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `school` on table `Education` required. This step will fail if there are existing NULL values in that column.
  - Made the column `degree` on table `Education` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `VolunteerWork` table without a default value. This is not possible if the table is not empty.
  - Made the column `organization` on table `VolunteerWork` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `VolunteerWork` required. This step will fail if there are existing NULL values in that column.
  - Made the column `jobTitle` on table `WorkExperience` required. This step will fail if there are existing NULL values in that column.
  - Made the column `company` on table `WorkExperience` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Certification_resumeId_idx";

-- DropIndex
DROP INDEX "Education_resumeId_idx";

-- DropIndex
DROP INDEX "Project_resumeId_idx";

-- DropIndex
DROP INDEX "Resume_userId_idx";

-- DropIndex
DROP INDEX "VolunteerWork_resumeId_idx";

-- DropIndex
DROP INDEX "WorkExperience_resumeId_idx";

-- AlterTable
ALTER TABLE "Certification" DROP COLUMN "description",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Education" ALTER COLUMN "school" SET NOT NULL,
ALTER COLUMN "degree" SET NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "endDate",
DROP COLUMN "link",
DROP COLUMN "startDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "url" TEXT,
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "VolunteerWork" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "organization" SET NOT NULL,
ALTER COLUMN "role" SET NOT NULL;

-- AlterTable
ALTER TABLE "WorkExperience" ALTER COLUMN "jobTitle" SET NOT NULL,
ALTER COLUMN "company" SET NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
