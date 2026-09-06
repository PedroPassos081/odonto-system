import { FinanceView } from "@/components/finance/FinanceView";
import { createClient } from "@/lib/supabase/server";

export default async function FinancePage() {
  const supabase = await createClient();

  const [
    { data: payments, error: paymentsError },
    { data: expenses, error: expensesError },
    { data: patients, error: patientsError },
    { data: treatmentPlans, error: treatmentPlansError },
  ] = await Promise.all([
    supabase
      .from("payments")
      .select(
        "id, total_value, paid_value, method, status, date, notes, patients(id, full_name), treatment_plans(id, title)"
      )
      .order("date", { ascending: false }),
    supabase.from("expenses").select("*").order("due_date", { ascending: true }),
    supabase.from("patients").select("id, full_name").order("full_name"),
    supabase
      .from("treatment_plans")
      .select("id, title, patients(id, full_name)")
      .order("title"),
  ]);

  if (paymentsError) {
    console.error("Error fetching payments:", paymentsError);
  }

  if (expensesError) {
    console.error("Error fetching expenses:", expensesError);
  }

  if (patientsError) {
    console.error("Error fetching patients:", patientsError);
  }

  if (treatmentPlansError) {
    console.error("Error fetching treatment plans:", treatmentPlansError);
  }

  return (
    <FinanceView
      payments={payments ?? []}
      expenses={expenses ?? []}
      patients={patients ?? []}
      treatmentPlans={treatmentPlans ?? []}
    />
  );
}
