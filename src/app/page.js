import QrBuilder from "@/components/QrBuilder";
import { ShieldCheck, Zap, Globe, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      
      {/* 1. ANA UYGULAMA ALANI */}
      <section className="mx-auto w-full max-w-6xl">
        {/* Görünmeyen başlığı sildik, doğrudan uygulamaya odaklanıyoruz */}
        <QrBuilder />
      </section>

      {/* 2. FEATURES BÖLÜMÜ */}
      <section id="features" className="mx-auto w-full max-w-6xl pt-10 border-t border-slate-900">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Why QR Master?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Everything you need to create professional QR codes, wrapped in a beautiful interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={Zap} 
            title="Lightning Fast" 
            desc="Generates QR codes instantly in your browser. No server delays." 
          />
          <FeatureCard 
            icon={ShieldCheck} 
            title="Privacy First" 
            desc="Your data never leaves your device. We don't track what you create." 
          />
          <FeatureCard 
            icon={Globe} 
            title="Universal" 
            desc="Create codes for URLs, Wi-Fi, vCards, SMS, and WhatsApp." 
          />
          <FeatureCard 
            icon={Smartphone} 
            title="Responsive" 
            desc="Works perfectly on desktop, tablet, and mobile devices." 
          />
        </div>
      </section>

      {/* 3. HOW IT WORKS BÖLÜMÜ */}
      <section id="how-it-works" className="mx-auto w-full max-w-4xl pt-10 border-t border-slate-900">
         <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">How it Works</h2>
        </div>
        
        <div className="relative">
          {/* Çizgi */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-slate-900 hidden md:block"></div>
          
          <Step 
            num="1" 
            title="Choose Type" 
            desc="Select what you want to share: a Website, Wi-Fi access, or Contact info." 
            align="left"
          />
          <Step 
            num="2" 
            title="Enter Content" 
            desc="Fill in the required fields. The QR code updates automatically as you type." 
            align="right"
          />
          <Step 
            num="3" 
            title="Download" 
            desc="Click 'Download PNG' to save your high-quality QR code instantly." 
            align="left"
          />
        </div>
      </section>

    </div>
  );
}

// Yardımcı Bileşenler (Sadece bu dosya içinde kullanılır)
function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-colors">
      <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 text-indigo-400">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function Step({ num, title, desc, align }) {
  const isLeft = align === "left";
  return (
    <div className={`flex flex-col md:flex-row items-center justify-between mb-12 relative ${isLeft ? "" : "md:flex-row-reverse"}`}>
      <div className="w-full md:w-5/12 mb-4 md:mb-0 text-center md:text-left">
         <div className={`p-6 rounded-2xl bg-slate-900 border border-slate-800 ${isLeft ? "md:text-right" : "md:text-left"}`}>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-400">{desc}</p>
         </div>
      </div>
      
      <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-indigo-600 border-4 border-slate-950 flex items-center justify-center text-white font-bold z-10 hidden md:flex">
        {num}
      </div>
    </div>
  );
}