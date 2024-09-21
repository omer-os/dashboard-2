"use client";
import React from "react";
import { StaffTable } from "~/components/tables/staff-table";
import { Card } from "~/components/ui/card";

export default function Page() {
  return (
    <div className="h-full p-4">
      <div className="text-3xl font-bold">Restaurant Staff</div>
      <p className="text-muted-foreground">
        Manage your restaurant staff members here.
      </p>
      <div className="bg-muted/20 mt-5 rounded-md border p-4">
        <StaffTable />
      </div>
    </div>
  );
}
