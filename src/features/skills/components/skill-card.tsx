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
        className="h-full transition-shadow group-hover:shadow-md group-hover:ring-foreground/15 group-focus-visible:ring-ring/50 group-focus-visible:ring-3"
      >
        <CardHeader>
          <div className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/60 text-primary">
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
          <p className="text-xs text-muted-foreground">
            Updated {formatUpdatedAt(skill.updatedAt)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
