"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { cn } from "@/lib/utils";
import { Link as LinkIcon, Wifi, IdCard, MessageCircle, Phone, Download, Info, Mail, Bitcoin, MapPin } from "lucide-react";

export default function QrBuilder() {
  const [activeTab, setActiveTab] = useState("url");
  
  const [formData, setFormData] = useState({
    url: "",
    ssid: "",
    password: "",
    first: "",
    last: "",
    phone: "",
    email: "",
    emailSubject: "",
    emailBody: "",
    waPhone: "",
    waMessage: "",
    smsPhone: "",
    smsMessage: "",
    cryptoAddress: "",
    cryptoAmount: "",
    cryptoType: "bitcoin",
    latitude: "",
    longitude: "",
  });
  
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // TABLAR VE AÇIKLAMALARI
  const tabs = [
    { 
      key: "url", 
      label: "URL", 
      icon: LinkIcon,
      description: "Link to any website. Best for marketing, portfolios, and menus.",
      tips: ["Ensure your URL starts with https://", "Short URLs are scanned faster.", "Test the link before printing."]
    },
    { 
      key: "wifi", 
      label: "Wi‑Fi", 
      icon: Wifi,
      description: "Allow guests to connect to your Wi-Fi instantly without typing passwords.",
      tips: ["Most modern phones support this natively.", "Check if your network is hidden.", "WPA/WPA2 is the standard security."]
    },
    { 
      key: "vcard", 
      label: "vCard", 
      icon: IdCard,
      description: "Share your contact details directly to someone's phone address book.",
      tips: ["Add your full name and primary phone.", "Great for business cards and networking."]
    },
    { 
      key: "email", 
      label: "Email", 
      icon: Mail,
      description: "Pre-write an email with a subject line and body text.",
      tips: ["Useful for support requests or feedback forms.", "Works with Gmail, Outlook, and Apple Mail."]
    },
    { 
      key: "whatsapp", 
      label: "WhatsApp", 
      icon: MessageCircle,
      description: "Start a WhatsApp chat with a pre-filled message.",
      tips: ["Include country code (e.g., 90).", "Pre-filled messages help start the conversation."]
    },
    { 
      key: "sms", 
      label: "SMS", 
      icon: Phone,
      description: "Compose an SMS message to a specific number.",
      tips: ["Works on both iOS and Android.", "Good for simple opt-ins or voting."]
    },
    { 
      key: "crypto", 
      label: "Crypto", 
      icon: Bitcoin,
      description: "Receive crypto payments easily. Supports Bitcoin and Ethereum.",
      tips: ["Double check your wallet address.", "Compatible with most mobile wallets."]
    },
    { 
      key: "location", 
      label: "Location", 
      icon: MapPin,
      description: "Share a specific geographic coordinate (Google Maps).",
      tips: ["Use decimal coordinates (e.g., 41.0082).", "Opens directly in Maps apps."]
    },
  ];

  function generateQRData() {
    function sanitizePhone(p) {
      return (p || "").replace(/[^\d]/g, "");
    }

    if (activeTab === "url") return (formData.url || "").trim();
    
    if (activeTab === "wifi") {
      const ssid = (formData.ssid || "").trim();
      const password = (formData.password || "").trim();
      return `WIFI:T:WPA;S:${ssid};P:${password};;`;
    }
    
    if (activeTab === "vcard") {
      const first = (formData.first || "").trim();
      const last = (formData.last || "").trim();
      const phone = (formData.phone || "").trim();
      const email = (formData.email || "").trim();
      return [
        "BEGIN:VCARD", "VERSION:3.0", `N:${last};${first}`,
        phone ? `TEL:${phone}` : "", email ? `EMAIL:${email}` : "", "END:VCARD",
      ].filter(Boolean).join("\n");
    }

    if (activeTab === "email") {
      const email = (formData.email || "").trim();
      const subject = encodeURIComponent((formData.emailSubject || "").trim());
      const body = encodeURIComponent((formData.emailBody || "").trim());
      return `mailto:${email}?subject=${subject}&body=${body}`;
    }
    
    if (activeTab === "whatsapp") {
      const phone = sanitizePhone(formData.waPhone);
      const message = encodeURIComponent((formData.waMessage || "").trim());
      return `https://wa.me/${phone}?text=${message}`;
    }
    
    if (activeTab === "sms") {
      const phone = sanitizePhone(formData.smsPhone);
      const message = encodeURIComponent((formData.smsMessage || "").trim());
      return `sms:${phone}?body=${message}`;
    }

    if (activeTab === "crypto") {
      const address = (formData.cryptoAddress || "").trim();
      const amount = (formData.cryptoAmount || "").trim();
      const type = formData.cryptoType; // bitcoin or ethereum
      if (!address) return "";
      
      if (type === "ethereum") {
         return `ethereum:${address}${amount ? `?value=${amount}` : ""}`;
      }
      // Default Bitcoin
      return `bitcoin:${address}${amount ? `?amount=${amount}` : ""}`;
    }

    if (activeTab === "location") {
      const lat = (formData.latitude || "").trim();
      const lng = (formData.longitude || "").trim();
      if(!lat || !lng) return "";
      // Google Maps Universal Link
      return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    }

    return "";
  }

  const qrText = useMemo(() => generateQRData(), [activeTab, formData]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setIsGenerating(true);
      try {
        const text = qrText || "https://www.gokhanyildan.com";
        const dataUrl = await QRCode.toDataURL(text, {
          errorCorrectionLevel: "M",
          margin: 1,
          scale: 10,
          color: { dark: "#000000", light: "#ffffff" },
        });
        if (!cancelled) setQrDataUrl(dataUrl);
      } catch (e) {
        if (!cancelled) setQrDataUrl("");
      } finally {
        if (!cancelled) setIsGenerating(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [qrText]);

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function downloadPng() {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "qr-master.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const inputClass = "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-200 placeholder:text-slate-600 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all";
  const labelClass = "block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide";
  
  const currentTabInfo = tabs.find(t => t.key === activeTab);

  return (
    <div className="w-full mt-8">
      {/* TAB MENÜSÜ */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {tabs.map(({ key, label, icon: Icon }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 border",
                isActive
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25 scale-105"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        
        {/* SOL: FORM ALANI */}
        <div className="lg:col-span-7 flex flex-col h-full">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl backdrop-blur-sm relative overflow-hidden flex-1 min-h-[450px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70"></div>
            
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-xs">1</span>
              Enter Content
            </h2>

            <div className="space-y-5">
              {activeTab === "url" && (
                <div><label className={labelClass}>Website URL</label><input type="url" placeholder="https://example.com" value={formData.url} onChange={(e) => updateField("url", e.target.value)} className={inputClass} /></div>
              )}

              {activeTab === "wifi" && (
                <>
                  <div><label className={labelClass}>Network Name (SSID)</label><input type="text" placeholder="MyHome_WiFi" value={formData.ssid} onChange={(e) => updateField("ssid", e.target.value)} className={inputClass} /></div>
                  <div><label className={labelClass}>Password</label><input type="text" placeholder="••••••••" value={formData.password} onChange={(e) => updateField("password", e.target.value)} className={inputClass} /></div>
                </>
              )}

              {activeTab === "vcard" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className={labelClass}>First Name</label><input type="text" value={formData.first} onChange={(e) => updateField("first", e.target.value)} className={inputClass} /></div>
                    <div><label className={labelClass}>Last Name</label><input type="text" value={formData.last} onChange={(e) => updateField("last", e.target.value)} className={inputClass} /></div>
                  </div>
                  <div><label className={labelClass}>Phone</label><input type="tel" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} className={inputClass} /></div>
                  <div><label className={labelClass}>Email</label><input type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} className={inputClass} /></div>
                </>
              )}

              {activeTab === "email" && (
                <>
                  <div><label className={labelClass}>Recipient Email</label><input type="email" placeholder="contact@company.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)} className={inputClass} /></div>
                  <div><label className={labelClass}>Subject</label><input type="text" placeholder="Inquiry" value={formData.emailSubject} onChange={(e) => updateField("emailSubject", e.target.value)} className={inputClass} /></div>
                  <div><label className={labelClass}>Body</label><textarea placeholder="Hello..." value={formData.emailBody} onChange={(e) => updateField("emailBody", e.target.value)} className={`${inputClass} h-20 resize-none`} /></div>
                </>
              )}

              {activeTab === "whatsapp" && (
                <>
                  <div><label className={labelClass}>WhatsApp Number</label><input type="tel" placeholder="905551234567" value={formData.waPhone} onChange={(e) => updateField("waPhone", e.target.value)} className={inputClass} /></div>
                  <div><label className={labelClass}>Message</label><textarea placeholder="Hello..." value={formData.waMessage} onChange={(e) => updateField("waMessage", e.target.value)} className={`${inputClass} h-24 resize-none`} /></div>
                </>
              )}

              {activeTab === "sms" && (
                <>
                  <div><label className={labelClass}>Phone Number</label><input type="tel" placeholder="905551234567" value={formData.smsPhone} onChange={(e) => updateField("smsPhone", e.target.value)} className={inputClass} /></div>
                  <div><label className={labelClass}>Message Body</label><textarea placeholder="Type your SMS..." value={formData.smsMessage} onChange={(e) => updateField("smsMessage", e.target.value)} className={`${inputClass} h-24 resize-none`} /></div>
                </>
              )}

              {activeTab === "crypto" && (
                <>
                  <div className="flex gap-4 mb-2">
                    <button type="button" onClick={() => updateField("cryptoType", "bitcoin")} className={cn("flex-1 py-2 rounded-lg text-sm font-medium border transition-colors", formData.cryptoType === "bitcoin" ? "bg-orange-500/20 border-orange-500 text-orange-400" : "bg-slate-900 border-slate-700 text-slate-400")}>Bitcoin</button>
                    <button type="button" onClick={() => updateField("cryptoType", "ethereum")} className={cn("flex-1 py-2 rounded-lg text-sm font-medium border transition-colors", formData.cryptoType === "ethereum" ? "bg-blue-500/20 border-blue-500 text-blue-400" : "bg-slate-900 border-slate-700 text-slate-400")}>Ethereum</button>
                  </div>
                  <div><label className={labelClass}>Wallet Address</label><input type="text" placeholder={formData.cryptoType === 'bitcoin' ? "bc1qxy..." : "0x71C..."} value={formData.cryptoAddress} onChange={(e) => updateField("cryptoAddress", e.target.value)} className={inputClass} /></div>
                  <div><label className={labelClass}>Amount (Optional)</label><input type="number" step="0.0001" placeholder="0.05" value={formData.cryptoAmount} onChange={(e) => updateField("cryptoAmount", e.target.value)} className={inputClass} /></div>
                </>
              )}

              {activeTab === "location" && (
                <>
                   <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelClass}>Latitude</label><input type="text" placeholder="41.0082" value={formData.latitude} onChange={(e) => updateField("latitude", e.target.value)} className={inputClass} /></div>
                    <div><label className={labelClass}>Longitude</label><input type="text" placeholder="28.9784" value={formData.longitude} onChange={(e) => updateField("longitude", e.target.value)} className={inputClass} /></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Find coordinates on Google Maps by right-clicking a location.</p>
                </>
              )}
            </div>

            {/* BİLGİ KUTUSU */}
            <div className="mt-8 pt-6 border-t border-slate-800">
                <div className="flex items-start gap-3">
                    <Info className="text-indigo-400 mt-1 shrink-0" size={18} />
                    <div>
                        <h3 className="text-sm font-medium text-slate-200 mb-1">About {currentTabInfo?.label} QR</h3>
                        <p className="text-xs text-slate-400 leading-relaxed mb-3">{currentTabInfo?.description}</p>
                        <ul className="text-xs text-slate-500 list-disc list-inside space-y-1">
                            {currentTabInfo?.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                        </ul>
                    </div>
                </div>
            </div>

          </div>
        </div>

        {/* SAĞ: ÖNİZLEME ALANI */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl flex flex-col items-center text-center">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2 self-start">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-xs">2</span>
              Preview & Download
            </h2>

            <div className="bg-white p-4 rounded-xl shadow-2xl shadow-black/50 mb-6 transition-transform hover:scale-[1.02] duration-300">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR Code" className="w-48 h-48 sm:w-56 sm:h-56 object-contain" />
              ) : (
                <div className="w-48 h-48 bg-gray-100 animate-pulse rounded"></div>
              )}
            </div>

            <button type="button" onClick={downloadPng} disabled={!qrDataUrl} className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-base font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
              <Download size={20} />
              Download PNG
            </button>
            
            <p className="mt-4 text-xs text-slate-500">
               Your content is private. <br/> QR codes are generated directly in your browser.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}