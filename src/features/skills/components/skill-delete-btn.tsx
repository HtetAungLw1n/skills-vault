"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteSkillAction } from "../actions";

const SkillDeleteBtn = ({ id }: { id: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteSkillAction(id);
    router.push("/skills");
  };

  return (
    <Button variant={"destructive"} onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default SkillDeleteBtn;
