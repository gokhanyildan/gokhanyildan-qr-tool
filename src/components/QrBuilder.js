"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { cn } from "@/lib/utils";
import { Link as LinkIcon, Wifi, IdCard } from "lucide-react";

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
  });
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const tabs = [
    { key: "url", label: "URL", icon: LinkIcon },
    { key: "wifi", label: "Wi‑Fi", icon: Wifi },
    { key: "vcard", label: "vCard", icon: IdCard },
  ];

  function generateQRData() {
    if (activeTab === "url") {
      return (formData.url || "").trim();
    }
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
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${last};${first}`,
        phone ? `TEL:${phone}` : "",
        email ? `EMAIL:${email}` : "",
        "END:VCARD",
      ]
        .filter(Boolean)
        .join("\n");
    }
    return "";
  }

  const qrText = useMemo(() => generateQRData(), [activeTab, formData]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setIsGenerating(true);
      try {
        const text = qrText || " ";
        const dataUrl = await QRCode.toDataURL(text, {
          errorCorrectionLevel: "M",
          margin: 1,
          scale: 6,
        });
        if (!cancelled) setQrDataUrl(dataUrl);
      } catch (e) {
        if (!cancelled) setQrDataUrl("");
      } finally {
        if (!cancelled) setIsGenerating(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [qrText]);

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function downloadPng() {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "qr.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center gap-2 rounded-lg bg-white p-2 shadow-sm">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              activeTab === key
                ? "bg-slate-900 text-white"
                : "text-slate-700 hover:bg-slate-100"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow-sm">
          {activeTab === "url" && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                URL
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                value={formData.url}
                onChange={(e) => updateField("url", e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
              />
            </div>
          )}

          {activeTab === "wifi" && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  SSID
                </label>
                <input
                  type="text"
                  placeholder="Network name"
                  value={formData.ssid}
                  onChange={(e) => updateField("ssid", e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="text"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                />
              </div>
              <p className="text-xs text-slate-500">
                Security assumed as WPA. Format: WIFI:T:WPA;S:SSID;P:PASS;;
              </p>
            </div>
          )}

          {activeTab === "vcard" && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.first}
                    onChange={(e) => updateField("first", e.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.last}
                    onChange={(e) => updateField("last", e.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                />
              </div>
              <p className="text-xs text-slate-500">
                Generates a simple vCard 3.0 with name, phone, and email.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-4 shadow-sm">
          <div className="w-full max-w-xs overflow-hidden rounded-md border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2">
              <span className="text-sm font-medium text-slate-700">
                Preview
              </span>
              <button
                type="button"
                onClick={downloadPng}
                disabled={!qrDataUrl}
                className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
              >
                Download PNG
              </button>
            </div>
            <div className="flex items-center justify-center p-4">
              {isGenerating ? (
                <div className="h-48 w-48 animate-pulse rounded-md bg-slate-100" />
              ) : qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Generated QR code"
                  className="h-48 w-48"
                />
              ) : (
                <div className="h-48 w-48 rounded-md bg-slate-100" />
              )}
            </div>
          </div>

          <div className="w-full max-w-xs rounded-md bg-slate-50 p-3 text-xs text-slate-600">
            <div className="font-mono break-words">
              {qrText || "Enter data to generate QR"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
