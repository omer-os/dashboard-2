import React from "react";
import Catalogscontainer from "~/components/containers/catalogs-container";
import CategoriesContainer from "~/components/containers/categories-container";

export default function page() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden p-4">
      <div className="flex flex-col">
        <div className="text-3xl font-bold">Menu</div>
        <p className="text-muted-foreground">
          Manage your restaurant's menu here.
        </p>
      </div>

      <div className="flex flex-1 gap-4 pt-3">
        <Catalogscontainer />

        <CategoriesContainer />
      </div>
    </div>
  );
}
