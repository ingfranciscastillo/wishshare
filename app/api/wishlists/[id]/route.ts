import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { wishlists, usersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" });
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

    const [updated] = await db
      .update(wishlists)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(wishlists.id, id))
      .returning();

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating wishlist:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    const { id } = params;

    // Verificar ownership
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

    // Eliminar (cascade eliminará los items automáticamente)
    await db.delete(wishlists).where(eq(wishlists.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting wishlist:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
