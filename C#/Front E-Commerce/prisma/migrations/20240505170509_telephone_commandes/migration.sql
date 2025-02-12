/*
  Warnings:

  - Added the required column `telephone` to the `commandes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "commandes" ADD COLUMN     "telephone" TEXT NOT NULL;
