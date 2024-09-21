"use client";
import React from "react";
import { signIn, useSession } from "next-auth/react";

export default function Page() {
  const session = useSession();
  return (
    <div>
      <div className="">{/* <p>{JSON.stringify(session)}</p> */}</div>
      <button onClick={() => signIn("discord")}>Sign in with Discord</button>
    </div>
  );
}
