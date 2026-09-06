import { AppShell } from "@/components/layout/AppShell";
import { PatientTabs } from "@/components/patients/PatientTabs";
import { createClient } from "@/lib/supabase/server";
import {
  AlertCircle,
  ArrowLeft,
  Phone,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type SupabasePatient = {
  id: string;
  full_name: string;
  birth_date: string | null;
  nif: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  medical_history: string | null;
  allergies: string | null;
  medications: string | null;
  notes: string | null;
  status: string;
  created_at: string;
};

type PatientDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
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

function formatDate(date: string | null) {
  if (!date) {
    return "Não informado";
  }

  const [year, month, day] = date.split("-");

  if (!year || !month || !day) {
    return "Não informado";
  }

  return `${day}/${month}/${year}`;
}

function calculateAge(birthDate: string | null) {
  if (!birthDate) {
    return "Idade não informada";
  }

  const birth = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();

  const hasBirthdayPassedThisYear =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() >= birth.getDate());

  if (!hasBirthdayPassedThisYear) {
    age -= 1;
  }

  if (Number.isNaN(age)) {
    return "Idade não informada";
  }

  return `${age} anos`;
}

export default async function PatientDetailsPage({
  params,
}: PatientDetailsPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("patients")
    .select(
      "id, full_name, birth_date, nif, phone, email, address, medical_history, allergies, medications, notes, status, created_at"
    )
    .eq("id", id)
    .single<SupabasePatient>();

  if (error || !data) {
    notFound();
  }

  const patient = {
    id: data.id,
    name: data.full_name,
    age: calculateAge(data.birth_date),
    phone: data.phone || "Não informado",
    email: data.email || "Não informado",
    nif: data.nif || "Não informado",
    address: data.address || "Não informado",
    birthDate: formatDate(data.birth_date),
    lastAppointment: "Sem consulta registada",
    status: data.status,
    allergies: data.allergies || "Sem alergias cadastradas",
    medications: data.medications || "Nenhum medicamento cadastrado",
    medicalHistory:
      data.medical_history || "Sem histórico médico cadastrado",
    notes: data.notes || "Sem observações cadastradas",
  };

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
              NIF: {patient.nif}
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

            <p className="mt-1 text-sm text-[#60758A]">
              {patient.allergies}
            </p>
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