"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
import { UserButton, useUser } from "@clerk/nextjs";

const TopBar = () => {
  const router = useRouter();
  const user = useUser();

  return (
    <div className="flex w-full justify-between items-center py-4 px-4 sm:px-6 md:px-8 lg:px-10 shadow-md bg-white">
      {/* Logo Section */}
      <Link href="/" className="flex gap-2 items-center">
        {/* added height and width for responsiveness */}
        <Image
          src="/icons/logo.svg"
          alt="logo"
          width={48}
          height={48}
          className="w-10 h-10 sm:w-12 sm:h-12"
        />
        <p className="text-2xl sm:text-3xl md:text-4xl font-nunito font-extrabold text-slate-800 tracking-tight hover:text-slate-700">
          Resume Genie
        </p>
      </Link>

      {/* User Navigation or Sign-up Button */}
      {/* Flex and gap is used to manage spacing between elements and adjust the gap size for mobile (gap-2) and larger screens (sm:gap-4)*/}
      {user ? (
        <div className="flex gap-2 sm:gap-4 items-center">
          <Button
            variant="outline"
            className="text-sm sm:Text-base transition duration-300 hover:bg-slate-100"
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Dashboard
          </Button>
          <UserButton />
        </div>
      ) : (
         //! Padding on the button is also adjusted px-4 sm:px-5 py-2 to ensure proper spacing and alignment across screen sizes.
        <Button
          className="bg-blue-600 text-sm sm:text-base text-white font-semibold transition-all duration-300 hover:bg-blue-700 px-4 sm:px-5 py-2 rounded-lg"
          onClick={() => {
            router.push("/sign-up");
          }}
        >
          Get Started
        </Button>
      )}
    </div>
  );
};

export default TopBar;
