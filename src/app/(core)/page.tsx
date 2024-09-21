"use client";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { api } from "~/trpc/react";

export default function Page() {
  const session = useSession();

  return (
    <div>
      <div></div>
    </div>
  );
}
