export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { getPrisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { WishlistButton } from "@/components/wishlist-button";
import { Search } from "lucide-react";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

async function searchListings(query: string) {
  const prisma = await getPrisma();
  if (!query) return [];
  return prisma.listing.findMany({
    where: {
      status: "ACTIVE",
      OR: [
        { title: { contains: query } },
        { description: { contains: query } },
        { category: { name: { contains: query } } },
      ],
    },
    include: { category: true, seller: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
    take: 24,
  });
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const listings = q ? await searchListings(q) : [];

  return (
    <div className="mx-auto max-w-[1310px] px-4 py-8">
      <div className="max-w-xl mx-auto mb-8">
        <form action="/search" className="relative">
          <Input
            name="q"
            type="search"
            placeholder="Search items..."
            defaultValue={q || ""}
            className="w-full pl-4 pr-12 py-3 rounded-none border-[#E5E7EB]"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-none bg-[#D57429] hover:bg-[#c06524]"
          >
            <Search className="h-3.5 w-3.5 text-white" />
          </Button>
        </form>
      </div>

      {q && (
        <div className="mb-6">
          <h1 className="text-xl font-semibold">
            Search results for &quot;{q}&quot;
          </h1>
          <p className="text-[#403D3D]">{listings.length} items found</p>
        </div>
      )}

      {listings.length === 0 ? (
        <div className="text-center py-16">
          <Search className="h-12 w-12 mx-auto text-[#403D3D] mb-4" />
          <h2 className="text-lg font-semibold mb-2">
            {q ? "No results found" : "Start searching"}
          </h2>
          <p className="text-[#403D3D]">
            {q
              ? "Try different keywords or browse our categories"
              : "Enter a keyword to find pre-loved South Asian fashion"}
          </p>
          <Link href="/categories">
            <Button className="mt-4 rounded-none bg-[#0F4041] hover:bg-[#0a3334]">Browse Categories</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {listings.map((listing) => {
            const images = JSON.parse(listing.images || "[]");
            const imageUrl = images[listing.featuredImageIndex] || "/placeholder.svg";
            return (
              <Link key={listing.id} href={`/listings/${listing.slug}`} className="group block">
                <div className="overflow-hidden hover:shadow-md transition-all">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#F4F0EB]">
                    <Image
                      src={imageUrl}
                      alt={listing.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <WishlistButton listingId={listing.id} className="h-8 w-8 bg-white/80 hover:bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="p-3 space-y-1.5 bg-white">
                    <h3 className="font-medium text-sm text-[#0F0D1A] line-clamp-2 leading-snug">{listing.title}</h3>
                    <p className="text-xs text-[#403D3D]">{listing.category.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-[#0F4041] font-bold text-sm">$ {listing.price.toFixed(2)}</p>
                      {listing.originalPrice && (
                        <p className="text-xs text-[#951E45] line-through">$ {listing.originalPrice.toFixed(2)}</p>
                      )}
                    </div>
                    <AddToCartButton listingId={listing.id} className="w-full rounded-none bg-[#0F4041] hover:bg-[#0a3334] text-white text-xs h-9" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
