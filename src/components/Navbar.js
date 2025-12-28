"use client";
import { QrCode } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LOGO AREA WITH BRANDING */}
        <a href="#" className="flex items-center gap-3 group cursor-pointer">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 transition-transform group-hover:scale-105">
            <QrCode className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-100 leading-none">
              QR <span className="text-indigo-400">Master</span>
            </span>
            <span className="text-[11px] text-slate-500 font-medium tracking-wide group-hover:text-indigo-300 transition-colors">
              by gokhanyildan.com
            </span>
          </div>
        </a>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#features" className="text-slate-400 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-slate-400 hover:text-white transition-colors">How it Works</a>
          <a 
            href="https://www.gokhanyildan.com/contact/" 
            target="_blank" 
            className="rounded-full bg-slate-800 px-4 py-2 text-slate-200 hover:bg-slate-700 hover:text-white transition-all border border-slate-700"
          >
            Contact Developer
          </a>
        </div>
      </div>
    </nav>
  );
}