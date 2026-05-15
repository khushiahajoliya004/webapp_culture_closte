export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { getPrisma } from "@/lib/db";

async function getCategories() {
  const prisma = await getPrisma();
  return prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { parent: true },
  });
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-[1310px] px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-[32px] font-bold text-[#0F0D1A] inline-flex items-center gap-2">
          <span className="text-[#D57429]">✦</span> Categories{" "}
          <span className="text-[#D57429]">✦</span>
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#E5E0D8]">
              {category.imageUrl ? (
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 bg-[#ADA17F]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                {category.parent && (
                  <p className="text-white/70 text-xs">{category.parent.name}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
