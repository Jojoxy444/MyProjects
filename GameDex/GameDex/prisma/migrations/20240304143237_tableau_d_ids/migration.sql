/*
  Warnings:

  - You are about to drop the column `favoriteGames` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "favoriteGames",
ADD COLUMN     "favoritegames" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
