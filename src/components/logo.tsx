import Link from "next/link";
import Image from "next/image";
import { cloudinaryImages as ci } from "@/lib/cloudinary-images";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export function Logo({ size = "md" }: LogoProps) {
  const height = { sm: 32, md: 42, lg: 52 }[size];
  const width = height * 5;

  return (
    <Link href="/" className="flex items-center shrink-0 select-none">
      <Image
        src={ci.logo}
        alt="Culture Closet logo"
        height={height}
        width={width}
        className="object-contain"
        preload
      />
    </Link>
  );
}
