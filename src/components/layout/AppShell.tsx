"use client";

import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Sidebar } from "./Sidebar";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#F6FBFE]">
      <div
        className={`fixed left-0 top-0 z-40 h-screen w-65 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      <main
        className={`min-h-screen transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-65" : "ml-0"
        }`}
      >
        <header className="flex h-20 items-center border-b border-[#D8EDF8] bg-white px-10">
          <button
            type="button"
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label={
              sidebarOpen ? "Fechar menu lateral" : "Abrir menu lateral"
            }
            title={sidebarOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
            className="rounded-lg p-2 text-[#60758A] transition-colors hover:bg-[#F0FAFE]"
          >
            {sidebarOpen ? (
              <PanelLeftClose size={22} />
            ) : (
              <PanelLeftOpen size={22} />
            )}
          </button>
        </header>

        <section className="px-10 py-10">{children}</section>
      </main>
    </div>
  );
}