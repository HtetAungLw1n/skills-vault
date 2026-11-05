import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { PlusIcon } from "@phosphor-icons/react/ssr";
import { buttonVariants } from "@/components/ui/button";
import { SkillsList } from "@/features/skills/components/skills-list";
import { getSkills } from "@/features/skills/api/skills.service";
import { createClient } from "@/lib/supabase/server";

export default async function SkillsPage() {
  await connection();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const skills = await getSkills(user.id);

  return (
    <div className="space-y-10">
      <section className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground">
            YOUR WORKSPACE
          </p>
          <h1 className="mt-3 font-heading text-3xl leading-tight font-medium tracking-[-0.04em] sm:text-4xl">
            Your library
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Keep the instructions that work close at hand. Create, refine, and
            find a skill whenever you need it.
          </p>
        </div>
        <Link
          href="/skills/new"
          className={`${buttonVariants({ size: "lg" })} shrink-0`}
        >
          <PlusIcon data-icon="inline-start" weight="bold" />
          New skill
        </Link>
      </section>

      <section aria-labelledby="skills-library-heading" className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1">
            <h2
              id="skills-library-heading"
              className="font-heading text-lg font-medium"
            >
              All skills
            </h2>
            <p className="text-sm text-muted-foreground">
              {skills.length === 0
                ? "Your reusable instructions will live here."
                : `${skills.length} skill${skills.length === 1 ? "" : "s"} in your library.`}
            </p>
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {String(skills.length).padStart(2, "0")}
          </span>
        </div>

        <SkillsList
          skills={skills.map((skill) => ({
            id: skill.id,
            title: skill.title,
            description: skill.description,
            updatedAt: skill.updatedAt.toISOString(),
          }))}
        />
      </section>
    </div>
  );
}
