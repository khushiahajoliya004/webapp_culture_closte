import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getPrisma } from "@/lib/db";

export async function GET() {
  const prisma = await getPrisma();
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const listings = await prisma.listing.findMany({
    where: { sellerId: session.user.id },
    include: {
      category: { select: { name: true } },
      _count: {
        select: { orders: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ listings });
}

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    title,
    description,
    condition,
    categoryId,
    price,
    originalPrice,
    size,
    primaryColor,
    occasion,
    material,
    countryOfOrigin,
    countryLocation,
    deliveryMethod,
    shippingCost,
    images,
    isNegotiable,
  } = body;

  if (!title || !description || !categoryId || !price || !images?.length) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Date.now().toString(36)}`;

  const listing = await prisma.listing.create({
    data: {
      title,
      slug,
      description,
      condition: condition || "LIKE_NEW",
      categoryId,
      sellerId: session.user.id,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : null,
      size: size || null,
      primaryColor: primaryColor || null,
      occasion: occasion ? JSON.stringify(occasion) : null,
      material: material || null,
      countryOfOrigin: countryOfOrigin || null,
      countryLocation: countryLocation || null,
      deliveryMethod: deliveryMethod || "SHIPPING",
      shippingCost: shippingCost ? parseFloat(shippingCost) : null,
      images: JSON.stringify(images),
      isNegotiable: !!isNegotiable,
      status: "ACTIVE",
    },
  });

  return NextResponse.json(listing, { status: 201 });
}
