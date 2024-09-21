"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Search, Plus, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import CatalogCard from "../cards/catalog-card";

const catalogItems = [
  {
    id: 1,
    name: "Food",
    description: "Manage your food items.",
    image: "/images/food.png",
    itemCount: 42,
  },
  {
    id: 2,
    name: "Drinks",
    description: "Manage your drink items.",
    image: "/images/drinks.png",
    itemCount: 18,
  },
  {
    id: 3,
    name: "Desserts",
    description: "Manage your dessert items.",
    image: "/images/desserts.png",
    itemCount: 24,
  },
  {
    id: 4,
    name: "Specials",
    description: "Manage your special items.",
    image: "/images/specials.png",
    itemCount: 7,
  },
  // Add more items to test pagination
];

export default function CatalogsContainer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredItems = catalogItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleAddCatalog = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <Card className="flex h-full min-w-[25em] flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-2xl font-bold">Catalogs</CardTitle>
        <Button
          variant="default"
          size="sm"
          onClick={handleAddCatalog}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          Add Catalog
        </Button>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-0">
        <div className="p-4 pt-0">
          <div className="relative">
            <Search className="text-muted-foreground absolute left-2 top-3 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search catalogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {currentItems.map((item) => (
            <CatalogCard key={item.id} card={item} />
          ))}
        </div>

        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <div className="text-muted-foreground text-sm">
              Page {currentPage} of {pageCount}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, pageCount))
              }
              disabled={currentPage === pageCount}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
