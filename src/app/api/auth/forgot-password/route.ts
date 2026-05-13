import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const resetTokens = new Map<string, { email: string; expires: number }>();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: "If an account exists, a reset link has been sent." });
    }

    const token = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    resetTokens.set(token, { email, expires: Date.now() + 3600000 });

    console.log(`Password reset token for ${email}: ${token}`);

    return NextResponse.json({
      message: "If an account exists, a reset link has been sent.",
      debugToken: token,
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password || password.length < 6) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const data = resetTokens.get(token);
    if (!data || data.expires < Date.now()) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    const bcrypt = await import("bcryptjs");
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email: data.email },
      data: { password: hashedPassword },
    });

    resetTokens.delete(token);

    return NextResponse.json({ message: "Password reset successfully" });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
