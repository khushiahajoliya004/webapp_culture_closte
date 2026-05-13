"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, ShoppingBag, Heart, MessageSquare, Settings } from "lucide-react";

const accountLinks = [
  { label: "My Orders", href: "/orders", icon: ShoppingBag, desc: "Track and manage your purchases" },
  { label: "Wishlist", href: "/wishlist", icon: Heart, desc: "Items you've saved for later" },
  { label: "Messages", href: "/messages", icon: MessageSquare, desc: "Chat with sellers" },
  { label: "Settings", href: "/account/settings", icon: Settings, desc: "Update your profile and preferences" },
];

export default function AccountPage() {
  const { data: session } = useSession();

  return (
    <div className="mx-auto max-w-[1310px] px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-[#0F4041] text-white flex items-center justify-center text-2xl font-bold">
          {session?.user?.name?.charAt(0) || "U"}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#0F0D1A]">{session?.user?.name || "My Account"}</h1>
          <p className="text-[#403D3D]">{session?.user?.email}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {accountLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="hover:shadow-md transition-shadow rounded-none border-[#E5E7EB]">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F7F7F7] flex items-center justify-center">
                  <link.icon className="h-6 w-6 text-[#0F4041]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0F0D1A]">{link.label}</h3>
                  <p className="text-sm text-[#403D3D]">{link.desc}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {session?.user?.role === "SELLER" && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4 text-[#0F0D1A]">Seller Tools</h2>
          <Link href="/sell/dashboard">
            <Card className="hover:shadow-md transition-shadow rounded-none border-[#D57429]">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D57429]/10 flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-[#D57429]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0F0D1A]">Seller Dashboard</h3>
                  <p className="text-sm text-[#403D3D]">Manage your listings and orders</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      )}
    </div>
  );
}
