import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PostHogProvider } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Irdi Duka | Creative Technical Operator",
    template: "%s | Irdi Duka",
  },
  description:
    "A hybrid personal brand platform for systems, APIs, onboarding, education, business thinking, and creative experiments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <PostHogProvider>
          <div className="min-h-screen">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </PostHogProvider>
      </body>
    </html>
  );
}
