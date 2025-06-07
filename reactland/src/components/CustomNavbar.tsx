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

// You can replace this with your actual logo import
// import ttcLogo from '@/assets/ttc-logo.png';

// A reusable component for your logo
const CustomLogo = () => (
  <a href="/" className="relative z-20 flex items-center space-x-3">
    {/* If using an image logo: */}
    {/* <img src={ttcLogo} alt="Tony the Coder Logo" className="h-10 w-10" /> */}

    {/* If using a text logo: */}
    <div className="flex-shrink-0">
        <span className="text-3xl font-bold text-brand-charcoal" style={{ fontFamily: 'var(--font-heading)' }}>
            Tony the Coder
        </span>
    </div>
  </a>
);


export const CustomNavbar = () => {
  // Define the navigation links for your site
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about/" },
    { name: "Portfolio", link: "/portfolio/" },
    { name: "Blog", link: "/blog/" },
    // Add more links here as needed
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full relative z-50">
      <Navbar>
        {/* --- Desktop Navigation --- */}
        <NavBody>
          <CustomLogo />
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
            <CustomLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {/* Render links for mobile view */}
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
    </div>
  );
};