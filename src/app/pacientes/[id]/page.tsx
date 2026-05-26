import { AppShell } from "@/components/layout/AppShell";
import { PatientTabs } from "@/components/patients/PatientTabs";
import {
  AlertCircle,
  ArrowLeft,
  Phone,
  ShieldAlert,
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

     <PatientTabs patient={patient} appointments={appointments} />
    </AppShell>
  );
}