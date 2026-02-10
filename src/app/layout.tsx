import type { Metadata } from "next";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import styles from "./page.module.scss";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "DiveSea",
  description: "Next.js app with Redux Toolkit, SCSS, and Framer Motion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={styles.app}>
        <ReduxProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
