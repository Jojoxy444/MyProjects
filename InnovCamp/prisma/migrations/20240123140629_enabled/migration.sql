/*
  Warnings:

  - You are about to drop the column `Enabled` on the `project` table. All the data in the column will be lost.
  - Added the required column `enabled` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" DROP COLUMN "Enabled",
ADD COLUMN     "enabled" BOOLEAN NOT NULL;
