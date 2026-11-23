import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ScentLab — The perfume-making playground",
  description: "Discover, formulate, and share fragrances with a curious global community."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <footer className="site-footer">
          <div className="footer-inner">
            <Link className="brand footer-brand" href="/">scentlab<span>✳</span></Link>
            <p>A little more curious. A little more fragrant.</p>
            <span>Made for scent people, everywhere. © 2026 ScentLab</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
