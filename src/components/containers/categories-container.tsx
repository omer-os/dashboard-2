"use client";
import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const categories = [
  { id: "all", name: "All" },
  { id: "main", name: "Main Dishes" },
  { id: "appetizers", name: "Appetizers" },
  { id: "drinks", name: "Drinks" },
  { id: "desserts", name: "Desserts" },
  { id: "specials", name: "Specials" },
  { id: "vegan", name: "Vegan" },
  { id: "gluten-free", name: "Gluten-Free" },
];

export default function CategoriesContainer({}) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <Card className="flex w-full flex-1 flex-col p-2">
      <div className="flex w-full gap-2 overflow-auto">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="flex-1">s</div>
    </Card>
  );
}
