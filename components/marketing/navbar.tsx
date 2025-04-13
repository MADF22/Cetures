"use client";
import React, { useState, useEffect } from "react";
import { Logo } from "@/components/marketing/logo";
import { useConvexAuth } from "convex/react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`z-50 bg-background fixed dark:bg-[#1F1F1F] top-0 w-full py-3 px-4 flex items-center justify-between ${
        hasScrolled
          ? "border-b border-gray-200 dark:border-gray-700 z-9999"
          : ""
      }`}>
      <Logo />

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-x-6">
        <Link href="/home" className="hover:underline text-sm font-light">
          Feature
        </Link>
        <Link href="/about" className="hover:underline text-sm font-light">
          Solutions
        </Link>
        <Link href="/services" className="hover:underline text-sm font-light">
          Resource
        </Link>
        <Link href="/contact" className="hover:underline text-sm font-light">
          Pricing
        </Link>
      </div>

      {/* Login / User Buttons */}
      <div className="hidden md:flex items-center gap-x-4">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading ? (
          <>
            <SignInButton mode="modal">
              <Button
                variant="outline"
                className="font-normal text-gray-950 border border-gray-950 rounded-full dark:border-white dark:text-white"
                size="sm">
                Login
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm" className="rounded-full">
                Get Started Free
              </Button>
            </SignUpButton>
          </>
        ) : (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter Fertilis</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
      </div>

      {/* Mobile: Login & Menu Button */}
      <div className="md:hidden flex items-center gap-x-4">
        {!isAuthenticated && !isLoading && (
          <SignInButton mode="modal">
            <Button
              variant="outline"
              className="font-normal text-gray-950 border border-gray-950 rounded-full dark:border-white dark:text-white"
              size="sm">
              Login
            </Button>
          </SignInButton>
        )}
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full h-96 bg-background p-4 border-b flex flex-col gap-y-1 md:hidden">
          <Link href="/home" className="block py-2 hover:underline">
            Home
          </Link>
          <Link href="/about" className="block py-2 hover:underline">
            About
          </Link>
          <Link href="/services" className="block py-2 hover:underline">
            Services
          </Link>
          <Link href="/contact" className="block py-2 hover:underline">
            Contact
          </Link>
          {isLoading && <Spinner />}
          {!isAuthenticated && !isLoading ? (
            <>
              <SignUpButton mode="modal">
                <Button size="lg" className="mt-32">
                  Get Started Free
                </Button>
              </SignUpButton>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/documents">Enter Fertilis</Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </>
          )}
        </div>
      )}
    </div>
  );
};
