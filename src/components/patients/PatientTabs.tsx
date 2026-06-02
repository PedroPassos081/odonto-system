"use client";

import { useState } from "react";
import {
  Calendar,
  CreditCard,
  FileText,
  Plus,
  Stethoscope,
  Trash2,
  User,
  X,
} from "lucide-react";
import { ToothIcon } from "@/components/ui/ToothIcon";
import { PatientOdontogram } from "@/components/patients/PatientOdontogram";

type Patient = {
  id: string;
  name: string;
  age: string;
  phone: string;
  email: string;
  nif: string;
  address: string;
  birthDate: string;
  allergies: string;
  medications: string;
  medicalHistory: string;
  notes: string;
};

type Appointment = {
  date: string;
  time: string;
  type: string;
  status: string;
};

type MedicalRecord = {
  id: number;
  patientId: string;
  date: string;
  professional: string;
  mainComplaint: string;
  diagnosis: string;
  procedureDone: string;
  evolution: string;
  notes: string;
};

type TreatmentProcedure = {
  id: number;
  planId: number;
  name: string;
  tooth: string;
  price: string;
  status: string;
};

type TreatmentPlan = {
  id: number;
  patientId: string;
  title: string;
  status: string;
  totalValue: string;
  paidValue: string;
  openValue: string;
  createdAt: string;
  procedures: TreatmentProcedure[];
};

type NewTreatmentProcedure = {
  id: number;
  name: string;
  tooth: string;
  price: string;
  status: string;
};

type PatientTabsProps = {
  patient: Patient;
  appointments: Appointment[];
};

const tabs = [
  {
    id: "dados",
    label: "Dados pessoais",
    icon: User,
  },
  {
    id: "consultas",
    label: "Consultas",
    icon: Calendar,
  },
  {
    id: "prontuario",
    label: "Prontuário",
    icon: FileText,
  },
  {
    id: "odontograma",
    label: "Odontograma",
    icon: ToothIcon,
  },
  {
    id: "tratamento",
    label: "Plano de tratamento",
    icon: Stethoscope,
  },
  {
    id: "financeiro",
    label: "Financeiro",
    icon: CreditCard,
  },
];

const medicalRecords: MedicalRecord[] = [
  {
    id: 1,
    patientId: "001",
    date: "20/05/2026",
    professional: "Drª Susana Lourenço",
    mainComplaint: "Sensibilidade ao frio no dente 16.",
    diagnosis: "Possível infiltração em restauração antiga.",
    procedureDone: "Avaliação clínica e orientação inicial.",
    evolution:
      "Paciente orientada sobre necessidade de acompanhamento e possível restauração.",
    notes: "Paciente relata desconforto leve, sem dor espontânea.",
  },
  {
    id: 2,
    patientId: "001",
    date: "12/05/2026",
    professional: "Drª Susana Lourenço",
    mainComplaint: "Consulta de rotina.",
    diagnosis: "Sem alterações significativas.",
    procedureDone: "Exame clínico e limpeza.",
    evolution: "Paciente estável, retorno preventivo recomendado.",
    notes: "Reforçadas orientações de higiene oral.",
  },
];

const treatmentPlans: TreatmentPlan[] = [
  {
    id: 1,
    patientId: "001",
    title: "Plano restaurador",
    status: "Em andamento",
    totalValue: "€420,00",
    paidValue: "€300,00",
    openValue: "€120,00",
    createdAt: "20/05/2026",
    procedures: [
      {
        id: 1,
        planId: 1,
        name: "Avaliação clínica",
        tooth: "-",
        price: "€60,00",
        status: "Concluído",
      },
      {
        id: 2,
        planId: 1,
        name: "Restauração",
        tooth: "16",
        price: "€180,00",
        status: "Em andamento",
      },
      {
        id: 3,
        planId: 1,
        name: "Acompanhamento",
        tooth: "16",
        price: "€180,00",
        status: "Planejado",
      },
    ],
  },
];

