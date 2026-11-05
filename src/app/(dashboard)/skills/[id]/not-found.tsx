import Link from "next/link";
import { ArrowLeftIcon, MagnifyingGlassIcon } from "@phosphor-icons/react/ssr";
import { buttonVariants } from "@/components/ui/button";

export default function SkillNotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl border border-border/70 bg-muted/50 text-primary">
        <MagnifyingGlassIcon className="size-6" />
      </span>
      <p className="mt-6 text-xs font-semibold tracking-[0.16em] text-primary">
        SKILL NOT FOUND
      </p>
      <h1 className="mt-3 font-heading text-3xl font-medium tracking-tight sm:text-4xl">
        This skill isn’t here
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
        It may have been removed, or you may not have access to it. Head back to
        your library to find another skill.
      </p>
      <Link
        href="/skills"
        className={`${buttonVariants({ variant: "outline" })} mt-7`}
      >
        <ArrowLeftIcon data-icon="inline-start" />
        Back to skills
      </Link>
    </div>
  );
}
