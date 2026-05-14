export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { WishlistButton } from "@/components/wishlist-button";
import { cloudinaryImages as ci } from "@/lib/cloudinary-images";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Camera,
  Tag,
  Truck,
  Search,
  Heart,
} from "lucide-react";

async function getCategories() {
  return prisma.category.findMany({
    where: { parentId: null },
    orderBy: { sortOrder: "asc" },
    take: 4,
  });
}

async function getSubCategories() {
  return prisma.category.findMany({
    where: { parentId: { not: null } },
    orderBy: { sortOrder: "asc" },
    take: 6,
  });
}

async function getFeaturedListings() {
  return prisma.listing.findMany({
    where: { status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { seller: { select: { name: true, id: true } } },
  });
}

const countries = [
  { name: "Australia", image: ci.countryAustralia, slug: "australia" },
  { name: "United States", image: ci.countryUSA, slug: "united-states" },
  { name: "Canada", image: ci.countryCanada, slug: "canada" },
  { name: "New Zealand", image: ci.countryNewZealand, slug: "new-zealand" },
  { name: "United Kingdom", image: ci.countryUK, slug: "united-kingdom" },
];

const testimonials = [
  {
    text: "Culture Closet made it so easy to find a beautiful saree for my cousin's wedding. The seller was wonderful and the item was exactly as described. I'll definitely be shopping here again!",
    name: "Priya M.",
    role: "Verified Buyer",
    image: ci.featureNecklace,
  },
  {
    text: "I sold my old lehenga in just two days! The process was so simple and I loved that it went to someone who would treasure it. Such a wonderful community.",
    name: "Ananya S.",
    role: "Verified Seller",
    image: ci.sectionWoman,
  },
];

export default async function HomePage() {
  const [categories, subCategories, listings] = await Promise.all([
    getCategories(),
    getSubCategories(),
    getFeaturedListings(),
  ]);

  return (
    <div className="bg-[#faf8f5]">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ height: 560 }}>
        <Image
          src={ci.heroSide5}
          alt="Culture Closet Hero"
          fill
          className="object-cover object-center"
          preload
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />

        <div className="relative z-10 mx-auto max-w-[1310px] px-6 h-full flex flex-col justify-center">
          <p className="text-white/80 text-sm font-medium tracking-widest uppercase mb-3">
            Pre-loved South Asian Fashion
          </p>
          <h1 className="text-white font-bold leading-tight text-[42px] md:text-[58px] lg:text-[66px] max-w-[560px]">
            Celebrate Culture,<br />
            <span className="text-[#D57429]">Sustain Style</span>
          </h1>
          <p className="text-white/85 mt-4 max-w-[460px] text-[15px] leading-relaxed">
            From weddings to festive moments, find pre-loved South Asian fashion that carries stories, tradition, and elegance.
          </p>
          <div className="mt-8">
            <Link href="/categories">
              <Button className="bg-[#951E45] hover:bg-[#7a1839] text-white px-10 py-5 h-auto text-sm font-semibold rounded-none tracking-wider">
                SHOP NOW
              </Button>
            </Link>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          <span className="h-[6px] w-8 rounded-full bg-[#951E45]" />
          <span className="h-[6px] w-[6px] rounded-full bg-white/50" />
          <span className="h-[6px] w-[6px] rounded-full bg-white/50" />
        </div>
      </section>

      {/* ── DISCOVER & REHOME ─────────────────────────────────── */}
      <section className="mx-auto max-w-[1310px] px-4 py-14">
        <div className="grid md:grid-cols-2 gap-0 border border-[#E5E7EB]">
          {/* Image side */}
          <div className="relative min-h-[460px] overflow-hidden">
            <Image
              src={ci.testimonial1}
              alt="Discover South Asian Fashion"
              fill
              className="object-cover object-top"
              unoptimized
            />
            <button className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-12 bg-[#F4F6F5]/90 flex items-center justify-center hover:bg-white transition-colors">
              <ChevronLeft className="h-5 w-5 text-[#0F0D1A]" />
            </button>
            <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-12 bg-[#F4F6F5]/90 flex items-center justify-center hover:bg-white transition-colors">
              <ChevronRight className="h-5 w-5 text-[#0F0D1A]" />
            </button>
          </div>

          {/* Text side */}
          <div className="bg-white flex flex-col justify-center p-10 md:p-14 space-y-6">
            <p className="text-[#D57429] text-xs font-semibold tracking-widest uppercase">New Collection</p>
            <h2 className="text-[36px] md:text-[44px] font-bold text-[#0F0D1A] leading-tight">
              Discover And<br />
              <span className="text-[#0F4041]">Rehome South Asian</span><br />
              Fashion and Accessories
            </h2>
            <p className="text-[#403D3D] text-sm leading-relaxed">
              A marketplace celebrating South Asian culture through sustainable pre-loved fashion. Buy, sell and connect with a community that shares your heritage.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/categories">
                <Button className="bg-[#951E45] hover:bg-[#7a1839] text-white px-7 h-11 rounded-none text-sm font-semibold tracking-wider">
                  SHOP NOW
                </Button>
              </Link>
              <Link href="/sell">
                <Button className="bg-[#D57429] hover:bg-[#c06524] text-white px-7 h-11 rounded-none text-sm font-semibold tracking-wider">
                  SELL YOUR ITEM
                </Button>
              </Link>
            </div>
            {/* App badges */}
            <div className="flex gap-3 pt-1 flex-wrap">
              <div className="bg-[#0F0D1A] text-white text-[10px] px-4 py-2.5 flex items-center gap-2 h-[46px] min-w-[136px]">
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.37.2.8.2 1.17 0l10.88-6.27-2.54-2.54-9.51 8.81zm14.47-8.35L4.35.93C3.98.72 3.55.72 3.18.93L3 1.03l9.62 9.62 5.03-5.24zm1.38.8L16.15 12l2.88-4.2-2.88-4.2 2.88 4.2-2.88 4.2zm-3.05 1.76-9.61 9.62.17.1c.37.21.8.21 1.17 0l13.3-7.67-4.03-2.05z" />
                </svg>
                <div className="leading-tight">
                  <div className="opacity-70 text-[8px]">GET IT ON</div>
                  <div className="text-xs font-semibold">Google Play</div>
                </div>
              </div>
              <div className="bg-[#0F0D1A] text-white text-[10px] px-4 py-2.5 flex items-center gap-2 h-[46px] min-w-[136px]">
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.71-3.06 1.55-.67.74-1.26 1.94-1.1 3.08 1.18.09 2.38-.72 3.09-1.52z" />
                </svg>
                <div className="leading-tight">
                  <div className="opacity-70 text-[8px]">Download on the</div>
                  <div className="text-xs font-semibold">App Store</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOP CATEGORIES ────────────────────────────────────── */}
      <section className="mx-auto max-w-[1310px] px-4 pb-14">
        <div className="text-center mb-8">
          <h2 className="text-[26px] md:text-[32px] font-bold text-[#0F0D1A] inline-flex items-center gap-3">
            <span className="text-[#D57429]">✦</span> Categories <span className="text-[#D57429]">✦</span>
          </h2>
        </div>
        <div className="relative px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/categories/${cat.slug}`} className="group block">
                <div className="relative overflow-hidden aspect-[3/4] bg-[#E5E0D8]">
                  <Image
                    src={cat.imageUrl || "/placeholder.svg"}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <p className="text-white font-semibold text-base">{cat.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <button className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-12 bg-[#F4F6F5] flex items-center justify-center hover:bg-white shadow-sm z-10">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-12 bg-[#F4F6F5] flex items-center justify-center hover:bg-white shadow-sm z-10">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="bg-[#FFF2F0] py-16">
        <div className="mx-auto max-w-[1310px] px-4">
          <div className="text-center mb-10">
            <h2 className="text-[26px] md:text-[32px] font-bold text-[#0F0D1A] inline-flex items-center gap-3">
              <span className="text-[#D57429]">✦</span> How it Works <span className="text-[#D57429]">✦</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* For Sellers — LEFT */}
            <div className="border-2 border-[#D57429] bg-white overflow-hidden">
              <div className="bg-[#D57429] text-white px-6 py-3 font-semibold text-sm tracking-widest">FOR SELLERS</div>
              <div className="relative h-[300px] overflow-hidden">
                <Image src={ci.productWoman3} alt="For Sellers" fill className="object-cover object-top" unoptimized />
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { icon: Camera, label: "Create Listing" },
                    { icon: Tag, label: "Set Price" },
                    { icon: Truck, label: "Ship & Earn" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="space-y-2">
                      <div className="w-12 h-12 mx-auto border border-[#E5E7EB] bg-[#FFFAF7] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#D57429]" />
                      </div>
                      <p className="text-[11px] font-semibold text-[#0F0D1A] uppercase tracking-wide">{label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#403D3D] text-center leading-relaxed">
                  Ready to declutter your South Asian wardrobe and find a new home for your outfits?
                </p>
              </div>
            </div>

            {/* For Buyers — RIGHT */}
            <div className="border-2 border-[#0F4041] bg-white overflow-hidden">
              <div className="bg-[#0F4041] text-white px-6 py-3 font-semibold text-sm tracking-widest">FOR BUYERS</div>
              <div className="relative h-[300px] overflow-hidden">
                <Image src={ci.productWoman2} alt="For Buyers" fill className="object-cover object-top" unoptimized />
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { icon: Search, label: "1. Browse Collection" },
                    { icon: Heart, label: "2. Select & Pay" },
                    { icon: Truck, label: "3. Get Your Items" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="space-y-2">
                      <div className="w-12 h-12 mx-auto border border-[#E5E7EB] bg-[#F7FBFA] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#0F4041]" />
                      </div>
                      <p className="text-[11px] font-semibold text-[#0F0D1A] tracking-wide leading-tight">{label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#403D3D] text-center leading-relaxed">
                  Looking for the perfect outfit for your next event? Discover over 4000 listings of pre-loved, gently used South Asian outfits and accessories.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/how-it-works">
              <Button className="bg-[#951E45] hover:bg-[#7a1839] text-white px-12 h-11 rounded-none text-sm font-semibold tracking-widest">
                LEARN MORE
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED LISTINGS ─────────────────────────────────── */}
      <section className="mx-auto max-w-[1310px] px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-[26px] md:text-[32px] font-bold text-[#0F0D1A] inline-flex items-center gap-3">
            <span className="text-[#D57429]">✦</span> Featured Listings <span className="text-[#D57429]">✦</span>
          </h2>
        </div>
        <div className="relative px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {listings.map((listing, index) => {
              const images = JSON.parse(listing.images || "[]") as string[];
              const imageUrl = images[listing.featuredImageIndex] || "/placeholder.svg";
              const isFirst = index === 0;
              return (
                <Link key={listing.id} href={`/listings/${listing.slug}`} className="group block">
                  <div className="overflow-hidden">
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#F4F0EB]">
                      <Image
                        src={imageUrl}
                        alt={listing.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                    <div className="pt-3 px-1 pb-3 space-y-1.5 bg-white">
                      <p className="font-medium text-sm text-[#0F0D1A] line-clamp-2 leading-snug">{listing.title}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-[#0F4041] font-bold text-sm">$ {listing.price.toFixed(2)}</p>
                        {listing.originalPrice && (
                          <p className="text-xs text-[#951E45] line-through">$ {listing.originalPrice.toFixed(2)}</p>
                        )}
                      </div>
                      {isFirst ? (
                        <AddToCartButton
                          listingId={listing.id}
                          className="w-full bg-[#0F4041] hover:bg-[#0a3334] text-white text-xs h-9 rounded-none"
                        />
                      ) : (
                        <AddToCartButton
                          listingId={listing.id}
                          iconOnly
                          size="icon"
                          className="w-10 h-9 bg-[#0F4041] hover:bg-[#0a3334] text-white rounded-none"
                        />
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <button className="absolute left-0 top-[45%] -translate-y-1/2 w-10 h-12 bg-[#F4F6F5] flex items-center justify-center hover:bg-white shadow-sm z-10">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="absolute right-0 top-[45%] -translate-y-1/2 w-10 h-12 bg-[#F4F6F5] flex items-center justify-center hover:bg-white shadow-sm z-10">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* ── EXPLORE BY CATEGORY ───────────────────────────────── */}
      <section className="bg-[#FAF8F5] py-14">
        <div className="mx-auto max-w-[1310px] px-4">
          <div className="text-center mb-3">
            <h2 className="text-[26px] md:text-[32px] font-bold text-[#0F0D1A] inline-flex items-center gap-3">
              <span className="text-[#D57429]">✦</span> Explore by Category <span className="text-[#D57429]">✦</span>
            </h2>
            <p className="text-[#403D3D] mt-2 max-w-2xl mx-auto text-sm leading-relaxed">
              Save money and be sustainable by shopping pre-loved South Asian clothing, jewellery, accessories and decoration.
            </p>
          </div>
          <div className="relative mt-8 px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {subCategories.map((cat) => (
                <Link key={cat.id} href={`/categories/${cat.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#E5E0D8]">
                    <Image
                      src={cat.imageUrl || "/placeholder.svg"}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                      <p className="text-white font-semibold text-sm">{cat.name}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <button className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-12 bg-[#F4F6F5] flex items-center justify-center hover:bg-white shadow-sm z-10">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-12 bg-[#F4F6F5] flex items-center justify-center hover:bg-white shadow-sm z-10">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="text-center mt-8">
            <Link href="/categories">
              <Button className="border border-[#0F4041] bg-[#0F4041] text-white hover:bg-[#0a3334] px-12 h-11 rounded-none text-sm font-semibold tracking-widest">
                VIEW ALL
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── EXPLORE BY COUNTRY ────────────────────────────────── */}
      <section className="bg-[#FFF2F0] py-14">
        <div className="mx-auto max-w-[1310px] px-4">
          <div className="text-center mb-4">
            <h2 className="text-[26px] md:text-[32px] font-bold text-[#0F0D1A] inline-flex items-center gap-3">
              <span className="text-[#D57429]">✦</span> Explore by Country <span className="text-[#D57429]">✦</span>
            </h2>
            <p className="text-[#403D3D] mt-2 max-w-2xl mx-auto text-sm leading-relaxed">
              Explore 4000+ pre-loved South Asian fashion and accessories. Now available in Australia, United States, Canada, United Kingdom and New Zealand.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-8">
            {countries.map((country) => (
              <Link key={country.name} href={`/search?country=${country.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#E5E0D8]">
                  <Image
                    src={country.image}
                    alt={country.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                    <p className="text-white font-semibold text-sm">{country.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/search">
              <Button className="border border-[#0F4041] bg-[#0F4041] text-white hover:bg-[#0a3334] px-12 h-11 rounded-none text-sm font-semibold tracking-widest">
                VIEW ALL
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CUSTOMER STORIES ──────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[960px] px-4">
          <div className="text-center mb-10">
            <h2 className="text-[26px] md:text-[32px] font-bold text-[#951E45] font-serif inline-flex items-center gap-3">
              <span className="text-[#D57429]">✦</span> Customer Stories <span className="text-[#D57429]">✦</span>
            </h2>
            <p className="text-[#403D3D] text-sm mt-1">Stories from the People Who Trust Us</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="border border-[#E5E7EB] p-5 flex gap-5 items-start">
                <div className="shrink-0 w-[110px] h-[165px] overflow-hidden">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={110}
                    height={165}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] text-[#403D3D] leading-relaxed">{t.text}</p>
                  <div className="mt-4">
                    <p className="text-[13px] text-[#403D3D] leading-snug">{t.name}</p>
                    <p className="text-[13px] font-bold text-[#0F0D1A] leading-snug">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className={`h-2.5 w-2.5 rounded-full ${i === 1 ? "bg-[#951E45]" : "bg-[#D9D9D9]"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── REDISCOVER ELEGANCE ───────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-[860px] px-4 text-center">
          <h2 className="text-[26px] md:text-[36px] font-bold text-[#951E45] font-serif leading-snug inline-flex items-center gap-3 flex-wrap justify-center">
            <span className="text-[#D57429] shrink-0">✦</span>
            Rediscover Elegance Through Pre-Loved South Asian Wear
            <span className="text-[#D57429] shrink-0">✦</span>
          </h2>
          <p className="text-[#403D3D] text-sm leading-relaxed mt-6 max-w-3xl mx-auto">
            Culture Closet is a leading marketplace for pre-loved South Asian fashion and decor in Australia, Canada, New Zealand, United Kingdom and United States. Every piece carries a story — and now it can carry yours.
          </p>
          <div className="mt-8">
            <Link href="/about">
              <Button className="bg-[#D57429] hover:bg-[#c06524] text-white px-10 h-11 rounded-none text-sm font-semibold tracking-widest">
                READ OUR FULL STORY
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
