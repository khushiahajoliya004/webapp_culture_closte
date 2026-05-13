import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ items: [] }, { status: 401 });
  }

  const items = await prisma.wishlist.findMany({
    where: { userId: session.user.id },
    include: {
      listing: {
        include: {
          seller: { select: { name: true } },
          category: { select: { name: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { listingId } = await req.json();

  const item = await prisma.wishlist.upsert({
    where: {
      userId_listingId: {
        userId: session.user.id,
        listingId,
      },
    },
    update: {},
    create: {
      userId: session.user.id,
      listingId,
    },
  });

  return NextResponse.json(item);
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const listingId = searchParams.get("listingId");

  if (id) {
    await prisma.wishlist.delete({ where: { id } });
  } else if (listingId) {
    await prisma.wishlist.deleteMany({
      where: { userId: session.user.id, listingId },
    });
  } else {
    await prisma.wishlist.deleteMany({
      where: { userId: session.user.id },
    });
  }

  return NextResponse.json({ success: true });
}
