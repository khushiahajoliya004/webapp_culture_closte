import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getPrisma } from "@/lib/db";

export async function GET(req: Request) {
  const prisma = await getPrisma();
  const { searchParams } = new URL(req.url);
  const listingId = searchParams.get("listingId");

  if (!listingId) {
    return NextResponse.json({ error: "Missing listingId" }, { status: 400 });
  }

  const reviews = await prisma.review.findMany({
    where: { listingId },
    include: {
      reviewer: {
        select: { name: true, image: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ reviews });
}

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { orderId, listingId, sellerId, rating, comment } = body;

  if (!orderId || !listingId || !rating) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order || order.buyerId !== session.user.id) {
    return NextResponse.json({ error: "Invalid order" }, { status: 403 });
  }

  if (order.status !== "DELIVERED" && order.status !== "PAID" && order.status !== "SHIPPED") {
    return NextResponse.json({ error: "Order must be delivered to review" }, { status: 400 });
  }

  const review = await prisma.review.create({
    data: {
      orderId,
      reviewerId: session.user.id,
      sellerId: order.sellerId,
      listingId,
      rating,
      comment: comment || null,
    },
  });

  return NextResponse.json(review);
}
