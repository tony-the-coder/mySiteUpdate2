// reactland/src/components/ui/resizable-navbar.tsx (Rewritten NavbarButton)

"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import React, { useRef, useState, cloneElement, isValidElement } from "react";

// --- TYPE DEFINITIONS ---
interface NavbarProps {
    children: React.ReactNode | ((visible: boolean) => React.ReactNode);
    className?: string;
}
interface NavBodyProps {
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
}
interface NavItemsProps {
    items: { name: string; link: string }[];
    className?: string;
    onItemClick?: () => void;
    visible?: boolean;
}
interface MobileNavProps {
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
}
interface MobileNavHeaderProps {
    children: React.ReactNode;
    className?: string;
}
interface MobileNavMenuProps {
    children: React.ReactNode;
    className?: string;
    isOpen: boolean;
    onClose?: () => void;
}

// --- COMPONENTS ---

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const [visible, setVisible] = useState<boolean>(false);
  useMotionValueEvent(scrollY, "change", (latest) => { setVisible(latest > 100); });

  return (
    <motion.div ref={ref} className={cn("fixed inset-x-0 top-0 z-40 w-full", className)}>
      {typeof children === "function" ? children(visible) : React.Children.map(children, (child) =>
          isValidElement(child) ? cloneElement(child as React.ReactElement<{ visible?: boolean }>, { visible }) : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => (
  <motion.div
    animate={{
      backdropFilter: visible ? "blur(10px)" : "none",
      boxShadow: visible ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset" : "none",
      width: visible ? "40%" : "100%",
      y: visible ? 20 : 0,
    }}
    transition={{ type: "spring", stiffness: 200, damping: 50 }}
    style={{ minWidth: "800px" }}
    className={cn("relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent", visible && "bg-white/80 dark:bg-neutral-950/80", className)}
  >
    {children}
  </motion.div>
);

export const NavItems = ({ items, className, onItemClick, visible }: NavItemsProps) => {
    const [hovered, setHovered] = useState<number | null>(null);
    return (
        <motion.div onMouseLeave={() => setHovered(null)} className={cn("absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium transition duration-200 lg:flex lg:space-x-2", className)}>
            {items.map((item, idx) => (
                <a onMouseEnter={() => setHovered(idx)} onClick={onItemClick} className={cn("relative px-4 py-2 transition-colors duration-300", visible ? "text-neutral-600 hover:text-black dark:text-neutral-300" : "text-neutral-300 hover:text-white")} key={`link-${idx}`} href={item.link}>
                    {hovered === idx && <motion.div layoutId="hovered" className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800" />}
                    <span className="relative z-20">{item.name}</span>
                </a>
            ))}
        </motion.div>
    );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => (
    <motion.div
        animate={{
            backdropFilter: visible ? "blur(10px)" : "none",
            boxShadow: visible ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset" : "none",
            width: visible ? "90%" : "100%",
            borderRadius: visible ? "9999px" : "0rem",
            y: visible ? 20 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 50 }}
        className={cn("relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden", visible && "bg-white/80 dark:bg-neutral-950/80", className)}
    >
        {children}
    </motion.div>
);

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => (
    <div className={cn("flex w-full flex-row items-center justify-between", className)}>
        {children}
    </div>
);

export const MobileNavMenu = ({ children, className, isOpen }: MobileNavMenuProps) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={cn("absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-lg dark:bg-neutral-950", className)}>
                {children}
            </motion.div>
        )}
    </AnimatePresence>
);

export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void; }) => (
    isOpen ? <IconX className="text-black dark:text-white" onClick={onClick} /> : <IconMenu2 className="text-black dark:text-white" onClick={onClick} />
);

export const NavbarLogo = ({ visible }: { visible?: boolean; }) => (
    <a href="/" className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal">
        <span className={cn("font-medium transition-colors", visible ? "text-black dark:text-white" : "text-white dark:text-white")}>
            Tony the Coder
        </span>
    </a>
);


// --- NEW, SIMPLIFIED NAVBARBUTTON COMPONENT ---
interface NewNavbarButtonProps {
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const NavbarButton = ({ href, className, children, onClick }: NewNavbarButtonProps) => {
    // This component will always render an `<a>` tag now for simplicity.
    // If href is not provided, it will act like a button but still be a link.
    // This avoids all the complex type issues.
    return (
        <a
            href={href || "#"}
            onClick={onClick}
            className={cn(
                "px-4 py-2 rounded-full text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center",
                "bg-white text-black shadow-md", // Default styles
                className
            )}
        >
            {children}
        </a>
    );
};