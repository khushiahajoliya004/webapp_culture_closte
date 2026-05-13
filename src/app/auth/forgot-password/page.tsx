"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
      } else {
        setSent(true);
        toast.success("Reset instructions sent!");
        if (data.debugToken) {
          console.log("Reset token:", data.debugToken);
        }
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="mx-auto max-w-[1310px] px-4 py-16 flex justify-center">
        <Card className="w-full max-w-md rounded-none border-[#E5E7EB]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>
              If an account exists for {email}, we&apos;ve sent password reset instructions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[#403D3D] text-center mb-4">
              For demo purposes, check the browser console for the reset token.
            </p>
            <Link href="/auth/login">
              <Button className="w-full rounded-none bg-[#0F4041] hover:bg-[#0a3334]">Back to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1310px] px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md rounded-none border-[#E5E7EB]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>Enter your email and we&apos;ll send you instructions</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-none border-[#E5E7EB]"
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-none bg-[#0F4041] hover:bg-[#0a3334]"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Instructions"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <p className="text-[#403D3D]">
              Remember your password?{" "}
              <Link href="/auth/login" className="text-[#D57429] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
