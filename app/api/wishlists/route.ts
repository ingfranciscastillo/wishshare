import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { wishlists, usersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

function generateSlug(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") +
    "-" +
    Math.random().toString(36).substr(2, 6)
  );
}

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let user = await db.query.usersTable.findFirst({
      where: eq(usersTable.clerk_id, clerkId),
    });

    if (!user) {
      const [newUser] = await db
        .insert(usersTable)
        .values({
          clerk_id: clerkId,
        })
        .returning();
      user = newUser;
    }

    const body = await req.json();
    const { title, description, visibility, coverImage } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const slug = generateSlug(title);

    const [wishlist] = await db
      .insert(wishlists)
      .values({
        owner_id: user.id,
        title,
        description,
        slug,
        visibility: visibility || "private",
        coverImage,
      })
      .returning();

    return NextResponse.json(wishlist, { status: 201 });
  } catch (error) {
    console.error("Error creating wishlist:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
