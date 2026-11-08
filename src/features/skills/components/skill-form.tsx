"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftIcon, SparkleIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { skillSchema } from "../skills.schema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSkillAction, editSkillAction } from "../actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Skill } from "@/generated/prisma/client";

type SkillFormProps = {
  intent?: "create" | "edit";
  skill?: Skill;
};

const SkillForm = ({ intent = "create", skill }: SkillFormProps) => {
  const isEditing = intent === "edit";
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof skillSchema>>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      title: skill?.title || "",
      description: skill?.description || "",
      content: skill?.content || "",
    },
  });

  if (isEditing && !skill) {
    return null;
  }

  const onSubmit = async (values: z.infer<typeof skillSchema>) => {
    setSubmitError(null);

    try {
      const result = await createSkillAction(values);

      if (!result.success) {
        setSubmitError(result.error);
        return;
      }

      router.push("/skills");
    } catch {
      setSubmitError("Could not create the skill. Please try again.");
    }
  };

  const onEdit = async (values: z.infer<typeof skillSchema>) => {
    setSubmitError(null);

    if (!skill?.id) {
      setSubmitError("Skill not found.");
      return;
    }

    try {
      const result = await editSkillAction(values, skill.id);

      if (!result.success) {
        setSubmitError(result.error);
        return;
      }

      router.push(`/skills/${skill.id}`);
    } catch {
      setSubmitError("Could not edit the skill. Please try again.");
    }
  };

  return (
    <div className="space-y-7">
      <header className="space-y-3 border-b border-border pb-7">
        <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.12em] text-muted-foreground">
          <SparkleIcon className="size-3.5 text-[#24b47e]" weight="fill" />
          {isEditing ? "EDIT SKILL" : "NEW SKILL"}
        </div>
        <div className="space-y-2">
          <h1 className="font-heading text-3xl leading-tight font-medium tracking-[-0.04em] sm:text-4xl">
            {isEditing ? "Edit skill" : "Create a skill"}
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            {isEditing
              ? "Update the name, description, and instructions for this skill."
              : "Capture a reusable set of instructions you can reach for whenever you need it."}
          </p>
        </div>
      </header>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start">
        <Card className="gap-0 rounded-xl shadow-none">
          <CardHeader className="border-b border-border pb-5">
            <CardTitle className="text-lg">Skill details</CardTitle>
            <CardDescription>
              {isEditing
                ? "Make changes to your skill details and instructions."
                : "Give your skill a clear name and instructions."}
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-6 pt-6">
            <form
              onSubmit={
                isEditing ? handleSubmit(onEdit) : handleSubmit(onSubmit)
              }
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="title">Name</Label>
                <Input
                  id="title"
                  placeholder="e.g. Clear technical writing"
                  required
                  aria-invalid={!!errors.title}
                  aria-describedby={errors.title ? "title-error" : undefined}
                  className="mt-1 h-10 rounded-md border-border bg-white px-3"
                  {...register("title")}
                />
                {errors.title && (
                  <p id="title-error" className="text-sm text-destructive">
                    {errors.title.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Choose a short name that is easy to recognize.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Description{" "}
                  <span className="font-normal text-muted-foreground">
                    (optional)
                  </span>
                </Label>
                <Textarea
                  id="description"
                  className="mt-1 min-h-20 resize-y rounded-md border-border bg-white px-3 py-2"
                  placeholder="What does this skill help you do?"
                  rows={2}
                  aria-invalid={!!errors.description}
                  aria-describedby={
                    errors.description ? "description-error" : undefined
                  }
                  {...register("description")}
                />
                {errors.description && (
                  <p
                    id="description-error"
                    className="text-sm text-destructive"
                  >
                    {errors.description.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  A sentence to help you find the right skill later.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Instructions</Label>
                <Textarea
                  id="content"
                  className="mt-1 min-h-72 resize-y rounded-md border-border bg-white px-3 py-3 font-mono text-sm leading-6"
                  placeholder={`# How to use this skill\n\nDescribe the task, context, and approach the assistant should follow.\n\n## Guidelines\n- Be specific about the desired outcome\n- Include any constraints or preferences`}
                  required
                  rows={14}
                  aria-invalid={!!errors.content}
                  aria-describedby={
                    errors.content ? "content-error" : undefined
                  }
                  {...register("content")}
                />
                {errors.content && (
                  <p id="content-error" className="text-sm text-destructive">
                    {errors.content.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Markdown is supported. Include the context and steps that make
                  this skill useful.
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-between">
                <Button
                  variant="outline"
                  nativeButton={false}
                  render={
                    <Link
                      href={
                        isEditing && skill?.id
                          ? `/skills/${skill.id}`
                          : "/skills"
                      }
                    />
                  }
                >
                  <ArrowLeftIcon data-icon="inline-start" />
                  {isEditing ? "Back to skill" : "Cancel"}
                </Button>
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isEditing ? "Save changes" : "Create skill"}
                </Button>
              </div>
              {submitError && (
                <p role="alert" className="text-sm text-destructive">
                  {submitError}
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        <aside className="rounded-lg border border-border bg-muted p-5">
          <h2 className="text-sm font-medium">Tips for a useful skill</h2>
          <ul className="mt-4 space-y-3 text-sm leading-5 text-muted-foreground">
            <li>Start with a clear goal or role.</li>
            <li>Describe the steps and context the assistant needs.</li>
            <li>Call out constraints, tone, or formatting preferences.</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default SkillForm;
