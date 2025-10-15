import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { wishlists, items, usersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.clerk_id, clerkId),
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { id } = await params;
    const body = await req.json();

    const wishlist = await db.query.wishlists.findFirst({
      where: eq(wishlists.id, id),
    });

    if (!wishlist) {
      return NextResponse.json(
        { error: "Wishlist not found" },
        { status: 404 }
      );
    }

    if (wishlist.owner_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const lastItem = await db.query.items.findFirst({
      where: eq(items.wishlistId, id),
      orderBy: (items, { desc }) => [desc(items.position)],
    });

    const newPosition = lastItem ? (lastItem.position || 0) + 1 : 0;

    // Crear item
    const [item] = await db
      .insert(items)
      .values({
        wishlistId: id,
        url: body.url,
        title: body.title,
        image: body.image,
        price: body.price,
        store: body.store,
        note: body.note,
        position: newPosition,
      })
      .returning();

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Error creating item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
