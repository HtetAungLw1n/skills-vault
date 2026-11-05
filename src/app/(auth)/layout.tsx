import Link from "next/link";
import { LightningIcon, SparkleIcon } from "@phosphor-icons/react/ssr";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="light flex min-h-full flex-1 flex-col bg-background text-foreground">
      <header className="mx-auto flex h-16 w-full max-w-7xl items-center px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <LightningIcon className="size-4" weight="fill" />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Skills Vault
          </span>
        </Link>
      </header>

      <main className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-5 py-10 sm:px-8 md:grid-cols-2 md:gap-16 lg:gap-24">
        <section className="mx-auto w-full max-w-md">{children}</section>

        <aside className="hidden md:block">
          <div className="max-w-lg">
            <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground">
              A BETTER PLACE TO BEGIN
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-[1.12] font-medium tracking-[-0.05em] lg:text-5xl">
              A little less from scratch.
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">
              Save the words, prompts, and workflows that make your work
              easier to repeat.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-xl border border-[#303030] bg-[#1c1c1c] p-5 text-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] lg:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 items-center justify-center rounded-md bg-[#3ecf8e] text-[#171717]">
                  <LightningIcon className="size-3.5" weight="fill" />
                </span>
                <span className="text-xs font-medium">A useful skill</span>
              </div>
              <SparkleIcon className="size-4 text-[#3ecf8e]" />
            </div>
            <p className="mt-5 text-[10px] font-medium tracking-[0.12em] text-[#9a9a9a]">
              TECHNICAL WRITING
            </p>
            <h2 className="mt-2 text-lg font-medium tracking-tight">
              Make it clear. Keep it useful.
            </h2>
            <div className="mt-5 rounded-md border border-white/10 bg-[#202020] p-4 font-mono text-[11px] leading-6 text-[#d4d4d4]">
              <p className="text-[#4ade80]"># The goal</p>
              <p>Explain the important idea in plain language.</p>
              <p className="mt-2 text-[#4ade80]"># Keep in mind</p>
              <p>- Start with what matters</p>
              <p>- Keep the detail that helps</p>
              <p>- Leave out the noise</p>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-[#b2b2b2]">
              <span>Saved in your library</span>
              <span className="size-1.5 rounded-full bg-[#3ecf8e]" />
            </div>
          </div>
        </aside>
      </main>

      <footer className="mx-auto flex w-full max-w-7xl items-center justify-between border-t border-border px-5 py-5 text-xs text-muted-foreground sm:px-8">
        <span>Skills Vault</span>
        <Link href="/" className="transition-colors hover:text-foreground">
          Back to home
        </Link>
      </footer>
    </div>
  );
}
