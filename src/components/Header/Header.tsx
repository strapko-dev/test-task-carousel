"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon } from "@/components/icons/Header";
import styles from "./Header.module.scss";

const navLinks = [
  { label: "DISCOVER", href: "#" },
  { label: "CREATORS", href: "#" },
  { label: "SELL", href: "#" },
  { label: "STATS", href: "#" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.inner}>
          <a href="/" className={styles.logo}>
            <Image
              src="/icons/logo.svg"
              alt="DiveSea"
              width={38}
              height={38}
              className={styles.logoIcon}
            />
            <span className={styles.logoText}>DiveSea</span>
          </a>

          <nav className={styles.desktopNav}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.navLink}
                data-text={link.label}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            className={styles.burger}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <Image src="/icons/burger.svg" alt="" width={40} height={40} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
          >
            <div className={styles.mobileMenuHeader}>
              <a href="/" className={styles.logo} onClick={closeMenu}>
                <Image
                  src="/icons/logo.svg"
                  alt="DiveSea"
                  width={38}
                  height={38}
                  className={styles.logoIcon}
                />
                <span className={styles.logoText}>DiveSea</span>
              </a>

              <button
                className={styles.closeButton}
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            <div className={styles.mobileMenuDivider} />

            <nav className={styles.mobileNav}>
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.07, duration: 0.3 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
