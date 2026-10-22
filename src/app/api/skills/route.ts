import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSkills } from "@/features/skills/api/skills.service";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const skills = await getSkills(user.id);

  return NextResponse.json({ data: skills });
}
