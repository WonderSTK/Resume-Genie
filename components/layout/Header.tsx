"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Header = () => {
  const user = useUser();

  return (
    <header className="sticky top-0 z-50">
      <nav className="backdrop-blur-md px-4 sm:px-6 py-3">
        {/* flex-nowrap for responsiveness */}
        <div className="flex flex-nowrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo Section */}
          <Link href="/" className="flex items-center">
            <img src="/icons/logo.svg" className="mr-3 h-7 sm:h-9" alt="logo" />
            {/* text sm for smaller screens  */}
            <span className="self-center text-sm md:text-xl font-bold whitespace-nowrap">
              Resume Genie
            </span>
          </Link>

          {/* Navigation Links and User Section */}
          <div className="flex items-center lg:order-2 space-x-2">
            {user?.isLoaded && !user?.isSignedIn ? (
              <>
                {/* Login Button */}
                <Link
                  href="/sign-in"
                  className="text-gray-800 hover:bg-primary-700/10 duration-300 focus:ring-4 focus:ring-primary-700/30 font-medium rounded-full text-sm px-3 py-2 lg:px-4 lg:py-2.5 focus:outline-none"
                >
                  Log in
                </Link>
                {/* Get Started Button */}
                <Link
                  href="/sign-up"
                  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-full text-sm px-3 py-2 lg:px-4 lg:py-2.5 focus:outline-none"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                {/* User Button with Name for larger screens */}
                <div className="hidden md:flex items-center">
                  <UserButton showName={true} />
                </div>
                {/* User Button without Name for mobile screens */}
                <div className="flex md:hidden items-center">
                  <UserButton showName={false} />
                </div>
                {/* Dashboard Button */}
                <Link
                  href="/dashboard"
                  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-full text-sm px-3 py-2 lg:px-4 lg:py-2.5 focus:outline-none"
                >
                  Dashboard
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
