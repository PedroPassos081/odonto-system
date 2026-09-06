"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type ActionState = { error: string } | null;

function getValue(formData: FormData, key: string) {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
}

export async function createAppointment(
    _prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const patientId = getValue(formData, "patient_id");
    const date = getValue(formData, "date");
    const startTime = getValue(formData, "start_time");
    const endTime = getValue(formData, "end_time");
    const type = getValue(formData, "type");
    const professional = getValue(formData, "professional");
    const status = getValue(formData, "status") || "Agendada";
    const notes = getValue(formData, "notes");

    if (!patientId || !date || !startTime || !type) {
        return { error: "Preencha paciente, data, horário de início e tipo de consulta." };
    }

    const supabase = await createClient();

    const { error } = await supabase.from("appointments").insert({
        patient_id: patientId,
        date,
        start_time: startTime,
        end_time: endTime || null,
        type,
        professional: professional || null,
        status,
        notes: notes || null,
    });

    if (error) {
        return { error: `Erro ao agendar consulta: ${error.message}` };
    }

    revalidatePath("/agenda");
    revalidatePath("/dashboard");
    return null;
}
