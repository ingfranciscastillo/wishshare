"use server";

import { db } from "@/lib/db";
import { usersTable, wishlists } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";

export async function getUserWishlists() {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Unauthorized");
  }

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.clerk_id, clerkId),
  });

  if (!user) return [];

  const userWishlists = await db.query.wishlists.findMany({
    where: eq(wishlists.owner_id, user?.id),
    orderBy: desc(wishlists.createdAt),
  });

  return userWishlists;
}
