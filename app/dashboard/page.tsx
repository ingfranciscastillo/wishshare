"use client";

import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import WishlistForm from "@/components/wishlist-form";
import WishlistCard from "@/components/wishlistCard";
import { Heart, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getUserWishlists } from "../actions/getUserWishlists";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";

interface Wishlist {
  id: string;
  title: string;
  description?: string | null;
  visibility: "public" | "private";
  coverImage?: string | null;
  slug: string;
}

const DashboardPage = () => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserWishlists().then((data) => {
      setWishlists(data);
      console.log(data);
      setLoading(false);
    });
  }, []);

  return (
    <Dialog>
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 animate-fade-in">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Mis wishlists
              </h1>
              <p className="text-lg text-muted-foreground">
                Gestiona todas tus listas de deseos en un solo lugar
              </p>
            </div>

            <Button asChild size={"lg"} variant={"secondary"} className="group">
              <DialogTrigger>
                <Plus className="size-5 mr-2 group-hover:rotate-90 transition-transform" />
                Nueva Wishlist
              </DialogTrigger>
            </Button>
            <WishlistForm />
          </div>

          {loading ? (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ) : wishlists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlists.map((wishlist) => (
                <WishlistCard
                  key={wishlist.id}
                  {...wishlist}
                  onEdit={() => console.log("Edit", wishlist.id)}
                  onShare={() => console.log("Share", wishlist.id)}
                  onDelete={() => console.log("Delete", wishlist.id)}
                />
              ))}
            </div>
          ) : (
            <Empty className="flex flex-col items-center justify-center py-20 animate-fade-in">
              <EmptyHeader>
                <EmptyMedia variant={"default"}>
                  <Heart className="w-12 h-12 text-muted-foreground" />
                </EmptyMedia>
              </EmptyHeader>
              <EmptyTitle className="text-2xl font-semibold mb-2">
                No tienes wishlists aún
              </EmptyTitle>
              <EmptyDescription className="text-muted-foreground mb-6">
                Crea tu primera wishlist y empieza a compartir tus deseos
              </EmptyDescription>
              <EmptyContent>
                <Button
                  asChild
                  size={"lg"}
                  variant={"secondary"}
                  className="group"
                >
                  <DialogTrigger>
                    <Plus className="size-5 mr-2 group-hover:rotate-90 transition-transform" />
                    Nueva Wishlist
                  </DialogTrigger>
                </Button>
              </EmptyContent>
              <WishlistForm />
            </Empty>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default DashboardPage;
