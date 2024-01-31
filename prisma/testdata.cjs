// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ownersData = [
  { first_name: "George",  last_name: "Franklin",  address: "110 W. Liberty St.", city: "Madison",     telephone: "6085551023" },
  { first_name: "Betty",   last_name: "Davis",     address: "638 Cardinal Ave.",  city: "Sun Prairie", telephone: "6085551749" },
  { first_name: "Eduardo", last_name: "Rodriquez", address: "2693 Commerce St.",  city: "McFarland",   telephone: "6085558763" },
];

const petsData = [
  { name: "Leo",    birth_date: new Date("2010-09-07"), type_id: 1, owner_id: 1 },
  { name: "Basil",  birth_date: new Date("2012-08-06"), type_id: 6, owner_id: 1 },
  { name: "Rosy",   birth_date: new Date("2011-04-17"), type_id: 2, owner_id: 1 },
  { name: "George", birth_date: new Date("2010-01-20"), type_id: 4, owner_id: 2 },
];

const visitsData = [
  { pet_id: 1, visit_date: new Date("2010-03-04"), description: "rabies shot" },
  { pet_id: 1, visit_date: new Date("2011-03-04"), description: "rabies shot" },
  { pet_id: 1, visit_date: new Date("2012-03-04"), description: "neutered" },
  { pet_id: 2, visit_date: new Date("2010-04-04"), description: "rabies shot" },
];

const transfer = async () => {
  const owners = ownersData.map(o => prisma.owners.create({
    data: o
  }));
  await prisma.$transaction(owners);

  const pets = petsData.map(p => prisma.pets.create({
    data: p
  }));
  await prisma.$transaction(pets);

  const visits = visitsData.map(v => prisma.visits.create({
    data: v
  }));
  await prisma.$transaction(visits);
};

const main = async () => {
  console.log("Start testdata ...");

  await transfer();

  console.log("Testdata finished.");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });

