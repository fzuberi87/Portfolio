import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <p className="text-[#333333] text-8xl font-medium mb-6">404</p>
        <h1 className="text-[#888888] text-xl mb-8">Page not found</h1>
        <Link
          href="/"
          className="text-[#f5f5f5] text-sm underline underline-offset-4 hover:text-white transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
