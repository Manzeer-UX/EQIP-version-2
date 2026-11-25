import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-end bg-ink-950 pt-[calc(4.5rem+4rem)] pb-[clamp(4rem,8vw,7rem)]">
      <div className="shell">
        <p className="type-label text-graphite-300">404 · Not found</p>
        <h1 className="type-display-m mt-8 max-w-[16ch] text-paper-100">This page is not part of the estate.</h1>
        <div className="mt-10">
          <ButtonLink href="/" variant="solid-light" arrow>
            Back to the homepage
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
