"use client";
import { AppShell } from "@/components/layout/AppShell";
import {
  ChevronDown,
  ClipboardList,
  CreditCard,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  TrendingUp,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

const treatmentPlans = [
  {
    id: 1,
    patient: "Maria Fernandes",
    title: "Plano restaurador",
    procedures: 3,
    status: "Em andamento",
    totalValue: "€420,00",
    paidValue: "€300,00",
    openValue: "€120,00",
    createdAt: "20/05/2026",
  },
  {
    id: 2,
    patient: "João Pereira",
    title: "Tratamento inicial",
    procedures: 2,
    status: "Planejado",
    totalValue: "€250,00",
    paidValue: "€0,00",
    openValue: "€250,00",
    createdAt: "18/05/2026",
  },
  {
    id: 3,
    patient: "Ana Martins",
    title: "Limpeza e acompanhamento",
    procedures: 1,
    status: "Concluído",
    totalValue: "€80,00",
    paidValue: "€80,00",
    openValue: "€0,00",
    createdAt: "12/05/2026",
  },
  {
    id: 4,
    patient: "Carlos Mendes",
    title: "Plano de reabilitação",
    procedures: 5,
    status: "Aprovado",
    totalValue: "€980,00",
    paidValue: "€200,00",
    openValue: "€780,00",
    createdAt: "10/05/2026",
  },
];

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

export default function TreatmentsPage() {
    const [isNewPlanModalOpen, setIsNewPlanModalOpen] = useState(false);

const [procedures, setProcedures] = useState([
  {
    id: 1,
    name: "",
    tooth: "",
    price: "",
    status: "Planejado",
  },
]);

function addProcedure() {
  setProcedures((current) => [
    ...current,
    {
      id: Date.now(),
      name: "",
      tooth: "",
      price: "",
      status: "Planejado",
    },
  ]);
}

function removeProcedure(id: number) {
  setProcedures((current) =>
    current.length > 1
      ? current.filter((procedure) => procedure.id !== id)
      : current
  );
}

function updateProcedure(
  id: number,
  field: "name" | "tooth" | "price" | "status",
  value: string
) {
  setProcedures((current) =>
    current.map((procedure) =>
      procedure.id === id ? { ...procedure, [field]: value } : procedure
    )
  );
}

const totalValue = procedures.reduce((total, procedure) => {
  const price = Number(procedure.price.replace(",", "."));
  return total + (Number.isNaN(price) ? 0 : price);
}, 0);
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
        <div className="rounded-3xl border border-[#D8EDF8] bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#60758A]">
                Planos ativos
              </p>
              <p className="mt-5 text-3xl font-light text-[#12384D]">4</p>
              <p className="mt-2 text-sm text-[#60758A]">No sistema</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F5FB] text-[#2E91BD]">
              <ClipboardList size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#D8EDF8] bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#60758A]">
                Em andamento
              </p>
              <p className="mt-5 text-3xl font-light text-[#12384D]">1</p>
              <p className="mt-2 text-sm text-[#60758A]">Tratamento ativo</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF7E6] text-[#B7791F]">
              <TrendingUp size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#D8EDF8] bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#60758A]">
                Valor total
              </p>
              <p className="mt-5 text-3xl font-light text-[#12384D]">
                €1.730
              </p>
              <p className="mt-2 text-sm text-[#60758A]">Em planos criados</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F5FB] text-[#2E91BD]">
              <CreditCard size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#D8EDF8] bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#60758A]">
                Em aberto
              </p>
              <p className="mt-5 text-3xl font-light text-[#12384D]">
                €1.150
              </p>
              <p className="mt-2 text-sm text-[#60758A]">A receber</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8FBFD] text-[#60758A]">
              <User size={22} />
            </div>
          </div>
        </div>
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

                <th className="px-6 py-5 text-right text-xs font-semibold uppercase tracking-[0.12em] text-[#60758A]">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {treatmentPlans.map((plan) => (
                <tr
                  key={plan.id}
                  className="border-b border-[#EEF7FB] transition hover:bg-[#F8FBFD]"
                >
                  <td className="px-6 py-5">
                    <p className="text-sm font-semibold text-[#12384D]">
                      {plan.patient}
                    </p>
                    <p className="mt-1 text-xs text-[#60758A]">
                      Criado em {plan.createdAt}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-[#12384D]">
                      {plan.title}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-sm text-[#60758A]">
                    {plan.procedures} procedimentos
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
                      {plan.totalValue}
                    </p>
                    <p className="mt-1 text-xs text-[#60758A]">
                      Pago: {plan.paidValue}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-[#12384D]">
                    {plan.openValue}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button className="inline-flex items-center gap-2 rounded-xl border border-[#D8EDF8] bg-white px-4 py-2 text-xs font-medium text-[#2E91BD] transition hover:bg-[#F0FAFE]">
                        <Eye size={15} />
                        Ver
                      </button>

                      <button className="rounded-xl p-2 text-[#60758A] transition hover:bg-[#F0FAFE] hover:text-[#12384D]">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {isNewPlanModalOpen && (
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
          onClick={() => setIsNewPlanModalOpen(false)}
          className="rounded-xl p-2 text-[#60758A] transition hover:bg-[#F8FBFD] hover:text-[#12384D]"
        >
          <X size={22} />
        </button>
      </div>

      <form className="space-y-7 px-8 py-7">
        <section>
          <h3 className="text-base font-semibold text-[#12384D]">
            Dados do plano
          </h3>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Paciente
              </label>

              <select className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30">
                <option>Selecione um paciente</option>
                <option>Maria Fernandes</option>
                <option>João Pereira</option>
                <option>Ana Martins</option>
                <option>Carlos Mendes</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Status do plano
              </label>

              <select className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30">
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
                type="text"
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
              €{totalValue.toFixed(2).replace(".", ",")}
            </p>

            <p className="mt-2 text-sm text-[#60758A]">
              Calculado pelos procedimentos adicionados.
            </p>
          </div>
        </section>

        <div className="sticky bottom-0 flex items-center justify-end gap-4 border-t border-[#EEF7FB] bg-white py-5">
          <button
            type="button"
            onClick={() => setIsNewPlanModalOpen(false)}
            className="rounded-2xl border border-[#D8EDF8] bg-white px-6 py-3.5 text-sm font-medium text-[#12384D] transition hover:bg-[#F8FBFD]"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="rounded-2xl bg-[#399DCA] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2E91BD]"
          >
            Guardar plano
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </AppShell>
  );
}