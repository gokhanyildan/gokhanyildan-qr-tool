import QrBuilder from "@/components/QrBuilder";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-center text-3xl font-bold text-slate-900">
        QR Master
      </h1>
      <div className="mx-auto max-w-5xl">
        <QrBuilder />
      </div>
    </main>
  );
}
