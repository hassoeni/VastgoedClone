-- CreateTable
CREATE TABLE "VastgoedObj" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "naam" TEXT NOT NULL,
    "energielabel" TEXT NOT NULL,
    "marktwaarde" INTEGER NOT NULL,
    "gbo" INTEGER NOT NULL,
    "postcode" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "stad" TEXT NOT NULL,

    CONSTRAINT "VastgoedObj_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VastgoedObj_naam_key" ON "VastgoedObj"("naam");
