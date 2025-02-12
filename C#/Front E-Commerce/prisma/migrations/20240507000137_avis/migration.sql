-- CreateTable
CREATE TABLE "avis" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "commentaire" TEXT NOT NULL,

    CONSTRAINT "avis_pkey" PRIMARY KEY ("id")
);
