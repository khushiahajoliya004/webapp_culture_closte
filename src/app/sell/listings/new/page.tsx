"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react";

const conditions = [
  "NEW_WITH_TAGS",
  "NEW_WITHOUT_TAGS",
  "LIKE_NEW",
  "GOOD",
  "FAIR",
];

const deliveryMethods = ["SHIPPING", "PICKUP", "BOTH"];

interface Category {
  id: string;
  name: string;
  parentId: string | null;
}

export default function NewListingPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    condition: "LIKE_NEW",
    categoryId: "",
    price: "",
    originalPrice: "",
    size: "",
    primaryColor: "",
    occasion: "",
    material: "",
    countryOfOrigin: "",
    countryLocation: "",
    deliveryMethod: "SHIPPING",
    shippingCost: "",
    isNegotiable: false,
  });

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => setCategories(data.categories || []));
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const newImages: string[] = [];

    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append("file", file);

      try {
        const res = await fetch("/api/upload", { method: "POST", body: form });
        const data = await res.json();
        if (data.url) newImages.push(data.url);
        else toast.error("Failed to upload image");
      } catch {
        toast.error("Failed to upload image");
      }
    }

    setImages((prev) => [...prev, ...newImages]);
    setUploading(false);
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    if (!formData.categoryId) {
      toast.error("Please select a category");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/seller/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          images,
          occasion: formData.occasion ? formData.occasion.split(",").map((s) => s.trim()) : [],
          price: parseFloat(formData.price),
          originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
          shippingCost: formData.shippingCost ? parseFloat(formData.shippingCost) : undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create listing");
      }

      toast.success("Listing created successfully!");
      router.push("/sell/listings");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const parentCategories = categories.filter((c) => !c.parentId);
  const subCategories = categories.filter((c) => c.parentId);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <Link href="/sell/listings">
          <Button variant="ghost" size="sm" className="gap-1 rounded-none">
            <ArrowLeft className="h-4 w-4" />
            Back to Listings
          </Button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-8">Create New Listing</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Photos */}
        <Card className="rounded-none border-[#E5E7EB]">
          <CardContent className="p-6 space-y-4">
            <h2 className="font-semibold">Photos</h2>
            <div className="flex flex-wrap gap-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-24 h-24 rounded-md overflow-hidden border">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <label className="w-24 h-24 rounded-md border-2 border-dashed border-[#E5E7EB] flex flex-col items-center justify-center cursor-pointer hover:bg-[#F7F7F7] transition-colors">
                {uploading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Upload className="h-5 w-5 text-[#403D3D]" />
                )}
                <span className="text-xs text-[#403D3D] mt-1">
                  {uploading ? "Uploading..." : "Add Photo"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>
            </div>
            <p className="text-xs text-[#403D3D]">
              Images are uploaded directly to Cloudinary. You can add multiple photos.
            </p>
          </CardContent>
        </Card>

        {/* Details */}
        <Card className="rounded-none border-[#E5E7EB]">
          <CardContent className="p-6 space-y-4">
            <h2 className="font-semibold">Details</h2>

            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="rounded-none border-[#E5E7EB]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                rows={4}
                className="rounded-none border-[#E5E7EB]"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (USD) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="rounded-none border-[#E5E7EB]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Original Price</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  className="rounded-none border-[#E5E7EB]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category dropdown */}
              <div className="space-y-2">
                <Label htmlFor="categoryId">Category *</Label>
                <select
                  id="categoryId"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  required
                  className="flex h-9 w-full rounded-none border border-[#E5E7EB] bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">Select a category</option>
                  {parentCategories.length > 0 && (
                    <optgroup label="Main Categories">
                      {parentCategories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </optgroup>
                  )}
                  {subCategories.length > 0 && (
                    <optgroup label="Sub Categories">
                      {subCategories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <select
                  id="condition"
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="flex h-9 w-full rounded-none border border-[#E5E7EB] bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {conditions.map((c) => (
                    <option key={c} value={c}>{c.replace(/_/g, " ")}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Input
                  id="size"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="rounded-none border-[#E5E7EB]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Color</Label>
                <Input
                  id="primaryColor"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  className="rounded-none border-[#E5E7EB]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="occasion">Occasion (comma separated)</Label>
              <Input
                id="occasion"
                value={formData.occasion}
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                placeholder="Wedding, Festive, Casual"
                className="rounded-none border-[#E5E7EB]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="material">Material</Label>
                <Input
                  id="material"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  className="rounded-none border-[#E5E7EB]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="countryOfOrigin">Country of Origin</Label>
                <Input
                  id="countryOfOrigin"
                  value={formData.countryOfOrigin}
                  onChange={(e) => setFormData({ ...formData, countryOfOrigin: e.target.value })}
                  className="rounded-none border-[#E5E7EB]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="countryLocation">Item Location</Label>
                <Input
                  id="countryLocation"
                  value={formData.countryLocation}
                  onChange={(e) => setFormData({ ...formData, countryLocation: e.target.value })}
                  className="rounded-none border-[#E5E7EB]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shippingCost">Shipping Cost (USD)</Label>
                <Input
                  id="shippingCost"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.shippingCost}
                  onChange={(e) => setFormData({ ...formData, shippingCost: e.target.value })}
                  className="rounded-none border-[#E5E7EB]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryMethod">Delivery Method</Label>
              <select
                id="deliveryMethod"
                value={formData.deliveryMethod}
                onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                className="flex h-9 w-full rounded-none border border-[#E5E7EB] bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {deliveryMethods.map((d) => (
                  <option key={d} value={d}>{d.replace(/_/g, " ")}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="isNegotiable"
                type="checkbox"
                checked={formData.isNegotiable}
                onChange={(e) => setFormData({ ...formData, isNegotiable: e.target.checked })}
                className="rounded border-gray-300"
              />
              <Label htmlFor="isNegotiable" className="font-normal cursor-pointer">
                Price is negotiable
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            type="submit"
            className="flex-1 bg-[#D57429] hover:bg-[#c06524] rounded-none"
            disabled={isSubmitting || uploading}
          >
            {isSubmitting ? "Creating..." : "Create Listing"}
          </Button>
          <Link href="/sell/listings">
            <Button variant="outline" type="button" className="rounded-none">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
