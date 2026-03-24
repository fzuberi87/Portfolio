import { notFound } from "next/navigation";
import Link from "next/link";
import CoverImage from "@/components/CoverImage";
import { caseStudies, type CaseStudySection } from "@/lib/caseStudies";

// Generate static params for all case studies
export async function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

// Generate metadata per case study
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  return { title: `${study.title} — Portfolio`, description: study.tagline };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  const currentIndex = caseStudies.indexOf(study);
  const prev = caseStudies[currentIndex - 1] ?? null;
  const next = caseStudies[currentIndex + 1] ?? null;

  return (
    <div className="pt-16">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-16 pb-12 md:pt-24 md:pb-16">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#555555] text-sm hover:text-[#f5f5f5] transition-colors mb-12 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
          All Work
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="text-[#555555] text-xs tracking-wide border border-[#222222] rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#f5f5f5] mb-6 max-w-4xl">
          {study.title}
        </h1>
        <p className="text-[#888888] text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
          {study.tagline}
        </p>

        {/* Meta row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#1a1a1a]">
          <MetaItem label="Role" value={study.role} />
          <MetaItem label="Company" value={study.company} />
          <MetaItem label="Year" value={study.year} />
        </div>
      </div>

      {/* ── Cover Image ──────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-20">
        <div className="relative aspect-[16/9] w-full bg-[#181818] rounded-sm overflow-hidden">
          <CoverImage
            src={study.coverImage}
            alt={study.title}
            fill
            priority
            className="object-cover"
            fallbackLabel={study.title}
          />
        </div>
      </div>

      {/* ── Content Sections ─────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 pb-28 flex flex-col gap-16">
        {study.sections.map((section, i) => (
          <Section key={i} section={section} />
        ))}
      </div>

      {/* ── Next / Prev Navigation ───────────────────────────────────────── */}
      <div className="border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row md:justify-between gap-6">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group flex flex-col gap-2 text-left"
            >
              <span className="text-[#444444] text-xs flex items-center gap-1.5">
                <span className="group-hover:-translate-x-1 transition-transform duration-200 inline-block">←</span>
                Previous
              </span>
              <span className="text-[#e5e5e5] text-base font-medium group-hover:text-white transition-colors">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="group flex flex-col gap-2 text-right md:items-end"
            >
              <span className="text-[#444444] text-xs flex items-center gap-1.5 justify-end">
                Next
                <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
              </span>
              <span className="text-[#e5e5e5] text-base font-medium group-hover:text-white transition-colors">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <div className="border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 flex items-center justify-between">
          <Link
            href="/"
            className="text-[#444444] text-xs hover:text-[#888888] transition-colors"
          >
            ← Back to all work
          </Link>
          <p className="text-[#2e2e2e] text-xs">Portfolio</p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[#444444] text-xs tracking-widest uppercase mb-1.5">
        {label}
      </p>
      <p className="text-[#c5c5c5] text-sm font-medium">{value}</p>
    </div>
  );
}

function Section({ section }: { section: CaseStudySection }) {
  switch (section.type) {
    case "text":
      return (
        <div>
          {section.heading && (
            <h2 className="text-xl md:text-2xl font-medium tracking-tight text-[#f5f5f5] mb-4">
              {section.heading}
            </h2>
          )}
          {section.body && (
            <p className="text-[#888888] leading-[1.8] text-base md:text-lg whitespace-pre-line">
              {section.body}
            </p>
          )}
        </div>
      );

    case "image":
      return (
        <figure className="-mx-6 md:-mx-12 lg:-mx-24">
          <div className="relative aspect-[16/10] bg-[#141414]">
            <CoverImage
              src={section.src!}
              alt={section.alt ?? ""}
              fill
              className="object-cover"
            />
          </div>
          {section.caption && (
            <figcaption className="px-6 md:px-12 lg:px-24 mt-4 text-[#555555] text-sm">
              {section.caption}
            </figcaption>
          )}
        </figure>
      );

    case "two-col":
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#1a1a1a] pt-8">
          <div className="text-[#888888] leading-[1.8] text-sm md:text-base whitespace-pre-line">
            {renderMarkdownLight(section.left ?? "")}
          </div>
          <div className="text-[#888888] leading-[1.8] text-sm md:text-base whitespace-pre-line">
            {renderMarkdownLight(section.right ?? "")}
          </div>
        </div>
      );

    case "quote":
      return (
        <blockquote className="border-l-2 border-[#333333] pl-6 py-2">
          <p className="text-[#c5c5c5] text-lg md:text-xl leading-relaxed italic mb-4">
            &ldquo;{section.quote}&rdquo;
          </p>
          {section.attribution && (
            <cite className="text-[#555555] text-sm not-italic">
              {section.attribution}
            </cite>
          )}
        </blockquote>
      );

    default:
      return null;
  }
}

/** Minimal bold (**text**) renderer for two-col sections */
function renderMarkdownLight(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-[#c5c5c5] font-medium">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
