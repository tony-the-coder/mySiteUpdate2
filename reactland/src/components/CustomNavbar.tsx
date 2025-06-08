// reactland/src/components/CustomNavbar.tsx

import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavbarLogo,
} from "@/components/ui/resizable-navbar";

export const CustomNavbar = () => {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about/" },
    { name: "Portfolio", link: "/portfolio/" },
    { name: "Blog", link: "/blog/" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      {/* --- Desktop Navigation --- */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          <NavbarButton href="/contact/" variant="primary" as="a" className="!bg-brand-gold hover:!bg-brand-gold-light !text-brand-charcoal">
            Contact Me
          </NavbarButton>
        </div>
      </NavBody>

      {/* --- Mobile Navigation --- */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
          {navItems.map((item, idx) => (
            <a key={`mobile-link-${idx}`} href={item.link} className="block text-lg text-neutral-600 dark:text-neutral-300 py-2">
              {item.name}
            </a>
          ))}
          <div className="w-full h-px bg-gray-200 dark:bg-neutral-800 my-4" />
          <NavbarButton href="/contact/" variant="primary" as="a" className="w-full !bg-brand-gold hover:!bg-brand-gold-light !text-brand-charcoal">
            Contact Me
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};