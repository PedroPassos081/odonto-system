import { beforeEach, describe, expect, it, vi } from "vitest";

const revalidatePath = vi.fn();
const redirect = vi.fn((path: string) => {
    throw new Error(`REDIRECT:${path}`);
});

vi.mock("next/cache", () => ({ revalidatePath }));
vi.mock("next/navigation", () => ({ redirect }));

const insert = vi.fn();
const deleteFn = vi.fn();
const eq = vi.fn();
const createClient = vi.fn();

vi.mock("@/lib/supabase/server", () => ({ createClient }));

function buildFormData(fields: Record<string, string>) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(fields)) {
        formData.set(key, value);
    }
    return formData;
}

beforeEach(() => {
    vi.clearAllMocks();
    eq.mockReturnValue(Promise.resolve({ error: null }));
    deleteFn.mockReturnValue({ eq });
    insert.mockReturnValue(Promise.resolve({ error: null }));
    createClient.mockResolvedValue({
        from: vi.fn(() => ({ insert, delete: deleteFn })),
    });
});

describe("createPatient", () => {
    it("rejects when the patient's name is missing", async () => {
        const { createPatient } = await import("./actions");
        const formData = buildFormData({ full_name: "   " });

        await expect(createPatient(formData)).rejects.toThrow(
            "O nome do paciente é obrigatório."
        );
        expect(insert).not.toHaveBeenCalled();
    });

    it("inserts the patient and redirects to the list on success", async () => {
        const { createPatient } = await import("./actions");
        const formData = buildFormData({
            full_name: "Maria Fernandes",
            status: "Ativo",
        });

        await expect(createPatient(formData)).rejects.toThrow(
            "REDIRECT:/pacientes"
        );

        expect(insert).toHaveBeenCalledWith(
            expect.objectContaining({ full_name: "Maria Fernandes", status: "Ativo" })
        );
        expect(revalidatePath).toHaveBeenCalledWith("/pacientes");
    });

    it("surfaces the Supabase error message on failure", async () => {
        insert.mockReturnValue(
            Promise.resolve({ error: { message: "connection refused" } })
        );

        const { createPatient } = await import("./actions");
        const formData = buildFormData({ full_name: "Maria Fernandes" });

        await expect(createPatient(formData)).rejects.toThrow(
            "Erro ao cadastrar paciente: connection refused"
        );
    });
});

describe("deletePatient", () => {
    it("deletes the patient and redirects to the list on success", async () => {
        const { deletePatient } = await import("./actions");

        await expect(deletePatient("patient-1")).rejects.toThrow(
            "REDIRECT:/pacientes"
        );

        expect(eq).toHaveBeenCalledWith("id", "patient-1");
        expect(revalidatePath).toHaveBeenCalledWith("/pacientes");
    });

    it("surfaces the Supabase error message on failure", async () => {
        eq.mockReturnValue(
            Promise.resolve({ error: { message: "row not found" } })
        );

        const { deletePatient } = await import("./actions");

        await expect(deletePatient("missing-id")).rejects.toThrow(
            "Erro ao excluir paciente: row not found"
        );
    });
});
