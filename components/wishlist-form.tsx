import React, { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

import { UploadButton } from "@/lib/uploadthing";
import { createWishlistSchema } from "@/lib/validations/wishlist";
import { createWishlistAction } from "@/app/actions/createWishlist";

const WishlistForm = () => {
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof createWishlistSchema>>({
    resolver: zodResolver(createWishlistSchema),
    defaultValues: {
      title: "",
      description: "",
      visibility: "private",
      coverImage: "",
    },
  });

  function onSubmit(values: z.infer<typeof createWishlistSchema>) {
    console.log(values);
    startTransition(async () => {
      try {
        await createWishlistAction({
          ...values,
        });
        toast.success("Wishlist creada correctamente 🎉");
        form.reset();
        setUploadUrl(null);
      } catch (error) {
        console.error(error);
        toast.error("Error al crear la wishlist");
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Crea una Wishlist</DialogTitle>
        <DialogDescription>
          Anyone who has this link will be able to view this.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-md"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visibility</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Privado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="public">Pública</SelectItem>
                    <SelectItem value="private">Privada</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Imagen de portada</FormLabel>

            {uploadUrl ? (
              <div className="relative">
                <img
                  src={uploadUrl}
                  alt="Portada"
                  className="w-full h-48 object-cover rounded-xl border"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => setUploadUrl(null)}
                >
                  Cambiar
                </Button>
              </div>
            ) : (
              <UploadButton
                endpoint="wishlistCover"
                onClientUploadComplete={(res) => {
                  setUploadUrl(res[0].ufsUrl);
                  form.setValue("coverImage", res[0].ufsUrl);
                }}
                onUploadError={(err) =>
                  alert(`Error al subir imagen: ${err.message}`)
                }
              />
            )}
          </div>

          <DialogFooter className="sm:justify-start">
            <Button type="submit">
              {isPending ? <Spinner /> : "Crear wishlist"}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default WishlistForm;
