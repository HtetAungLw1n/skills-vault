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

      <header className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.12em] text-muted-foreground">
            <SparkleIcon className="size-3.5 text-[#24b47e]" weight="fill" />
            YOUR SKILL
          </div>

          <div className="space-y-2.5">
            <h1 className="font-heading text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
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
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
        <Card className="gap-0 rounded-xl shadow-none">
          <CardHeader className="border-b border-border pb-5">
            <div className="flex items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-[#fafafa] text-[#24b47e]">
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
            <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-md bg-[#1c1c1c] p-5 font-mono text-sm leading-7 text-white">
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

          <div className="rounded-lg border border-border bg-[#fafafa] p-5">
            <h2 className="text-sm font-medium">Make it yours</h2>

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
