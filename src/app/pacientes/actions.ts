"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function getFormValue(formData: FormData, key: string) {
    const value = formData.get(key);

    if (typeof value !== "string") {
        return "";
    }

    return value.trim();
}

function getPatientFieldsFromForm(formData: FormData) {
    return {
        full_name: getFormValue(formData, "full_name"),
        birth_date: getFormValue(formData, "birth_date") || null,
        nif: getFormValue(formData, "nif") || null,
        phone: getFormValue(formData, "phone") || null,
        email: getFormValue(formData, "email") || null,
        address: getFormValue(formData, "address") || null,
        medical_history: getFormValue(formData, "medical_history") || null,
        allergies: getFormValue(formData, "allergies") || null,
        medications: getFormValue(formData, "medications") || null,
        notes: getFormValue(formData, "notes") || null,
        status: getFormValue(formData, "status") || "Ativo",
    };
}

export async function createPatient(formData: FormData) {
    const fields = getPatientFieldsFromForm(formData);

    if (!fields.full_name) {
        throw new Error("O nome do paciente é obrigatório.");
    }

    const supabase = await createClient();

    const { error } = await supabase.from("patients").insert(fields);

    if (error) {
        throw new Error(`Erro ao cadastrar paciente: ${error.message}`);
    }

    revalidatePath("/pacientes");
    redirect("/pacientes");
}

export async function updatePatient(id: string, formData: FormData) {
    const fields = getPatientFieldsFromForm(formData);

    if (!fields.full_name) {
        throw new Error("O nome do paciente é obrigatório.");
    }

    const supabase = await createClient();

    const { error } = await supabase
        .from("patients")
        .update(fields)
        .eq("id", id);

    if (error) {
        throw new Error(`Erro ao atualizar paciente: ${error.message}`);
    }

    revalidatePath("/pacientes");
    revalidatePath(`/pacientes/${id}`);
    redirect(`/pacientes/${id}`);
}

export async function deletePatient(id: string) {
    const supabase = await createClient();

    const { error } = await supabase.from("patients").delete().eq("id", id);

    if (error) {
        throw new Error(`Erro ao excluir paciente: ${error.message}`);
    }

    revalidatePath("/pacientes");
    redirect("/pacientes");
}