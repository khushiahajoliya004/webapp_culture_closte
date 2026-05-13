"use client";

import { useEffect, useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface Conversation {
  id: string;
  lastMessageAt: string;
  listing: {
    id: string;
    title: string;
    slug: string;
    images: string;
    featuredImageIndex: number;
  } | null;
  participants: {
    user: {
      id: string;
      name: string | null;
      image: string | null;
    };
  }[];
  messages: {
    content: string;
    createdAt: string;
    senderId: string;
  }[];
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[1310px] px-4 py-16 text-center">Loading messages...</div>}>
      <MessagesContent />
    </Suspense>
  );
}

function MessagesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = searchParams.get("user");
    const listingId = searchParams.get("listing");

    if (userId) {
      fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          participantId: userId,
          listingId,
          initialMessage: "Hi, I'm interested in your listing!",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.conversationId) {
            router.push(`/messages/${data.conversationId}`);
          }
        })
        .catch(() => toast.error("Failed to start conversation"));
      return;
    }

    fetch("/api/conversations")
      .then((res) => res.json())
      .then((data) => {
        setConversations(data.conversations || []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [searchParams, router]);

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

  if (conversations.length === 0) {
    return (
      <div className="mx-auto max-w-[1310px] px-4 py-16 text-center">
        <MessageSquare className="h-16 w-16 mx-auto text-[#403D3D] mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-[#0F0D1A]">Messages</h1>
        <p className="text-[#403D3D] mb-6">
          You don&apos;t have any conversations yet.
        </p>
        <Link href="/categories">
          <Button className="bg-[#0F4041] hover:bg-[#0a3334]">Browse Items</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1310px] px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-8 text-[#0F0D1A]">Messages</h1>

      <div className="space-y-3">
        {conversations.map((conversation) => {
          const otherParticipant = conversation.participants.find(
            (p) => p.user.id !== session?.user?.id
          )?.user || conversation.participants[0]?.user;
          const lastMessage = conversation.messages[0];
          const images = conversation.listing ? JSON.parse(conversation.listing.images || "[]") : [];
          const imageUrl = conversation.listing ? images[conversation.listing.featuredImageIndex] : null;

          return (
            <Link key={conversation.id} href={`/messages/${conversation.id}`}>
              <Card className="hover:shadow-md transition-shadow rounded-none border-[#E5E7EB]">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full bg-[#0F4041] text-white flex items-center justify-center font-semibold shrink-0 overflow-hidden">
                    {otherParticipant?.image ? (
                      <Image src={otherParticipant.image} alt="" fill className="object-cover" />
                    ) : (
                      otherParticipant?.name?.charAt(0) || "U"
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate text-[#0F0D1A]">{otherParticipant?.name || "Unknown"}</p>
                      <span className="text-xs text-[#403D3D] shrink-0">
                        {lastMessage ? new Date(conversation.lastMessageAt).toLocaleDateString() : ""}
                      </span>
                    </div>
                    {conversation.listing && (
                      <p className="text-xs text-[#D57429] truncate">Re: {conversation.listing.title}</p>
                    )}
                    {lastMessage && (
                      <p className="text-sm text-[#403D3D] truncate">{lastMessage.content}</p>
                    )}
                  </div>
                  {imageUrl && (
                    <div className="relative w-12 h-12 rounded-md overflow-hidden shrink-0 hidden sm:block">
                      <Image src={imageUrl} alt="" fill className="object-cover" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
