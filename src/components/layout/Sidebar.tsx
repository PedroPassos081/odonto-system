"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  CreditCard,
  LayoutDashboard,
  LogOut,
  ClipboardList,
  Users,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Pacientes",
    href: "/pacientes",
    icon: Users,
  },
  {
    label: "Agenda",
    href: "/agenda",
    icon: Calendar,
  },
  {
    label: "Tratamentos",
    href: "/tratamentos",
    icon: ClipboardList,
  },
  {
    label: "Financeiro",
    href: "/financeiro",
    icon: CreditCard,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-72 flex-col border-r border-[#D8EDF8] bg-white">
      <div className="flex h-19.5 items-center gap-3 border-b border-[#D8EDF8] px-7">
        <div className="relative h-12 w-12">
          <Image
            src="/logo.png"
            alt="Logo Drª Susana Lourenço"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div>
          <p className="text-sm font-semibold leading-tight text-[#12384D]">
            Drª Susana Lourenço
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-[#60758A]">
            Medicina Dentária
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-7">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                isActive
                  ? "bg-[#D7F5FC] font-semibold text-[#12384D]"
                  : "text-[#60758A] hover:bg-[#F0FAFE] hover:text-[#243B53]"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#D8EDF8] px-4 py-5">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#60758A] transition hover:bg-[#F0FAFE] hover:text-[#243B53]">
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </aside>
  );
}