"use client";

import { useState } from "react";
import {
  Calendar,
  CreditCard,
  FileText,
  Plus,
  Stethoscope,
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

export function PatientTabs({ patient, appointments }: PatientTabsProps) {
  const [activeTab, setActiveTab] = useState("dados");
  const [isNewRecordModalOpen, setIsNewRecordModalOpen] = useState(false);

  const patientMedicalRecords = medicalRecords.filter(
    (record) => record.patientId === patient.id
  );

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
                  <div className="rounded-2xl bg-[#F8FBFD] p-4">
                    <p className="text-xs text-[#60758A]">
                      Consultas registadas
                    </p>
                    <p className="mt-1 text-2xl font-light text-[#12384D]">
                      {appointments.length}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F8FBFD] p-4">
                    <p className="text-xs text-[#60758A]">
                      Registros no prontuário
                    </p>
                    <p className="mt-1 text-2xl font-light text-[#12384D]">
                      {patientMedicalRecords.length}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F8FBFD] p-4">
                    <p className="text-xs text-[#60758A]">Valor em aberto</p>
                    <p className="mt-1 text-2xl font-light text-[#12384D]">
                      €120,00
                    </p>
                  </div>
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
              <div className="flex flex-col gap-5 border-b border-[#EEF7FB] pb-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[#12384D]">
                    Prontuário odontológico
                  </h2>

                  <p className="mt-1 text-sm text-[#60758A]">
                    Histórico clínico, evolução e procedimentos realizados.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsNewRecordModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#399DCA] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2E91BD]"
                >
                  <Plus size={17} />
                  Novo registro
                </button>
              </div>

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
                  <div className="rounded-2xl bg-[#F8FBFD] p-4">
                    <p className="text-xs text-[#60758A]">
                      Registros no prontuário
                    </p>
                    <p className="mt-1 text-2xl font-light text-[#12384D]">
                      {patientMedicalRecords.length}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F8FBFD] p-4">
                    <p className="text-xs text-[#60758A]">
                      Último atendimento
                    </p>
                    <p className="mt-1 text-lg font-semibold text-[#12384D]">
                      {patientMedicalRecords[0]?.date || "Sem registros"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#FFF7E6] p-4">
                    <p className="text-xs text-[#B7791F]">Atenção clínica</p>
                    <p className="mt-1 text-sm font-medium text-[#12384D]">
                      {patient.allergies || "Sem alertas cadastrados"}
                    </p>
                  </div>
                </div>
              </InfoCard>

              <InfoCard title="Próximas ações">
                <div className="space-y-3">
                  <div className="rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] p-4">
                    <p className="text-sm font-semibold text-[#12384D]">
                      Acompanhar sensibilidade
                    </p>
                    <p className="mt-1 text-xs text-[#60758A]">
                      Verificar evolução no próximo retorno.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] p-4">
                    <p className="text-sm font-semibold text-[#12384D]">
                      Avaliar restauração
                    </p>
                    <p className="mt-1 text-xs text-[#60758A]">
                      Dente 16 com possível necessidade de intervenção.
                    </p>
                  </div>
                </div>
              </InfoCard>
            </aside>
          </div>
        )}

        {activeTab === "odontograma" && <PatientOdontogram />}

        {activeTab === "tratamento" && (
          <InfoCard title="Plano de tratamento">
            <div className="rounded-2xl border border-dashed border-[#B5E0FB] bg-[#F8FBFD] p-8 text-center">
              <p className="text-sm font-semibold text-[#12384D]">
                Área de plano de tratamento.
              </p>
              <p className="mt-2 text-sm text-[#60758A]">
                Aqui ficarão os procedimentos planejados, valores e status do
                tratamento.
              </p>
            </div>
          </InfoCard>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#12384D]/30 px-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#D8EDF8] bg-white shadow-xl">
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#EEF7FB] bg-white px-8 py-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#60758A]">
                  Prontuário
                </p>

                <h2 className="mt-2 text-2xl font-light tracking-[-0.03em] text-[#12384D]">
                  Novo registro clínico
                </h2>

                <p className="mt-2 text-sm text-[#60758A]">
                  Adicione uma nova evolução ao prontuário do paciente.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsNewRecordModalOpen(false)}
                className="rounded-xl p-2 text-[#60758A] transition hover:bg-[#F8FBFD] hover:text-[#12384D]"
              >
                <X size={22} />
              </button>
            </div>

            <form className="space-y-7 px-8 py-7">
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

              <div className="sticky bottom-0 flex items-center justify-end gap-4 border-t border-[#EEF7FB] bg-white py-5">
                <button
                  type="button"
                  onClick={() => setIsNewRecordModalOpen(false)}
                  className="rounded-2xl border border-[#D8EDF8] bg-white px-6 py-3.5 text-sm font-medium text-[#12384D] transition hover:bg-[#F8FBFD]"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-2xl bg-[#399DCA] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2E91BD]"
                >
                  Guardar registro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
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