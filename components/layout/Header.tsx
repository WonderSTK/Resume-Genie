"use client"

import { UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import { useEffect, useState } from "react"

const Header = () => {
  const user = useUser()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-purple-500/5"
          : "bg-transparent"
      }`}
    >
      <nav className="px-4 sm:px-6 py-4">
        <div className="flex flex-nowrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo Section */}
          <Link href="/" className="flex items-center group">
            <div className="relative mr-3">
              <img
                src="/icons/logo.svg"
                className="h-7 sm:h-9 transition-transform duration-300 group-hover:scale-110"
                alt="logo"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <span className="self-center text-sm md:text-xl font-bold whitespace-nowrap text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
              Resume Genie
            </span>
          </Link>

          {/* Navigation Links and User Section */}
          <div className="flex items-center lg:order-2 space-x-3">
            {user?.isLoaded && !user?.isSignedIn ? (
              <>
                {/* Login Button */}
                <Link
                  href="/sign-in"
                  className="group relative text-gray-300 hover:text-white font-medium rounded-full text-sm px-4 py-2.5 lg:px-5 lg:py-3 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
                >
                  <span className="relative z-10">Log in</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                {/* Get Started Button */}
                <Link
                  href="/sign-up"
                  className="group relative overflow-hidden text-white font-bold rounded-full text-sm px-4 py-2.5 lg:px-6 lg:py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </>
            ) : (
              <>
                {/* User Button Container */}
                <div className="flex items-center space-x-3">
                  {/* User Button with enhanced styling */}
                  <div className="relative">
                    <div className="hidden md:flex items-center p-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                      <UserButton
                        showName={true}
                        appearance={{
                          elements: {
                            userButtonAvatarBox: "w-8 h-8",
                            userButtonBox: "flex-row-reverse",
                            userButtonOuterIdentifier: "text-white font-medium",
                          },
                        }}
                      />
                    </div>
                    <div className="flex md:hidden items-center p-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                      <UserButton
                        showName={false}
                        appearance={{
                          elements: {
                            userButtonAvatarBox: "w-8 h-8",
                          },
                        }}
                      />
                    </div>
                  </div>

                  {/* Dashboard Button */}
                  <Link
                    href="/dashboard"
                    className="group relative overflow-hidden text-white font-bold rounded-full text-sm px-4 py-2.5 lg:px-6 lg:py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    <span className="relative z-10">Dashboard</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
