// ─────────────────────────────────────────────────────────────────────────────
//  PORTFOLIO DATA — Edit this file to update your content
// ─────────────────────────────────────────────────────────────────────────────

export interface CaseStudySection {
  type: "text" | "image" | "two-col" | "quote";
  /** For "text" sections */
  heading?: string;
  body?: string;
  /** For "image" sections — put your images in /public/images/ */
  src?: string;
  alt?: string;
  caption?: string;
  /** For "two-col" sections */
  left?: string;
  right?: string;
  /** For "quote" sections */
  quote?: string;
  attribution?: string;
}

export interface CaseStudy {
  /** URL slug — e.g. "redesigning-checkout" → /work/redesigning-checkout */
  slug: string;
  /** Card title shown on home page */
  title: string;
  /** One-line description shown on home page card */
  tagline: string;
  /** Tags shown on card, e.g. ["UX Design", "Research"] */
  tags: string[];
  /** Cover image path — put image in /public/images/ */
  coverImage: string;
  /** Year or date range, e.g. "2024" or "2023–2024" */
  year: string;
  /** Full role, e.g. "Lead Product Designer" */
  role: string;
  /** Company or client name */
  company: string;
  /**
   * Rich content sections for the case study detail page.
   * Add as many sections as you need.
   */
  sections: CaseStudySection[];
}

// ─────────────────────────────────────────────────────────────────────────────
//  YOUR CASE STUDIES — Add, remove, or reorder items here
// ─────────────────────────────────────────────────────────────────────────────

export const caseStudies: CaseStudy[] = [
  {
    slug: "redesigning-checkout",
    title: "Redesigning the Checkout Experience",
    tagline: "Reducing friction and increasing conversions by 34%",
    tags: ["UX Design", "Research", "Prototyping"],
    coverImage: "/images/placeholder-1.jpg",
    year: "2024",
    role: "Lead Product Designer",
    company: "Acme Corp",
    sections: [
      {
        type: "text",
        heading: "Overview",
        body: "The existing checkout flow had a 72% abandonment rate. Users were confused by the multi-step process, unclear error messages, and a lack of trust signals. This project was a full redesign from research to launch.",
      },
      {
        type: "two-col",
        left: "**The Problem**\nUsers were dropping off at the payment step due to confusing form layouts and missing progress indicators.",
        right: "**My Role**\nI led end-to-end design — user research, wireframes, high-fidelity prototypes, and handoff to engineering.",
      },
      {
        type: "image",
        src: "/images/placeholder-1.jpg",
        alt: "Checkout wireframes showing the before and after states",
        caption: "Early wireframes exploring single-page vs. stepped checkout patterns",
      },
      {
        type: "text",
        heading: "Research",
        body: "I conducted 12 usability sessions and analyzed 6 months of session recordings. The core insight: users didn't understand where they were in the process, and error messages offered no guidance on how to fix mistakes.",
      },
      {
        type: "quote",
        quote: "I just want to know how many steps are left. It feels like it goes on forever.",
        attribution: "— Participant, usability study",
      },
      {
        type: "text",
        heading: "Outcome",
        body: "After launch, checkout abandonment dropped from 72% to 38% — a 34% improvement. Average time-to-complete decreased by 1.8 minutes. The redesign became a template for the company's other checkout flows.",
      },
    ],
  },
  {
    slug: "design-system",
    title: "Building a Design System from Scratch",
    tagline: "A single source of truth for 5 product teams",
    tags: ["Design Systems", "Component Library", "Documentation"],
    coverImage: "/images/placeholder-2.jpg",
    year: "2023",
    role: "Senior Product Designer",
    company: "Startup Inc.",
    sections: [
      {
        type: "text",
        heading: "Overview",
        body: "Five teams, five different visual languages, and no shared component library. This project unified the product suite under one cohesive design system — from token definitions to a full Figma library and React component library.",
      },
      {
        type: "two-col",
        left: "**The Challenge**\nInconsistent UI meant designers were rebuilding the same components repeatedly and engineers were shipping slightly different versions of the same element.",
        right: "**Outcome**\nDesign-to-dev handoff time dropped by 40%. New features are now shipped 2× faster due to reusable, documented components.",
      },
      {
        type: "image",
        src: "/images/placeholder-2.jpg",
        alt: "Design system component overview",
        caption: "Core components: buttons, inputs, cards, navigation, and data display",
      },
    ],
  },
  {
    slug: "mobile-onboarding",
    title: "Mobile Onboarding Redesign",
    tagline: "Increasing Day-7 retention by 22% through better first impressions",
    tags: ["Mobile", "UX Research", "Interaction Design"],
    coverImage: "/images/placeholder-3.jpg",
    year: "2023",
    role: "Product Designer",
    company: "FinTech Co.",
    sections: [
      {
        type: "text",
        heading: "Overview",
        body: "New users were churning within the first week. Digging into analytics and user interviews revealed that the onboarding experience was overwhelming, asking for too much information upfront and failing to demonstrate value quickly.",
      },
      {
        type: "text",
        heading: "Approach",
        body: "I applied a 'progressive disclosure' strategy — breaking the 12-screen onboarding into a 4-screen essential setup, then surfacing additional steps contextually once users were active.",
      },
      {
        type: "image",
        src: "/images/placeholder-3.jpg",
        alt: "Mobile onboarding screens",
        caption: "Before (left) vs. After (right) — a 12-screen flow condensed to 4 essential steps",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  PERSONAL INFO — Update with your own details
// ─────────────────────────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Your Name",
  role: "Product Designer",
  tagline: "I design digital products that are clear, intentional, and built around people.",
  /** LinkedIn profile URL */
  linkedIn: "https://www.linkedin.com/in/yourhandle",
  /** Email address */
  email: "hello@yourdomain.com",
  /** Short bio shown on the home page */
  bio: "I'm a product designer with a focus on UX strategy, design systems, and building experiences that scale. Currently open to new opportunities.",
};
