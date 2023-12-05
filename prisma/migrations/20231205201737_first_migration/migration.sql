-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TierIngredient" (
    "ingredientID" TEXT NOT NULL,
    "tierID" TEXT NOT NULL,

    CONSTRAINT "TierIngredient_pkey" PRIMARY KEY ("tierID","ingredientID")
);

-- CreateTable
CREATE TABLE "Tier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tier_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TierIngredient" ADD CONSTRAINT "TierIngredient_ingredientID_fkey" FOREIGN KEY ("ingredientID") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TierIngredient" ADD CONSTRAINT "TierIngredient_tierID_fkey" FOREIGN KEY ("tierID") REFERENCES "Tier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
