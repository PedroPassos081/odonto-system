"use client";

import { AppShell } from "@/components/layout/AppShell";
import {
  CalendarClock,
  ChevronDown,
  CreditCard,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  TrendingDown,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";

const payments = [
  {
    id: 1,
    patient: "Maria Fernandes",
    treatment: "Plano restaurador",
    totalValue: "€420,00",
    paidValue: "€300,00",
    openValue: "€120,00",
    method: "Cartão",
    status: "Parcial",
    date: "20/05/2026",
  },
  {
    id: 2,
    patient: "João Pereira",
    treatment: "Tratamento inicial",
    totalValue: "€250,00",
    paidValue: "€0,00",
    openValue: "€250,00",
    method: "-",
    status: "Pendente",
    date: "18/05/2026",
  },
  {
    id: 3,
    patient: "Ana Martins",
    treatment: "Limpeza e acompanhamento",
    totalValue: "€80,00",
    paidValue: "€80,00",
    openValue: "€0,00",
    method: "Dinheiro",
    status: "Pago",
    date: "12/05/2026",
  },
  {
    id: 4,
    patient: "Carlos Mendes",
    treatment: "Plano de reabilitação",
    totalValue: "€980,00",
    paidValue: "€200,00",
    openValue: "€780,00",
    method: "Transferência",
    status: "Parcial",
    date: "10/05/2026",
  },
];

const expenses = [
  {
    id: 1,
    description: "Materiais odontológicos",
    supplier: "Dental Supply",
    category: "Materiais",
    amount: "€240,00",
    dueDate: "30/05/2026",
    paidAt: "-",
    method: "-",
    status: "Pendente",
  },
  {
    id: 2,
    description: "Software de gestão",
    supplier: "Sistema atual",
    category: "Software",
    amount: "€89,00",
    dueDate: "25/05/2026",
    paidAt: "24/05/2026",
    method: "Cartão",
    status: "Pago",
  },
  {
    id: 3,
    description: "Contabilidade mensal",
    supplier: "Contador",
    category: "Contabilidade",
    amount: "€150,00",
    dueDate: "05/06/2026",
    paidAt: "-",
    method: "-",
    status: "Pendente",
  },
  {
    id: 4,
    description: "Manutenção de equipamento",
    supplier: "Técnico externo",
    category: "Manutenção",
    amount: "€320,00",
    dueDate: "18/05/2026",
    paidAt: "-",
    method: "-",
    status: "Vencido",
  },
];

function getStatusStyle(status: string) {
  switch (status) {
    case "Pago":
      return "border-[#BCEBD3] bg-[#E6F7EF] text-[#2F855A]";
    case "Parcial":
      return "border-[#FBD38D] bg-[#FFF7E6] text-[#B7791F]";
    case "Pendente":
      return "border-[#B5E0FB] bg-[#E8F5FB] text-[#2E91BD]";
    case "Vencido":
      return "border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]";
    default:
      return "border-[#D8EDF8] bg-[#F8FBFD] text-[#60758A]";
  }
}

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<"recebimentos" | "contas">(
    "recebimentos"
  );
  const [isNewPaymentModalOpen, setIsNewPaymentModalOpen] = useState(false);
  const [isNewExpenseModalOpen, setIsNewExpenseModalOpen] = useState(false);

  return (
    <AppShell>
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#60758A]">
            Clínica
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-[-0.03em] text-[#12384D]">
            Financeiro
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#60758A]">
            Acompanhe recebimentos, contas a pagar e histórico financeiro da
            clínica.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            activeTab === "recebimentos"
              ? setIsNewPaymentModalOpen(true)
              : setIsNewExpenseModalOpen(true)
          }
          className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#399DCA] px-7 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2E91BD]"
        >
          <Plus size={18} />
          {activeTab === "recebimentos" ? "Novo pagamento" : "Nova conta"}
        </button>
      </div>

      <div className="mt-9 rounded-3xl border border-[#D8EDF8] bg-white p-3 shadow-sm">
        <div className="flex w-fit gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("recebimentos")}
            className={`rounded-2xl px-5 py-3 text-sm font-medium transition ${
              activeTab === "recebimentos"
                ? "bg-[#D7F5FC] text-[#12384D]"
                : "text-[#60758A] hover:bg-[#F0FAFE] hover:text-[#12384D]"
            }`}
          >
            Recebimentos
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("contas")}
            className={`rounded-2xl px-5 py-3 text-sm font-medium transition ${
              activeTab === "contas"
                ? "bg-[#D7F5FC] text-[#12384D]"
                : "text-[#60758A] hover:bg-[#F0FAFE] hover:text-[#12384D]"
            }`}
          >
            Contas a pagar
          </button>
        </div>
      </div>

      {activeTab === "recebimentos" && (
        <>
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              title="Total recebido"
              value="€580"
              description="No período atual"
              icon={<TrendingUp size={22} />}
              iconClassName="bg-[#E6F7EF] text-[#2F855A]"
            />

            <SummaryCard
              title="Em aberto"
              value="€1.150"
              description="A receber"
              icon={<TrendingDown size={22} />}
              iconClassName="bg-[#FFF7E6] text-[#B7791F]"
            />

            <SummaryCard
              title="Pagamentos parciais"
              value="2"
              description="Em acompanhamento"
              icon={<Wallet size={22} />}
              iconClassName="bg-[#E8F5FB] text-[#2E91BD]"
            />

            <SummaryCard
              title="Pagamentos registados"
              value="4"
              description="Total no sistema"
              icon={<CreditCard size={22} />}
              iconClassName="bg-[#F8FBFD] text-[#60758A]"
            />
          </div>

          <section className="mt-9 overflow-hidden rounded-3xl border border-[#D8EDF8] bg-white shadow-sm">
            <FinanceFilters placeholder="Procurar por paciente ou tratamento..." />

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] border-collapse">
                <thead>
                  <tr className="border-b border-[#D8EDF8] bg-white">
                    <TableHead>Paciente</TableHead>
                    <TableHead>Tratamento</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Pago</TableHead>
                    <TableHead>Em aberto</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead align="right">Ações</TableHead>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-[#EEF7FB] transition hover:bg-[#F8FBFD]"
                    >
                      <td className="px-6 py-5">
                        <p className="text-sm font-semibold text-[#12384D]">
                          {payment.patient}
                        </p>
                        <p className="mt-1 text-xs text-[#60758A]">
                          Registado em {payment.date}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-sm font-medium text-[#12384D]">
                        {payment.treatment}
                      </td>

                      <td className="px-6 py-5 text-sm text-[#60758A]">
                        {payment.totalValue}
                      </td>

                      <td className="px-6 py-5 text-sm font-medium text-[#12384D]">
                        {payment.paidValue}
                      </td>

                      <td className="px-6 py-5 text-sm font-medium text-[#12384D]">
                        {payment.openValue}
                      </td>

                      <td className="px-6 py-5 text-sm text-[#60758A]">
                        {payment.method}
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge status={payment.status} />
                      </td>

                      <TableActions />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {activeTab === "contas" && (
        <>
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              title="Total a pagar"
              value="€710"
              description="Contas pendentes"
              icon={<TrendingDown size={22} />}
              iconClassName="bg-[#FFF7E6] text-[#B7791F]"
            />

            <SummaryCard
              title="Pago no mês"
              value="€89"
              description="Despesas quitadas"
              icon={<TrendingUp size={22} />}
              iconClassName="bg-[#E6F7EF] text-[#2F855A]"
            />

            <SummaryCard
              title="Contas pendentes"
              value="2"
              description="Aguardando pagamento"
              icon={<CalendarClock size={22} />}
              iconClassName="bg-[#E8F5FB] text-[#2E91BD]"
            />

            <SummaryCard
              title="Vencidas"
              value="1"
              description="Requer atenção"
              icon={<CreditCard size={22} />}
              iconClassName="bg-[#FEF2F2] text-[#B91C1C]"
            />
          </div>

          <section className="mt-9 overflow-hidden rounded-3xl border border-[#D8EDF8] bg-white shadow-sm">
            <FinanceFilters placeholder="Procurar por descrição, fornecedor ou categoria..." />

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] border-collapse">
                <thead>
                  <tr className="border-b border-[#D8EDF8] bg-white">
                    <TableHead>Descrição</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Pago em</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead align="right">Ações</TableHead>
                  </tr>
                </thead>

                <tbody>
                  {expenses.map((expense) => (
                    <tr
                      key={expense.id}
                      className="border-b border-[#EEF7FB] transition hover:bg-[#F8FBFD]"
                    >
                      <td className="px-6 py-5">
                        <p className="text-sm font-semibold text-[#12384D]">
                          {expense.description}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-sm text-[#60758A]">
                        {expense.supplier}
                      </td>

                      <td className="px-6 py-5 text-sm text-[#60758A]">
                        {expense.category}
                      </td>

                      <td className="px-6 py-5 text-sm font-medium text-[#12384D]">
                        {expense.amount}
                      </td>

                      <td className="px-6 py-5 text-sm text-[#60758A]">
                        {expense.dueDate}
                      </td>

                      <td className="px-6 py-5 text-sm text-[#60758A]">
                        {expense.paidAt}
                      </td>

                      <td className="px-6 py-5 text-sm text-[#60758A]">
                        {expense.method}
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge status={expense.status} />
                      </td>

                      <TableActions />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {isNewPaymentModalOpen && (
        <NewPaymentModal onClose={() => setIsNewPaymentModalOpen(false)} />
      )}

      {isNewExpenseModalOpen && (
        <NewExpenseModal onClose={() => setIsNewExpenseModalOpen(false)} />
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

function FinanceFilters({ placeholder }: { placeholder: string }) {
  return (
    <div className="grid grid-cols-1 gap-4 border-b border-[#D8EDF8] p-6 lg:grid-cols-[1fr_240px]">
      <div className="flex items-center gap-3 rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-5 py-4 shadow-sm">
        <Search size={20} className="text-[#60758A]" />

        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-[#12384D] outline-none placeholder:text-[#60758A]"
        />
      </div>

      <button className="flex items-center justify-between rounded-2xl border border-[#D8EDF8] bg-white px-5 py-4 text-sm text-[#12384D] shadow-sm transition hover:bg-[#F8FBFD]">
        Todos os status
        <ChevronDown size={18} className="text-[#60758A]" />
      </button>
    </div>
  );
}

function TableHead({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-6 py-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#60758A] ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyle(
        status
      )}`}
    >
      {status}
    </span>
  );
}

function TableActions() {
  return (
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
  );
}

function NewPaymentModal({ onClose }: { onClose: () => void }) {
  return (
    <BaseModal
      eyebrow="Financeiro"
      title="Novo pagamento"
      description="Registe um novo pagamento vinculado a um paciente ou plano de tratamento."
      onClose={onClose}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormSelect label="Paciente">
          <option>Selecione um paciente</option>
          <option>Maria Fernandes</option>
          <option>João Pereira</option>
          <option>Ana Martins</option>
          <option>Carlos Mendes</option>
        </FormSelect>

        <FormSelect label="Plano de tratamento">
          <option>Selecione um plano</option>
          <option>Plano restaurador</option>
          <option>Tratamento inicial</option>
          <option>Limpeza e acompanhamento</option>
        </FormSelect>

        <FormInput label="Valor pago" placeholder="Ex: 120,00" />
        <FormInput label="Data do pagamento" type="date" />

        <FormSelect label="Forma de pagamento">
          <option>Selecione</option>
          <option>Dinheiro</option>
          <option>Cartão</option>
          <option>Transferência</option>
          <option>MB Way</option>
        </FormSelect>

        <FormSelect label="Status">
          <option>Pago</option>
          <option>Parcial</option>
          <option>Pendente</option>
        </FormSelect>
      </div>

      <FormTextarea
        label="Observações"
        placeholder="Ex: pagamento parcial referente à primeira etapa do tratamento..."
      />
    </BaseModal>
  );
}

function NewExpenseModal({ onClose }: { onClose: () => void }) {
  return (
    <BaseModal
      eyebrow="Contas a pagar"
      title="Nova conta a pagar"
      description="Registe uma despesa da clínica, com vencimento, categoria e status."
      onClose={onClose}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormInput
          label="Descrição da despesa"
          placeholder="Ex: Materiais odontológicos"
        />

        <FormInput label="Fornecedor" placeholder="Ex: Dental Supply" />

        <FormSelect label="Categoria">
          <option>Selecione uma categoria</option>
          <option>Materiais</option>
          <option>Equipamentos</option>
          <option>Aluguel</option>
          <option>Água, luz e internet</option>
          <option>Software</option>
          <option>Contabilidade</option>
          <option>Impostos</option>
          <option>Marketing</option>
          <option>Manutenção</option>
          <option>Outros</option>
        </FormSelect>

        <FormInput label="Valor" placeholder="Ex: 240,00" />

        <FormInput label="Data de vencimento" type="date" />

        <FormInput label="Data de pagamento" type="date" />

        <FormSelect label="Forma de pagamento">
          <option>Selecione</option>
          <option>Dinheiro</option>
          <option>Cartão</option>
          <option>Transferência</option>
          <option>MB Way</option>
        </FormSelect>

        <FormSelect label="Status">
          <option>Pendente</option>
          <option>Pago</option>
          <option>Vencido</option>
        </FormSelect>
      </div>

      <FormTextarea
        label="Observações"
        placeholder="Ex: despesa recorrente, pagamento mensal, nota fiscal..."
      />
    </BaseModal>
  );
}

function BaseModal({
  eyebrow,
  title,
  description,
  children,
  onClose,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#12384D]/30 px-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#D8EDF8] bg-white shadow-xl">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#EEF7FB] bg-white px-8 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#60758A]">
              {eyebrow}
            </p>

            <h2 className="mt-2 text-2xl font-light tracking-[-0.03em] text-[#12384D]">
              {title}
            </h2>

            <p className="mt-2 text-sm text-[#60758A]">{description}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-[#60758A] transition hover:bg-[#F8FBFD] hover:text-[#12384D]"
          >
            <X size={22} />
          </button>
        </div>

        <form className="space-y-7 px-8 py-7">
          {children}

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
              className="rounded-2xl bg-[#399DCA] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2E91BD]"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormInput({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#12384D]">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
      />
    </div>
  );
}

function FormSelect({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#12384D]">
        {label}
      </label>

      <select className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30">
        {children}
      </select>
    </div>
  );
}

function FormTextarea({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#12384D]">
        {label}
      </label>

      <textarea
        rows={4}
        placeholder={placeholder}
        className="w-full resize-none rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
      />
    </div>
  );
}