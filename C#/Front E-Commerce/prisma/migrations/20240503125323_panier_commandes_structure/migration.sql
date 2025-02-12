-- CreateTable
CREATE TABLE "panier" (
    "id" SERIAL NOT NULL,
    "produit" TEXT NOT NULL,
    "ingredients" TEXT[],
    "prix" TEXT NOT NULL,
    "quantite" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "panier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commandes" (
    "id" SERIAL NOT NULL,
    "produits" TEXT[],
    "prix" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,

    CONSTRAINT "commandes_pkey" PRIMARY KEY ("id")
);
