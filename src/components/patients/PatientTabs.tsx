"use client";

import { useState } from "react";
import {
  Calendar,
  CreditCard,
  FileText,
  Stethoscope,
  User,
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

export function PatientTabs({ patient, appointments }: PatientTabsProps) {
  const [activeTab, setActiveTab] = useState("dados");

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
                      2
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F8FBFD] p-4">
                    <p className="text-xs text-[#60758A]">
                      Tratamentos em andamento
                    </p>
                    <p className="mt-1 text-2xl font-light text-[#12384D]">
                      1
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
          <InfoCard title="Prontuário odontológico">
            <div className="rounded-2xl border border-dashed border-[#B5E0FB] bg-[#F8FBFD] p-8 text-center">
              <p className="text-sm font-semibold text-[#12384D]">
                Nenhum registo de prontuário criado nesta versão visual.
              </p>
              <p className="mt-2 text-sm text-[#60758A]">
                Aqui ficarão queixa principal, diagnóstico, procedimentos
                realizados e evolução do tratamento.
              </p>
            </div>
          </InfoCard>
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
    </>
  );
}