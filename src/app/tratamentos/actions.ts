"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type ActionState = { error: string } | null;

function getValue(formData: FormData, key: string) {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
}

function getValues(formData: FormData, key: string) {
    return formData
        .getAll(key)
        .map((value) => (typeof value === "string" ? value.trim() : ""));
}

export async function createTreatmentPlan(
    _prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const patientId = getValue(formData, "patient_id");
    const title = getValue(formData, "title");
    const status = getValue(formData, "status") || "Planejado";
    const notes = getValue(formData, "notes");

    if (!patientId || !title) {
        return { error: "Selecione o paciente e informe o nome do plano." };
    }

    const names = getValues(formData, "procedure_name");
    const teeth = getValues(formData, "procedure_tooth");
    const prices = getValues(formData, "procedure_price");
    const statuses = getValues(formData, "procedure_status");

    const procedures = names
        .map((name, index) => ({
            name,
            tooth: teeth[index] || null,
            price: Number(prices[index]?.replace(",", ".")) || 0,
            status: statuses[index] || "Planejado",
        }))
        .filter((procedure) => procedure.name);

    if (procedures.length === 0) {
        return { error: "Adicione pelo menos um procedimento com nome." };
    }

    const supabase = await createClient();

    const { data: plan, error: planError } = await supabase
        .from("treatment_plans")
        .insert({
            patient_id: patientId,
            title,
            status,
            notes: notes || null,
        })
        .select("id")
        .single();

    if (planError || !plan) {
        return {
            error: `Erro ao criar plano: ${planError?.message ?? "erro desconhecido"}`,
        };
    }

    const { error: proceduresError } = await supabase
        .from("treatment_procedures")
        .insert(
            procedures.map((procedure) => ({
                treatment_plan_id: plan.id,
                ...procedure,
            }))
        );

    if (proceduresError) {
        return {
            error: `Erro ao guardar procedimentos: ${proceduresError.message}`,
        };
    }

    revalidatePath("/tratamentos");
    revalidatePath("/dashboard");
    return null;
}
