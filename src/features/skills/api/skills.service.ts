import { prisma } from "@/lib/prisma";
import "server-only";

export const getSkills = async (userId: string) => {
  return prisma.skill.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};
