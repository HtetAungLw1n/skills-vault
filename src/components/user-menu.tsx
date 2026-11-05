"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { CaretDownIcon, SignOutIcon } from "@phosphor-icons/react";

type UserMenuProps = {
  name?: string;
  email?: string;
  avatarUrl?: string;
};

export function UserMenu({ name, email, avatarUrl }: UserMenuProps) {
  const router = useRouter();

  const initials =
    name
      ?.trim()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("") || "U";

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/sign-in");
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            aria-label="Open account menu"
            className="group flex items-center gap-2 rounded-md p-1.5 pr-2 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          />
        }
      >
        <Avatar size="sm" className="ring-2 ring-background">
          <AvatarImage src={avatarUrl} alt={name ?? "User"} />
          <AvatarFallback className="bg-[#ebfff5] font-medium text-[#24b47e]">
            {initials}
          </AvatarFallback>
        </Avatar>
        <span className="hidden min-w-0 sm:block">
          <span className="block max-w-36 truncate text-xs font-medium leading-4">
            {name ?? "Your account"}
          </span>
          <span className="block max-w-36 truncate text-[11px] leading-4 text-muted-foreground">
            {email ?? "Account settings"}
          </span>
        </span>
        <CaretDownIcon className="hidden size-3.5 text-muted-foreground transition-transform group-aria-expanded:rotate-180 sm:block" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 rounded-lg border border-border p-1.5 shadow-lg"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-3 py-2.5">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar size="sm">
                <AvatarImage src={avatarUrl} alt={name ?? "User"} />
                <AvatarFallback className="bg-[#ebfff5] font-medium text-[#24b47e]">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium text-foreground">
                  {name ?? "Your account"}
                </span>
                {email && <span className="truncate text-xs">{email}</span>}
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          onClick={handleLogout}
          className="min-h-10 cursor-pointer rounded-md px-3 text-destructive focus:text-destructive"
        >
          <SignOutIcon className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
