"use server";

import { revalidatePath } from "next/cache";
import { createSkill } from "@/features/skills/api/skills.service";
import { createClient } from "@/lib/supabase/server";
import { skillSchema } from "./skills.schema";
import z from "zod";

type CreateSkillResult =
  | { success: true }
  | { success: false; error: string };

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
