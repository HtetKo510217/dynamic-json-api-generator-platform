"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";
// import { signIn, signOut, useSession } from "next-auth/react";
import { FaGithub } from 'react-icons/fa'; 

const Header: React.FC = () => {
  // const { data: session } = useSession();

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-3xl font-extrabold text-white">
          <Link href="/">Dynamic JSON API Generator</Link>
        </div>
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-white text-lg font-medium hover:text-gray-200 transition duration-300">
            Home
          </Link>
          <Link href="/generate" className="text-white text-lg font-medium hover:text-gray-200 transition duration-300">
            Generate
          </Link>
          <Link href="/guide" className="text-white text-lg font-medium hover:text-gray-200 transition duration-300">
            Guide
          </Link>
          <a href="https://github.com/HtetKo510217/dynamic-json-api-generator-platform" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub size={24} className="text-white hover:text-gray-400" />
          </a>
        </nav>
        {/* <nav className="flex items-center space-x-4">
          {session ? (
            <>
              <div className="flex items-center space-x-2">
                <img
                  src={session.user?.image as string}
                  alt="User Avatar"
                  className="rounded-full h-8 w-8"
                />
                <span className="text-white font-semibold">
                  {session.user?.name}
                </span>
              </div>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "white",
                  color: "white",
                  '&:hover': {
                    borderColor: "gray.300",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "white",
                  color: "white",
                  '&:hover': {
                    borderColor: "gray.300",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
                onClick={() => signIn("google")}
              >
                Sign in with Google
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "white",
                  color: "white",
                  '&:hover': {
                    borderColor: "gray.300",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
                onClick={() => signIn("github")}
              >
                Sign in with GitHub
              </Button>
            </>
          )}
        </nav> */}
      </div>
    </header>
  );
};

export default Header;
