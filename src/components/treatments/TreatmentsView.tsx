"use client";

import { AppShell } from "@/components/layout/AppShell";
import { createTreatmentPlan } from "@/app/tratamentos/actions";
import { formatCurrency, formatDateBR } from "@/lib/format";
import {
  ChevronDown,
  ClipboardList,
  CreditCard,
  Plus,
  Search,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useActionState, useMemo, useState } from "react";

type Patient = {
  id: string;
  full_name: string;
};

type Procedure = {
  id: string;
  name: string;
  tooth: string | null;
  price: number;
  status: string;
};

type TreatmentPlan = {
  id: string;
  title: string;
  status: string;
  notes: string | null;
  created_at: string;
  patients: { id: string; full_name: string }[] | null;
  treatment_procedures: Procedure[] | null;
};

type Payment = {
  treatment_plan_id: string | null;
  paid_value: number;
};

type TreatmentsViewProps = {
  plans: TreatmentPlan[];
  patients: Patient[];
  payments: Payment[];
};

function getStatusStyle(status: string) {
  switch (status) {
    case "Planejado":
      return "border-[#D8EDF8] bg-[#F8FBFD] text-[#60758A]";
    case "Aprovado":
      return "border-[#B5E0FB] bg-[#E8F5FB] text-[#2E91BD]";
    case "Em andamento":
      return "border-[#FBD38D] bg-[#FFF7E6] text-[#B7791F]";
    case "Concluído":
      return "border-[#BCEBD3] bg-[#E6F7EF] text-[#2F855A]";
    case "Cancelado":
      return "border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]";
    default:
      return "border-[#D8EDF8] bg-[#F8FBFD] text-[#60758A]";
  }
}

