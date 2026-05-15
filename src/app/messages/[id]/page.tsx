"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";

interface Message {
  id: string;
  content: string;
  createdAt: string;
  senderId: string;
  sender: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

export default function ChatPage() {
  const params = useParams();
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [otherUser, setOtherUser] = useState<{ id: string; name: string | null } | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/conversations/${params.id}/messages`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.messages || []);
        if (data.messages?.length > 0) {
          const firstMsg = data.messages[0];
          const other = firstMsg.senderId === firstMsg.sender.id ? data.messages.find((m: Message) => m.senderId !== firstMsg.senderId)?.sender : firstMsg.sender;
          setOtherUser(other || null);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [params.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !otherUser) return;

    const tempMessage: Message = {
      id: `temp-${Date.now()}`,
      content: input.trim(),
      createdAt: new Date().toISOString(),
      senderId: "me",
      sender: { id: "me", name: "You", image: null },
    };

    setMessages((prev) => [...prev, tempMessage]);
    setInput("");

    try {
      const res = await fetch(`/api/conversations/${params.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: tempMessage.content, receiverId: otherUser.id }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => prev.map((m) => (m.id === tempMessage.id ? data : m)));
      }
    } catch {
      // silently fail
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-[#F7F7F7] rounded w-48" />
          <div className="h-64 bg-[#F7F7F7] rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-4 md:py-8 flex flex-col h-[calc(100dvh-130px)] md:h-[calc(100vh-150px)]">
      <div className="flex items-center gap-3 mb-4">
        <Link href="/messages">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-xl font-bold">{otherUser?.name || "Chat"}</h1>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden rounded-none border-[#E5E7EB]">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <p className="text-center text-[#403D3D] py-8">No messages yet. Say hello!</p>
          )}
          {messages.map((msg) => {
            const isMe = msg.senderId === session?.user?.id;
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                    isMe
                      ? "bg-[#0F4041] text-white rounded-br-none"
                      : "bg-[#F7F7F7] text-[#0F0D1A] rounded-bl-none"
                  }`}
                >
                  <p>{msg.content}</p>
                  <p className={`text-xs mt-1 ${isMe ? "text-white/70" : "text-[#403D3D]"}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </CardContent>

        <div className="p-4 border-t">
          <form onSubmit={sendMessage} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-none border-[#E5E7EB]"
            />
            <Button type="submit" size="icon" className="bg-[#0F4041] hover:bg-[#0a3334] rounded-none">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
