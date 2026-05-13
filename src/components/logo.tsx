import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export function Logo({ size = "md" }: LogoProps) {
  const iconSize = { sm: 32, md: 42, lg: 52 };
  const textSize = { sm: "text-lg", md: "text-2xl", lg: "text-3xl" };
  const icon = iconSize[size];
  const text = textSize[size];

  return (
    <Link href="/" className="flex items-center gap-1.5 shrink-0 select-none">
      <Image
        src="/images/figma/logo.png"
        alt="C"
        height={icon}
        width={icon}
        className="object-contain"
        priority
      />
      <div className="flex items-baseline gap-0">
        <span
          className={`${text} text-[#951E45] leading-none italic`}
          style={{ fontFamily: "var(--font-sans), serif" }}
        >
          Culture
        </span>
        <span
          className={`${text} text-[#0F4041] leading-none font-semibold`}
          style={{ fontFamily: "var(--font-serif), serif" }}
        >
          {" "}Closet
        </span>
      </div>
    </Link>
  );
}
