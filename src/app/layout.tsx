import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Voulence - Secure Freelance Escrow Platform",
  description: "Secure escrow payments for freelancers, powered by Stellar blockchain. Connect with employers, complete jobs, and get paid safely.",
  keywords: ["freelance", "escrow", "stellar", "blockchain", "payments", "freelancer", "employer"],
  authors: [{ name: "Voulence" }],
  openGraph: {
    title: "Voulence - Secure Freelance Escrow Platform",
    description: "Secure escrow payments for freelancers, powered by Stellar blockchain.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="dark">
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
