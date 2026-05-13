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
    image: ci.testimonial1,
  },
  {
    text: "I sold my old lehenga in just two days! The process was so simple and I loved that it went to someone who would treasure it. Such a wonderful community.",
    name: "Ananya S.",
    image: ci.testimonial1,
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
          src="/images/figma/hero-woman.png"
          alt="Culture Closet Hero"
          fill
          className="object-cover object-center"
          priority
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
              src={ci.sectionWoman}
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
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-[26px] md:text-[32px] font-bold text-[#0F0D1A] flex items-center gap-2">
            <span className="text-[#D57429] text-lg">✦</span> Products Categories
          </h2>
          <Link href="/categories" className="text-sm text-[#0F4041] font-medium hover:underline flex items-center gap-1">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/categories/${cat.slug}`}>
                <div className="group relative overflow-hidden aspect-[3/4] bg-[#E5E0D8]">
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
          <button className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-12 bg-[#F4F6F5] flex items-center justify-center hover:bg-white shadow-sm z-10">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-12 bg-[#F4F6F5] flex items-center justify-center hover:bg-white shadow-sm z-10">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="bg-[#FFF2F0] py-16">
        <div className="mx-auto max-w-[1310px] px-4">
          <div className="text-center mb-10">
            <h2 className="text-[26px] md:text-[32px] font-bold text-[#0F0D1A] flex items-center justify-center gap-2">
              <span className="text-[#D57429]">✦</span> How it Works <span className="text-[#D57429]">✦</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* For Buyers */}
            <div className="border-2 border-[#D57429] bg-white overflow-hidden">
              <div className="bg-[#0F4041] text-white px-6 py-3 font-semibold text-sm tracking-wider">FOR BUYERS</div>
              <div className="relative h-[300px] overflow-hidden">
                <Image src={ci.catWomen} alt="For Buyers" fill className="object-cover object-top" unoptimized />
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { icon: Search, label: "Browse Collection" },
                    { icon: Heart, label: "Select & Wishlist" },
                    { icon: Truck, label: "Get Your Items" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="space-y-2">
                      <div className="w-11 h-11 mx-auto bg-[#F7F7F7] rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#0F4041]" />
                      </div>
                      <p className="text-xs font-medium text-[#0F0D1A]">{label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#403D3D] text-center leading-relaxed">
                  Looking for the perfect outfit for your next event? Discover over 4000 listings of pre-loved, gently used South Asian outfits and accessories.
                </p>
              </div>
            </div>

            {/* For Sellers */}
            <div className="border-2 border-[#0F4041] bg-white overflow-hidden">
              <div className="bg-[#D57429] text-white px-6 py-3 font-semibold text-sm tracking-wider">FOR SELLERS</div>
              <div className="relative h-[300px] overflow-hidden">
                <Image src={ci.catNavaratri} alt="For Sellers" fill className="object-cover object-top" unoptimized />
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { icon: Camera, label: "Create Listing" },
                    { icon: Tag, label: "Set Your Price" },
                    { icon: Truck, label: "Ship & Earn" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="space-y-2">
                      <div className="w-11 h-11 mx-auto bg-[#F7F7F7] rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#D57429]" />
                      </div>
                      <p className="text-xs font-medium text-[#0F0D1A]">{label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#403D3D] text-center leading-relaxed">
                  Ready to declutter your South Asian wardrobe and find a new home for your outfits?
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/how-it-works">
              <Button className="bg-[#0F4041] hover:bg-[#0a3334] text-white px-10 h-11 rounded-none text-sm font-semibold tracking-wider">
                LEARN MORE
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED LISTINGS ─────────────────────────────────── */}
      <section className="mx-auto max-w-[1310px] px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[26px] md:text-[32px] font-bold text-[#0F0D1A] flex items-center gap-2">
            <span className="text-[#D57429]">✦</span> Featured Listings
          </h2>
          <Link href="/listings" className="text-sm text-[#0F4041] font-medium hover:underline flex items-center gap-1">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {listings.map((listing) => {
            const images = JSON.parse(listing.images || "[]") as string[];
            const imageUrl = images[listing.featuredImageIndex] || "/placeholder.svg";
            return (
              <Link key={listing.id} href={`/listings/${listing.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F4F0EB]">
                  <Image
                    src={imageUrl}
                    alt={listing.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <WishlistButton
                      listingId={listing.id}
                      className="h-8 w-8 bg-white/90 hover:bg-white rounded-full shadow-sm"
                    />
                  </div>
                </div>
                <div className="pt-3 pb-1 space-y-1.5 bg-white px-2 pb-3">
                  <p className="font-medium text-sm text-[#0F0D1A] line-clamp-1">{listing.title}</p>
                  <p className="text-[#0F4041] font-bold text-sm">$ {listing.price.toFixed(2)}</p>
                  <AddToCartButton
                    listingId={listing.id}
                    className="w-full bg-[#0F4041] hover:bg-[#0a3334] text-white text-xs h-9 rounded-none mt-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── EXPLORE BY CATEGORY ───────────────────────────────── */}
      <section className="bg-[#FAF8F5] py-14">
        <div className="mx-auto max-w-[1310px] px-4">
          <div className="text-center mb-4">
            <h2 className="text-[26px] md:text-[32px] font-bold text-[#0F0D1A] flex items-center justify-center gap-2">
              <span className="text-[#D57429]">✦</span> Explore by Category <span className="text-[#D57429]">✦</span>
            </h2>
            <p className="text-[#403D3D] mt-2 max-w-xl mx-auto text-sm leading-relaxed">
              Save money and be sustainable by shopping pre-loved South Asian clothing, jewellery, accessories and decoration.
            </p>
          </div>
          <div className="relative mt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {subCategories.map((cat) => (
                <Link key={cat.id} href={`/categories/${cat.slug}`} className="group block">
                  <div className="relative aspect-square overflow-hidden bg-[#E5E0D8]">
                    <Image
                      src={cat.imageUrl || "/placeholder.svg"}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-2.5 text-center">
                      <p className="text-white font-semibold text-sm">{cat.name}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <button className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-12 bg-[#F4F6F5] flex items-center justify-center hover:bg-white shadow-sm z-10">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-12 bg-[#F4F6F5] flex items-center justify-center hover:bg-white shadow-sm z-10">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="text-center mt-8">
            <Link href="/categories">
              <Button variant="outline" className="border-[#0F4041] text-[#0F4041] hover:bg-[#0F4041] hover:text-white px-10 h-11 rounded-none text-sm font-semibold tracking-wider">
                VIEW ALL
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── EXPLORE BY COUNTRY ────────────────────────────────── */}
      <section className="mx-auto max-w-[1310px] px-4 py-14">
        <div className="text-center mb-4">
          <h2 className="text-[26px] md:text-[32px] font-bold text-[#0F0D1A] flex items-center justify-center gap-2">
            <span className="text-[#D57429]">✦</span> Explore by Country <span className="text-[#D57429]">✦</span>
          </h2>
          <p className="text-[#403D3D] mt-2 max-w-xl mx-auto text-sm leading-relaxed">
            Explore 4000+ pre-loved South Asian fashion and accessories. Now available in Australia, United States, Canada, United Kingdom and New Zealand.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
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
                  <p className="text-white font-semibold">{country.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/search">
            <Button variant="outline" className="border-[#0F4041] text-[#0F4041] hover:bg-[#0F4041] hover:text-white px-10 h-11 rounded-none text-sm font-semibold tracking-wider">
              VIEW ALL
            </Button>
          </Link>
        </div>
      </section>

      {/* ── CUSTOMER STORIES ──────────────────────────────────── */}
      <section className="bg-[#FFF2F0] py-16">
        <div className="mx-auto max-w-[1310px] px-4">
          <div className="text-center mb-8">
            <h2 className="text-[26px] md:text-[32px] font-bold text-[#0F0D1A] flex items-center justify-center gap-2">
              <span className="text-[#D57429]">✦</span> Customer Stories <span className="text-[#D57429]">✦</span>
            </h2>
            <p className="text-[#403D3D] text-sm mt-1">Stories from the People Who Trust Us</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white border border-[#E5E7EB] p-6 flex gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-[#D57429]">
                  <Image src={t.image} alt={t.name} width={56} height={56} className="object-cover w-full h-full" unoptimized />
                </div>
                <div className="space-y-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, s) => (
                      <svg key={s} className="w-3.5 h-3.5 text-[#D57429]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-[#403D3D] italic leading-relaxed">&quot;{t.text}&quot;</p>
                  <p className="text-sm font-semibold text-[#0F0D1A]">— {t.name}</p>
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
      <section className="mx-auto max-w-[1310px] px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative overflow-hidden aspect-[4/3]">
            <Image src={ci.featureNecklace} alt="South Asian Jewellery" fill className="object-cover" unoptimized />
          </div>
          <div className="space-y-5">
            <p className="text-[#D57429] text-xs font-semibold tracking-widest uppercase">Our Story</p>
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#0F0D1A] leading-tight">
              Rediscover Elegance Through Pre-Loved South Asian Wear
            </h2>
            <p className="text-[#403D3D] text-sm leading-relaxed">
              Culture Closet is a leading marketplace for pre-loved South Asian fashion and decor in Australia, Canada, New Zealand, United Kingdom and United States. Every piece carries a story — and now it can carry yours.
            </p>
            <Link href="/about">
              <Button className="bg-[#D57429] hover:bg-[#c06524] text-white px-8 h-11 rounded-none text-sm font-semibold tracking-wider mt-2">
                READ OUR FULL STORY
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
