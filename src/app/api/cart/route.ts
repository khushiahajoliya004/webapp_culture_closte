import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getPrisma } from "@/lib/db";

export async function GET() {
  const prisma = await getPrisma();
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ items: [] }, { status: 401 });
  }

  const cartItems = await prisma.cartItem.findMany({
    where: { userId: session.user.id },
    include: { listing: true },
  });

  return NextResponse.json({ items: cartItems });
}

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { listingId, quantity } = await req.json();

  const cartItem = await prisma.cartItem.upsert({
    where: {
      userId_listingId: {
        userId: session.user.id,
        listingId,
      },
    },
    update: { quantity: { increment: quantity || 1 } },
    create: {
      userId: session.user.id,
      listingId,
      quantity: quantity || 1,
    },
  });

  return NextResponse.json(cartItem);
}

export async function DELETE(req: Request) {
  const prisma = await getPrisma();
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    await prisma.cartItem.delete({
      where: { id },
    });
  } else {
    await prisma.cartItem.deleteMany({
      where: { userId: session.user.id },
    });
  }

  return NextResponse.json({ success: true });
}
