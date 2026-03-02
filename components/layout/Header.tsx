"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Logo } from "@/components/ui/Logo";

/** Hamburger / X icon toggle for mobile menu. */
function MenuButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg p-2 text-text-secondary hover:bg-surface hover:text-text-primary transition-colors md:hidden"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
    >
      {open ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      )}
    </button>
  );
}

/** Site-wide header with responsive navigation. */
export function Header() {
  const { isAuthenticated } = useConvexAuth();
  const currentUser = useQuery(
    api.users.currentUser,
    isAuthenticated ? {} : "skip"
  );
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
  ];

  if (currentUser?.isAdmin) {
    navLinks.push({ href: "/admin", label: "Admin" });
  }

  const linkClass = (href: string) => {
    const isActive = pathname === href || pathname.startsWith(href + "/");
    return `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
      isActive
        ? "bg-accent-light text-accent"
        : "text-text-secondary hover:bg-surface hover:text-text-primary"
    }`;
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-xl">
      {/* Desktop + mobile top bar */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-text-primary"
          onClick={closeMobile}
          aria-label="Home"
        >
          <Logo className="h-9 w-9" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              {label}
            </Link>
          ))}

          {isAuthenticated ? (
            <div className="ml-4 flex items-center gap-3">
              <span className="text-sm text-text-muted">
                {currentUser?.username ?? "User"}
              </span>
              <a
                href="/api/auth/signout"
                className="rounded-md bg-surface px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover"
              >
                Sign out
              </a>
            </div>
          ) : (
            <div className="ml-4 flex items-center gap-2">
              <a
                href="/api/auth/signin"
                className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface"
              >
                Sign in
              </a>
              <a
                href="/api/auth/signin?screen_hint=sign-up"
                className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Sign up
              </a>
            </div>
          )}
        </div>

        {/* Mobile: hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <MenuButton
            open={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          />
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 pb-4 md:hidden">
          <div className="flex flex-col gap-1 py-2">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={linkClass(href) + " block"}
                onClick={closeMobile}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="border-t border-border pt-3">
            {isAuthenticated ? (
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">
                  {currentUser?.username ?? "User"}
                </span>
                <a
                  href="/api/auth/signout"
                  className="rounded-md bg-surface px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover"
                >
                  Sign out
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <a
                  href="/api/auth/signin"
                  className="flex-1 rounded-md border border-border px-3 py-1.5 text-center text-sm font-medium text-text-secondary transition-colors hover:bg-surface"
                >
                  Sign in
                </a>
                <a
                  href="/api/auth/signin?screen_hint=sign-up"
                  className="flex-1 rounded-md bg-accent px-3 py-1.5 text-center text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                >
                  Sign up
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
