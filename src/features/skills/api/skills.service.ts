import { prisma } from "@/lib/prisma";
import "server-only";
import z from "zod";
import { skillSchema } from "../skills.schema";

export const getSkills = async (userId: string) => {
  return prisma.skill.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const createSkill = async (
  payload: z.infer<typeof skillSchema>,
  userId: string,
) => {
  return prisma.skill.create({
    data: {
      ...payload,
      userId,
    },
  });
};
