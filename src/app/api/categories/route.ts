import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, parentId: true },
    });
    return NextResponse.json({ categories });
  } catch (err) {
    return NextResponse.json({ error: String(err), stack: err instanceof Error ? err.stack : undefined }, { status: 500 });
  }
}
