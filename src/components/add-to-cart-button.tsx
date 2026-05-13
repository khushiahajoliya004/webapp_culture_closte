"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Check } from "lucide-react";
import { toast } from "sonner";

interface AddToCartButtonProps {
  listingId: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export function AddToCartButton({ listingId, className, size = "sm" }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId, quantity: 1 }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (res.status === 401) {
          toast.error("Please sign in to add items to cart");
          return;
        }
        throw new Error(data.error || "Failed to add to cart");
      }

      toast.success("Added to cart!");
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size={size}
      className={className}
      onClick={handleClick}
      disabled={isLoading}
      variant={added ? "outline" : "default"}
    >
      {added ? (
        <>
          <Check className="h-3 w-3 mr-1" />
          Added
        </>
      ) : (
        <>
          <ShoppingBag className="h-3 w-3 mr-1" />
          {isLoading ? "Adding..." : "Add to Cart"}
        </>
      )}
    </Button>
  );
}
