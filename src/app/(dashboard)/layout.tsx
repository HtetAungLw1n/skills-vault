import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import { LightningIcon, SquaresFourIcon } from "@phosphor-icons/react/ssr";
import { connection } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UserMenu } from "@/components/user-menu";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
    <Suspense fallback={<DashboardFallback />}>
      <AuthenticatedDashboard>{children}</AuthenticatedDashboard>
    </Suspense>
  );
}

async function AuthenticatedDashboard({ children }: { children: ReactNode }) {
  await connection();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-5 sm:gap-8">
            <Link
              href="/skills"
              className="group flex shrink-0 items-center gap-2.5"
            >
              <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors group-hover:bg-[#24b47e]">
                <LightningIcon className="size-4" weight="fill" />
              </span>
              <span className="text-sm font-semibold tracking-tight">
                Skills Vault
              </span>
            </Link>

            <nav aria-label="Main navigation" className="hidden sm:block">
              <Link
                href="/skills"
                aria-current="page"
                className="inline-flex h-9 items-center gap-2 border-b-2 border-foreground px-2 text-sm font-medium text-foreground transition-colors"
              >
                <SquaresFourIcon className="size-4 text-muted-foreground" />
                Skills
              </Link>
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <span aria-hidden="true" className="mx-1 h-6 w-px bg-border/80" />
            <UserMenu name={user.user_metadata?.name} email={user.email} />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-14 pt-9 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
        {children}
      </main>
    </div>
  );
}

function DashboardFallback() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <LightningIcon className="size-4" weight="fill" />
            </span>
            <span className="text-sm font-semibold tracking-tight">
              Skills Vault
            </span>
          </div>
          <div className="size-9 animate-pulse rounded-full bg-muted" />
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-14 pt-9 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
        <div className="h-64 animate-pulse rounded-xl bg-muted/60" />
        <div className="mt-9 h-40 animate-pulse rounded-2xl bg-muted/40" />
      </main>
    </div>
  );
}
