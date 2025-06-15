"use client"

import type React from "react"

import Header from "@/components/layout/Header"
import { useUser } from "@clerk/nextjs"
import { ArrowBigUp, AtomIcon, Edit, Share2, Sparkles, Zap, Rocket } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface FloatingElementProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

const FloatingElement: React.FC<FloatingElementProps> = ({ children, delay = 0, className = "" }) => {
  return (
    <div
      className={`animate-float ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: "6s",
        animationIterationCount: "infinite",
      }}
    >
      {children}
    </div>
  )
}

const GradientText: React.FC<GradientTextProps> = ({ children, className = "" }) => {
  return (
    <span
      className={`bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  )
}

const page = () => {
  const user = useUser()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Mouse Follower */}
      <div
        className="fixed w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: "scale(0.8)",
        }}
      />

      <Header />

      {/* Hero Section */}
      <section className="relative">
        <div className="py-20 px-6 mx-auto max-w-screen-xl text-center lg:py-32 lg:px-12 md:px-10">
          <FloatingElement delay={0}>
            <div className="inline-flex items-center justify-center p-1 mb-8 text-sm text-gray-300 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50">
              <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
              <span className="text-xs bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium px-3 py-1">
                AI-Powered Resume Builder
              </span>
            </div>
          </FloatingElement>

          <FloatingElement delay={0.2}>
            <h1 className="mt-4 lg:mt-8 mb-8 text-5xl font-black tracking-tight leading-none md:text-6xl lg:text-7xl">
              Build Your Resume{" "}
              <GradientText className="max-sm:block relative">
                With AI
                <div className="absolute -top-2 -right-2">
                  <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
                </div>
              </GradientText>
            </h1>
          </FloatingElement>

          <FloatingElement delay={0.4}>
            <p className="mb-12 text-xl font-light text-gray-300 lg:text-2xl sm:px-16 xl:px-48 leading-relaxed">
              Effortlessly Craft a <span className="text-white font-semibold">Professional Resume</span> with Our
              AI-Powered Builder
            </p>
          </FloatingElement>

          <FloatingElement delay={0.6}>
            <div className="flex flex-col space-y-6 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-6">
              <Link
                href={`${!user?.isSignedIn ? "/sign-up" : "/dashboard"}`}
                className="group relative flex h-14 w-full items-center justify-center px-8 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl transition-all duration-300 hover:shadow-purple-500/25 hover:scale-105 sm:w-max"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                <Rocket className="relative w-5 h-5 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="relative text-lg font-bold">Get Started</span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-pink-600 blur-lg opacity-50"></div>
              </Link>

              <Link
                href="#learn-more"
                className="group relative flex h-14 w-full items-center justify-center px-8 overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 hover:bg-white/20 hover:scale-105 sm:w-max"
              >
                <span className="relative text-lg font-semibold">Learn More</span>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
              </Link>
            </div>
          </FloatingElement>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-6 mx-auto max-w-screen-xl text-center lg:py-24 lg:px-12 md:px-10 relative">
        <FloatingElement delay={0.8}>
          <div className="mb-16">
            <h2 className="font-black text-4xl lg:text-5xl text-white mb-4" id="learn-more">
              How it <GradientText>Works?</GradientText>
            </h2>
            <p className="text-xl text-gray-300 font-light">
              Generate your perfect resume in just <span className="text-white font-bold">3 simple steps</span>
            </p>
          </div>
        </FloatingElement>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 md:px-12">
          {[
            {
              icon: AtomIcon,
              title: "Create Your Template",
              description:
                "Start by selecting the color scheme for your resume template. Our single, professionally designed template ensures a clean and consistent look for all users.",
              delay: 1.0,
              gradient: "from-purple-500 to-pink-500",
            },
            {
              icon: Edit,
              title: "Update Your Information",
              description:
                "Enter your personal details, work experience, education, and skills into the provided form. Our AI assists you in filling out each section accurately and effectively.",
              delay: 1.2,
              gradient: "from-blue-500 to-purple-500",
            },
            {
              icon: Share2,
              title: "Share Your Resume",
              description:
                "After completing your resume, save it securely and generate a shareable link. Easily update your information anytime and share the link with potential employers.",
              delay: 1.4,
              gradient: "from-pink-500 to-red-500",
            },
          ].map((item, index) => (
            <FloatingElement key={index} delay={item.delay}>
              <div className="group cursor-pointer p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:scale-105 hover:bg-white/10 relative overflow-hidden">
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                ></div>

                <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.gradient} mb-6`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                  {item.title}
                </h3>

                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {item.description}
                </p>

                {/* Step number */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{index + 1}</span>
                </div>
              </div>
            </FloatingElement>
          ))}
        </div>

        <FloatingElement delay={1.6}>
          <div className="mt-20 text-center">
            <Link
              href="#get-started"
              className="group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-12 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <ArrowBigUp className="relative h-6 w-6 mr-3 transition-transform duration-300 group-hover:-translate-y-1" />
              <span className="relative">Get Started Today</span>
            </Link>
          </div>
        </FloatingElement>
      </section>

      {/* Footer */}
      <footer className="relative backdrop-blur-md border-t border-white/10 mt-20">
        <div className="w-full mx-auto text-center max-w-screen-xl p-8 flex max-md:flex-col md:items-center md:justify-between">
          <span className="text-gray-400">
            © 2024{" "}
            <span className="hover:text-purple-400 hover:cursor-pointer transition-colors duration-300 font-semibold">
              Resume Genie™
            </span>
            . All Rights Reserved.
          </span>
          <Link href="https://github.com/WonderSTK" className="me-4 md:me-6 group">
            <span className="hover:text-purple-400 mt-3 text-gray-400 sm:mt-0 transition-colors duration-300 group-hover:scale-105 inline-block">
              Made with ❤️ by <span className="font-semibold">Mehul Kumar</span>
            </span>
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default page
