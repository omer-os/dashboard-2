"use client";
import React from "react";
import { SessionProvider as NextauthSessionProvider } from "next-auth/react";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextauthSessionProvider>{children}</NextauthSessionProvider>;
}
