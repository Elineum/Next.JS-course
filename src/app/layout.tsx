import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import "./reset.css";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Cheap Change Homework",
  description: "Homework 2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </head>
      <body className={roboto.className}>
        <Header />
        <main>
          <Hero />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
