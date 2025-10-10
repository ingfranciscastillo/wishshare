import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const visibilityEnum = pgEnum("visibility", ["public", "private"]);

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerk_id: text().unique().notNull(),
  email: text().unique(),
  display_name: text(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const wishlists = pgTable("wishlists", {
  id: uuid("id").defaultRandom().primaryKey(),
  owner_id: uuid("owner_id").references(() => usersTable.id, {
    onDelete: "cascade",
  }),
  title: text("title").notNull(),
  description: text("description"),
  slug: text("slug").notNull().unique(),
  visibility: visibilityEnum("visibility").notNull().default("private"),
  shareToken: text("share_token"),
  coverImage: text("cover_image"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const items = pgTable("items", {
  id: uuid("id").defaultRandom().primaryKey(),
  wishlistId: uuid("wishlist_id").references(() => wishlists.id, {
    onDelete: "cascade",
  }),
  url: text("url").notNull(),
  title: text("title"),
  image: text("image"),
  price: text("price"),
  store: text("store"),
  note: text("note"),
  position: integer("position").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// --- Relaciones ---
export const wishlistsRelations = relations(wishlists, ({ many }) => ({
  items: many(items),
}));

export const itemsRelations = relations(items, ({ one }) => ({
  wishlist: one(wishlists, {
    fields: [items.wishlistId],
    references: [wishlists.id],
  }),
}));
