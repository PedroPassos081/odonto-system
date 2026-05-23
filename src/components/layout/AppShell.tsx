import { Sidebar } from "./Sidebar";
import { PanelLeft } from "lucide-react";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#F6FBFE]">
      <Sidebar />

      <main className="ml-65 min-h-screen">
        <header className="flex h- items-center border-b border-[#D8EDF8] bg-white px-10">
          <button className="rounded-lg p-2 text-[#60758A] hover:bg-[#F0FAFE]">
            <PanelLeft size={20} />
          </button>
        </header>

        <section className="px-10 py-10">{children}</section>
      </main>
    </div>
  );
}