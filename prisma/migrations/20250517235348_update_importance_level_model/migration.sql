/*
  Warnings:

  - Made the column `importance_level` on table `Record` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ImportanceLevel" ADD VALUE 'Four';
ALTER TYPE "ImportanceLevel" ADD VALUE 'Five';

-- AlterTable
ALTER TABLE "Record" ALTER COLUMN "importance_level" SET NOT NULL;
