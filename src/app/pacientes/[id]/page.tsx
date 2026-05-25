import { AppShell } from "@/components/layout/AppShell";
import { ToothIcon } from "@/components/ui/ToothIcon";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CreditCard,
  FileText,
  Phone,
  ShieldAlert,
  Stethoscope,
  User,
} from "lucide-react";
import Link from "next/link";

const patient = {
  id: "001",
  name: "Maria Fernandes",
  age: "42 anos",
  phone: "+351 912 345 678",
  email: "maria.fernandes@email.com",
  nif: "123456789",
  address: "Rua das Flores, Porto",
  birthDate: "14/03/1984",
  lastAppointment: "20/05/2026",
  status: "Em tratamento",
  allergies: "Alergia a penicilina",
  medications: "Medicação para hipertensão",
  medicalHistory: "Hipertensão controlada. Sem histórico cirúrgico relevante.",
  notes: "Paciente prefere consultas no período da manhã.",
};

const tabs = [
  {
    label: "Dados pessoais",
    active: true,
    icon: User,
  },
  {
    label: "Consultas",
    active: false,
    icon: Calendar,
  },
  {
    label: "Prontuário",
    active: false,
    icon: FileText,
  },
  {
    label: "Odontograma",
    active: false,
    icon: ToothIcon,
  },
  {
    label: "Plano de tratamento",
    active: false,
    icon: Stethoscope,
  },
  {
    label: "Financeiro",
    active: false,
    icon: CreditCard,
  },
];

const appointments = [
  {
    date: "20/05/2026",
    time: "10:30",
    type: "Consulta de avaliação",
    status: "Realizada",
  },
  {
    date: "28/05/2026",
    time: "09:00",
    type: "Restauração",
    status: "Agendada",
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

export default function PatientDetailsPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <Link
            href="/pacientes"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#2E91BD] transition hover:text-[#12384D]"
          >
            <ArrowLeft size={17} />
            Voltar para pacientes
          </Link>

          <p className="mt-8 text-xs uppercase tracking-[0.35em] text-[#60758A]">
            Ficha do paciente
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-[-0.03em] text-[#12384D]">
            {patient.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#B5E0FB] bg-[#E8F5FB] px-4 py-1.5 text-xs font-medium text-[#2E91BD]">
              Paciente #{patient.id}
            </span>

            <span className="rounded-full border border-[#B5E0FB] bg-[#E8F5FB] px-4 py-1.5 text-xs font-medium text-[#2E91BD]">
              {patient.status}
            </span>

            <span className="inline-flex items-center gap-2 text-sm text-[#60758A]">
              <Phone size={16} />
              {patient.phone}
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-[#D8EDF8] bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#60758A]">
            Última consulta
          </p>
          <p className="mt-2 text-lg font-semibold text-[#12384D]">
            {patient.lastAppointment}
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="flex items-start gap-4 rounded-3xl border border-[#FBD38D] bg-[#FFFDF7] p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF3CD] text-[#B7791F]">
            <ShieldAlert size={21} />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#12384D]">
              Alerta clínico
            </p>
            <p className="mt-1 text-sm text-[#60758A]">{patient.allergies}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-3xl border border-[#D8EDF8] bg-white p-5 shadow-sm">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F5FB] text-[#2E91BD]">
            <AlertCircle size={21} />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#12384D]">
              Observação importante
            </p>
            <p className="mt-1 text-sm text-[#60758A]">{patient.notes}</p>
          </div>
        </div>
      </div>

      <div className="mt-9 overflow-x-auto rounded-3xl border border-[#D8EDF8] bg-white p-3 shadow-sm">
        <div className="flex min-w-max gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.label}
                className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition ${
                  tab.active
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

      <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_380px]">
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
              <Field label="Histórico médico" value={patient.medicalHistory} />
              <Field label="Alergias" value={patient.allergies} />
              <Field label="Medicamentos em uso" value={patient.medications} />
              <Field label="Observações" value={patient.notes} />
            </div>
          </InfoCard>
        </div>

        <aside className="space-y-8">
          <InfoCard title="Resumo">
            <div className="space-y-4">
              <div className="rounded-2xl bg-[#F8FBFD] p-4">
                <p className="text-xs text-[#60758A]">Consultas registadas</p>
                <p className="mt-1 text-2xl font-light text-[#12384D]">2</p>
              </div>

              <div className="rounded-2xl bg-[#F8FBFD] p-4">
                <p className="text-xs text-[#60758A]">
                  Tratamentos em andamento
                </p>
                <p className="mt-1 text-2xl font-light text-[#12384D]">1</p>
              </div>

              <div className="rounded-2xl bg-[#F8FBFD] p-4">
                <p className="text-xs text-[#60758A]">Valor em aberto</p>
                <p className="mt-1 text-2xl font-light text-[#12384D]">
                  €120,00
                </p>
              </div>
            </div>
          </InfoCard>

          <InfoCard title="Próximas consultas">
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={`${appointment.date}-${appointment.time}`}
                  className="rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-[#12384D]">
                      {appointment.type}
                    </p>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#2E91BD]">
                      {appointment.status}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-[#60758A]">
                    {appointment.date} às {appointment.time}
                  </p>
                </div>
              ))}
            </div>
          </InfoCard>
        </aside>
      </div>
    </AppShell>
  );
}