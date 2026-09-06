import { beforeEach, describe, expect, it, vi } from "vitest";

const revalidatePath = vi.fn();
vi.mock("next/cache", () => ({ revalidatePath }));

const single = vi.fn();
const select = vi.fn(() => ({ single }));
const insertPlan = vi.fn(() => ({ select }));
const insertProcedures = vi.fn();
const createClient = vi.fn();

vi.mock("@/lib/supabase/server", () => ({ createClient }));

function buildFormData(fields: Record<string, string | string[]>) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(fields)) {
        if (Array.isArray(value)) {
            value.forEach((v) => formData.append(key, v));
        } else {
            formData.set(key, value);
        }
    }
    return formData;
}

beforeEach(() => {
    vi.clearAllMocks();
    single.mockReturnValue(Promise.resolve({ data: { id: "plan-1" }, error: null }));
    insertProcedures.mockReturnValue(Promise.resolve({ error: null }));

    createClient.mockResolvedValue({
        from: vi.fn((table: string) =>
            table === "treatment_plans"
                ? { insert: insertPlan }
                : { insert: insertProcedures }
        ),
    });
});

describe("createTreatmentPlan", () => {
    it("rejects when patient or title is missing", async () => {
        const { createTreatmentPlan } = await import("./actions");

        const result = await createTreatmentPlan(
            null,
            buildFormData({ patient_id: "", title: "" })
        );

        expect(result?.error).toMatch(/Selecione o paciente/);
        expect(insertPlan).not.toHaveBeenCalled();
    });

    it("rejects when no procedure has a name", async () => {
        const { createTreatmentPlan } = await import("./actions");

        const result = await createTreatmentPlan(
            null,
            buildFormData({
                patient_id: "patient-1",
                title: "Plano restaurador",
                procedure_name: [""],
                procedure_price: [""],
            })
        );

        expect(result?.error).toMatch(/pelo menos um procedimento/);
    });

    it("creates the plan and its procedures on success", async () => {
        const { createTreatmentPlan } = await import("./actions");

        const result = await createTreatmentPlan(
            null,
            buildFormData({
                patient_id: "patient-1",
                title: "Plano restaurador",
                status: "Em andamento",
                procedure_name: ["Restauração", "Limpeza"],
                procedure_tooth: ["16", ""],
                procedure_price: ["180,00", "60"],
                procedure_status: ["Planejado", "Concluído"],
            })
        );

        expect(result).toBeNull();
        expect(insertPlan).toHaveBeenCalledWith(
            expect.objectContaining({
                patient_id: "patient-1",
                title: "Plano restaurador",
                status: "Em andamento",
            })
        );
        expect(insertProcedures).toHaveBeenCalledWith([
            expect.objectContaining({
                treatment_plan_id: "plan-1",
                name: "Restauração",
                tooth: "16",
                price: 180,
                status: "Planejado",
            }),
            expect.objectContaining({
                treatment_plan_id: "plan-1",
                name: "Limpeza",
                tooth: null,
                price: 60,
                status: "Concluído",
            }),
        ]);
        expect(revalidatePath).toHaveBeenCalledWith("/tratamentos");
    });

    it("surfaces an error when creating the plan fails", async () => {
        single.mockReturnValue(
            Promise.resolve({ data: null, error: { message: "db error" } })
        );

        const { createTreatmentPlan } = await import("./actions");

        const result = await createTreatmentPlan(
            null,
            buildFormData({
                patient_id: "patient-1",
                title: "Plano restaurador",
                procedure_name: ["Restauração"],
                procedure_price: ["100"],
            })
        );

        expect(result?.error).toBe("Erro ao criar plano: db error");
        expect(insertProcedures).not.toHaveBeenCalled();
    });
});
