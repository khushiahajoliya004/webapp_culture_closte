"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ArrowRight } from "lucide-react";

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  sellerPayout: number;
  createdAt: string;
  deliveryMethod: string;
  shippingAddress: string;
  listing: {
    id: string;
    title: string;
    slug: string;
    images: string;
    featuredImageIndex: number;
  };
  buyer: {
    id: string;
    name: string;
    email: string;
  };
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PAID: "bg-green-100 text-green-800",
  SHIPPED: "bg-blue-100 text-blue-800",
  DELIVERED: "bg-purple-100 text-purple-800",
  CANCELLED: "bg-red-100 text-red-800",
  REFUNDED: "bg-gray-100 text-gray-800",
};

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/seller/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
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

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-[1310px] px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-[#403D3D] mb-4" />
        <h1 className="text-2xl font-bold mb-2">Orders Received</h1>
        <p className="text-[#403D3D] mb-6">
          You haven&apos;t received any orders yet.
        </p>
        <Link href="/sell/listings">
          <Button className="bg-[#0F4041] hover:bg-[#0a3334] rounded-none">Manage Listings</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1310px] px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Orders Received</h1>

      <div className="space-y-4">
        {orders.map((order) => {
          const images = JSON.parse(order.listing.images || "[]");
          const imageUrl = images[order.listing.featuredImageIndex] || "/placeholder.svg";

          return (
            <Card key={order.id} className="hover:shadow-md transition-shadow rounded-none border-[#E5E7EB]">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <Link href={`/listings/${order.listing.slug}`}>
                    <div className="relative w-24 h-32 rounded-md overflow-hidden shrink-0">
                      <Image src={imageUrl} alt={order.listing.title} fill className="object-cover" />
                    </div>
                  </Link>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className={statusColors[order.status] || "bg-gray-100"}>
                        {order.status}
                      </Badge>
                      <span className="text-xs text-[#403D3D]">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <Link href={`/listings/${order.listing.slug}`}>
                      <h3 className="font-medium hover:text-[#D57429]">{order.listing.title}</h3>
                    </Link>

                    <p className="text-sm text-[#403D3D]">
                      Buyer: {order.buyer.name} ({order.buyer.email})
                    </p>

                    <p className="text-sm">
                      <span className="font-medium">Total:</span> ${order.totalAmount.toFixed(2)}{" "}
                      <span className="text-[#403D3D]">
                        (You earn: ${order.sellerPayout.toFixed(2)})
                      </span>
                    </p>

                    <p className="text-xs text-[#403D3D] capitalize">
                      Delivery: {order.deliveryMethod.toLowerCase()}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <Link href={`/orders/${order.id}`}>
                      <Button variant="outline" size="sm" className="gap-1 rounded-none">
                        Details
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
