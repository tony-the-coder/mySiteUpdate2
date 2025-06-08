"use client";
import React from "react";
import {
  NewNavbar,
  NewNavbarBrand,
  NewNavbarCollapse,
  NewNavbarLink,
  NewNavbarButton,
  NewNavbarToggle,
} from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function CustomNavbar() {
  const pathname = usePathname();

  return (
    <NewNavbar
      fluid
      className="bg-black fixed top-0 left-0 right-0 z-50"
      theme={{
        root: {
          base: "bg-black px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4",
        },
      }}
    >
      <NewNavbarBrand href="https://flowbite-react.com">
        <img
          alt="Flowbite React Logo"
          className="mr-3 h-6 sm:h-9"
          src="/favicon.svg"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      </NewNavbarBrand>
      <div className="flex items-center gap-x-2">
        <NewNavbarButton
          href="/login"
          as={Link}
          className="font-semibold text-white"
        >
          Log in
        </NewNavbarButton>
        <NewNavbarToggle theme={{ bar: "bg-white" }} />
      </div>
      <NewNavbarCollapse>
        <NewNavbarLink
          as={Link}
          href="/"
          active={pathname === "/"}
          className="font-semibold"
        >
          Home
        </NewNavbarLink>
        <NewNavbarLink
          as={Link}
          href="/about"
          active={pathname === "/about"}
          className="font-semibold"
        >
          About
        </NewNavbarLink>
        <NewNavbarLink href="#" className="font-semibold">
          Services
        </NewNavbarLink>
        <NewNavbarLink href="#" className="font-semibold">
          Pricing
        </NewNavbarLink>
        <NewNavbarLink href="#" className="font-semibold">
          Contact
        </NewNavbarLink>
        <NewNavbarButton
          href="/signup"
          as={Link}
          className="font-semibold bg-white text-black hover:bg-gray-200"
        >
          Sign up
        </NewNavbarButton>
      </NewNavbarCollapse>
    </NewNavbar>
  );
}