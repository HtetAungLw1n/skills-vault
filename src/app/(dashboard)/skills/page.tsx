import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { PlusIcon, SparkleIcon } from "@phosphor-icons/react/ssr";
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
    <div className="space-y-9">
      <section className="relative isolate overflow-hidden rounded-xl border border-border/70 bg-card px-6 py-8 shadow-sm sm:px-9 sm:py-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-32 -z-10 size-80 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="relative flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="space-y-2.5">
              <h1 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">
                A home for your{" "}
                <span className="text-primary">best ideas.</span>
              </h1>
              <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                Keep your most useful AI instructions close at hand. Create,
                refine, and find the skills you reach for every day.
              </p>
            </div>
          </div>
          <Link
            href="/skills/new"
            className={`${buttonVariants({ size: "lg" })} shrink-0 rounded-xl shadow-sm`}
          >
            <PlusIcon data-icon="inline-start" weight="bold" />
            New skill
          </Link>
        </div>
      </section>

      <section aria-labelledby="skills-library-heading" className="space-y-5">
        <div className="flex items-end justify-between gap-4 border-b border-border/70 pb-4">
          <div className="space-y-1">
            <h2
              id="skills-library-heading"
              className="font-heading text-xl font-medium tracking-tight"
            >
              Your library
            </h2>
            <p className="text-sm text-muted-foreground">
              {skills.length === 0
                ? "Your reusable prompts will live here."
                : `${skills.length} skill${skills.length === 1 ? "" : "s"} ready when you are.`}
            </p>
          </div>
          <span className="rounded-full border border-border/70 bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            {skills.length} {skills.length === 1 ? "skill" : "skills"}
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
