import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const DashboardPage = () => {
  return (
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
            <Link href={"/wishlist/new"}>
              <Plus className="size-5 mr-2 group-hover:rotate-90 transition-transform" />
              Nueva Wishlist
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
