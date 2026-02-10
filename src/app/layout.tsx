import type { Metadata } from "next";
import { ReduxProvider } from "@/components/providers";
import { Header } from "@/components/Header";
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
      <body>
        <ReduxProvider>
          <Header />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
