import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getPrisma } from "@/lib/db";

export async function GET() {
  const prisma = await getPrisma();
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: { userId: session.user.id },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: { id: true, name: true, image: true },
            },
          },
        },
        listing: {
          select: { id: true, title: true, slug: true, images: true, featuredImageIndex: true },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: { content: true, createdAt: true, senderId: true },
        },
      },
      orderBy: { lastMessageAt: "desc" },
    });

    return NextResponse.json({ conversations });
  } catch (error) {
    console.error("GET /api/conversations error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { participantId, listingId, initialMessage } = body;

  if (!participantId || !initialMessage) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existing = await prisma.conversation.findFirst({
    where: {
      AND: [
        { participants: { some: { userId: session.user.id } } },
        { participants: { some: { userId: participantId } } },
      ],
      ...(listingId ? { listingId } : {}),
    },
  });

  let conversationId = existing?.id;

  if (!conversationId) {
    try {
      const conversation = await prisma.conversation.create({
        data: {
          listingId: listingId || null,
          participants: {
            create: [
              { userId: session.user.id },
              { userId: participantId },
            ],
          },
        },
      });
      conversationId = conversation.id;
    } catch (e: any) {
      if (e.code === "P2002") {
        // Race condition — another request already created it, find it
        const found = await prisma.conversation.findFirst({
          where: {
            AND: [
              { participants: { some: { userId: session.user.id } } },
              { participants: { some: { userId: participantId } } },
            ],
          },
        });
        if (!found) throw e;
        conversationId = found.id;
      } else {
        throw e;
      }
    }
  }

  await prisma.message.create({
    data: {
      conversationId,
      senderId: session.user.id,
      receiverId: participantId,
      listingId: listingId || null,
      content: initialMessage,
    },
  });

  await prisma.conversation.update({
    where: { id: conversationId },
    data: { lastMessageAt: new Date() },
  });

  return NextResponse.json({ conversationId });
}
