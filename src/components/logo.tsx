import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export function Logo({ size = "md" }: LogoProps) {
  const sizes = {
    sm: { script: "text-xl", serif: "text-xl" },
    md: { script: "text-2xl", serif: "text-2xl" },
    lg: { script: "text-3xl", serif: "text-3xl" },
  };

  const s = sizes[size];

  return (
    <Link href="/" className="flex items-center gap-0.5 shrink-0 select-none">
      <span
        className={`${s.script} font-script text-[#951E45] tracking-normal leading-none`}
        style={{ fontFamily: "var(--font-script), cursive" }}
      >
        Culture
      </span>
      <span
        className={`${s.serif} font-serif text-[#0F4041] tracking-tight leading-none font-semibold`}
        style={{ fontFamily: "var(--font-serif), serif" }}
      >
        {" "}Closet
      </span>
    </Link>
  );
}
