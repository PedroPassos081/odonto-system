import { AppShell } from "@/components/layout/AppShell";
import { PatientForm } from "@/components/patients/PatientForm";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updatePatient } from "../../actions";

type EditPatientPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPatientPage({
  params,
}: EditPatientPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: patient, error } = await supabase
    .from("patients")
    .select(
      "id, full_name, birth_date, nif, phone, email, address, medical_history, allergies, medications, notes, status"
    )
    .eq("id", id)
    .single();

  if (error || !patient) {
    notFound();
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#60758A]">
            Pacientes
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-[-0.03em] text-[#12384D]">
            Editar paciente
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#60758A]">
            Atualize os dados de {patient.full_name}.
          </p>
        </div>

        <Link
          href={`/pacientes/${id}`}
          className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D8EDF8] bg-white px-6 py-4 text-sm font-medium text-[#12384D] shadow-sm transition hover:bg-[#F8FBFD]"
        >
          <ArrowLeft size={18} />
          Voltar
        </Link>
      </div>

      <PatientForm
        action={updatePatient.bind(null, id)}
        defaultValues={patient}
        submitLabel="Guardar alterações"
        cancelHref={`/pacientes/${id}`}
      />
    </AppShell>
  );
}
