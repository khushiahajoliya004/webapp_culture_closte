"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, DollarSign, ShoppingBag, Plus, TrendingUp } from "lucide-react";

const sellerLinks = [
  { label: "My Listings", href: "/sell/listings", icon: Package },
  { label: "Orders Received", href: "/sell/orders", icon: ShoppingBag },
  { label: "Earnings", href: "/sell/earnings", icon: DollarSign },
];

interface DashboardStats {
  totalListings: number;
  totalOrders: number;
  totalEarnings: number;
}

export default function SellerDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({ totalListings: 0, totalOrders: 0, totalEarnings: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/seller/listings").then((r) => r.json()),
      fetch("/api/seller/orders").then((r) => r.json()),
    ])
      .then(([listingsData, ordersData]) => {
        const listings = listingsData.listings || [];
        const orders = ordersData.orders || [];
        const earnings = orders.reduce((sum: number, o: { sellerPayout: number }) => sum + o.sellerPayout, 0);

        setStats({
          totalListings: listings.length,
          totalOrders: orders.length,
          totalEarnings: earnings,
        });
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-[1310px] px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Seller Dashboard</h1>
          <p className="text-[#403D3D]">Manage your listings and sales</p>
        </div>
        <Link href="/sell/listings/new">
          <Button className="bg-[#D57429] hover:bg-[#c06524] rounded-none">
            <Plus className="h-4 w-4 mr-2" />
            Create Listing
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card className="rounded-none border-[#E5E7EB]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#403D3D]">Total Listings</p>
                <p className="text-2xl font-bold">
                  {isLoading ? "..." : stats.totalListings}
                </p>
              </div>
              <Package className="h-8 w-8 text-[#0F4041]" />
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-[#E5E7EB]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#403D3D]">Total Orders</p>
                <p className="text-2xl font-bold">
                  {isLoading ? "..." : stats.totalOrders}
                </p>
              </div>
              <ShoppingBag className="h-8 w-8 text-[#D57429]" />
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-[#E5E7EB]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#403D3D]">Total Earnings</p>
                <p className="text-2xl font-bold">
                  {isLoading ? "..." : `$${stats.totalEarnings.toFixed(2)}`}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-[#0F4041]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sellerLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="hover:shadow-md transition-shadow rounded-none border-[#E5E7EB]">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F7F7F7] flex items-center justify-center">
                  <link.icon className="h-6 w-6 text-[#0F4041]" />
                </div>
                <div>
                  <h3 className="font-semibold">{link.label}</h3>
                  <p className="text-sm text-[#403D3D]">Manage your {link.label.toLowerCase()}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="mt-8 rounded-none border-[#E5E7EB]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#D57429]" />
            Getting Started as a Seller
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto bg-[#0F4041] text-white rounded-full flex items-center justify-center font-bold mb-3">
                1
              </div>
              <h3 className="font-semibold mb-1">Create Listing</h3>
              <p className="text-sm text-[#403D3D]">
                Take great photos and write an honest description
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto bg-[#0F4041] text-white rounded-full flex items-center justify-center font-bold mb-3">
                2
              </div>
              <h3 className="font-semibold mb-1">Set Your Price</h3>
              <p className="text-sm text-[#403D3D]">
                Be fair and consider the original price and condition
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto bg-[#0F4041] text-white rounded-full flex items-center justify-center font-bold mb-3">
                3
              </div>
              <h3 className="font-semibold mb-1">Ship & Earn</h3>
              <p className="text-sm text-[#403D3D]">
                Pack carefully and ship promptly to earn great reviews
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
