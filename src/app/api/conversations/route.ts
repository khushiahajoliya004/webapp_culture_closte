import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
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
}

export async function POST(req: Request) {
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
      listingId: listingId || undefined,
      participants: {
        every: {
          userId: { in: [session.user.id, participantId] },
        },
      },
    },
  });

  let conversationId = existing?.id;

  if (!conversationId) {
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
