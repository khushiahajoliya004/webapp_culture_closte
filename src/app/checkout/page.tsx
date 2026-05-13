"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ArrowLeft, CreditCard, Truck } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
    deliveryMethod: "SHIPPING",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const shippingAddress = `${formData.fullName}\n${formData.address}\n${formData.city}, ${formData.country} ${formData.postalCode}\nPhone: ${formData.phone}`;

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shippingAddress,
          deliveryMethod: formData.deliveryMethod,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      toast.success("Order placed successfully!");
      router.push("/orders");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1310px] px-4 py-8">
      <div className="mb-6">
        <Link href="/cart">
          <Button variant="ghost" size="sm" className="gap-1 rounded-none">
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="rounded-none border-[#E5E7EB]">
              <CardContent className="p-6 space-y-4">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <Truck className="h-5 w-5 text-[#0F4041]" />
                  Shipping Details
                </h2>

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="rounded-none border-[#E5E7EB]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    className="rounded-none border-[#E5E7EB]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                      className="rounded-none border-[#E5E7EB]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      required
                      className="rounded-none border-[#E5E7EB]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      required
                      className="rounded-none border-[#E5E7EB]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="rounded-none border-[#E5E7EB]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-none border-[#E5E7EB]">
              <CardContent className="p-6 space-y-4">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-[#0F4041]" />
                  Delivery Method
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryMethod: "SHIPPING" })}
                    className={`p-4 rounded-none border-2 text-left transition-colors ${
                      formData.deliveryMethod === "SHIPPING"
                        ? "border-[#0F4041] bg-[#0F4041]/5"
                        : "border-[#E5E7EB]"
                    }`}
                  >
                    <Truck className="h-5 w-5 mb-2 text-[#0F4041]" />
                    <p className="font-medium">Shipping</p>
                    <p className="text-xs text-[#403D3D]">Standard delivery to your address</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryMethod: "PICKUP" })}
                    className={`p-4 rounded-none border-2 text-left transition-colors ${
                      formData.deliveryMethod === "PICKUP"
                        ? "border-[#0F4041] bg-[#0F4041]/5"
                        : "border-[#E5E7EB]"
                    }`}
                  >
                    <MapPinIcon className="h-5 w-5 mb-2 text-[#0F4041]" />
                    <p className="font-medium">Local Pickup</p>
                    <p className="text-xs text-[#403D3D]">Arrange pickup with seller</p>
                  </button>
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full rounded-none bg-[#0F4041] hover:bg-[#0a3334] text-white py-6"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Place Order"}
            </Button>

            <p className="text-xs text-[#403D3D] text-center">
              This is a demo checkout. No real payment will be processed.
            </p>
          </form>
        </div>

        <div>
          <Card className="rounded-none border-[#E5E7EB]">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold text-lg">Order Summary</h2>
              <p className="text-sm text-[#403D3D]">
                Complete your shipping details to place your order.
              </p>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#403D3D]">Payment</span>
                  <span className="font-medium">Cash on Delivery / Demo</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
