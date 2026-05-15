import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPrisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WishlistButton } from "@/components/wishlist-button";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ArrowLeft, Check, MessageSquare, Star, ChevronDown } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getListing(slug: string) {
  const prisma = await getPrisma();
  return prisma.listing.findUnique({
    where: { slug },
    include: {
      seller: { select: { name: true, id: true, image: true, locationCountry: true } },
      category: true,
    },
  });
}

async function getRelatedListings(categoryId: string, excludeId: string) {
  const prisma = await getPrisma();
  return prisma.listing.findMany({
    where: {
      categoryId,
      id: { not: excludeId },
      status: "ACTIVE",
    },
    take: 5,
    orderBy: { createdAt: "desc" },
  });
}

async function getReviews(listingId: string) {
  const prisma = await getPrisma();
  return prisma.review.findMany({
    where: { listingId },
    include: {
      reviewer: { select: { name: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function ListingPage({ params }: Props) {
  const { slug } = await params;
  const listing = await getListing(slug);

  if (!listing) {
    notFound();
  }

  const [relatedListings, reviews] = await Promise.all([
    getRelatedListings(listing.categoryId, listing.id),
    getReviews(listing.id),
  ]);
  const images = JSON.parse(listing.images || "[]");
  const mainImage = images[listing.featuredImageIndex] || "/placeholder.svg";
  const occasions = listing.occasion ? JSON.parse(listing.occasion) : [];
  const isClosed = listing.status !== "ACTIVE";
  const sellerInitials = listing.seller.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "S";

  return (
    <div className="mx-auto max-w-[1310px] px-4 py-8">
      <div className="mb-6">
        <Link href="/categories">
          <Button variant="ghost" size="sm" className="gap-1 text-[#0F0D1A] hover:bg-[#F7F7F7] rounded-none">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] overflow-hidden bg-[#F7F7F7] border border-[#F1F5F9]">
            <Image
              src={mainImage}
              alt={listing.title}
              fill
              className="object-cover"
              preload
            />
            <div className="absolute top-3 right-3">
              <WishlistButton
                listingId={listing.id}
                className="h-9 w-9 bg-white/90 hover:bg-white rounded-full shadow-sm border border-[#E5E7EB]"
              />
            </div>
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img: string, idx: number) => (
                <div
                  key={idx}
                  className={`relative w-20 h-20 overflow-hidden shrink-0 border-2 ${
                    idx === listing.featuredImageIndex ? "border-[#951E45]" : "border-[#E5E7EB]"
                  }`}
                >
                  <Image src={img} alt={`${listing.title} ${idx + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-[32px] font-bold text-[#0F0D1A]">{listing.title}</h1>
            {isClosed && (
              <p className="text-sm text-[#403D3D] mt-1">Sorry, this listing has been closed.</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-[#0F4041]">$ {listing.price.toFixed(2)}</span>
            {listing.originalPrice && (
              <span className="text-lg text-[#403D3D] line-through">
                $ {listing.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {listing.isNegotiable && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 rounded-none">
              Price Negotiable
            </Badge>
          )}

          {/* Seller */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0F4041] text-white flex items-center justify-center font-semibold text-sm">
              {sellerInitials}
            </div>
            <div>
              <p className="font-medium text-[#0F0D1A]">{listing.seller.name}</p>
              <p className="text-sm text-[#403D3D]">{listing.seller.locationCountry}</p>
            </div>
          </div>

          {/* Delivery method */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0F0D1A]">Delivery method</label>
            <div className="relative">
              <select
                className="w-full h-[42px] border border-[#E5E7EB] bg-white px-3 pr-10 text-sm text-[#0F0D1A] appearance-none focus:outline-none focus:border-[#0F4041]"
                defaultValue={listing.deliveryMethod || ""}
              >
                <option value="">Select delivery method</option>
                <option value="SHIPPING">Shipping</option>
                <option value="LOCAL_PICKUP">Local Pickup</option>
                <option value="BOTH">Both</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0F0D1A] pointer-events-none" />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button className="w-full bg-[#0F4041] hover:bg-[#0a3334] text-white h-[42px] rounded-none text-sm font-semibold tracking-wide">
              Buy now
            </Button>
          </div>
          <Link href={`/messages?user=${listing.seller.id}&listing=${listing.id}`}>
            <Button variant="outline" className="w-full gap-2 h-[42px] rounded-none border-[#E5E7EB] text-[#0F0D1A] hover:bg-[#F7F7F7]">
              <MessageSquare className="h-4 w-4" />
              Message Seller
            </Button>
          </Link>
          <p className="text-xs text-[#403D3D]">You won&apos;t be charged yet.</p>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2 text-[#0F0D1A]">Description</h3>
            <p className="text-[#403D3D] leading-relaxed text-sm">{listing.description}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start rounded-none border-b border-[#E5E7EB] bg-transparent h-auto p-0 gap-0">
            <TabsTrigger
              value="details"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#951E45] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-[#403D3D] data-[state=active]:text-[#0F0D1A]"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="location"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#951E45] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-[#403D3D] data-[state=active]:text-[#0F0D1A]"
            >
              Location
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#951E45] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-[#403D3D] data-[state=active]:text-[#0F0D1A]"
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="seller"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#951E45] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-[#403D3D] data-[state=active]:text-[#0F0D1A]"
            >
              About the owner
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-6">
            <div className="border border-[#E5E7EB]">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: "Country", value: listing.countryLocation || "N/A" },
                    { label: "Condition", value: listing.condition.replace(/_/g, " ") },
                    { label: "Estimate Original Purchase Price", value: listing.originalPrice ? `$${listing.originalPrice.toFixed(2)}` : "N/A" },
                    { label: "Primary Colour", value: listing.primaryColor || "N/A" },
                    { label: "Country of origin", value: listing.countryOfOrigin || "N/A" },
                  ].map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-[#F7F7F7]"}>
                      <td className="px-6 py-3 font-medium text-[#0F0D1A] w-1/2 border-r border-[#E5E7EB]">{row.label}</td>
                      <td className="px-6 py-3 text-[#403D3D]">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {occasions.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-medium text-[#0F0D1A] mb-3">Occasion</p>
                <div className="grid grid-cols-2 gap-2">
                  {occasions.map((occasion: string) => (
                    <div key={occasion} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#0F4041]" />
                      <span className="text-sm text-[#403D3D]">{occasion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="location" className="mt-6">
            <div className="border border-[#E5E7EB] p-6">
              <p className="text-[#403D3D]">
                This item is located in <strong className="text-[#0F0D1A]">{listing.countryLocation || "Unknown"}</strong>.
                Delivery options and shipping costs will be calculated at checkout based on your location.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="border border-[#E5E7EB] p-6">
              {reviews.length === 0 ? (
                <p className="text-[#403D3D]">No reviews yet.</p>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0 border-[#E5E7EB]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#0F4041] text-white flex items-center justify-center text-sm font-semibold">
                          {review.reviewer.name?.charAt(0) || "U"}
                        </div>
                        <span className="font-medium text-sm text-[#0F0D1A]">{review.reviewer.name || "Anonymous"}</span>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      {review.comment && (
                        <p className="text-sm text-[#403D3D]">{review.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="seller" className="mt-6">
            <div className="border border-[#E5E7EB] p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#0F4041] text-white flex items-center justify-center text-2xl font-semibold">
                  {sellerInitials}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#0F0D1A]">{listing.seller.name}</h3>
                  <p className="text-[#403D3D]">{listing.seller.locationCountry}</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Listings */}
      {relatedListings.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-[#0F0D1A]">More Like This</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {relatedListings.map((item) => {
              const itemImages = JSON.parse(item.images || "[]");
              const itemImage = itemImages[item.featuredImageIndex] || "/placeholder.svg";
              return (
                <Link key={item.id} href={`/listings/${item.slug}`} className="group block">
                  <div className="overflow-hidden hover:shadow-md transition-all">
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#F4F0EB]">
                      <Image
                        src={itemImage}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 space-y-1.5 bg-white">
                      <h3 className="font-medium text-sm text-[#0F0D1A] line-clamp-2 leading-snug">{item.title}</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-[#0F4041] font-bold text-sm">$ {item.price.toFixed(2)}</p>
                        {item.originalPrice && (
                          <p className="text-xs text-[#951E45] line-through">$ {item.originalPrice.toFixed(2)}</p>
                        )}
                      </div>
                      <AddToCartButton
                        listingId={item.id}
                        className="w-full bg-[#0F4041] hover:bg-[#0a3334] text-white text-xs h-9 rounded-none"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
