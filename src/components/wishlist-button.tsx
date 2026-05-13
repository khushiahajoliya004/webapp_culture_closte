"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";

interface WishlistButtonProps {
  listingId: string;
  className?: string;
}

export function WishlistButton({ listingId, className }: WishlistButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          toast.error("Please sign in to save items");
          return;
        }
        throw new Error("Failed to save");
      }

      toast.success("Saved to wishlist!");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      className={className}
      onClick={handleClick}
      disabled={isLoading}
    >
      <Heart className="h-4 w-4" />
    </Button>
  );
}
