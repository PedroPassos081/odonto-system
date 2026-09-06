import { TreatmentsView } from "@/components/treatments/TreatmentsView";
import { createClient } from "@/lib/supabase/server";

export default async function TreatmentsPage() {
  const supabase = await createClient();

  const [
    { data: plans, error: plansError },
    { data: patients, error: patientsError },
    { data: payments, error: paymentsError },
  ] = await Promise.all([
    supabase
      .from("treatment_plans")
      .select(
        "id, title, status, notes, created_at, patients(id, full_name), treatment_procedures(id, name, tooth, price, status)"
      )
      .order("created_at", { ascending: false }),
    supabase.from("patients").select("id, full_name").order("full_name"),
    supabase
      .from("payments")
      .select("treatment_plan_id, paid_value")
      .not("treatment_plan_id", "is", null),
  ]);

  if (plansError) {
    console.error("Error fetching treatment plans:", plansError);
  }

  if (patientsError) {
    console.error("Error fetching patients:", patientsError);
  }

  if (paymentsError) {
    console.error("Error fetching payments:", paymentsError);
  }

  return (
    <TreatmentsView
      plans={plans ?? []}
      patients={patients ?? []}
      payments={payments ?? []}
    />
  );
}
