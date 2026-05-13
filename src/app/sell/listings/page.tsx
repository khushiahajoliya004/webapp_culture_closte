"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, Pencil, Eye } from "lucide-react";

interface Listing {
  id: string;
  title: string;
  slug: string;
  price: number;
  status: string;
  images: string;
  featuredImageIndex: number;
  category: { name: string };
  _count: { orders: number };
  createdAt: string;
}

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-800",
  SOLD: "bg-blue-100 text-blue-800",
  CLOSED: "bg-gray-100 text-gray-800",
  UNDER_REVIEW: "bg-yellow-100 text-yellow-800",
};

export default function SellerListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/seller/listings")
      .then((res) => res.json())
      .then((data) => {
        setListings(data.listings || []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1310px] px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-[#F7F7F7] rounded w-48" />
          <div className="h-32 bg-[#F7F7F7] rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1310px] px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Listings</h1>
          <p className="text-[#403D3D]">Manage your active and sold items</p>
        </div>
        <Link href="/sell/listings/new">
          <Button className="bg-[#D57429] hover:bg-[#c06524] rounded-none">
            <Plus className="h-4 w-4 mr-2" />
            New Listing
          </Button>
        </Link>
      </div>

      {listings.length === 0 ? (
        <Card className="rounded-none border-[#E5E7EB]">
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 mx-auto text-[#403D3D] mb-4" />
            <h2 className="text-lg font-semibold mb-2">No listings yet</h2>
            <p className="text-[#403D3D] mb-6">
              Start selling your pre-loved South Asian fashion and accessories
            </p>
            <Link href="/sell/listings/new">
              <Button className="bg-[#0F4041] hover:bg-[#0a3334] rounded-none">Create Your First Listing</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {listings.map((listing) => {
            const images = JSON.parse(listing.images || "[]");
            const imageUrl = images[listing.featuredImageIndex] || "/placeholder.svg";

            return (
              <Card key={listing.id} className="hover:shadow-md transition-shadow rounded-none border-[#E5E7EB]">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Link href={`/listings/${listing.slug}`}>
                      <div className="relative w-20 h-28 rounded-md overflow-hidden shrink-0">
                        <Image src={imageUrl} alt={listing.title} fill className="object-cover" />
                      </div>
                    </Link>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={statusColors[listing.status] || "bg-gray-100"}>
                          {listing.status}
                        </Badge>
                        <span className="text-xs text-[#403D3D]">
                          {new Date(listing.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <Link href={`/listings/${listing.slug}`}>
                        <h3 className="font-medium hover:text-[#D57429]">{listing.title}</h3>
                      </Link>
                      <p className="text-sm text-[#403D3D]">{listing.category.name}</p>
                      <p className="text-[#D57429] font-semibold">${listing.price.toFixed(2)}</p>
                      <p className="text-xs text-[#403D3D]">{listing._count.orders} orders</p>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <Link href={`/listings/${listing.slug}`}>
                        <Button variant="outline" size="sm" className="gap-1 rounded-none">
                          <Eye className="h-3 w-3" />
                          View
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="gap-1 rounded-none" disabled>
                        <Pencil className="h-3 w-3" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
