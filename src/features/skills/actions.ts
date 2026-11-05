"use server";

import { revalidatePath } from "next/cache";
import {
  createSkill,
  deleteSkill,
  editSkill,
} from "@/features/skills/api/skills.service";
import { createClient } from "@/lib/supabase/server";
import { skillSchema } from "./skills.schema";
import z from "zod";

type CreateSkillResult = { success: true } | { success: false; error: string };
type EditSkillResult = { success: true } | { success: false; error: string };

export async function createSkillAction(
  values: z.infer<typeof skillSchema>,
): Promise<CreateSkillResult> {
  const parsedValues = skillSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      success: false,
      error: "Please check the skill details and try again.",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      success: false,
      error: "Your session has expired. Please sign in again.",
    };
  }

  await createSkill(parsedValues.data, user.id);
  revalidatePath("/skills");

  return { success: true };
}

export async function editSkillAction(
  values: z.infer<typeof skillSchema>,
  skillId: string,
): Promise<EditSkillResult> {
  const parsedValues = skillSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      success: false,
      error: "Please check the skill details and try again.",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      success: false,
      error: "Your session has expired. Please sign in again.",
    };
  }

  await editSkill(parsedValues.data, user.id, skillId);
  return { success: true };
}

export async function deleteSkillAction(skillId: string) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { success: false, error: "Unauthorized" };
  }

  await deleteSkill(skillId, user.id);
  revalidatePath("/skills");
  return { success: true };
}
