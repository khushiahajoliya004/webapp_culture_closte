"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Package, ShoppingBag, DollarSign, Shield } from "lucide-react";

interface Stats {
  users: number;
  listings: number;
  orders: number;
  totalRevenue: number;
}

interface UserRow {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: string;
  _count: { listings: number; ordersAsBuyer: number; ordersAsSeller: number };
}

interface ListingRow {
  id: string;
  title: string;
  slug: string;
  price: number;
  status: string;
  seller: { name: string | null; email: string };
  category: { name: string };
  _count: { orders: number };
  createdAt: string;
}

interface OrderRow {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  listing: { title: string; slug: string };
  buyer: { name: string | null; email: string };
  seller: { name: string | null; email: string };
}

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-800",
  SOLD: "bg-blue-100 text-blue-800",
  CLOSED: "bg-gray-100 text-gray-800",
  UNDER_REVIEW: "bg-yellow-100 text-yellow-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  PAID: "bg-green-100 text-green-800",
  SHIPPED: "bg-blue-100 text-blue-800",
  DELIVERED: "bg-purple-100 text-purple-800",
  CANCELLED: "bg-red-100 text-red-800",
  REFUNDED: "bg-gray-100 text-gray-800",
};

export default function AdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [listings, setListings] = useState<ListingRow[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    type StatsResponse = Stats & { error?: string };
    type UsersResponse = { users?: UserRow[] };
    type ListingsResponse = { listings?: ListingRow[] };
    type OrdersResponse = { orders?: OrderRow[] };
    Promise.all([
      fetch("/api/admin/stats").then((r) => r.json() as Promise<StatsResponse>),
      fetch("/api/admin/users").then((r) => r.json() as Promise<UsersResponse>),
      fetch("/api/admin/listings").then((r) => r.json() as Promise<ListingsResponse>),
      fetch("/api/admin/orders").then((r) => r.json() as Promise<OrdersResponse>),
    ])
      .then(([s, u, l, o]) => {
        if (s.error) {
          setError(s.error);
          setIsLoading(false);
          return;
        }
        setStats(s);
        setUsers(u.users || []);
        setListings(l.listings || []);
        setOrders(o.orders || []);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to load admin data");
        setIsLoading(false);
      });
  }, []);

  const updateListingStatus = async (id: string, status: string) => {
    await fetch("/api/admin/listings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setListings((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const updateOrderStatus = async (id: string, status: string) => {
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1310px] px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-[#F7F7F7] rounded w-48" />
          <div className="h-32 bg-[#F7F7F7] rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[1310px] px-4 py-16 text-center">
        <Shield className="h-16 w-16 mx-auto text-[#403D3D] mb-4" />
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-[#403D3D] mb-6">You don&apos;t have permission to view this page.</p>
        <Button onClick={() => router.push("/")} className="bg-[#0F4041] hover:bg-[#0a3334] rounded-none">
          Go Home
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1310px] px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <Shield className="h-6 w-6 text-[#D57429]" />
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="rounded-none border-[#E5E7EB]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#403D3D]">Users</p>
                <p className="text-2xl font-bold">{stats?.users || 0}</p>
              </div>
              <Users className="h-8 w-8 text-[#0F4041]" />
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-[#E5E7EB]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#403D3D]">Listings</p>
                <p className="text-2xl font-bold">{stats?.listings || 0}</p>
              </div>
              <Package className="h-8 w-8 text-[#D57429]" />
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-[#E5E7EB]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#403D3D]">Orders</p>
                <p className="text-2xl font-bold">{stats?.orders || 0}</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-[#0F4041]" />
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-none border-[#E5E7EB]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#403D3D]">Revenue</p>
                <p className="text-2xl font-bold">${(stats?.totalRevenue || 0).toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-[#D57429]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users">
        <TabsList className="rounded-none bg-transparent border-b border-[#E5E7EB] h-auto p-0">
          <TabsTrigger value="users" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#951E45] data-[state=active]:text-[#951E45] data-[state=active]:shadow-none data-[state=active]:bg-transparent px-4 py-2">Users</TabsTrigger>
          <TabsTrigger value="listings" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#951E45] data-[state=active]:text-[#951E45] data-[state=active]:shadow-none data-[state=active]:bg-transparent px-4 py-2">Listings</TabsTrigger>
          <TabsTrigger value="orders" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#951E45] data-[state=active]:text-[#951E45] data-[state=active]:shadow-none data-[state=active]:bg-transparent px-4 py-2">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-4">
          <Card className="rounded-none border-[#E5E7EB]">
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F7F7F7]">
                  <tr>
                    <th className="text-left p-3 font-medium">Name</th>
                    <th className="text-left p-3 font-medium">Email</th>
                    <th className="text-left p-3 font-medium">Role</th>
                    <th className="text-left p-3 font-medium">Listings</th>
                    <th className="text-left p-3 font-medium">Orders</th>
                    <th className="text-left p-3 font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b">
                      <td className="p-3">{u.name || "—"}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3">
                        <Badge variant="secondary">{u.role}</Badge>
                      </td>
                      <td className="p-3">{u._count.listings}</td>
                      <td className="p-3">{u._count.ordersAsBuyer + u._count.ordersAsSeller}</td>
                      <td className="p-3">{new Date(u.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="listings" className="mt-4">
          <Card className="rounded-none border-[#E5E7EB]">
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F7F7F7]">
                  <tr>
                    <th className="text-left p-3 font-medium">Title</th>
                    <th className="text-left p-3 font-medium">Seller</th>
                    <th className="text-left p-3 font-medium">Price</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Orders</th>
                    <th className="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((l) => (
                    <tr key={l.id} className="border-b">
                      <td className="p-3">
                        <Link href={`/listings/${l.slug}`} className="hover:text-[#D57429]">
                          {l.title}
                        </Link>
                      </td>
                      <td className="p-3">{l.seller.name || l.seller.email}</td>
                      <td className="p-3">${l.price.toFixed(2)}</td>
                      <td className="p-3">
                        <Badge variant="secondary" className={statusColors[l.status] || "bg-gray-100"}>
                          {l.status}
                        </Badge>
                      </td>
                      <td className="p-3">{l._count.orders}</td>
                      <td className="p-3">
                        <select
                          value={l.status}
                          onChange={(e) => updateListingStatus(l.id, e.target.value)}
                          className="rounded-none border border-[#E5E7EB] px-2 py-1 text-xs"
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="SOLD">SOLD</option>
                          <option value="CLOSED">CLOSED</option>
                          <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="mt-4">
          <Card className="rounded-none border-[#E5E7EB]">
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F7F7F7]">
                  <tr>
                    <th className="text-left p-3 font-medium">Order</th>
                    <th className="text-left p-3 font-medium">Buyer</th>
                    <th className="text-left p-3 font-medium">Seller</th>
                    <th className="text-left p-3 font-medium">Total</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b">
                      <td className="p-3">
                        <Link href={`/orders/${o.id}`} className="hover:text-[#D57429]">
                          {o.listing.title}
                        </Link>
                      </td>
                      <td className="p-3">{o.buyer.name || o.buyer.email}</td>
                      <td className="p-3">{o.seller.name || o.seller.email}</td>
                      <td className="p-3">${o.totalAmount.toFixed(2)}</td>
                      <td className="p-3">
                        <Badge variant="secondary" className={statusColors[o.status] || "bg-gray-100"}>
                          {o.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                          className="rounded-none border border-[#E5E7EB] px-2 py-1 text-xs"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="PAID">PAID</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                          <option value="REFUNDED">REFUNDED</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
