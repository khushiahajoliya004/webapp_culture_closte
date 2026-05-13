import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { WishlistButton } from "@/components/wishlist-button";
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Camera,
  Truck,
  Star,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";

async function getCategories() {
  return prisma.category.findMany({
    where: { parentId: null },
    orderBy: { sortOrder: "asc" },
    take: 8,
  });
}

async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { parent: true },
  });
}

async function getFeaturedListings() {
  return prisma.listing.findMany({
    where: { status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { seller: { select: { name: true, id: true } } },
  });
}

export default async function HomePage() {
  const [categories, allCategories, listings] = await Promise.all([
    getCategories(),
    getAllCategories(),
    getFeaturedListings(),
  ]);

  const subCategories = allCategories.filter((c) => c.parentId !== null);

  const countries = [
    { name: "Australia", image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&h=300&fit=crop" },
    { name: "United States", image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&h=300&fit=crop" },
    { name: "Canada", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop" },
    { name: "New Zealand", image: "https://images.unsplash.com/photo-1589802829985-817e51171b92?w=400&h=300&fit=crop" },
    { name: "United Kingdom", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop" },
  ];

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=1600&h=500&fit=crop",
      title: "Celebrate Culture,",
      subtitle: "Sustain Style",
      text: "From weddings to festive moments, find pre-loved South Asian fashion that carries stories, tradition, and elegance.",
    },
  ];

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden bg-[#D9D9D9]">
        <Image
          src={heroSlides[0].image}
          alt="South Asian Fashion"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        <div className="mx-auto max-w-[1310px] px-4 h-full flex items-center">
          <div className="space-y-6 z-10 max-w-lg">
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-tight">
              {heroSlides[0].title}
              <br />
              <span className="text-white">{heroSlides[0].subtitle}</span>
            </h1>
            <p className="text-base text-white/90 max-w-md">
              {heroSlides[0].text}
            </p>
            <Link href="/categories/women">
              <Button className="bg-[#951E45] hover:bg-[#7a1839] text-white px-8 py-5 h-auto text-sm font-medium rounded-none">
                SHOP NOW
              </Button>
            </Link>
          </div>
        </div>
        {/* Carousel dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
          <span className="h-2 w-6 rounded-full bg-[#951E45]" />
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="h-2 w-2 rounded-full bg-white/60" />
        </div>
      </section>

      {/* Discover & Rehome */}
      <section className="mx-auto max-w-[1310px] px-4 py-12">
        <div className="relative bg-white">
          <div className="grid md:grid-cols-2 gap-0 items-center min-h-[500px]">
            <div className="relative h-[500px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1609234656388-0ff363383899?w=800&h=600&fit=crop"
                alt="Discover South Asian Fashion"
                fill
                className="object-cover"
              />
              {/* Carousel arrows */}
              <button className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-[50px] bg-[#F4F6F5] flex items-center justify-center hover:bg-white transition-colors">
                <ChevronLeft className="h-5 w-5 text-[#0F0D1A]" />
              </button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-[50px] bg-[#F4F6F5] flex items-center justify-center hover:bg-white transition-colors">
                <ChevronRight className="h-5 w-5 text-[#0F0D1A]" />
              </button>
            </div>
            <div className="p-10 md:p-16 space-y-6 flex flex-col justify-center">
              <h2 className="text-3xl md:text-[42px] font-bold text-[#0F0D1A] leading-tight">
                Discover And
                <br />
                <span className="text-[#0F4041]">Rehome South Asian</span>
                <br />
                Fashion and Accessories
              </h2>
              <div className="flex gap-4">
                <Link href="/categories">
                  <Button className="bg-[#951E45] hover:bg-[#7a1839] text-white px-6 h-10 rounded-none text-sm">
                    SHOP NOW
                  </Button>
                </Link>
                <Link href="/sell">
                  <Button className="bg-[#D57429] hover:bg-[#c06524] text-white px-6 h-10 rounded-none text-sm">
                    SELL YOUR ITEM
                  </Button>
                </Link>
              </div>
              <div className="flex gap-4 pt-2">
                <div className="bg-black text-white text-[10px] px-3 py-2 rounded flex items-center gap-2 h-[50px] w-[150px]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 20.5v-17c0-.6.4-1 1-1h16c.6 0 1 .4 1 1v17c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1z" />
                  </svg>
                  <div className="leading-tight">
                    <div className="text-[8px] opacity-80">GET IT ON</div>
                    <div className="text-xs font-semibold">Google Play</div>
                  </div>
                </div>
                <div className="bg-black text-white text-[10px] px-3 py-2 rounded flex items-center gap-2 h-[50px] w-[150px]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.71-3.06 1.55-.67.74-1.26 1.94-1.1 3.08 1.18.09 2.38-.72 3.09-1.52z" />
                  </svg>
                  <div className="leading-tight">
                    <div className="text-[8px] opacity-80">Download on the</div>
                    <div className="text-xs font-semibold">App Store</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-[1310px] px-4 pb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-[32px] font-bold text-[#0F0D1A] inline-flex items-center gap-2">
            <span className="text-[#D57429]">✦</span> Categories <span className="text-[#D57429]">✦</span>
          </h2>
        </div>
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {categories.slice(0, 4).map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <Card className="group overflow-hidden border-0 shadow-none hover:shadow-md transition-shadow rounded-none">
                  <CardContent className="p-0 relative aspect-[3/4]">
                    <Image
                      src={category.imageUrl || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                      <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          {/* Carousel arrows */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-11 h-[50px] bg-[#F4F6F5] flex items-center justify-center hover:bg-white transition-colors shadow-sm z-10">
            <ChevronLeft className="h-5 w-5 text-[#0F0D1A]" />
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-11 h-[50px] bg-[#F4F6F5] flex items-center justify-center hover:bg-white transition-colors shadow-sm z-10">
            <ChevronRight className="h-5 w-5 text-[#0F0D1A]" />
          </button>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-[#FFF2F0] py-16">
        <div className="mx-auto max-w-[1310px] px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-[32px] font-bold text-[#0F0D1A] inline-flex items-center gap-2">
              <span className="text-[#D57429]">✦</span> How it Works <span className="text-[#D57429]">✦</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* For Sellers */}
            <div className="relative border-2 border-[#D57429] bg-white overflow-hidden">
              <div className="bg-[#0F4041] text-white px-6 py-3 font-semibold text-sm">FOR SELLERS</div>
              <div className="relative h-[400px]">
                <Image
                  src="https://images.unsplash.com/photo-1599669454699-248893623440?w=640&h=400&fit=crop"
                  alt="For Sellers"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-6 bg-white">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-[#F7F7F7] rounded-full flex items-center justify-center">
                      <Camera className="w-5 h-5 text-[#0F4041]" />
                    </div>
                    <p className="text-xs font-medium text-[#0F0D1A]">Create Listing</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-[#F7F7F7] rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-[#0F4041]" />
                    </div>
                    <p className="text-xs font-medium text-[#0F0D1A]">Set Price</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-[#F7F7F7] rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5 text-[#0F4041]" />
                    </div>
                    <p className="text-xs font-medium text-[#0F0D1A]">Ship & Earn</p>
                  </div>
                </div>
                <p className="text-sm text-[#403D3D] text-center">
                  Ready to declutter your South Asian wardrobe and find a new home for your outfits?
                </p>
              </div>
            </div>

            {/* For Buyers */}
            <div className="relative border-2 border-[#0F4041] bg-white overflow-hidden">
              <div className="bg-[#D57429] text-white px-6 py-3 font-semibold text-sm">FOR BUYERS</div>
              <div className="relative h-[400px]">
                <Image
                  src="https://images.unsplash.com/photo-1609234656388-0ff363383899?w=640&h=400&fit=crop"
                  alt="For Buyers"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-6 bg-white">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-[#F7F7F7] rounded-full flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-[#D57429]" />
                    </div>
                    <p className="text-xs font-medium text-[#0F0D1A]">Browse Collection</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-[#F7F7F7] rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-[#D57429]" />
                    </div>
                    <p className="text-xs font-medium text-[#0F0D1A]">Select & Pay</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-[#F7F7F7] rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5 text-[#D57429]" />
                    </div>
                    <p className="text-xs font-medium text-[#0F0D1A]">Get Your Items</p>
                  </div>
                </div>
                <p className="text-sm text-[#403D3D] text-center">
                  Looking for the perfect outfit for your next event? Discover over 4000 listings of pre-loved, gently used South Asian outfits and accessories.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/how-it-works">
              <Button className="bg-[#0F4041] hover:bg-[#0a3334] text-white px-8 h-10 rounded-none text-sm">
                LEARN MORE
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="mx-auto max-w-[1310px] px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-[32px] font-bold text-[#0F0D1A] inline-flex items-center gap-2">
            <span className="text-[#D57429]">✦</span> Featured Listings{" "}
            <span className="text-[#D57429]">✦</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {listings.slice(0, 5).map((listing, index) => {
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
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <WishlistButton listingId={listing.id} className="h-8 w-8 bg-white/80 hover:bg-white rounded-full" />
                      </div>
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
      </section>

      {/* Explore by Category */}
      <section className="mx-auto max-w-[1310px] px-4 pb-16">
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-[32px] font-bold text-[#0F0D1A] inline-flex items-center gap-2">
            <span className="text-[#D57429]">✦</span> Explore by Category{" "}
            <span className="text-[#D57429]">✦</span>
          </h2>
          <p className="text-[#403D3D] mt-2 max-w-2xl mx-auto text-sm">
            Save money and be sustainable by shopping pre-loved South Asian clothing, jewellery, accessories and decoration.
          </p>
        </div>
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {subCategories.slice(0, 5).map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <Card className="group overflow-hidden border-0 shadow-none hover:shadow-md transition-shadow rounded-none">
                  <CardContent className="p-0 relative aspect-square">
                    <Image
                      src={category.imageUrl || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                      <h3 className="text-white font-semibold">{category.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-11 h-[50px] bg-[#F4F6F5] flex items-center justify-center hover:bg-white transition-colors shadow-sm z-10">
            <ChevronLeft className="h-5 w-5 text-[#0F0D1A]" />
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-11 h-[50px] bg-[#F4F6F5] flex items-center justify-center hover:bg-white transition-colors shadow-sm z-10">
            <ChevronRight className="h-5 w-5 text-[#0F0D1A]" />
          </button>
        </div>
        <div className="text-center mt-6">
          <Link href="/categories">
            <Button variant="outline" className="border-[#0F4041] text-[#0F4041] hover:bg-[#0F4041] hover:text-white px-8 h-10 rounded-none text-sm">
              VIEW ALL
            </Button>
          </Link>
        </div>
      </section>

      {/* Explore by Country */}
      <section className="mx-auto max-w-[1310px] px-4 pb-16">
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-[32px] font-bold text-[#0F0D1A] inline-flex items-center gap-2">
            <span className="text-[#D57429]">✦</span> Explore by Country{" "}
            <span className="text-[#D57429]">✦</span>
          </h2>
          <p className="text-[#403D3D] mt-2 max-w-2xl mx-auto text-sm">
            Explore 4000+ pre-loved South Asian fashion and accessories. Now available in Australia, United States, Canada, United Kingdom and New Zealand.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {countries.map((country) => (
            <Card key={country.name} className="group overflow-hidden border-0 shadow-none hover:shadow-md transition-shadow rounded-none">
              <CardContent className="p-0 relative aspect-[4/3]">
                <Image
                  src={country.image}
                  alt={country.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                  <h3 className="text-white font-semibold">{country.name}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/search">
            <Button variant="outline" className="border-[#0F4041] text-[#0F4041] hover:bg-[#0F4041] hover:text-white px-8 h-10 rounded-none text-sm">
              VIEW ALL
            </Button>
          </Link>
        </div>
      </section>

      {/* Customer Stories */}
      <section className="bg-[#FFF2F0] py-16">
        <div className="mx-auto max-w-[1310px] px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-[32px] font-bold text-[#0F0D1A] inline-flex items-center gap-2">
              <span className="text-[#D57429]">✦</span> Customer Stories{" "}
              <span className="text-[#D57429]">✦</span>
            </h2>
            <p className="text-[#403D3D] text-sm">Stories from the People Who Trust Us</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Card key={i} className="border border-[#E5E7EB] rounded-none bg-white">
                <CardContent className="p-6 flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#F7F7F7] shrink-0 overflow-hidden">
                    <Image
                      src={`https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop`}
                      alt="Customer"
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-[#403D3D] italic">
                      &quot;Culture Closet made it so easy to find a beautiful saree for my cousin&apos;s wedding. The seller was wonderful and the item was exactly as described. I&apos;ll definitely be shopping here again!&quot;
                    </p>
                    <p className="text-sm font-semibold text-[#0F0D1A]">— Priya M.</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Carousel dots */}
          <div className="flex justify-center gap-2 mt-8">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E1E1E5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#951E45]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E1E1E5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E1E1E5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E1E1E5]" />
          </div>
        </div>
      </section>

      {/* Rediscover Elegance CTA */}
      <section className="mx-auto max-w-[1310px] px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-[5.5px] border border-[#E5E7EB] bg-white overflow-hidden">
            <div className="relative h-[200px]">
              <Image
                src="https://images.unsplash.com/photo-1599669454699-248893623440?w=640&h=300&fit=crop"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 text-center space-y-4">
              <h3 className="text-xl font-bold text-[#0F0D1A]">Our Story</h3>
              <p className="text-sm text-[#403D3D]">
                Discover how Culture Closet began and our mission to make South Asian fashion sustainable and accessible.
              </p>
              <Link href="/about">
                <Button className="bg-[#D57429] hover:bg-[#c06524] text-white px-6 h-10 rounded-none text-sm">
                  READ OUR FULL STORY
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-[5.5px] border border-[#E5E7EB] bg-white overflow-hidden">
            <div className="relative h-[200px]">
              <Image
                src="https://images.unsplash.com/photo-1609234656388-0ff363383899?w=640&h=300&fit=crop"
                alt="Sustainability"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 text-center space-y-4">
              <h3 className="text-xl font-bold text-[#0F0D1A]">Sustainability</h3>
              <p className="text-sm text-[#403D3D]">
                Every pre-loved piece you buy or sell helps reduce fashion waste and celebrates cultural heritage.
              </p>
              <Link href="/about">
                <Button className="bg-[#D57429] hover:bg-[#c06524] text-white px-6 h-10 rounded-none text-sm">
                  READ OUR FULL STORY
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
