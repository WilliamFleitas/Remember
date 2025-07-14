-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "categories" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "favorite" BOOLEAN NOT NULL DEFAULT false;
