import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// BURASI ÖNEMLİ: Tarayıcı sekmesinde ismin yazacak
export const metadata = {
  title: "QR Master by Gökhan Yıldan | Free QR Code Generator",
  description: "Generate WhatsApp, SMS, Crypto, and URL QR codes instantly. Professional tool developed by Gökhan Yıldan.",
  authors: [{ name: "Gökhan Yıldan", url: "https://www.gokhanyildan.com" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col bg-slate-950 text-slate-200`}>
        <Navbar />
        <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}