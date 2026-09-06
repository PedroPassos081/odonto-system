"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
        return { error: "Informe e-mail e palavra-passe." };
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: "E-mail ou palavra-passe inválidos." };
    }

    redirect("/dashboard");
}
