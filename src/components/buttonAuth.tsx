"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function ButtonAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  console.log(session);

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button
          onClick={() => signOut()}
          className="btn-primary mx-auto mt-20"
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        onClick={() => signIn()}
        className="btn-primary mx-auto mt-20"
      >
        Sign in
      </button>
    </>
  );
}
