"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

function getFormValue(formData: FormData, key: string) {
    const value = formData.get(key);

    if (typeof value !== "string") {
        return "";
    }

    return value.trim();
}

export async function createPatient(formData: FormData) {
    const fullName = getFormValue(formData, "full_name");
    const birthDate = getFormValue(formData, "birth_date");
    const nif = getFormValue(formData, "nif");
    const phone = getFormValue(formData, "phone");
    const email = getFormValue(formData, "email");
    const address = getFormValue(formData, "address");
    const medicalHistory = getFormValue(formData, "medical_history");
    const allergies = getFormValue(formData, "allergies");
    const medications = getFormValue(formData, "medications");
    const notes = getFormValue(formData, "notes");
    const status = getFormValue(formData, "status") || "Ativo";

    if (!fullName) {
        throw new Error("O nome do paciente é obrigatório.");
    }

    const { error } = await supabase.from("patients").insert({
        full_name: fullName,
        birth_date: birthDate || null,
        nif: nif || null,
        phone: phone || null,
        email: email || null,
        address: address || null,
        medical_history: medicalHistory || null,
        allergies: allergies || null,
        medications: medications || null,
        notes: notes || null,
        status,
    });

    if (error) {
        throw new Error(`Erro ao cadastrar paciente: ${error.message}`);
    }

    revalidatePath("/pacientes");
    redirect("/pacientes");
}