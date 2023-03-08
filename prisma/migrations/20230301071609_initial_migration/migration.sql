-- CreateTable
CREATE TABLE "owners" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(30),
    "last_name" VARCHAR(30),
    "address" VARCHAR(255),
    "city" VARCHAR(80),
    "telephone" VARCHAR(20),

    CONSTRAINT "pk_owners" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30),
    "birth_date" DATE,
    "type_id" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "pk_pets" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialties" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(80),

    CONSTRAINT "pk_specialties" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(80),

    CONSTRAINT "pk_types" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vet_specialties" (
    "vet_id" INTEGER NOT NULL,
    "specialty_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "vets" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(30),
    "last_name" VARCHAR(30),

    CONSTRAINT "pk_vets" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visits" (
    "id" SERIAL NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "visit_date" DATE,
    "description" VARCHAR(255),

    CONSTRAINT "pk_visits" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_owners_last_name" ON "owners"("last_name");

-- CreateIndex
CREATE INDEX "idx_pets_name" ON "pets"("name");

-- CreateIndex
CREATE INDEX "idx_specialties_name" ON "specialties"("name");

-- CreateIndex
CREATE INDEX "idx_types_name" ON "types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "unique_ids" ON "vet_specialties"("vet_id", "specialty_id");

-- CreateIndex
CREATE INDEX "idx_vets_last_name" ON "vets"("last_name");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vet_specialties" ADD CONSTRAINT "vet_specialties_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vet_specialties" ADD CONSTRAINT "vet_specialties_vet_id_fkey" FOREIGN KEY ("vet_id") REFERENCES "vets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
