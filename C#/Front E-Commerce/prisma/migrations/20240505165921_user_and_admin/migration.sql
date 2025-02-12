/*
  Warnings:

  - Added the required column `adresse` to the `administrateurs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `administrateurs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adresse` to the `utilisateurs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `utilisateurs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "administrateurs" ADD COLUMN     "adresse" TEXT NOT NULL,
ADD COLUMN     "telephone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "utilisateurs" ADD COLUMN     "adresse" TEXT NOT NULL,
ADD COLUMN     "telephone" TEXT NOT NULL;
