import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { Heart, ArrowLeft, SlidersHorizontal, ShoppingCart } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getCategory(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      children: true,
      listings: {
        where: { status: "ACTIVE" },
        include: { seller: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  return (
    <div>
      {/* Breadcrumb bar */}
      <div className="bg-[#F1F5F9]">
        <div className="mx-auto max-w-[1310px] px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/categories">
              <Button variant="ghost" size="sm" className="gap-1 text-[#0F0D1A] hover:bg-white rounded-none">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <Button className="bg-[#D57429] hover:bg-[#c06524] text-white rounded-none h-[30px] px-4 text-xs gap-1">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1310px] px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-[32px] font-bold text-[#0F0D1A] inline-flex items-center gap-2">
            <span className="text-[#D57429]">✦</span> {category.name}{" "}
            <span className="text-[#D57429]">✦</span>
          </h1>
          <p className="text-[#403D3D] mt-2 text-sm">
            {category.listings.length} listings available
          </p>
        </div>

        {category.children.length > 0 && (
          <div className="mb-8">
            <div className="flex gap-2 flex-wrap">
              {category.children.map((child) => (
                <Link key={child.id} href={`/categories/${child.slug}`}>
                  <Badge variant="outline" className="cursor-pointer hover:bg-[#F7F7F7] rounded-none border-[#E5E7EB] text-[#0F0D1A]">
                    {child.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}

        {category.listings.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#403D3D]">No listings found in this category.</p>
            <Link href="/categories">
              <Button className="mt-4 bg-[#0F4041] hover:bg-[#0a3334] rounded-none">Browse All Categories</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
              {category.listings.map((listing, index) => {
                const images = JSON.parse(listing.images || "[]");
                const imageUrl = images[listing.featuredImageIndex] || "/placeholder.svg";
                const isFirst = index === 0;
                return (
                  <Link key={listing.id} href={`/listings/${listing.slug}`}>
                    <Card className="group overflow-hidden border-0 shadow-none hover:shadow-md transition-all rounded-none">
                      <CardContent className="p-0">
                        <div className="relative aspect-[3/4] overflow-hidden border border-[#F1F5F9]">
                          <Image
                            src={imageUrl}
                            alt={listing.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="p-3 space-y-2 bg-white">
                          <h3 className="font-medium text-sm text-[#0F0D1A] line-clamp-1">{listing.title}</h3>
                          <p className="text-[#0F4041] font-semibold">$ {listing.price.toFixed(2)}</p>
                          {isFirst ? (
                            <AddToCartButton
                              listingId={listing.id}
                              className="w-full bg-[#0F4041] hover:bg-[#0a3334] text-white text-xs h-9 rounded-none"
                            />
                          ) : (
                            <Button
                              size="icon"
                              className="w-10 h-9 bg-[#0F4041] hover:bg-[#0a3334] text-white rounded-none"
                            >
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-12">
              <Button className="w-8 h-8 rounded-none bg-[#951E45] hover:bg-[#7a1839] text-white text-xs p-0">1</Button>
              <Button variant="outline" className="w-8 h-8 rounded-none border-[#E5E7EB] text-[#0F0D1A] hover:bg-[#F7F7F7] text-xs p-0">2</Button>
              <Button variant="outline" className="w-8 h-8 rounded-none border-[#E5E7EB] text-[#0F0D1A] hover:bg-[#F7F7F7] text-xs p-0">3</Button>
              <Button variant="outline" className="w-8 h-8 rounded-none border-[#E5E7EB] text-[#0F0D1A] hover:bg-[#F7F7F7] text-xs p-0">4</Button>
              <span className="text-[#403D3D] px-1">...</span>
              <Button variant="outline" className="w-8 h-8 rounded-none border-[#E5E7EB] text-[#0F0D1A] hover:bg-[#F7F7F7] text-xs p-0">
                <ArrowLeft className="h-3 w-3 rotate-180" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
