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
} from "@/components/ui/resizable-navbar";
import ttcLogo from '@/assets/ttc-logo.png'; // Make sure your logo is in reactland/src/assets/

export function CustomNavbar() {

  const navItems = [
    { name: "About", link: "/about/" },
    { name: "Portfolio", link: "/portfolio/" },
    { name: "Blog", link: "/blog/" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // A reusable component for your logo
  const CustomLogo = () => (
    <a href="/" className="relative z-20 flex items-center space-x-3">
      <img src={ttcLogo} alt="Tony the Coder Logo" className="h-10 w-10" />
      <span className="font-bold text-lg text-black dark:text-white">Tony the Coder</span>
    </a>
  );

  return (
    <div className="w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <CustomLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton href="/contact/" variant="primary" className="bg-brand-teal text-white">
              Contact Me
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <CustomLogo />
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
            <NavbarButton href="/contact/" variant="primary" className="w-full bg-brand-teal text-white">
              Contact Me
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}