export function TreatmentsView({
  plans,
  patients,
  payments,
}: TreatmentsViewProps) {
  const [isNewPlanModalOpen, setIsNewPlanModalOpen] = useState(false);

  const enrichedPlans = useMemo(
    () =>
      plans.map((plan) => {
        const procedures = plan.treatment_procedures ?? [];
        const totalValue = procedures.reduce((sum, p) => sum + p.price, 0);
        const paidValue = payments
          .filter((payment) => payment.treatment_plan_id === plan.id)
          .reduce((sum, payment) => sum + payment.paid_value, 0);

        return {
          ...plan,
          patientName: plan.patients?.[0]?.full_name ?? "Paciente removido",
          procedureCount: procedures.length,
          totalValue,
          paidValue,
          openValue: Math.max(totalValue - paidValue, 0),
        };
      }),
    [plans, payments]
  );

  const activePlans = enrichedPlans.length;
  const inProgressPlans = enrichedPlans.filter(
    (plan) => plan.status === "Em andamento"
  ).length;
  const totalValueSum = enrichedPlans.reduce(
    (sum, plan) => sum + plan.totalValue,
    0
  );
  const openValueSum = enrichedPlans.reduce(
    (sum, plan) => sum + plan.openValue,
    0
  );

  return (
    <AppShell>
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#60758A]">
            Clínica
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-[-0.03em] text-[#12384D]">
            Tratamentos
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#60758A]">
            Acompanhe os planos de tratamento, procedimentos, valores e status de cada paciente.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsNewPlanModalOpen(true)}
          className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#399DCA] px-7 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2E91BD]"
        >
          <Plus size={18} />
          Novo plano
        </button>
      </div>

      <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Planos ativos"
          value={String(activePlans)}
          description="No sistema"
          icon={<ClipboardList size={22} />}
          iconClassName="bg-[#E8F5FB] text-[#2E91BD]"
        />

        <SummaryCard
          title="Em andamento"
          value={String(inProgressPlans)}
          description="Tratamento ativo"
          icon={<ClipboardList size={22} />}
          iconClassName="bg-[#FFF7E6] text-[#B7791F]"
        />

        <SummaryCard
          title="Valor total"
          value={formatCurrency(totalValueSum)}
          description="Em planos criados"
          icon={<CreditCard size={22} />}
          iconClassName="bg-[#E8F5FB] text-[#2E91BD]"
        />

        <SummaryCard
          title="Em aberto"
          value={formatCurrency(openValueSum)}
          description="A receber"
          icon={<User size={22} />}
          iconClassName="bg-[#F8FBFD] text-[#60758A]"
        />
      </div>

      <section className="mt-9 overflow-hidden rounded-3xl border border-[#D8EDF8] bg-white shadow-sm">
        <div className="grid grid-cols-1 gap-4 border-b border-[#D8EDF8] p-6 lg:grid-cols-[1fr_240px]">
          <div className="flex items-center gap-3 rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-5 py-4 shadow-sm">
            <Search size={20} className="text-[#60758A]" />

            <input
              type="text"
              placeholder="Procurar por paciente ou plano..."
              className="w-full bg-transparent text-sm text-[#12384D] outline-none placeholder:text-[#60758A]"
            />
          </div>

          <button className="flex items-center justify-between rounded-2xl border border-[#D8EDF8] bg-white px-5 py-4 text-sm text-[#12384D] shadow-sm transition hover:bg-[#F8FBFD]">
            Todos os status
            <ChevronDown size={18} className="text-[#60758A]" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-250 border-collapse">
            <thead>
              <tr className="border-b border-[#D8EDF8] bg-white">
                <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#60758A]">
                  Paciente
                </th>
                <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#60758A]">
                  Plano
                </th>
                <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#60758A]">
                  Procedimentos
                </th>
                <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#60758A]">
                  Status
                </th>
                <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#60758A]">
                  Total
                </th>
                <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#60758A]">
                  Em aberto
                </th>
              </tr>
            </thead>

            <tbody>
              {enrichedPlans.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <p className="text-base font-semibold text-[#12384D]">
                      Nenhum plano de tratamento criado ainda.
                    </p>
                    <p className="mt-2 text-sm text-[#60758A]">
                      Clique em &quot;Novo plano&quot; para começar.
                    </p>
                  </td>
                </tr>
              )}

              {enrichedPlans.map((plan) => (
                <tr
                  key={plan.id}
                  className="border-b border-[#EEF7FB] transition hover:bg-[#F8FBFD]"
                >
                  <td className="px-6 py-5">
                    <p className="text-sm font-semibold text-[#12384D]">
                      {plan.patientName}
                    </p>
                    <p className="mt-1 text-xs text-[#60758A]">
                      Criado em {formatDateBR(plan.created_at.slice(0, 10))}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-[#12384D]">
                      {plan.title}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-sm text-[#60758A]">
                    {plan.procedureCount} procedimentos
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyle(
                        plan.status
                      )}`}
                    >
                      {plan.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <p className="text-sm font-semibold text-[#12384D]">
                      {formatCurrency(plan.totalValue)}
                    </p>
                    <p className="mt-1 text-xs text-[#60758A]">
                      Pago: {formatCurrency(plan.paidValue)}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-[#12384D]">
                    {formatCurrency(plan.openValue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {isNewPlanModalOpen && (
        <NewTreatmentPlanModal
          patients={patients}
          onClose={() => setIsNewPlanModalOpen(false)}
        />
      )}
    </AppShell>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon,
  iconClassName,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  iconClassName: string;
}) {
  return (
    <div className="rounded-3xl border border-[#D8EDF8] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#60758A]">
            {title}
          </p>
          <p className="mt-5 text-3xl font-light text-[#12384D]">{value}</p>
          <p className="mt-2 text-sm text-[#60758A]">{description}</p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconClassName}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

type NewProcedure = {
  id: number;
  name: string;
  tooth: string;
  price: string;
  status: string;
};

function NewTreatmentPlanModal({
  patients,
  onClose,
}: {
  patients: Patient[];
  onClose: () => void;
}) {
  const [procedures, setProcedures] = useState<NewProcedure[]>([
    { id: 1, name: "", tooth: "", price: "", status: "Planejado" },
  ]);

  const [state, formAction, isPending] = useActionState(
    async (_prevState: { error: string } | null, formData: FormData) => {
      const result = await createTreatmentPlan(_prevState, formData);
      if (!result?.error) {
        onClose();
      }
      return result;
    },
    null
  );

  function addProcedure() {
    setProcedures((current) => [
      ...current,
      { id: Date.now(), name: "", tooth: "", price: "", status: "Planejado" },
    ]);
  }

  function removeProcedure(id: number) {
    setProcedures((current) =>
      current.length > 1 ? current.filter((p) => p.id !== id) : current
    );
  }

  function updateProcedure(
    id: number,
    field: "name" | "tooth" | "price" | "status",
    value: string
  ) {
    setProcedures((current) =>
      current.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  }

  const totalValue = procedures.reduce((total, procedure) => {
    const price = Number(procedure.price.replace(",", "."));
    return total + (Number.isNaN(price) ? 0 : price);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#12384D]/30 px-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-[#D8EDF8] bg-white shadow-xl">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#EEF7FB] bg-white px-8 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#60758A]">
              Tratamentos
            </p>

            <h2 className="mt-2 text-2xl font-light tracking-[-0.03em] text-[#12384D]">
              Novo plano de tratamento
            </h2>

            <p className="mt-2 text-sm text-[#60758A]">
              Crie um plano com procedimentos, valores e status para o paciente.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-[#60758A] transition hover:bg-[#F8FBFD] hover:text-[#12384D]"
          >
            <X size={22} />
          </button>
        </div>

        <form action={formAction} className="space-y-7 px-8 py-7">
          <section>
            <h3 className="text-base font-semibold text-[#12384D]">
              Dados do plano
            </h3>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#12384D]">
                  Paciente
                </label>

                <select
                  name="patient_id"
                  required
                  className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
                >
                  <option value="">Selecione um paciente</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#12384D]">
                  Status do plano
                </label>

                <select
                  name="status"
                  defaultValue="Planejado"
                  className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
                >
                  <option>Planejado</option>
                  <option>Aprovado</option>
                  <option>Em andamento</option>
                  <option>Concluído</option>
                  <option>Cancelado</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#12384D]">
                  Nome do plano
                </label>

                <input
                  name="title"
                  type="text"
                  required
                  placeholder="Ex: Plano restaurador, tratamento inicial..."
                  className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
                />
              </div>
            </div>
          </section>

          <section className="border-t border-[#EEF7FB] pt-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#12384D]">
                  Procedimentos
                </h3>

                <p className="mt-1 text-sm text-[#60758A]">
                  Adicione os procedimentos previstos neste plano.
                </p>
              </div>

              <button
                type="button"
                onClick={addProcedure}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#B5E0FB] bg-[#E8F5FB] px-5 py-3 text-sm font-semibold text-[#2E91BD] transition hover:bg-[#D7F5FC]"
              >
                <Plus size={17} />
                Adicionar procedimento
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {procedures.map((procedure, index) => (
                <div
                  key={procedure.id}
                  className="rounded-3xl border border-[#D8EDF8] bg-[#F8FBFD] p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#12384D]">
                      Procedimento {index + 1}
                    </p>

                    <button
                      type="button"
                      onClick={() => removeProcedure(procedure.id)}
                      className="rounded-xl p-2 text-[#60758A] transition hover:bg-white hover:text-[#B91C1C]"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_120px_140px_160px]">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#12384D]">
                        Procedimento
                      </label>

                      <input
                        name="procedure_name"
                        type="text"
                        value={procedure.name}
                        onChange={(event) =>
                          updateProcedure(
                            procedure.id,
                            "name",
                            event.target.value
                          )
                        }
                        placeholder="Ex: Restauração"
                        className="w-full rounded-2xl border border-[#D8EDF8] bg-white px-4 py-3.5 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:ring-4 focus:ring-[#B5E0FB]/30"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#12384D]">
                        Dente
                      </label>

                      <input
                        name="procedure_tooth"
                        type="text"
                        value={procedure.tooth}
                        onChange={(event) =>
                          updateProcedure(
                            procedure.id,
                            "tooth",
                            event.target.value
                          )
                        }
                        placeholder="16"
                        className="w-full rounded-2xl border border-[#D8EDF8] bg-white px-4 py-3.5 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:ring-4 focus:ring-[#B5E0FB]/30"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#12384D]">
                        Valor
                      </label>

                      <input
                        name="procedure_price"
                        type="text"
                        value={procedure.price}
                        onChange={(event) =>
                          updateProcedure(
                            procedure.id,
                            "price",
                            event.target.value
                          )
                        }
                        placeholder="120,00"
                        className="w-full rounded-2xl border border-[#D8EDF8] bg-white px-4 py-3.5 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:ring-4 focus:ring-[#B5E0FB]/30"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#12384D]">
                        Status
                      </label>

                      <select
                        name="procedure_status"
                        value={procedure.status}
                        onChange={(event) =>
                          updateProcedure(
                            procedure.id,
                            "status",
                            event.target.value
                          )
                        }
                        className="w-full rounded-2xl border border-[#D8EDF8] bg-white px-4 py-3.5 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:ring-4 focus:ring-[#B5E0FB]/30"
                      >
                        <option>Planejado</option>
                        <option>Aprovado</option>
                        <option>Em andamento</option>
                        <option>Concluído</option>
                        <option>Cancelado</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-5 border-t border-[#EEF7FB] pt-7 lg:grid-cols-[1fr_280px]">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Observações do plano
              </label>

              <textarea
                name="notes"
                rows={5}
                placeholder="Ex: plano dividido em etapas, prioridade para restauração dos molares..."
                className="w-full resize-none rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
              />
            </div>

            <div className="rounded-3xl border border-[#D8EDF8] bg-[#F8FBFD] p-6">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#60758A]">
                Valor total do plano
              </p>

              <p className="mt-4 text-3xl font-light text-[#12384D]">
                {formatCurrency(totalValue)}
              </p>

              <p className="mt-2 text-sm text-[#60758A]">
                Calculado pelos procedimentos adicionados.
              </p>
            </div>
          </section>

          {state?.error && (
            <p className="text-sm font-medium text-[#C0392B]">
              {state.error}
            </p>
          )}

          <div className="sticky bottom-0 flex items-center justify-end gap-4 border-t border-[#EEF7FB] bg-white py-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-[#D8EDF8] bg-white px-6 py-3.5 text-sm font-medium text-[#12384D] transition hover:bg-[#F8FBFD]"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-2xl bg-[#399DCA] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2E91BD] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "A guardar..." : "Guardar plano"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
