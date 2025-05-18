/*
  Warnings:

  - The primary key for the `Record` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `importante_level` on the `Record` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ImportanceLevel" AS ENUM ('One', 'Two', 'Three');

-- AlterTable
ALTER TABLE "Record" DROP CONSTRAINT "Record_pkey",
DROP COLUMN "importante_level",
ADD COLUMN     "importance_level" "ImportanceLevel" DEFAULT 'One',
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Record_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Record_id_seq";
