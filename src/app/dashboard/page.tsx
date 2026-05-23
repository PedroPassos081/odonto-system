import { AppShell } from "@/components/layout/AppShell";
import { QuickAction } from "@/components/ui/QuickAction";
import { StatCard } from "@/components/ui/StatCard";
import {
  Calendar,
  ClipboardList,
  CreditCard,
  FileText,
  UserPlus,
  Users,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <AppShell>
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-[#60758A]">
          Sexta-feira, 22 de maio
        </p>

        <h1 className="mt-3 text-4xl font-light tracking-[-0.03em] text-[#12384D]">
          Bom dia, bem-vinda de volta.
        </h1>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Consultas hoje"
          value="0"
          description="Agendadas para hoje"
          icon={Calendar}
        />

        <StatCard
          title="Pacientes ativos"
          value="0"
          description="Total no sistema"
          icon={Users}
        />

        <StatCard
          title="Tratamentos"
          value="0"
          description="Em andamento"
          icon={ClipboardList}
        />

        <StatCard
          title="Pagamentos"
          value="0"
          description="Pendentes ou parciais"
          icon={CreditCard}
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_380px]">
        <section className="min-h-90 rounded-3xl border border-[#D8EDF8] bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#12384D]">
              Próximas consultas
            </h2>

            <button className="text-sm font-medium text-[#2E91BD]">
              Ver agenda
            </button>
          </div>

          <div className="flex h-60 items-center justify-center">
            <p className="text-sm text-[#60758A]">Sem consultas próximas.</p>
          </div>
        </section>

        <section className="rounded-3xl border border-[#D8EDF8] bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-[#12384D]">
            Atalhos rápidos
          </h2>

          <div className="mt-7 space-y-4">
            <QuickAction label="Novo paciente" icon={UserPlus} />
            <QuickAction label="Nova consulta" icon={Calendar} active />
            <QuickAction label="Novo plano" icon={FileText} />
          </div>
        </section>
      </div>
    </AppShell>
  );
}