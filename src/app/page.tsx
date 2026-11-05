import Link from "next/link";
import {
  ArrowRightIcon,
  LightningIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  SparkleIcon,
} from "@phosphor-icons/react/ssr";
import { buttonVariants } from "@/components/ui/button";

const previewSkills = [
  {
    title: "Clear technical writing",
    description: "Turn complex ideas into writing people can follow.",
    updated: "Edited today",
  },
  {
    title: "Thoughtful code review",
    description: "Find the important issues. Explain them with care.",
    updated: "Edited yesterday",
  },
  {
    title: "Research brief",
    description: "Get to the signal, with sources and context intact.",
    updated: "Edited Oct 28",
  },
];

export default function Home() {
  return (
    <div className="light min-h-full bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <LightningIcon className="size-4" weight="fill" />
            </span>
            <span className="text-sm font-semibold tracking-tight">
              Skills Vault
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              How it works
            </a>
            <a
              href="#your-workflow"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Your workflow
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="hidden rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className={buttonVariants({ size: "default" })}
            >
              Get started
              <ArrowRightIcon data-icon="inline-end" weight="bold" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16 lg:pt-28">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 border-b border-border pb-3 text-xs font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
              A calmer home for your AI workflows
            </div>
            <h1 className="mt-7 font-heading text-[42px] leading-[1.08] font-medium tracking-[-0.055em] sm:text-5xl lg:text-[60px]">
              Your best instructions,{" "}
              <span className="text-muted-foreground">within reach.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Save the prompts and workflows that work. Find them when you need
              them. Spend less time starting from scratch.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/sign-up"
                className={buttonVariants({ size: "lg" })}
              >
                Create your vault
                <ArrowRightIcon data-icon="inline-end" weight="bold" />
              </Link>
              <Link
                href="/sign-in"
                className={`${buttonVariants({ variant: "outline", size: "lg" })} bg-white`}
              >
                Sign in
              </Link>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              A simple, personal library for the way you work.
            </p>
          </div>

          <div
            aria-label="Preview of the Skills Vault library"
            className="relative min-w-0"
          >
            <div className="absolute -inset-4 -z-10 rounded-2xl bg-[#fafafa] sm:-inset-6" />
            <div className="overflow-hidden rounded-xl border border-border bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between border-b border-[#ededed] px-4 py-3.5 sm:px-5">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-7 items-center justify-center rounded-md bg-primary text-[#171717]">
                    <LightningIcon className="size-3.5" weight="fill" />
                  </span>
                  <span className="text-xs font-semibold">Your library</span>
                  <span className="rounded-full bg-[#fafafa] px-2 py-0.5 text-[10px] text-[#707070]">
                    08 skills
                  </span>
                </div>
                <span className="flex size-8 items-center justify-center rounded-md border border-[#dfdfdf] text-[#707070]">
                  <PlusIcon className="size-4" />
                </span>
              </div>

              <div className="grid md:grid-cols-[1fr_0.88fr]">
                <div className="p-4 sm:p-5">
                  <div className="mb-3 flex h-9 items-center gap-2 rounded-md border border-[#dfdfdf] px-3 text-xs text-[#9a9a9a]">
                    <MagnifyingGlassIcon className="size-3.5" />
                    Search your skills
                  </div>
                  <div className="divide-y divide-[#ededed]">
                    {previewSkills.map((skill, index) => (
                      <div
                        key={skill.title}
                        className={`flex gap-3 py-3.5 ${index === 0 ? "rounded-md bg-[#fafafa] px-2.5" : "px-2.5"}`}
                      >
                        <span
                          className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border ${index === 0 ? "border-[#3ecf8e]/40 bg-[#3ecf8e]/10 text-[#24b47e]" : "border-[#ededed] text-[#9a9a9a]"}`}
                        >
                          <SparkleIcon className="size-3.5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-xs font-medium text-[#212121]">
                            {skill.title}
                          </span>
                          <span className="mt-1 block line-clamp-1 text-[11px] leading-4 text-[#707070]">
                            {skill.description}
                          </span>
                          <span className="mt-2 block text-[10px] text-[#9a9a9a]">
                            {skill.updated}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-[#ededed] bg-[#1c1c1c] p-4 text-white md:border-l md:border-t-0 sm:p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium tracking-[0.12em] text-[#b2b2b2]">
                      SKILL PREVIEW
                    </span>
                    <span className="size-1.5 rounded-full bg-[#3ecf8e]" />
                  </div>
                  <h2 className="mt-6 text-sm font-medium">
                    Clear technical writing
                  </h2>
                  <p className="mt-2 text-[11px] leading-5 text-[#b2b2b2]">
                    Make the complex feel simple without losing what matters.
                  </p>
                  <div className="mt-5 border-t border-white/10 pt-4 font-mono text-[10px] leading-5 text-[#d4d4d4]">
                    <p className="text-[#4ade80]"># Role</p>
                    <p>Write with clarity and precision.</p>
                    <p className="mt-2 text-[#4ade80]"># Guidelines</p>
                    <p>- Lead with the main idea</p>
                    <p>- Prefer plain, direct language</p>
                    <p>- Keep useful detail intact</p>
                  </div>
                  <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-3 text-[10px] text-[#9a9a9a]">
                    <span className="size-1.5 rounded-full bg-[#3ecf8e]" />
                    Ready whenever you are
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 text-right text-[11px] text-muted-foreground">
              Your ideas, kept close.
            </p>
          </div>
        </section>

        <section
          id="how-it-works"
          className="border-y border-border bg-[#fafafa]"
        >
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground">
                LESS REPEATING. MORE DOING.
              </p>
              <h2 className="mt-4 max-w-md font-heading text-3xl leading-tight font-medium tracking-[-0.04em] sm:text-4xl">
                Make your best work reusable.
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
              <article className="border-t border-border pt-4">
                <span className="font-mono text-xs text-muted-foreground">
                  01
                </span>
                <h3 className="mt-4 text-sm font-medium">Capture the good ones</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Turn a great prompt into a skill you can come back to.
                </p>
              </article>
              <article className="border-t border-border pt-4">
                <span className="font-mono text-xs text-muted-foreground">
                  02
                </span>
                <h3 className="mt-4 text-sm font-medium">Find them fast</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Keep your library searchable and easy to scan.
                </p>
              </article>
              <article className="border-t border-border pt-4">
                <span className="font-mono text-xs text-muted-foreground">
                  03
                </span>
                <h3 className="mt-4 text-sm font-medium">Keep improving</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Refine your instructions as your workflow changes.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="your-workflow"
          className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-16 sm:px-8 sm:py-20 md:flex-row md:items-center md:justify-between"
        >
          <div className="max-w-xl">
            <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground">
              START WITH ONE
            </p>
            <h2 className="mt-3 font-heading text-3xl leading-tight font-medium tracking-[-0.04em] sm:text-4xl">
              Your next great workflow is one save away.
            </h2>
          </div>
          <Link
            href="/sign-up"
            className={buttonVariants({ size: "lg" })}
          >
            Create your vault
            <ArrowRightIcon data-icon="inline-end" weight="bold" />
          </Link>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link href="/" className="flex items-center gap-2 font-medium text-foreground">
            <LightningIcon className="size-3.5 text-primary" weight="fill" />
            Skills Vault
          </Link>
          <p>Keep the instructions that help you do your best work.</p>
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            Sign in <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
