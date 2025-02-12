-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "favoriteGames" TEXT[] DEFAULT ARRAY[]::TEXT[];
