import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

const shopLinks = [
  { label: "Women", href: "/categories/women" },
  { label: "Men Wear", href: "/categories/men" },
  { label: "Kids", href: "/categories/kids" },
  { label: "Jewellery", href: "/categories/jewellery" },
  { label: "Foot Wear", href: "/categories/footwear" },
  { label: "Accessories", href: "/categories/accessories" },
  { label: "Our Story", href: "/about" },
  { label: "Help Center", href: "/help" },
];

const supportLinks = [
  { label: "Shipping & Delivery", href: "/shipping-delivery" },
  { label: "Return Policy", href: "/returns" },
  { label: "How to Care", href: "/how-to-care" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Contact Us", href: "/contact" },
];

const sellLinks = [
  { label: "How to Sell", href: "/how-to-sell" },
  { label: "How to Buy", href: "/how-to-buy" },
  { label: "Culture Closet Blog", href: "/blog" },
];

export function Footer() {
  return (
    <footer className="bg-[#F7F7F7]">
      {/* ── NEWSLETTER ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1310px] px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-0">
          {/* Logo */}
          <div className="shrink-0 md:pr-6">
            <Logo size="md" />
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px self-stretch bg-[#D5D5D5] mx-6" />

          {/* Text */}
          <div className="flex-1 min-w-0">
            <h3 className="font-serif font-bold text-[#951E45] text-base md:text-lg leading-tight">
              Sign Up To Receive Our Updates
            </h3>
            <p className="text-sm text-[#403D3D] mt-0.5">
              Be the first to know about latest offers and discounts on Culture Closet
            </p>
          </div>

          {/* Input + button */}
          <div className="flex w-full md:w-auto md:ml-6 shrink-0">
            <Input
              type="email"
              placeholder="Enter your Email Address"
              className="w-full md:w-[260px] h-11 rounded-none border border-[#E5E7EB] bg-white focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
            />
            <Button className="bg-[#D57429] hover:bg-[#c06524] text-white h-11 px-5 rounded-none font-semibold text-sm tracking-wide shrink-0">
              SUBSCRIBE!
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-[#D5D5D5]" />

      {/* ── FOOTER LINKS ───────────────────────────────────────── */}
      <div className="mx-auto max-w-[1310px] px-4 py-10">
        {/* Desktop: 4 columns */}
        <div className="hidden md:grid md:grid-cols-4">
          {/* Brand column */}
          <div className="pr-8">
            <p className="text-sm text-[#403D3D] leading-relaxed mb-5">
              Leading marketplace for pre-loved South Asian fashion and decor in Australia, Canada,
              New Zealand, United Kingdom and United States.
            </p>

            {/* App badges */}
            <div className="flex flex-col gap-2 mb-5">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-black text-white rounded-lg px-3 py-2 w-[140px] hover:bg-zinc-800 transition-colors"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.37.2.8.2 1.17 0l10.88-6.27-2.54-2.54-9.51 8.81zm14.47-8.35L4.35.93C3.98.72 3.55.72 3.18.93L3 1.03l9.62 9.62 5.03-5.24zm1.38.8L16.15 12l2.88-4.2-2.88-4.2 2.88 4.2-2.88 4.2zm-3.05 1.76-9.61 9.62.17.1c.37.21.8.21 1.17 0l13.3-7.67-4.03-2.05z" />
                </svg>
                <div className="leading-none">
                  <div className="text-[9px] opacity-80 uppercase tracking-wide">GET IT ON</div>
                  <div className="text-xs font-semibold mt-0.5">Google Play</div>
                </div>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-black text-white rounded-lg px-3 py-2 w-[140px] hover:bg-zinc-800 transition-colors"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.71-3.06 1.55-.67.74-1.26 1.94-1.1 3.08 1.18.09 2.38-.72 3.09-1.52z" />
                </svg>
                <div className="leading-none">
                  <div className="text-[9px] opacity-80">Download on the</div>
                  <div className="text-xs font-semibold mt-0.5">App Store</div>
                </div>
              </a>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <Link href="#" className="text-[#0F0D1A] hover:text-[#D57429] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
              {/* Instagram */}
              <Link href="#" className="text-[#0F0D1A] hover:text-[#D57429] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </Link>
              {/* X / Twitter */}
              <Link href="#" className="text-[#0F0D1A] hover:text-[#D57429] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              {/* LinkedIn */}
              <Link href="#" className="text-[#0F0D1A] hover:text-[#D57429] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
              {/* YouTube */}
              <Link href="#" className="text-[#0F0D1A] hover:text-[#D57429] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Shop links */}
          <div className="pl-8 border-l border-[#D5D5D5]">
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#403D3D] hover:text-[#0F0D1A] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div className="pl-8 border-l border-[#D5D5D5]">
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#403D3D] hover:text-[#0F0D1A] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sell links */}
          <div className="pl-8 border-l border-[#D5D5D5]">
            <ul className="space-y-2.5">
              {sellLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#403D3D] hover:text-[#0F0D1A] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden space-y-8">
          {/* Brand */}
          <div>
            <p className="text-sm text-[#403D3D] leading-relaxed mb-4">
              Leading marketplace for pre-loved South Asian fashion and decor in Australia, Canada,
              New Zealand, United Kingdom and United States.
            </p>
            <div className="flex gap-2 mb-4 flex-wrap">
              <a href="#" className="inline-flex items-center gap-1.5 bg-black text-white rounded-lg px-3 py-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.37.2.8.2 1.17 0l10.88-6.27-2.54-2.54-9.51 8.81zm14.47-8.35L4.35.93C3.98.72 3.55.72 3.18.93L3 1.03l9.62 9.62 5.03-5.24zm1.38.8L16.15 12l2.88-4.2-2.88-4.2 2.88 4.2-2.88 4.2zm-3.05 1.76-9.61 9.62.17.1c.37.21.8.21 1.17 0l13.3-7.67-4.03-2.05z" />
                </svg>
                <div className="leading-none">
                  <div className="text-[8px] opacity-80 uppercase">GET IT ON</div>
                  <div className="text-xs font-semibold">Google Play</div>
                </div>
              </a>
              <a href="#" className="inline-flex items-center gap-1.5 bg-black text-white rounded-lg px-3 py-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.71-3.06 1.55-.67.74-1.26 1.94-1.1 3.08 1.18.09 2.38-.72 3.09-1.52z" />
                </svg>
                <div className="leading-none">
                  <div className="text-[8px] opacity-80">Download on the</div>
                  <div className="text-xs font-semibold">App Store</div>
                </div>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="#" className="text-[#0F0D1A] hover:text-[#D57429]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </Link>
              <Link href="#" className="text-[#0F0D1A] hover:text-[#D57429]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </Link>
              <Link href="#" className="text-[#0F0D1A] hover:text-[#D57429]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </Link>
              <Link href="#" className="text-[#0F0D1A] hover:text-[#D57429]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </Link>
              <Link href="#" className="text-[#0F0D1A] hover:text-[#D57429]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
              </Link>
            </div>
          </div>

          {/* Mobile link columns - 2 col grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-6">
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#403D3D] hover:text-[#0F0D1A]">{link.label}</Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2.5">
              {[...supportLinks, ...sellLinks].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#403D3D] hover:text-[#0F0D1A]">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ─────────────────────────────────────────── */}
      <div className="border-t border-[#D5D5D5]">
        <div className="mx-auto max-w-[1310px] px-4 py-4 text-center">
          <p className="text-xs text-[#403D3D]">
            &copy; 2026 All right reserved by Culture Closet.
          </p>
        </div>
      </div>
    </footer>
  );
}
