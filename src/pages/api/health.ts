import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function health(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  await prisma.$queryRaw`SELECT * FROM owners`;
  res.status(200).json({ status: "ok" });
}
