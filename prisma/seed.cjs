// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const typesData = [
  { name: "cat" },
  { name: "dog" },
  { name: "lizard" },
  { name: "snake" },
  { name: "bird" },
  { name: "hamster" },
];

const vetsData = [
  { first_name: "James",    last_name: "Carter" },
  { first_name: "Helen",    last_name: "Leary" },
  { first_name: "Linda",    last_name: "Douglas" },
  { first_name: "Rafael",   last_name: "Ortega" },
  { first_name: "Henry",    last_name: "Stevens" },
  { first_name: "Sharon",   last_name: "Jenkins" },
];

const specialtiesData = [
  { name: "radiology" },
  { name: "surgery" },
  { name: "dentistry" },
];

const vet_specialtiesData = [
  {
    vets: {
      connect: {
        id: 2,
      },
    },
    specialties: {
      connect: {
        id: 1,
      },
    },
  },
  {
    vets: {
      connect: {
        id: 3,
      },
    },
    specialties: {
      connect: {
        id: 2,
      },
    },
  },
  {
    vets: {
      connect: {
        id: 3,
      },
    },
    specialties: {
      connect: {
        id: 3,
      },
    },
  },
  {
    vets: {
      connect: {
        id: 4,
      },
    },
    specialties: {
      connect: {
        id: 2,
      },
    },
  },
  {
    vets: {
      connect: {
        id: 5,
      },
    },
    specialties: {
      connect: {
        id: 1,
      },
    },
  },
];

const transfer = async () => {
  const types = typesData.map(t => prisma.types.create({
    data: t
  }));
  await prisma.$transaction(types);

  const vets = vetsData.map(v => prisma.vets.create({
    data: v
  }));
  await prisma.$transaction(vets);

  const specialties = specialtiesData.map(s => prisma.specialties.create({
    data: s
  }));
  await prisma.$transaction(specialties);

  const vet_specialties = vet_specialtiesData.map(vs => prisma.vet_specialties.create({
    data: vs
  }));
  await prisma.$transaction(vet_specialties);
};

const main = async () => {
  console.log("Start seeding ...");

  await transfer();

  console.log("Seeding finished.");
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
