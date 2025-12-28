export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
