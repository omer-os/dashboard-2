import React from "react";
import MainSidebar from "../sidebars/main-sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-lvh w-full overflow-hidden">
      <MainSidebar />

      <div className="flex flex-1 flex-col overflow-auto">{children}</div>
    </div>
  );
}
