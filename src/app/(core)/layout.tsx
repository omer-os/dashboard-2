import { redirect } from "next/navigation";
import React from "react";
import MainLayout from "~/components/layouts/main-layout";
import { getServerAuthSession } from "~/server/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (!session) redirect("/api/auth/signin");
  if (!session.user.restaurantId) redirect("/auth/onboarding");
  return <MainLayout>{children}</MainLayout>;
}
