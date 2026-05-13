"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface WishlistItem {
  id: string;
  listing: {
    id: string;
    title: string;
    slug: string;
    price: number;
    images: string;
    featuredImageIndex: number;
    seller: { name: string };
    category: { name: string };
  };
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/wishlist")
      .then((res) => {
        if (res.status === 401) return { items: [] };
        return res.json();
      })
      .then((data) => {
        setItems(data.items || []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const removeItem = async (id: string) => {
    await fetch(`/api/wishlist?id=${id}`, { method: "DELETE" });
    setItems(items.filter((item) => item.id !== id));
    toast.success("Removed from wishlist");
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1310px] px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-[#F7F7F7] rounded w-48" />
          <div className="h-64 bg-[#F7F7F7] rounded" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[1310px] px-4 py-16 text-center">
        <Heart className="h-16 w-16 mx-auto text-[#403D3D] mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your Wishlist</h1>
        <p className="text-[#403D3D] mb-6">
          Save your favorite items to purchase later.
        </p>
        <Link href="/categories">
          <Button className="rounded-none bg-[#0F4041] hover:bg-[#0a3334]">Browse Items</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1310px] px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Wishlist ({items.length})</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((item) => {
          const images = JSON.parse(item.listing.images || "[]");
          const imageUrl = images[item.listing.featuredImageIndex] || "/placeholder.svg";

          return (
            <Card key={item.id} className="group overflow-hidden rounded-none border-[#E5E7EB] hover:shadow-md transition-all">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Link href={`/listings/${item.listing.slug}`}>
                    <Image
                      src={imageUrl}
                      alt={item.listing.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white rounded-none"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
                <div className="p-3 space-y-1">
                  <Link href={`/listings/${item.listing.slug}`}>
                    <h3 className="font-medium text-sm line-clamp-1 hover:text-[#D57429]">{item.listing.title}</h3>
                  </Link>
                  <p className="text-xs text-[#403D3D]">{item.listing.seller.name}</p>
                  <p className="text-[#0F4041] font-semibold">${item.listing.price.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
