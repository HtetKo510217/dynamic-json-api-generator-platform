"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-gray-800">
        <Link href="/">Dynamic JSON API Generator</Link>
      </div>
      <nav className="flex items-center space-x-4">
        {session ? (
          <>
            <div className="flex items-center space-x-2">
              <img
                src={session.user?.image as string}
                alt="User Avatar"
                className="rounded-full h-8 w-8"
              />
              <span className="text-gray-700 font-semibold">
                {session.user?.name}
              </span>
            </div>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => signIn("google")}
            >
              Sign in with Google
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => signIn("github")}
            >
              Sign in with GitHub
            </Button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
