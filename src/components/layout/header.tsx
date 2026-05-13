"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "WOMEN", href: "/categories/women", pill: true },
  { label: "MEN", href: "/categories/men", pill: true },
  { label: "KIDS", href: "/categories/kids", pill: true },
  { label: "NAVARATRI COLLECTION", href: "/categories/navaratri-collection", pill: false },
  { label: "SAREES", href: "/categories/sarees", pill: false },
  { label: "BLOUSES", href: "/categories/blouses", pill: false },
  { label: "JEWELLERY", href: "/categories/jewellery", pill: false },
  { label: "FOOT WEAR", href: "/categories/footwear", pill: false },
  { label: "ACCESSORIES", href: "/categories/accessories", pill: false },
];

export function Header() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Top bar */}
      <div className="border-b border-[#E5E7EB]">
        <div className="mx-auto max-w-[1310px] px-4">
          <div className="flex items-center justify-between h-[90px] gap-4">
            {/* Logo */}
            <Logo size="md" />

            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 justify-center">
              <div className="relative w-[319px] h-[41px]">
                <Input
                  type="search"
                  placeholder="Search items..."
                  className="w-full h-full pl-4 pr-10 rounded-none border border-[#E5E7EB] bg-white text-sm placeholder:text-[#78716C] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#0F4041]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-0 top-0 h-full w-[41px] rounded-none bg-[#D57429] hover:bg-[#c06524]"
                >
                  <Search className="h-4 w-4 text-white" />
                </Button>
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center h-[42px]">
              <Button
                variant="ghost"
                size="sm"
                className="hidden lg:flex items-center gap-2 rounded-none h-full px-3 bg-[#0F4041] text-white hover:bg-[#0a3334] hover:text-white text-xs font-medium"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                GET APP
              </Button>

              <div className="hidden lg:flex items-center h-full ml-2">
                <Link href="/wishlist">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-full w-[42px] rounded-none hover:bg-gray-50"
                  >
                    <Heart className="h-5 w-5 text-[#0F0D1A]" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#D22027]" />
                  </Button>
                </Link>

                <div className="w-px h-full bg-[#E5E7EB]" />

                <Link href="/cart">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-full w-[42px] rounded-none hover:bg-gray-50"
                  >
                    <ShoppingCart className="h-5 w-5 text-[#0F0D1A]" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#D22027]" />
                  </Button>
                </Link>

                <div className="w-px h-full bg-[#E5E7EB]" />

                {session?.user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="flex items-center h-full rounded-none gap-2 px-3 hover:bg-gray-50 text-sm text-[#0F0D1A]"
                    >
                      <User className="h-4 w-4 text-[#0F0D1A]" />
                      <span className="hidden sm:inline">
                        {session.user.name || "Account"}
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => window.location.href = "/account"}>My Account</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => window.location.href = "/orders"}>My Orders</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => window.location.href = "/wishlist"}>Wishlist</DropdownMenuItem>
                      {session.user.role === "SELLER" && (
                        <DropdownMenuItem onClick={() => window.location.href = "/sell/dashboard"}>Seller Dashboard</DropdownMenuItem>
                      )}
                      {session.user.role === "ADMIN" && (
                        <DropdownMenuItem onClick={() => window.location.href = "/admin"}>Admin Panel</DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => signOut()} className="text-destructive">
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/auth/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-full rounded-none gap-2 px-3 hover:bg-gray-50"
                    >
                      <User className="h-4 w-4 text-[#0F0D1A]" />
                      <span className="hidden sm:inline text-sm text-[#0F0D1A]">Login</span>
                    </Button>
                  </Link>
                )}
              </div>

              {/* Country Selector */}
              <div className="hidden xl:flex items-center h-full ml-2">
                <div className="flex items-center gap-2 h-full w-[229px] border border-[#E5E7EB] px-3 cursor-pointer hover:border-[#0F4041] transition-colors">
                  <span className="text-lg">🇺🇸</span>
                  <span className="text-sm text-[#0F0D1A] truncate">United States (USD $)</span>
                  <ChevronDown className="h-3.5 w-3.5 text-[#0F0D1A] ml-auto shrink-0" />
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-full w-[42px]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden md:block border-b border-[#E5E7EB]">
        <div className="mx-auto max-w-[1310px] px-4">
          <ul className="flex items-center h-[60px] gap-0">
            {navLinks.map((link, index) => (
              <li key={link.href} className="flex items-center">
                {index > 0 && !link.pill && !navLinks[index - 1].pill && (
                  <span className="text-[#E5E7EB] mx-1">|</span>
                )}
                <Link
                  href={link.href}
                  className={`inline-flex items-center justify-center px-4 h-[36px] text-xs font-medium whitespace-nowrap transition-colors ${
                    link.pill
                      ? "bg-[#FFE1CA] text-[#0F0D1A] hover:bg-[#f5d4b8]"
                      : "text-[#0F0D1A] hover:text-[#D57429]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E5E7EB] bg-white">
          <div className="mx-auto max-w-[1310px] px-4 py-4 space-y-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="search"
                placeholder="Search items..."
                className="flex-1 rounded-none border-[#E5E7EB]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon" className="bg-[#D57429] hover:bg-[#c06524] rounded-none">
                <Search className="h-4 w-4 text-white" />
              </Button>
            </form>
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-3 py-2 text-sm font-medium hover:bg-[#F7F7F7]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
