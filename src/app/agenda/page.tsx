import { AgendaView } from "@/components/agenda/AgendaView";
import { createClient } from "@/lib/supabase/server";

export default async function AgendaPage() {
  const supabase = await createClient();

  const [{ data: appointments, error: appointmentsError }, { data: patients, error: patientsError }] =
    await Promise.all([
      supabase
        .from("appointments")
        .select(
          "id, date, start_time, end_time, type, status, professional, notes, patients(id, full_name)"
        )
        .order("date", { ascending: true })
        .order("start_time", { ascending: true }),
      supabase.from("patients").select("id, full_name").order("full_name"),
    ]);

  if (appointmentsError) {
    console.error("Error fetching appointments:", appointmentsError);
  }

  if (patientsError) {
    console.error("Error fetching patients:", patientsError);
  }

  return (
    <AgendaView
      appointments={appointments ?? []}
      patients={patients ?? []}
    />
  );
}
