"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { personalInfo } from "@/lib/caseStudies";

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d]/90 backdrop-blur-sm border-b border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Name / Logo */}
        <Link
          href="/"
          className="text-sm font-medium tracking-wide text-[#f5f5f5] hover:text-white transition-colors"
        >
          {personalInfo.name}
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm tracking-wide transition-colors ${
              pathname === "/"
                ? "text-[#f5f5f5]"
                : "text-[#888888] hover:text-[#f5f5f5]"
            }`}
          >
            Work
          </Link>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-sm tracking-wide text-[#888888] hover:text-[#f5f5f5] transition-colors"
          >
            Contact
          </a>
          <a
            href={personalInfo.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-wide text-[#888888] hover:text-[#f5f5f5] transition-colors"
          >
            LinkedIn ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
