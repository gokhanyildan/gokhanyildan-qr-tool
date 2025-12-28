"use client";

import { QrCode } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <QrCode className="h-6 w-6" />
        <span className="font-bold text-xl">QR Master</span>
      </div>
    </nav>
  );
}
