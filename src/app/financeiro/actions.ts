"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type ActionState = { error: string } | null;

function getValue(formData: FormData, key: string) {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
}

function parseAmount(value: string) {
    const parsed = Number(value.replace(",", "."));
    return Number.isNaN(parsed) ? 0 : parsed;
}

export async function createPayment(
    _prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const patientId = getValue(formData, "patient_id");
    const treatmentPlanId = getValue(formData, "treatment_plan_id");
    const totalValue = getValue(formData, "total_value");
    const paidValue = getValue(formData, "paid_value");
    const date = getValue(formData, "date");
    const method = getValue(formData, "method");
    const status = getValue(formData, "status") || "Pendente";
    const notes = getValue(formData, "notes");

    if (!patientId || !date || !totalValue) {
        return { error: "Selecione o paciente, informe o valor total e a data." };
    }

    const supabase = await createClient();

    const { error } = await supabase.from("payments").insert({
        patient_id: patientId,
        treatment_plan_id: treatmentPlanId || null,
        total_value: parseAmount(totalValue),
        paid_value: parseAmount(paidValue),
        method: method || null,
        status,
        date,
        notes: notes || null,
    });

    if (error) {
        return { error: `Erro ao registar pagamento: ${error.message}` };
    }

    revalidatePath("/financeiro");
    revalidatePath("/tratamentos");
    revalidatePath("/dashboard");
    return null;
}

export async function createExpense(
    _prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const description = getValue(formData, "description");
    const supplier = getValue(formData, "supplier");
    const category = getValue(formData, "category");
    const amount = getValue(formData, "amount");
    const dueDate = getValue(formData, "due_date");
    const paidAt = getValue(formData, "paid_at");
    const method = getValue(formData, "method");
    const status = getValue(formData, "status") || "Pendente";

    if (!description || !amount || !dueDate) {
        return { error: "Informe a descrição, o valor e a data de vencimento." };
    }

    const supabase = await createClient();

    const { error } = await supabase.from("expenses").insert({
        description,
        supplier: supplier || null,
        category: category || null,
        amount: parseAmount(amount),
        due_date: dueDate,
        paid_at: paidAt || null,
        method: method || null,
        status,
    });

    if (error) {
        return { error: `Erro ao registar despesa: ${error.message}` };
    }

    revalidatePath("/financeiro");
    return null;
}
