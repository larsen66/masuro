"use client";

import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="flex items-center group">
      <Image
        src="/logo.svg"
        alt="Masuro"
        width={120}
        height={48}
        className="h-10 md:h-14 w-auto"
        priority
        suppressHydrationWarning
      />
    </Link>
  );
}
