"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MessageSquare, Star } from "lucide-react";

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  platformFee: number;
  sellerPayout: number;
  shippingAddress: string;
  deliveryMethod: string;
  trackingNumber?: string;
  carrier?: string;
  createdAt: string;
  updatedAt: string;
  listing: {
    id: string;
    title: string;
    slug: string;
    images: string;
    featuredImageIndex: number;
    price: number;
    category: { name: string };
  };
  seller: {
    id: string;
    name: string;
    email: string;
    locationCountry?: string;
  };
  review?: {
    id: string;
    rating: number;
    comment?: string;
  } | null;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PAID: "bg-green-100 text-green-800",
  SHIPPED: "bg-blue-100 text-blue-800",
  DELIVERED: "bg-purple-100 text-purple-800",
  CANCELLED: "bg-red-100 text-red-800",
  REFUNDED: "bg-gray-100 text-gray-800",
};

export default function OrderDetailPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/orders/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data.order || null);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [params.id]);

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

  if (!order) {
    return (
      <div className="mx-auto max-w-[1310px] px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Order Not Found</h1>
        <p className="text-[#403D3D] mb-6">
          The order you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/orders">
          <Button className="bg-[#0F4041] hover:bg-[#0a3334] rounded-none">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  const images = JSON.parse(order.listing.images || "[]");
  const imageUrl = images[order.listing.featuredImageIndex] || "/placeholder.svg";

  return (
    <div className="mx-auto max-w-[1310px] px-4 py-8">
      <div className="mb-6">
        <Link href="/orders">
          <Button variant="ghost" size="sm" className="gap-1 rounded-none">
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-bold">Order #{order.id.slice(-8).toUpperCase()}</h1>
        <Badge variant="secondary" className={statusColors[order.status] || "bg-gray-100"}>
          {order.status}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-none border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Link href={`/listings/${order.listing.slug}`}>
                  <div className="relative w-24 h-32 rounded-md overflow-hidden shrink-0">
                    <Image src={imageUrl} alt={order.listing.title} fill className="object-cover" />
                  </div>
                </Link>
                <div className="space-y-1">
                  <Link href={`/listings/${order.listing.slug}`}>
                    <h3 className="font-medium hover:text-[#D57429]">{order.listing.title}</h3>
                  </Link>
                  <p className="text-sm text-[#403D3D]">{order.listing.category.name}</p>
                  <p className="text-[#0F4041] font-semibold">${order.listing.price.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-none border-[#E5E7EB]">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold text-lg">Shipping Details</h2>
              <p className="text-sm whitespace-pre-line text-[#403D3D]">{order.shippingAddress}</p>
              <p className="text-sm capitalize">
                <span className="font-medium">Delivery Method:</span> {order.deliveryMethod.toLowerCase()}
              </p>
              {order.trackingNumber && (
                <p className="text-sm">
                  <span className="font-medium">Tracking:</span> {order.trackingNumber} ({order.carrier})
                </p>
              )}
            </CardContent>
          </Card>

          {order.status === "DELIVERED" && !order.review && (
            <Card className="rounded-none border-[#E5E7EB]">
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg mb-4">Leave a Review</h2>
                <ReviewForm orderId={order.id} listingId={order.listing.id} onSubmitted={() => window.location.reload()} />
              </CardContent>
            </Card>
          )}

          {order.review && (
            <Card className="rounded-none border-[#E5E7EB]">
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg mb-2">Your Review</h2>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < order.review!.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                {order.review.comment && (
                  <p className="text-sm text-[#403D3D]">{order.review.comment}</p>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="rounded-none border-[#E5E7EB]">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold text-lg">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#403D3D]">Item Price</span>
                  <span>${order.listing.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#403D3D]">Platform Fee</span>
                  <span>${order.platformFee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-none border-[#E5E7EB]">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold text-lg">Seller</h2>
              <div className="space-y-1">
                <p className="font-medium">{order.seller.name}</p>
                <p className="text-sm text-[#403D3D]">{order.seller.locationCountry}</p>
              </div>
              <Link href={`/messages?user=${order.seller.id}&listing=${order.listing.id}`}>
                <Button variant="outline" className="w-full gap-2 rounded-none border-[#E5E7EB]">
                  <MessageSquare className="h-4 w-4" />
                  Message Seller
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ReviewForm({ orderId, listingId, onSubmitted }: { orderId: string; listingId: string; onSubmitted: () => void }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, listingId, rating, comment }),
      });

      if (!res.ok) throw new Error("Failed to submit review");
      onSubmitted();
    } catch {
      alert("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <button
            key={i}
            type="button"
            onMouseEnter={() => setHoverRating(i + 1)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(i + 1)}
            className="p-1"
          >
            <Star
              className={`h-6 w-6 transition-colors ${
                i < (hoverRating || rating)
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
      <textarea
        className="w-full rounded-none border-[#E5E7EB] bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-[#403D3D] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        rows={3}
        placeholder="Share your experience..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        type="submit"
        className="bg-[#0F4041] hover:bg-[#0a3334] rounded-none"
        disabled={rating === 0 || isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
