import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import WishlistForm from "@/components/wishlist-form";
import { Plus } from "lucide-react";
import React from "react";

const DashboardPage = () => {
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
        </div>
      </div>
    </Dialog>
  );
};

export default DashboardPage;
