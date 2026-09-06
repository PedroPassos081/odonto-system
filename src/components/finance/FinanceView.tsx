"use client";

import { AppShell } from "@/components/layout/AppShell";
import { createExpense, createPayment } from "@/app/financeiro/actions";
import { formatCurrency, formatDateBR } from "@/lib/format";
import {
  CalendarClock,
  ChevronDown,
  CreditCard,
  Download,
  Search,
  TrendingDown,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";
import { useActionState, useMemo, useState } from "react";

type Patient = { id: string; full_name: string };

type TreatmentPlanOption = {
  id: string;
  title: string;
  patients: { id: string; full_name: string }[] | null;
};

type Payment = {
  id: string;
  total_value: number;
  paid_value: number;
  method: string | null;
  status: string;
  date: string;
  notes: string | null;
  patients: { id: string; full_name: string }[] | null;
  treatment_plans: { id: string; title: string }[] | null;
};

type Expense = {
  id: string;
  description: string;
  supplier: string | null;
  category: string | null;
  amount: number;
  due_date: string;
  paid_at: string | null;
  method: string | null;
  status: string;
};

type FinanceViewProps = {
  payments: Payment[];
  expenses: Expense[];
  patients: Patient[];
  treatmentPlans: TreatmentPlanOption[];
};

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

export function FinanceView({
  payments,
  expenses,
  patients,
  treatmentPlans,
}: FinanceViewProps) {
  const [activeTab, setActiveTab] = useState<
    "recebimentos" | "contas" | "relatorios"
  >("recebimentos");

  const [isNewPaymentModalOpen, setIsNewPaymentModalOpen] = useState(false);
  const [isNewExpenseModalOpen, setIsNewExpenseModalOpen] = useState(false);

  const enrichedPayments = useMemo(
    () =>
      payments.map((payment) => ({
        ...payment,
        patientName: payment.patients?.[0]?.full_name ?? "Paciente removido",
        treatmentTitle: payment.treatment_plans?.[0]?.title ?? "Sem plano vinculado",
        openValue: Math.max(payment.total_value - payment.paid_value, 0),
      })),
    [payments]
  );

  const totalReceived = enrichedPayments.reduce(
    (sum, p) => sum + p.paid_value,
    0
  );
  const totalOpen = enrichedPayments.reduce((sum, p) => sum + p.openValue, 0);
  const partialPayments = enrichedPayments.filter(
    (p) => p.status === "Parcial"
  ).length;

  const totalToPay = expenses
    .filter((e) => e.status !== "Pago")
    .reduce((sum, e) => sum + e.amount, 0);
  const paidExpensesTotal = expenses
    .filter((e) => e.status === "Pago")
    .reduce((sum, e) => sum + e.amount, 0);
  const pendingExpenses = expenses.filter((e) => e.status === "Pendente").length;
  const overdueExpenses = expenses.filter((e) => e.status === "Vencido").length;

  const balance = totalReceived - paidExpensesTotal;
  const pendingTotal = totalOpen + totalToPay;

  function handleMainAction() {
    if (activeTab === "recebimentos") {
      setIsNewPaymentModalOpen(true);
      return;
    }

    if (activeTab === "contas") {
      setIsNewExpenseModalOpen(true);
      return;
    }

    alert(
      "A exportação em Excel será implementada quando conectarmos o banco de dados."
    );
  }

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
          onClick={handleMainAction}
          className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#399DCA] px-7 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2E91BD]"
        >
          {activeTab === "relatorios" ? (
            <Download size={18} />
          ) : (
            <CreditCard size={18} />
          )}

          {activeTab === "recebimentos"
            ? "Novo pagamento"
            : activeTab === "contas"
            ? "Nova conta"
            : "Exportar Excel"}
        </button>
      </div>

      <div className="mt-9 rounded-3xl border border-[#D8EDF8] bg-white p-3 shadow-sm">
        <div className="flex w-fit gap-2">
          <TabButton
            active={activeTab === "recebimentos"}
            onClick={() => setActiveTab("recebimentos")}
          >
            Recebimentos
          </TabButton>

          <TabButton
            active={activeTab === "contas"}
            onClick={() => setActiveTab("contas")}
          >
            Contas a pagar
          </TabButton>

          <TabButton
            active={activeTab === "relatorios"}
            onClick={() => setActiveTab("relatorios")}
          >
            Relatórios
          </TabButton>
        </div>
      </div>

      {activeTab === "recebimentos" && (
        <>
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              title="Total recebido"
              value={formatCurrency(totalReceived)}
              description="No período atual"
              icon={<TrendingUp size={22} />}
              iconClassName="bg-[#E6F7EF] text-[#2F855A]"
            />

            <SummaryCard
              title="Em aberto"
              value={formatCurrency(totalOpen)}
              description="A receber"
              icon={<TrendingDown size={22} />}
              iconClassName="bg-[#FFF7E6] text-[#B7791F]"
            />

            <SummaryCard
              title="Pagamentos parciais"
              value={String(partialPayments)}
              description="Em acompanhamento"
              icon={<Wallet size={22} />}
              iconClassName="bg-[#E8F5FB] text-[#2E91BD]"
            />

            <SummaryCard
              title="Pagamentos registados"
              value={String(enrichedPayments.length)}
              description="Total no sistema"
              icon={<CreditCard size={22} />}
              iconClassName="bg-[#F8FBFD] text-[#60758A]"
            />
          </div>

          <section className="mt-9 overflow-hidden rounded-3xl border border-[#D8EDF8] bg-white shadow-sm">
            <FinanceFilters placeholder="Procurar por paciente ou tratamento..." />

            <div className="overflow-x-auto">
              <table className="w-full min-w-225 border-collapse">
                <thead>
                  <tr className="border-b border-[#D8EDF8] bg-white">
                    <TableHead>Paciente</TableHead>
                    <TableHead>Tratamento</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Pago</TableHead>
                    <TableHead>Em aberto</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Status</TableHead>
                  </tr>
                </thead>

                <tbody>
                  {enrichedPayments.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-20 text-center text-sm text-[#60758A]">
                        Nenhum pagamento registado ainda.
                      </td>
                    </tr>
                  )}

                  {enrichedPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-[#EEF7FB] transition hover:bg-[#F8FBFD]"
                    >
                      <td className="px-6 py-5">
                        <p className="text-sm font-semibold text-[#12384D]">
                          {payment.patientName}
                        </p>
                        <p className="mt-1 text-xs text-[#60758A]">
                          Registado em {formatDateBR(payment.date)}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-sm font-medium text-[#12384D]">
                        {payment.treatmentTitle}
                      </td>

                      <td className="px-6 py-5 text-sm text-[#60758A]">
                        {formatCurrency(payment.total_value)}
                      </td>

                      <td className="px-6 py-5 text-sm font-medium text-[#12384D]">
                        {formatCurrency(payment.paid_value)}
                      </td>

                      <td className="px-6 py-5 text-sm font-medium text-[#12384D]">
                        {formatCurrency(payment.openValue)}
                      </td>

                      <td className="px-6 py-5 text-sm text-[#60758A]">
                        {payment.method ?? "-"}
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge status={payment.status} />
                      </td>
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
              value={formatCurrency(totalToPay)}
              description="Contas pendentes"
              icon={<TrendingDown size={22} />}
              iconClassName="bg-[#FFF7E6] text-[#B7791F]"
            />

            <SummaryCard
              title="Pago"
              value={formatCurrency(paidExpensesTotal)}
              description="Despesas quitadas"
              icon={<TrendingUp size={22} />}
              iconClassName="bg-[#E6F7EF] text-[#2F855A]"
            />

            <SummaryCard
              title="Contas pendentes"
              value={String(pendingExpenses)}
              description="Aguardando pagamento"
              icon={<CalendarClock size={22} />}
              iconClassName="bg-[#E8F5FB] text-[#2E91BD]"
            />

            <SummaryCard
              title="Vencidas"
              value={String(overdueExpenses)}
              description="Requer atenção"
              icon={<CreditCard size={22} />}
              iconClassName="bg-[#FEF2F2] text-[#B91C1C]"
            />
          </div>

          <section className="mt-9 overflow-hidden rounded-3xl border border-[#D8EDF8] bg-white shadow-sm">
            <FinanceFilters placeholder="Procurar por descrição, fornecedor ou categoria..." />

            <div className="overflow-x-auto">
              <table className="w-full min-w-262.5 border-collapse">
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
                  </tr>
                </thead>

                <tbody>
                  {expenses.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-6 py-20 text-center text-sm text-[#60758A]">
                        Nenhuma despesa registada ainda.
                      </td>
                    </tr>
                  )}

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
                        {expense.supplier ?? "-"}
                      </td>

                      <td className="px-6 py-5 text-sm text-[#60758A]">
                        {expense.category ?? "-"}
                      </td>

                      <td className="px-6 py-5 text-sm font-medium text-[#12384D]">
                        {formatCurrency(expense.amount)}
                      </td>

                      <td className="px-6 py-5 text-sm text-[#60758A]">
                        {formatDateBR(expense.due_date)}
                      </td>

                      <td className="px-6 py-5 text-sm text-[#60758A]">
                        {expense.paid_at ? formatDateBR(expense.paid_at) : "-"}
                      </td>

                      <td className="px-6 py-5 text-sm text-[#60758A]">
                        {expense.method ?? "-"}
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge status={expense.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {activeTab === "relatorios" && (
        <>
          <section className="mt-9 rounded-3xl border border-[#D8EDF8] bg-white p-7 shadow-sm">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#12384D]">
                  Relatório financeiro
                </h2>

                <p className="mt-1 text-sm text-[#60758A]">
                  Filtre por período para analisar entradas, saídas e saldo
                  estimado.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  alert(
                    "A exportação em Excel será implementada quando conectarmos o banco de dados."
                  )
                }
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#B5E0FB] bg-[#E8F5FB] px-6 py-3.5 text-sm font-semibold text-[#2E91BD] transition hover:bg-[#D7F5FC]"
              >
                <Download size={18} />
                Exportar Excel
              </button>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3">
              <FormInput label="Data inicial" type="date" />
              <FormInput label="Data final" type="date" />

              <FormSelect label="Tipo de relatório">
                <option>Geral</option>
                <option>Apenas recebimentos</option>
                <option>Apenas contas a pagar</option>
                <option>Pendências</option>
              </FormSelect>
            </div>
          </section>

          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              title="Entradas"
              value={formatCurrency(totalReceived)}
              description="Recebido no período"
              icon={<TrendingUp size={22} />}
              iconClassName="bg-[#E6F7EF] text-[#2F855A]"
            />

            <SummaryCard
              title="Saídas"
              value={formatCurrency(paidExpensesTotal)}
              description="Despesas pagas"
              icon={<TrendingDown size={22} />}
              iconClassName="bg-[#FFF7E6] text-[#B7791F]"
            />

            <SummaryCard
              title="Saldo estimado"
              value={formatCurrency(balance)}
              description="Entradas menos saídas"
              icon={<Wallet size={22} />}
              iconClassName="bg-[#E8F5FB] text-[#2E91BD]"
            />

            <SummaryCard
              title="Pendências"
              value={formatCurrency(pendingTotal)}
              description="A receber + a pagar"
              icon={<CreditCard size={22} />}
              iconClassName="bg-[#F8FBFD] text-[#60758A]"
            />
          </div>

          <section className="mt-9 grid grid-cols-1 gap-8 xl:grid-cols-2">
            <ReportList
              title="Resumo de recebimentos"
              description="Valores vinculados aos pacientes e planos de tratamento."
            >
              {enrichedPayments.map((payment) => (
                <ReportRow
                  key={payment.id}
                  title={payment.patientName}
                  subtitle={payment.treatmentTitle}
                  value={formatCurrency(payment.paid_value)}
                  status={payment.status}
                />
              ))}
            </ReportList>

            <ReportList
              title="Resumo de contas a pagar"
              description="Despesas da clínica por vencimento e status."
            >
              {expenses.map((expense) => (
                <ReportRow
                  key={expense.id}
                  title={expense.description}
                  subtitle={`${expense.supplier ?? "Sem fornecedor"} · vence em ${formatDateBR(
                    expense.due_date
                  )}`}
                  value={formatCurrency(expense.amount)}
                  status={expense.status}
                />
              ))}
            </ReportList>
          </section>
        </>
      )}

      {isNewPaymentModalOpen && (
        <NewPaymentModal
          patients={patients}
          treatmentPlans={treatmentPlans}
          onClose={() => setIsNewPaymentModalOpen(false)}
        />
      )}

      {isNewExpenseModalOpen && (
        <NewExpenseModal onClose={() => setIsNewExpenseModalOpen(false)} />
      )}
    </AppShell>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl px-5 py-3 text-sm font-medium transition ${
        active
          ? "bg-[#D7F5FC] text-[#12384D]"
          : "text-[#60758A] hover:bg-[#F0FAFE] hover:text-[#12384D]"
      }`}
    >
      {children}
    </button>
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

function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#60758A]">
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

function ReportList({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-[#D8EDF8] bg-white p-7 shadow-sm">
      <div className="border-b border-[#EEF7FB] pb-5">
        <h2 className="text-lg font-semibold text-[#12384D]">{title}</h2>
        <p className="mt-1 text-sm text-[#60758A]">{description}</p>
      </div>

      <div className="mt-6 space-y-4">{children}</div>
    </div>
  );
}

function ReportRow({
  title,
  subtitle,
  value,
  status,
}: {
  title: string;
  subtitle: string;
  value: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] p-4">
      <div>
        <p className="text-sm font-semibold text-[#12384D]">{title}</p>
        <p className="mt-1 text-xs text-[#60758A]">{subtitle}</p>
      </div>

      <div className="text-right">
        <p className="text-sm font-semibold text-[#12384D]">{value}</p>
        <p className="mt-1 text-xs text-[#60758A]">{status}</p>
      </div>
    </div>
  );
}

function NewPaymentModal({
  patients,
  treatmentPlans,
  onClose,
}: {
  patients: Patient[];
  treatmentPlans: TreatmentPlanOption[];
  onClose: () => void;
}) {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: { error: string } | null, formData: FormData) => {
      const result = await createPayment(_prevState, formData);
      if (!result?.error) {
        onClose();
      }
      return result;
    },
    null
  );

  return (
    <BaseModal
      eyebrow="Financeiro"
      title="Novo pagamento"
      description="Registe um novo pagamento vinculado a um paciente ou plano de tratamento."
      onClose={onClose}
      formAction={formAction}
      submitLabel={isPending ? "A guardar..." : "Guardar"}
      isPending={isPending}
      error={state?.error}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormSelect label="Paciente" name="patient_id" required>
          <option value="">Selecione um paciente</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.full_name}
            </option>
          ))}
        </FormSelect>

        <FormSelect label="Plano de tratamento" name="treatment_plan_id">
          <option value="">Sem plano vinculado</option>
          {treatmentPlans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.title}
              {plan.patients?.[0]?.full_name
                ? ` · ${plan.patients[0].full_name}`
                : ""}
            </option>
          ))}
        </FormSelect>

        <FormInput
          label="Valor total"
          name="total_value"
          placeholder="Ex: 420,00"
          required
        />

        <FormInput
          label="Valor pago"
          name="paid_value"
          placeholder="Ex: 120,00"
        />

        <FormInput label="Data do pagamento" name="date" type="date" required />

        <FormSelect label="Forma de pagamento" name="method">
          <option value="">Selecione</option>
          <option>Dinheiro</option>
          <option>Cartão</option>
          <option>Transferência</option>
          <option>MB Way</option>
        </FormSelect>

        <FormSelect label="Status" name="status" defaultValue="Pendente">
          <option>Pago</option>
          <option>Parcial</option>
          <option>Pendente</option>
        </FormSelect>
      </div>

      <FormTextarea
        label="Observações"
        name="notes"
        placeholder="Ex: pagamento parcial referente à primeira etapa do tratamento..."
      />
    </BaseModal>
  );
}

function NewExpenseModal({ onClose }: { onClose: () => void }) {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: { error: string } | null, formData: FormData) => {
      const result = await createExpense(_prevState, formData);
      if (!result?.error) {
        onClose();
      }
      return result;
    },
    null
  );

  return (
    <BaseModal
      eyebrow="Contas a pagar"
      title="Nova conta a pagar"
      description="Registe uma despesa da clínica, com vencimento, categoria e status."
      onClose={onClose}
      formAction={formAction}
      submitLabel={isPending ? "A guardar..." : "Guardar"}
      isPending={isPending}
      error={state?.error}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormInput
          label="Descrição da despesa"
          name="description"
          placeholder="Ex: Materiais odontológicos"
          required
        />

        <FormInput label="Fornecedor" name="supplier" placeholder="Ex: Dental Supply" />

        <FormSelect label="Categoria" name="category">
          <option value="">Selecione uma categoria</option>
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

        <FormInput label="Valor" name="amount" placeholder="Ex: 240,00" required />

        <FormInput label="Data de vencimento" name="due_date" type="date" required />

        <FormInput label="Data de pagamento" name="paid_at" type="date" />

        <FormSelect label="Forma de pagamento" name="method">
          <option value="">Selecione</option>
          <option>Dinheiro</option>
          <option>Cartão</option>
          <option>Transferência</option>
          <option>MB Way</option>
        </FormSelect>

        <FormSelect label="Status" name="status" defaultValue="Pendente">
          <option>Pendente</option>
          <option>Pago</option>
          <option>Vencido</option>
        </FormSelect>
      </div>
    </BaseModal>
  );
}

function BaseModal({
  eyebrow,
  title,
  description,
  children,
  onClose,
  formAction,
  submitLabel,
  isPending,
  error,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  onClose: () => void;
  formAction: (formData: FormData) => void;
  submitLabel: string;
  isPending: boolean;
  error?: string;
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

        <form action={formAction} className="space-y-7 px-8 py-7">
          {children}

          {error && (
            <p className="text-sm font-medium text-[#C0392B]">{error}</p>
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
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormInput({
  label,
  name,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  name?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#12384D]">
        {label}
      </label>

      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
      />
    </div>
  );
}

function FormSelect({
  label,
  name,
  children,
  required,
  defaultValue,
}: {
  label: string;
  name?: string;
  children: React.ReactNode;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#12384D]">
        {label}
      </label>

      <select
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
      >
        {children}
      </select>
    </div>
  );
}

function FormTextarea({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#12384D]">
        {label}
      </label>

      <textarea
        name={name}
        rows={4}
        placeholder={placeholder}
        className="w-full resize-none rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
      />
    </div>
  );
}
