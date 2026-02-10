import Image from "next/image";
import styles from "./Footer.module.scss";

const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Term & Conditions", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Contact", href: "#" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
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

          <nav className={styles.nav}>
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <span className={styles.copyright}>
            © 2023 DiveSea All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
