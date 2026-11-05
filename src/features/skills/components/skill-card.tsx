import Link from "next/link";
import { LightningIcon } from "@phosphor-icons/react/ssr";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type SkillCardData = {
  id: string;
  title: string;
  description: string | null;
  updatedAt: string | Date;
};

function formatUpdatedAt(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function SkillCard({ skill }: { skill: SkillCardData }) {
  return (
    <Link href={`/skills/${skill.id}`} className="group block h-full outline-none">
      <Card
        size="sm"
        className="h-full rounded-lg transition-colors group-hover:border-[#c7c7c7] group-focus-visible:ring-ring/50 group-focus-visible:ring-2"
      >
        <CardHeader>
          <div className="flex items-start gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-[#fafafa] text-[#24b47e]">
              <LightningIcon className="size-4" weight="duotone" />
            </span>
            <div className="min-w-0">
              <CardTitle className="truncate">{skill.title}</CardTitle>
              <CardDescription className="mt-1 line-clamp-2">
                {skill.description || "No description"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="mt-auto">
          <p className="border-t border-[#ededed] pt-3 text-xs text-muted-foreground">
            Updated {formatUpdatedAt(skill.updatedAt)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
