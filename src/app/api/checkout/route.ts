import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getPrisma } from "@/lib/db";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { shippingAddress, deliveryMethod } = body;

  if (!shippingAddress || !deliveryMethod) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const cartItems = await prisma.cartItem.findMany({
    where: { userId: session.user.id },
    include: { listing: true },
  });

  if (cartItems.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const orders = [];

  for (const item of cartItems) {
    const listing = item.listing;
    const shippingCost = listing.shippingCost ?? (listing.price > 100 ? 0 : 15);
    const totalAmount = listing.price * item.quantity + shippingCost;
    const platformFee = totalAmount * 0.1;
    const sellerPayout = totalAmount - platformFee;

    const order = await prisma.order.create({
      data: {
        buyerId: session.user.id,
        sellerId: listing.sellerId,
        listingId: listing.id,
        quantity: item.quantity,
        status: "PAID",
        totalAmount,
        platformFee,
        sellerPayout,
        shippingAddress,
        deliveryMethod,
      },
    });

    await prisma.listing.update({
      where: { id: listing.id },
      data: { status: "SOLD" },
    });

    orders.push(order);
  }

  await prisma.cartItem.deleteMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json({ orders, success: true });
}
