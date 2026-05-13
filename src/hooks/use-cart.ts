"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";

export function useCart() {
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = useCallback(async (listingId: string, quantity = 1) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId, quantity }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (res.status === 401) {
          toast.error("Please sign in to add items to cart");
          return false;
        }
        throw new Error(data.error || "Failed to add to cart");
      }

      toast.success("Added to cart!");
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { addToCart, isLoading };
}
