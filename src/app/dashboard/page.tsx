import { AppShell } from "@/components/layout/AppShell";
import { QuickAction } from "@/components/ui/QuickAction";
import { StatCard } from "@/components/ui/StatCard";
import { createClient } from "@/lib/supabase/server";
import { formatIsoDate } from "@/lib/format";
import Link from "next/link";
import {
  Calendar,
  ClipboardList,
  CreditCard,
  FileText,
  UserPlus,
  Users,
} from "lucide-react";

export default async function DashboardPage() {
  const today = new Date();
  const todayIso = formatIsoDate(today);

  const dataAtual = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).format(today);

  const supabase = await createClient();

  const [
    { count: activePatientsCount, error: patientsError },
    { data: todaysAppointments, error: appointmentsError },
    { count: activeTreatmentsCount, error: treatmentsError },
    { count: pendingPaymentsCount, error: paymentsError },
  ] = await Promise.all([
    supabase
      .from("patients")
      .select("id", { count: "exact", head: true })
      .eq("status", "Ativo"),
    supabase
      .from("appointments")
      .select("id, start_time, type, status, patients(full_name)")
      .eq("date", todayIso)
      .order("start_time", { ascending: true }),
    supabase
      .from("treatment_plans")
      .select("id", { count: "exact", head: true })
      .eq("status", "Em andamento"),
    supabase
      .from("payments")
      .select("id", { count: "exact", head: true })
      .in("status", ["Pendente", "Parcial"]),
  ]);

  if (patientsError) {
    console.error("Error fetching active patients count:", patientsError);
  }

  if (appointmentsError) {
    console.error("Error fetching today's appointments:", appointmentsError);
  }

  if (treatmentsError) {
    console.error("Error fetching active treatments count:", treatmentsError);
  }

  if (paymentsError) {
    console.error("Error fetching pending payments count:", paymentsError);
  }

  return (
    <AppShell>
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-[#60758A]">
          {dataAtual}
        </p>

        <h1 className="mt-3 text-4xl font-light tracking-[-0.03em] text-[#12384D]">
          Bom dia, bem-vinda de volta.
        </h1>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Consultas hoje"
          value={String(todaysAppointments?.length ?? 0)}
          description="Agendadas para hoje"
          icon={Calendar}
        />

        <StatCard
          title="Pacientes ativos"
          value={String(activePatientsCount ?? 0)}
          description="Total no sistema"
          icon={Users}
        />

        <StatCard
          title="Tratamentos"
          value={String(activeTreatmentsCount ?? 0)}
          description="Em andamento"
          icon={ClipboardList}
        />

        <StatCard
          title="Pagamentos"
          value={String(pendingPaymentsCount ?? 0)}
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

            <Link
              href="/agenda"
              className="text-sm font-medium text-[#2E91BD]"
            >
              Ver agenda
            </Link>
          </div>

          {todaysAppointments && todaysAppointments.length > 0 ? (
            <div className="mt-6 space-y-3">
              {todaysAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] p-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#12384D]">
                      {appointment.patients?.[0]?.full_name ??
                        "Paciente removido"}
                    </p>
                    <p className="mt-1 text-xs text-[#60758A]">
                      {appointment.type}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#12384D]">
                      {appointment.start_time}
                    </p>
                    <p className="mt-1 text-xs text-[#60758A]">
                      {appointment.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-60 items-center justify-center">
              <p className="text-sm text-[#60758A]">Sem consultas próximas.</p>
            </div>
          )}
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