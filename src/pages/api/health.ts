import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function health(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  await prisma.owners.findMany({
    take: 1,
  });
  res.status(200).json({ status: "ok" });
}
