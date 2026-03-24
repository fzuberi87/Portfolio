import Link from "next/link";
import { caseStudies, personalInfo } from "@/lib/caseStudies";
import CoverImage from "@/components/CoverImage";

export default function Home() {
  return (
    <div className="pt-16">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-3xl">
          <p className="text-[#888888] text-xs tracking-widest uppercase mb-6">
            {personalInfo.role}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight mb-8 text-[#f5f5f5]">
            {personalInfo.tagline}
          </h1>
          <p className="text-[#888888] text-base md:text-lg leading-relaxed max-w-xl">
            {personalInfo.bio}
          </p>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <hr className="border-[#1a1a1a]" />
      </div>

      {/* ── Case Studies ─────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <p className="text-[#888888] text-xs tracking-widest uppercase mb-12">
          Selected Work
        </p>

        <div className="flex flex-col">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} index={i} />
          ))}
        </div>
      </section>

      {/* ── Footer / Contact ─────────────────────────────────────────────── */}
      <footer id="contact" className="border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
            <div>
              <p className="text-[#888888] text-xs tracking-widest uppercase mb-6">
                Get in Touch
              </p>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#f5f5f5] mb-6">
                Let&apos;s work together.
              </h2>
              <p className="text-[#888888] text-base max-w-md leading-relaxed">
                Have a project in mind, or just want to connect? I&apos;d love to hear from you.
              </p>
            </div>

            <div className="flex flex-col gap-4 shrink-0">
              <a
                href={`mailto:${personalInfo.email}`}
                className="group flex items-center gap-3 text-[#f5f5f5] text-base font-medium hover:text-white transition-colors"
              >
                <span className="w-9 h-9 rounded-full border border-[#2a2a2a] flex items-center justify-center text-xs group-hover:border-[#555] transition-colors">
                  ✉
                </span>
                {personalInfo.email}
              </a>
              <a
                href={personalInfo.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-[#f5f5f5] text-base font-medium hover:text-white transition-colors"
              >
                <span className="w-9 h-9 rounded-full border border-[#2a2a2a] flex items-center justify-center text-xs font-bold group-hover:border-[#555] transition-colors">
                  in
                </span>
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div className="mt-20 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-[#141414]">
            <p className="text-[#333333] text-xs">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
            <p className="text-[#333333] text-xs">{personalInfo.role}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

type CaseStudy = (typeof caseStudies)[number];

function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group block border-t border-[#1a1a1a] py-10 md:py-12 hover:bg-[#111111] -mx-6 md:-mx-12 px-6 md:px-12 transition-colors duration-200"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
        {/* Index */}
        <span className="hidden md:block text-[#2e2e2e] text-xs font-mono mt-2 shrink-0 w-6">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Thumbnail */}
        <div className="w-full md:w-64 lg:w-80 shrink-0 overflow-hidden rounded-sm">
          <div className="relative aspect-[16/10] bg-[#181818]">
            <CoverImage
              src={study.coverImage}
              alt={study.title}
              fill
              className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
              fallbackLabel={study.title}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between gap-6 md:py-1">
          <div>
            <div className="flex flex-wrap gap-2 mb-5">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[#555555] text-xs tracking-wide border border-[#222222] rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-[#e5e5e5] group-hover:text-white mb-3 transition-colors">
              {study.title}
            </h2>
            <p className="text-[#666666] text-sm md:text-base leading-relaxed">
              {study.tagline}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[#444444] text-xs">{study.company}</span>
              <span className="text-[#2a2a2a] text-xs">·</span>
              <span className="text-[#444444] text-xs">{study.year}</span>
            </div>
            <span className="text-[#444444] text-sm group-hover:text-[#888888] transition-colors flex items-center gap-1.5">
              View case study
              <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
