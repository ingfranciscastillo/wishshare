import Navbar from "@/components/layout/navbar";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Mis wishlists</h1>
      </div>
    </div>
  );
};

export default page;