export function PatientTabs({ patient, appointments }: PatientTabsProps) {
  const [activeTab, setActiveTab] = useState("dados");
  const [isNewRecordModalOpen, setIsNewRecordModalOpen] = useState(false);
  const [isNewTreatmentModalOpen, setIsNewTreatmentModalOpen] = useState(false);

  const [newTreatmentProcedures, setNewTreatmentProcedures] = useState<
    NewTreatmentProcedure[]
  >([
    {
      id: 1,
      name: "",
      tooth: "",
      price: "",
      status: "Planejado",
    },
  ]);

  const patientMedicalRecords = medicalRecords.filter(
    (record) => record.patientId === patient.id
  );

  const patientTreatmentPlans = treatmentPlans.filter(
    (plan) => plan.patientId === patient.id
  );

  const treatmentTotalValue = patientTreatmentPlans.reduce((total, plan) => {
    const value = currencyToNumber(plan.totalValue);
    return total + value;
  }, 0);

  const treatmentTotalOpen = patientTreatmentPlans.reduce((total, plan) => {
    const value = currencyToNumber(plan.openValue);
    return total + value;
  }, 0);

  const newTreatmentTotal = newTreatmentProcedures.reduce(
    (total, procedure) => {
      const price = Number(procedure.price.replace(",", "."));
      return total + (Number.isNaN(price) ? 0 : price);
    },
    0
  );

  function addTreatmentProcedure() {
    setNewTreatmentProcedures((current) => [
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

  function removeTreatmentProcedure(id: number) {
    setNewTreatmentProcedures((current) =>
      current.length > 1
        ? current.filter((procedure) => procedure.id !== id)
        : current
    );
  }

  function updateTreatmentProcedure(
    id: number,
    field: keyof NewTreatmentProcedure,
    value: string
  ) {
    setNewTreatmentProcedures((current) =>
      current.map((procedure) =>
        procedure.id === id ? { ...procedure, [field]: value } : procedure
      )
    );
  }

  return (
    <>
      <div className="mt-9 overflow-x-auto rounded-3xl border border-[#D8EDF8] bg-white p-3 shadow-sm">
        <div className="flex min-w-max gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#D7F5FC] text-[#12384D]"
                    : "text-[#60758A] hover:bg-[#F0FAFE] hover:text-[#12384D]"
                }`}
              >
                <Icon size={17} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        {activeTab === "dados" && (
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_380px]">
            <div className="space-y-8">
              <InfoCard title="Dados pessoais">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Field label="Nome completo" value={patient.name} />
                  <Field label="Data de nascimento" value={patient.birthDate} />
                  <Field label="Idade" value={patient.age} />
                  <Field label="NIF" value={patient.nif} />
                  <Field label="Telefone/WhatsApp" value={patient.phone} />
                  <Field label="E-mail" value={patient.email} />

                  <div className="md:col-span-2">
                    <Field label="Morada" value={patient.address} />
                  </div>
                </div>
              </InfoCard>

              <InfoCard title="Informações clínicas">
                <div className="grid grid-cols-1 gap-6">
                  <Field
                    label="Histórico médico"
                    value={patient.medicalHistory}
                  />
                  <Field label="Alergias" value={patient.allergies} />
                  <Field
                    label="Medicamentos em uso"
                    value={patient.medications}
                  />
                  <Field label="Observações" value={patient.notes} />
                </div>
              </InfoCard>
            </div>

            <aside className="space-y-8">
              <InfoCard title="Resumo">
                <div className="space-y-4">
                  <SummaryItem
                    label="Consultas registadas"
                    value={String(appointments.length)}
                  />
                  <SummaryItem
                    label="Registros no prontuário"
                    value={String(patientMedicalRecords.length)}
                  />
                  <SummaryItem label="Valor em aberto" value="€120,00" />
                </div>
              </InfoCard>
            </aside>
          </div>
        )}

        {activeTab === "consultas" && (
          <InfoCard title="Consultas do paciente">
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={`${appointment.date}-${appointment.time}`}
                  className="rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] p-5"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#12384D]">
                        {appointment.type}
                      </p>
                      <p className="mt-1 text-sm text-[#60758A]">
                        {appointment.date} às {appointment.time}
                      </p>
                    </div>

                    <span className="w-fit rounded-full border border-[#B5E0FB] bg-white px-3 py-1 text-xs font-medium text-[#2E91BD]">
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </InfoCard>
        )}

        {activeTab === "prontuario" && (
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_360px]">
            <section className="rounded-3xl border border-[#D8EDF8] bg-white p-7 shadow-sm">
              <SectionHeader
                title="Prontuário odontológico"
                description="Histórico clínico, evolução e procedimentos realizados."
                buttonLabel="Novo registro"
                onClick={() => setIsNewRecordModalOpen(true)}
              />

              <div className="mt-7 space-y-6">
                {patientMedicalRecords.map((record) => (
                  <div
                    key={record.id}
                    className="rounded-3xl border border-[#D8EDF8] bg-[#F8FBFD] p-6"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[#12384D]">
                          Atendimento em {record.date}
                        </p>

                        <p className="mt-1 text-xs text-[#60758A]">
                          Profissional responsável: {record.professional}
                        </p>
                      </div>

                      <span className="w-fit rounded-full border border-[#B5E0FB] bg-white px-3 py-1 text-xs font-medium text-[#2E91BD]">
                        Registro clínico
                      </span>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-5">
                      <ClinicalField
                        label="Queixa principal"
                        value={record.mainComplaint}
                      />
                      <ClinicalField
                        label="Diagnóstico"
                        value={record.diagnosis}
                      />
                      <ClinicalField
                        label="Procedimento realizado"
                        value={record.procedureDone}
                      />
                      <ClinicalField
                        label="Evolução do tratamento"
                        value={record.evolution}
                      />
                      <ClinicalField label="Observações" value={record.notes} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <aside className="space-y-8">
              <InfoCard title="Resumo clínico">
                <div className="space-y-4">
                  <SummaryItem
                    label="Registros no prontuário"
                    value={String(patientMedicalRecords.length)}
                  />
                  <SummaryItem
                    label="Último atendimento"
                    value={patientMedicalRecords[0]?.date || "Sem registros"}
                  />

                  <div className="rounded-2xl bg-[#FFF7E6] p-4">
                    <p className="text-xs text-[#B7791F]">Atenção clínica</p>
                    <p className="mt-1 text-sm font-medium text-[#12384D]">
                      {patient.allergies || "Sem alertas cadastrados"}
                    </p>
                  </div>
                </div>
              </InfoCard>
            </aside>
          </div>
        )}

        {activeTab === "odontograma" && <PatientOdontogram />}

        {activeTab === "tratamento" && (
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_360px]">
            <section className="rounded-3xl border border-[#D8EDF8] bg-white p-7 shadow-sm">
              <SectionHeader
                title="Planos de tratamento"
                description="Procedimentos planejados, valores e evolução do tratamento."
                buttonLabel="Novo plano"
                onClick={() => setIsNewTreatmentModalOpen(true)}
              />

              <div className="mt-7 space-y-6">
                {patientTreatmentPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="rounded-3xl border border-[#D8EDF8] bg-[#F8FBFD] p-6"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-base font-semibold text-[#12384D]">
                          {plan.title}
                        </p>

                        <p className="mt-1 text-xs text-[#60758A]">
                          Criado em {plan.createdAt}
                        </p>
                      </div>

                      <TreatmentStatusBadge status={plan.status} />
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                      <SummaryBox label="Valor total" value={plan.totalValue} />
                      <SummaryBox label="Pago" value={plan.paidValue} />
                      <SummaryBox label="Em aberto" value={plan.openValue} />
                    </div>

                    <div className="mt-6 overflow-x-auto rounded-2xl border border-[#D8EDF8] bg-white">
                      <table className="w-full min-w-160 border-collapse">
                        <thead>
                          <tr className="border-b border-[#EEF7FB]">
                            <TableHead>Procedimento</TableHead>
                            <TableHead>Dente</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Status</TableHead>
                          </tr>
                        </thead>

                        <tbody>
                          {plan.procedures.map((procedure) => (
                            <tr
                              key={procedure.id}
                              className="border-b border-[#EEF7FB] last:border-b-0"
                            >
                              <td className="px-5 py-4 text-sm font-medium text-[#12384D]">
                                {procedure.name}
                              </td>
                              <td className="px-5 py-4 text-sm text-[#60758A]">
                                {procedure.tooth}
                              </td>
                              <td className="px-5 py-4 text-sm font-medium text-[#12384D]">
                                {procedure.price}
                              </td>
                              <td className="px-5 py-4">
                                <TreatmentStatusBadge
                                  status={procedure.status}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <aside className="space-y-8">
              <InfoCard title="Resumo do tratamento">
                <div className="space-y-4">
                  <SummaryItem
                    label="Planos criados"
                    value={String(patientTreatmentPlans.length)}
                  />
                  <SummaryItem
                    label="Valor total"
                    value={`€${treatmentTotalValue
                      .toFixed(2)
                      .replace(".", ",")}`}
                  />
                  <div className="rounded-2xl bg-[#FFF7E6] p-4">
                    <p className="text-xs text-[#B7791F]">Valor em aberto</p>
                    <p className="mt-1 text-2xl font-light text-[#12384D]">
                      €{treatmentTotalOpen.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                </div>
              </InfoCard>
            </aside>
          </div>
        )}

        {activeTab === "financeiro" && (
          <InfoCard title="Financeiro do paciente">
            <div className="rounded-2xl border border-dashed border-[#B5E0FB] bg-[#F8FBFD] p-8 text-center">
              <p className="text-sm font-semibold text-[#12384D]">
                Área financeira do paciente.
              </p>
              <p className="mt-2 text-sm text-[#60758A]">
                Aqui ficarão valores pagos, pendentes, forma de pagamento e
                histórico financeiro.
              </p>
            </div>
          </InfoCard>
        )}
      </div>

      {isNewRecordModalOpen && (
        <NewMedicalRecordModal
          onClose={() => setIsNewRecordModalOpen(false)}
        />
      )}

      {isNewTreatmentModalOpen && (
        <NewTreatmentPlanModal
          procedures={newTreatmentProcedures}
          total={newTreatmentTotal}
          onClose={() => setIsNewTreatmentModalOpen(false)}
          onAddProcedure={addTreatmentProcedure}
          onRemoveProcedure={removeTreatmentProcedure}
          onUpdateProcedure={updateTreatmentProcedure}
        />
      )}
    </>
  );
}

function currencyToNumber(value: string) {
  return Number(value.replace("€", "").replace(".", "").replace(",", "."));
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-[#D8EDF8] bg-white p-7 shadow-sm">
      <h2 className="text-lg font-semibold text-[#12384D]">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function SectionHeader({
  title,
  description,
  buttonLabel,
  onClick,
}: {
  title: string;
  description: string;
  buttonLabel: string;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col gap-5 border-b border-[#EEF7FB] pb-6 md:flex-row md:items-start md:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-[#12384D]">{title}</h2>
        <p className="mt-1 text-sm text-[#60758A]">{description}</p>
      </div>

      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#399DCA] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2E91BD]"
      >
        <Plus size={17} />
        {buttonLabel}
      </button>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#60758A]">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-[#12384D]">{value}</p>
    </div>
  );
}

function ClinicalField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#60758A]">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-[#12384D]">{value}</p>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#F8FBFD] p-4">
      <p className="text-xs text-[#60758A]">{label}</p>
      <p className="mt-1 text-2xl font-light text-[#12384D]">{value}</p>
    </div>
  );
}

function SummaryBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <p className="text-xs text-[#60758A]">{label}</p>
      <p className="mt-1 text-lg font-semibold text-[#12384D]">{value}</p>
    </div>
  );
}

function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#60758A]">
      {children}
    </th>
  );
}

function getTreatmentStatusStyle(status: string) {
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

function TreatmentStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-medium ${getTreatmentStatusStyle(
        status
      )}`}
    >
      {status}
    </span>
  );
}

function NewMedicalRecordModal({ onClose }: { onClose: () => void }) {
  return (
    <BaseModal
      eyebrow="Prontuário"
      title="Novo registro clínico"
      description="Adicione uma nova evolução ao prontuário do paciente."
      onClose={onClose}
      maxWidth="max-w-3xl"
      submitLabel="Guardar registro"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormInput label="Data do atendimento" type="date" />
        <FormInput
          label="Profissional responsável"
          placeholder="Drª Susana Lourenço"
        />
      </div>

      <FormTextarea
        label="Queixa principal"
        placeholder="Ex: paciente relata dor, sensibilidade ou desconforto..."
      />

      <FormTextarea
        label="Diagnóstico"
        placeholder="Descreva o diagnóstico clínico..."
      />

      <FormTextarea
        label="Procedimento realizado"
        placeholder="Ex: limpeza, restauração, avaliação, aplicação..."
      />

      <FormTextarea
        label="Evolução do tratamento"
        placeholder="Descreva a evolução, resposta do paciente e próximos passos..."
      />

      <FormTextarea
        label="Prescrição ou observações"
        placeholder="Ex: medicação, orientação pós-procedimento, cuidados em casa..."
        rows={4}
      />
    </BaseModal>
  );
}

function NewTreatmentPlanModal({
  procedures,
  total,
  onClose,
  onAddProcedure,
  onRemoveProcedure,
  onUpdateProcedure,
}: {
  procedures: NewTreatmentProcedure[];
  total: number;
  onClose: () => void;
  onAddProcedure: () => void;
  onRemoveProcedure: (id: number) => void;
  onUpdateProcedure: (
    id: number,
    field: keyof NewTreatmentProcedure,
    value: string
  ) => void;
}) {
  return (
    <BaseModal
      eyebrow="Plano de tratamento"
      title="Novo plano"
      description="Adicione procedimentos, valores e status ao plano do paciente."
      onClose={onClose}
      maxWidth="max-w-5xl"
      submitLabel="Guardar plano"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormInput label="Nome do plano" placeholder="Ex: Plano restaurador" />

        <FormSelect label="Status do plano">
          <option>Planejado</option>
          <option>Aprovado</option>
          <option>Em andamento</option>
          <option>Concluído</option>
          <option>Cancelado</option>
        </FormSelect>
      </div>

      <section className="border-t border-[#EEF7FB] pt-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-base font-semibold text-[#12384D]">
              Procedimentos
            </h3>

            <p className="mt-1 text-sm text-[#60758A]">
              Adicione os procedimentos previstos para este paciente.
            </p>
          </div>

          <button
            type="button"
            onClick={onAddProcedure}
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
                  onClick={() => onRemoveProcedure(procedure.id)}
                  className="rounded-xl p-2 text-[#60758A] transition hover:bg-white hover:text-[#B91C1C]"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_120px_140px_160px]">
                <FormInput
                  label="Procedimento"
                  placeholder="Ex: Restauração"
                  value={procedure.name}
                  onChange={(value) =>
                    onUpdateProcedure(procedure.id, "name", value)
                  }
                />

                <FormInput
                  label="Dente"
                  placeholder="16"
                  value={procedure.tooth}
                  onChange={(value) =>
                    onUpdateProcedure(procedure.id, "tooth", value)
                  }
                />

                <FormInput
                  label="Valor"
                  placeholder="120,00"
                  value={procedure.price}
                  onChange={(value) =>
                    onUpdateProcedure(procedure.id, "price", value)
                  }
                />

                <FormSelect
                  label="Status"
                  value={procedure.status}
                  onChange={(value) =>
                    onUpdateProcedure(procedure.id, "status", value)
                  }
                >
                  <option>Planejado</option>
                  <option>Aprovado</option>
                  <option>Em andamento</option>
                  <option>Concluído</option>
                  <option>Cancelado</option>
                </FormSelect>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 border-t border-[#EEF7FB] pt-7 lg:grid-cols-[1fr_280px]">
        <FormTextarea
          label="Observações do plano"
          placeholder="Ex: plano dividido em etapas, prioridade para restauração..."
          rows={5}
        />

        <div className="rounded-3xl border border-[#D8EDF8] bg-[#F8FBFD] p-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#60758A]">
            Valor total do plano
          </p>

          <p className="mt-4 text-3xl font-light text-[#12384D]">
            €{total.toFixed(2).replace(".", ",")}
          </p>

          <p className="mt-2 text-sm text-[#60758A]">
            Calculado pelos procedimentos adicionados.
          </p>
        </div>
      </section>
    </BaseModal>
  );
}

function BaseModal({
  eyebrow,
  title,
  description,
  children,
  onClose,
  maxWidth,
  submitLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  onClose: () => void;
  maxWidth: string;
  submitLabel: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#12384D]/30 px-4 backdrop-blur-sm">
      <div
        className={`max-h-[90vh] w-full overflow-y-auto rounded-3xl border border-[#D8EDF8] bg-white shadow-xl ${maxWidth}`}
      >
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
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#12384D]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
      />
    </div>
  );
}

function FormSelect({
  label,
  children,
  value,
  onChange,
}: {
  label: string;
  children: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#12384D]">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
      >
        {children}
      </select>
    </div>
  );
}

function FormTextarea({
  label,
  placeholder,
  rows = 3,
}: {
  label: string;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#12384D]">
        {label}
      </label>

      <textarea
        rows={rows}
        placeholder={placeholder}
        className="w-full resize-none rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
      />
    </div>
  );
}