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

export const getSkill = async (skillId: string, userId: string) => {
  return prisma.skill.findFirst({
    where: { id: skillId, userId },
  });
};

export const editSkill = async (
  payload: z.infer<typeof skillSchema>,
  userId: string,
  skillId: string,
) => {
  return prisma.skill.update({
    data: {
      ...payload,
    },
    where: { id: skillId, userId },
  });
};

export const deleteSkill = async (skillId: string, userId: string) => {
  return prisma.skill.delete({
    where: {
      id: skillId,
      userId,
    },
  });
};
