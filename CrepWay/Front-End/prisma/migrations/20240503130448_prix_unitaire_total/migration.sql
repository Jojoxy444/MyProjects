/*
  Warnings:

  - You are about to drop the column `prix` on the `panier` table. All the data in the column will be lost.
  - Added the required column `prix_total` to the `panier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prix_unitaire` to the `panier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "panier" DROP COLUMN "prix",
ADD COLUMN     "prix_total" TEXT NOT NULL,
ADD COLUMN     "prix_unitaire" TEXT NOT NULL;
