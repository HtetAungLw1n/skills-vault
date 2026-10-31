"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, PlusIcon, SparkleIcon } from "@phosphor-icons/react";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SkillCard, type SkillCardData } from "./skill-card";

export function SkillsList({ skills }: { skills: SkillCardData[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return skills;

    return skills.filter((skill) => {
      const haystack = `${skill.title} ${skill.description ?? ""}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [query, skills]);

  if (skills.length === 0) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SparkleIcon />
          </EmptyMedia>
          <EmptyTitle>No skills yet</EmptyTitle>
          <EmptyDescription>
            Create your first skill to start building a vault of reusable AI
            instructions.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link href="/skills/new" className={buttonVariants()}>
            <PlusIcon data-icon="inline-start" />
            New skill
          </Link>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <InputGroup className="max-w-sm bg-background">
        <InputGroupAddon>
          <MagnifyingGlassIcon />
        </InputGroupAddon>
        <InputGroupInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search skills"
          aria-label="Search skills"
        />
      </InputGroup>

      {filtered.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle>No matching skills</EmptyTitle>
            <EmptyDescription>
              Nothing matches “{query.trim()}”. Try a different search.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
}
