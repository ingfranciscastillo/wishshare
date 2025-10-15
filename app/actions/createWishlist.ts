"use server";

import { db } from "@/lib/db";
import { usersTable, wishlists } from "@/lib/db/schema";
import { generateSlug } from "@/lib/utils/slug";
import {
  CreateWishlistInput,
  createWishlistSchema,
} from "@/lib/validations/wishlist";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function createWishlistAction(data: CreateWishlistInput) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Unauthorized");
  }

  const parsedData = createWishlistSchema.parse(data);

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

  const slug = generateSlug(parsedData.title);

  const [wishlist] = await db
    .insert(wishlists)
    .values({
      owner_id: user.id,
      title: parsedData.title,
      description: parsedData.description ?? null,
      slug,
      visibility: parsedData.visibility,
      coverImage: parsedData.coverImage ?? null,
    })
    .returning();

  return wishlist;
}
