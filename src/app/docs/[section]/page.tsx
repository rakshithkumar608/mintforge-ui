import { DocsHeader } from "@/components/docs/docs-header";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";
import { ComponentCode } from "@/components/docs/component-code";
import Link from "next/link";
import { Layers } from "lucide-react";

export function generateStaticParams() {
  return [
    { section: "blocks" },
    { section: "templates" },
  ];
}

export default async function DynamicSectionDocPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const resolvedParams = await params;
  const section = resolvedParams.section;
  const formattedTitle = section
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const tocItems = [
    { id: "overview", title: "Overview" },
    { id: "quickstart", title: "Quickstart" },
  ];

  return (
    <>
      <div className="mf-docs-main">
        <DocsHeader
          title={formattedTitle}
          description={`Documentation and developer guides for Mintforge UI ${formattedTitle.toLowerCase()}.`}
          prevHref="/docs"
          nextHref="/docs/components"
        />

        <div className="p-8 rounded-xl border border-border bg-card flex flex-col items-center justify-center text-center my-6 gap-3">
          <div className="w-12 h-12 rounded-xl bg-brand-subtle text-brand flex items-center justify-center">
            <Layers size={24} />
          </div>
          <h3 className="text-base font-bold text-foreground">
            {formattedTitle} Guide
          </h3>
          <p className="text-xs text-muted-foreground max-w-md">
            This module is part of the Mintforge ecosystem. Use the command line interface or view our interactive component catalog.
          </p>
        </div>

        <section id="quickstart" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Quickstart</h2>
          <ComponentCode
            packageManagerTabs
            commands={{
              pnpm: `pnpm dlx mintforge@latest ${section}`,
              npm: `npx mintforge@latest ${section}`,
              yarn: `yarn dlx mintforge@latest ${section}`,
              bun: `bunx mintforge@latest ${section}`,
            }}
          />
        </section>

        <div className="mt-12 pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>Need help getting started?</span>
          <Link href="/docs/installation" className="text-brand hover:underline font-medium">
            Read the Installation Guide &rarr;
          </Link>
        </div>
      </div>

      <DocsTableOfContents items={tocItems} />
    </>
  );
}
