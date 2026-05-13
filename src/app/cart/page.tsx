"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Trash2, ArrowRight, Minus, Plus } from "lucide-react";

interface CartItem {
  id: string;
  quantity: number;
  listing: {
    id: string;
    title: string;
    price: number;
    images: string;
    featuredImageIndex: number;
    slug: string;
  };
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items || []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const removeItem = async (id: string) => {
    await fetch(`/api/cart?id=${id}`, { method: "DELETE" });
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.listing.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1310px] px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-[#F7F7F7] rounded w-48" />
          <div className="h-32 bg-[#F7F7F7] rounded" />
          <div className="h-32 bg-[#F7F7F7] rounded" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[1310px] px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-[#403D3D] mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-[#403D3D] mb-6">
          Discover pre-loved South Asian fashion and add items to your cart.
        </p>
        <Link href="/categories">
          <Button className="rounded-none bg-[#0F4041] hover:bg-[#0a3334]">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1310px] px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart ({items.length} items)</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const images = JSON.parse(item.listing.images || "[]");
            const imageUrl = images[item.listing.featuredImageIndex] || "/placeholder.svg";
            return (
              <Card key={item.id} className="rounded-none border-[#E5E7EB]">
                <CardContent className="p-4 flex gap-4">
                  <Link href={`/listings/${item.listing.slug}`}>
                    <div className="relative w-24 h-32 rounded-md overflow-hidden shrink-0">
                      <Image src={imageUrl} alt={item.listing.title} fill className="object-cover" />
                    </div>
                  </Link>
                  <div className="flex-1 space-y-2">
                    <Link href={`/listings/${item.listing.slug}`}>
                      <h3 className="font-medium hover:text-[#D57429]">{item.listing.title}</h3>
                    </Link>
                    <p className="text-[#0F4041] font-semibold">
                      ${item.listing.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-[#E5E7EB] rounded-none">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive rounded-none"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div>
          <Card className="rounded-none border-[#E5E7EB]">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold text-lg">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#403D3D]">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#403D3D]">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout">
                <Button className="w-full rounded-none bg-[#0F4041] hover:bg-[#0a3334] text-white py-6">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <p className="text-xs text-[#403D3D] text-center">
                Shipping & taxes calculated at checkout
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
