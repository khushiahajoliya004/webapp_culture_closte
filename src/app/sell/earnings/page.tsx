"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, ArrowLeft } from "lucide-react";

interface Order {
  id: string;
  totalAmount: number;
  sellerPayout: number;
  platformFee: number;
  status: string;
  createdAt: string;
  listing: { title: string; slug: string };
}

export default function EarningsPage() {
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

  const totalEarnings = orders.reduce((sum, o) => sum + o.sellerPayout, 0);
  const totalFees = orders.reduce((sum, o) => sum + o.platformFee, 0);

  return (
    <div className="mx-auto max-w-[1310px] px-4 py-8">
      <div className="mb-6">
        <Link href="/sell/dashboard">
          <Button variant="ghost" size="sm" className="gap-1 rounded-none">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-8">Earnings</h1>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card className="rounded-none border-[#E5E7EB]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#403D3D]">Total Earnings</p>
                <p className="text-2xl font-bold text-green-600">
                  {isLoading ? "..." : `$${totalEarnings.toFixed(2)}`}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-[#E5E7EB]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#403D3D]">Platform Fees</p>
                <p className="text-2xl font-bold">
                  {isLoading ? "..." : `$${totalFees.toFixed(2)}`}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-[#D57429]" />
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-[#E5E7EB]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#403D3D]">Total Orders</p>
                <p className="text-2xl font-bold">
                  {isLoading ? "..." : orders.length}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-[#0F4041]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-none border-[#E5E7EB]">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F7F7F7]">
              <tr>
                <th className="text-left p-3 font-medium">Order</th>
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Total</th>
                <th className="text-left p-3 font-medium">Your Payout</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b">
                  <td className="p-3">{o.listing.title}</td>
                  <td className="p-3">{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td className="p-3">{o.status}</td>
                  <td className="p-3">${o.totalAmount.toFixed(2)}</td>
                  <td className="p-3 text-green-600 font-medium">${o.sellerPayout.toFixed(2)}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-[#403D3D]">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
