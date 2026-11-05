import Link from "next/link";
import { Suspense } from "react";

import {
  ClockIcon,
  LightningIcon,
  PencilSimpleIcon,
  SparkleIcon,
} from "@phosphor-icons/react/ssr";

import { buttonVariants } from "@/components/ui/button";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { createClient } from "@/lib/supabase/server";
import { getSkill } from "@/features/skills/api/skills.service";
import { notFound, redirect } from "next/navigation";
import SkillDeleteBtn from "@/features/skills/components/skill-delete-btn";

async function SkillDetailContent({ id }: { id: string }) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/sign-in");
  }

  const skill = await getSkill(id, user.id);

  if (!skill) notFound();

  return (
    <div className="space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/skills" />}>
              Skills
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{skill.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="relative isolate overflow-hidden rounded-xl border border-border/70 bg-card px-6 py-7 shadow-sm sm:px-9 sm:py-9">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-32 -z-10 size-80 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-primary">
              <SparkleIcon className="size-3.5" weight="fill" />
              SKILL DETAILS
            </div>

            <div className="space-y-2.5">
              <h1 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">
                {skill.title}
              </h1>

              <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                {skill.description}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-col-reverse gap-2 sm:flex-row">
            <SkillDeleteBtn id={id} />

            <Link
              href={`/skills/${id}/edit`}
              className={buttonVariants({ size: "lg" })}
            >
              <PencilSimpleIcon data-icon="inline-start" />
              Edit skill
            </Link>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
        <Card className="gap-0">
          <CardHeader className="border-b border-border/70 pb-5">
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/60 text-primary">
                <LightningIcon className="size-4" weight="duotone" />
              </span>

              <div>
                <CardTitle className="text-lg">Instructions</CardTitle>

                <CardDescription className="mt-1">
                  The prompt and guidelines included in this skill.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-sm leading-7 text-foreground/90">
              {skill.content}
            </pre>
          </CardContent>
        </Card>

        <aside className="space-y-4">
          <Card size="sm">
            <CardHeader>
              <CardTitle>About this skill</CardTitle>

              <CardDescription>
                A quick overview of what you saved.
              </CardDescription>
            </CardHeader>

            <CardContent className="gap-4">
              <div className="flex items-start gap-3">
                <ClockIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Last updated
                  </p>

                  <p className="text-sm">Recently</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <SparkleIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    In your library
                  </p>

                  <p className="text-sm">Personal skill</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-xl border border-border/70 bg-muted/30 p-5">
            <h2 className="text-sm font-semibold">Make it yours</h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Adjust the instructions to fit your workflow, then come back
              whenever you need them.
            </p>

            <Link
              href={`/skills/${id}/edit`}
              className={`${buttonVariants({ variant: "outline" })} mt-4 w-full`}
            >
              <PencilSimpleIcon data-icon="inline-start" />
              Edit instructions
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default async function SkillDetailPage({
  params,
}: PageProps<"/skills/[id]">) {
  const { id } = await params;

  return (
    <Suspense fallback={<div>Loading skill...</div>}>
      <SkillDetailContent id={id} />
    </Suspense>
  );
}
