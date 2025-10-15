import { db } from "@/lib/db";
import { wishlists, usersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { userId } = await auth();
    const { slug } = await params;

    const wishlist = await db.query.wishlists.findFirst({
      where: eq(wishlists.slug, slug),
      with: {
        items: {
          orderBy: (items, { asc }) => [asc(items.position)],
        },
      },
    });

    if (!wishlist) {
      return NextResponse.json(
        { error: "Wishlist not found" },
        { status: 404 }
      );
    }

    // Si es privada, verificar autenticación y ownership
    if (wishlist.visibility === "private") {
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Obtener usuario actual
      const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.clerk_id, userId),
      });

      if (!user || wishlist.owner_id !== user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    return NextResponse.json(wishlist);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
