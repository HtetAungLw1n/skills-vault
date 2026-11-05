import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SkillForm from "@/features/skills/components/skill-form";
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { getSkill } from "@/features/skills/api/skills.service";

export default async function EditSkillPage({
  params,
}: PageProps<"/skills/[id]/edit">) {
  const { id } = await params;

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
    <div className="mx-auto max-w-7xl space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/skills" />}>
              Skills
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href={`/skills/${id}`} />}>
              Skill details
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit skill</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <SkillForm intent="edit" skill={skill} />
    </div>
  );
}
