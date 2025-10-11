// # POST /api/wishlist (crear wishlist)

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { wishlists } from "@/lib/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, description, visibility } = body;

  const newWishlist = await db
    .insert(wishlists)
    .values({
      owner_id: userId,
      title,
      description,
      visibility,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
    })
    .returning();

  return NextResponse.json(newWishlist[0]);
}
