import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Edit, Share2, Trash2, Lock, Globe } from "lucide-react";
import { Button } from "./ui/button";
import Placeholder_light from "@/assets/placeholder/placeholder_light.png";
import Placeholder_dark from "@/assets/placeholder/placeholder_dark.png";
import Image from "next/image";

interface WishlistCardProps {
  id: string;
  title: string;
  description?: string | null;
  visibility: "public" | "private";
  coverImage?: string | null;
  slug: string;
  onEdit?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
}

const WishlistCard = ({
  title,
  description,
  coverImage,
  visibility,
  onEdit,
  onDelete,
  onShare,
}: WishlistCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="relative h-48 overflow-hidden">
        {coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt={`${title} cover`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <>
            <Image
              src={Placeholder_light}
              alt="Sin portada"
              className="block dark:hidden w-full h-full object-cover"
            />
            <Image
              src={Placeholder_dark}
              alt="Sin portada (modo oscuro)"
              className="hidden dark:block w-full h-full object-cover"
            />
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Privacy badge */}
        <div className="absolute top-3 right-3">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${
              visibility === "public"
                ? "bg-primary/90 text-primary-foreground"
                : "bg-muted/90 text-muted-foreground"
            }`}
          >
            {visibility === "public" ? (
              <Globe className="w-3 h-3" />
            ) : (
              <Lock className="w-3 h-3" />
            )}
            {visibility === "public" ? "Pública" : "Privada"}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5">
        <h3 className="text-xl font-semibold mb-2 line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardContent>

      <CardFooter className="px-5 pb-5 pt-0 flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={onEdit}>
          <Edit className="w-4 h-4 mr-2" />
          Editar
        </Button>
        <Button variant="outline" size="sm" onClick={onShare}>
          <Share2 className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={onDelete}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WishlistCard;
