"use client";

import Image from "next/image";
import { useState } from "react";

interface CoverImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  /** Shown when image fails to load */
  fallbackLabel?: string;
}

export default function CoverImage({
  src,
  alt,
  fill = false,
  priority = false,
  className = "",
  fallbackLabel,
}: CoverImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#181818]">
        <div className="text-center px-6">
          {fallbackLabel && (
            <p className="text-[#333333] text-xs tracking-widest uppercase">
              {fallbackLabel}
            </p>
          )}
          <p className="text-[#222222] text-xs mt-2">
            Add your image to /public/images/
          </p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
