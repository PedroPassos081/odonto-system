import { beforeEach, describe, expect, it, vi } from "vitest";

const revalidatePath = vi.fn();
vi.mock("next/cache", () => ({ revalidatePath }));

const insert = vi.fn();
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
    insert.mockReturnValue(Promise.resolve({ error: null }));
    createClient.mockResolvedValue({
        from: vi.fn(() => ({ insert })),
    });
});

describe("createAppointment", () => {
    it("rejects when required fields are missing", async () => {
        const { createAppointment } = await import("./actions");

        const result = await createAppointment(
            null,
            buildFormData({ patient_id: "patient-1" })
        );

        expect(result?.error).toMatch(/Preencha paciente, data/);
        expect(insert).not.toHaveBeenCalled();
    });

    it("inserts the appointment and revalidates on success", async () => {
        const { createAppointment } = await import("./actions");

        const result = await createAppointment(
            null,
            buildFormData({
                patient_id: "patient-1",
                date: "2026-05-22",
                start_time: "09:00",
                type: "Consulta de avaliação",
            })
        );

        expect(result).toBeNull();
        expect(insert).toHaveBeenCalledWith(
            expect.objectContaining({
                patient_id: "patient-1",
                date: "2026-05-22",
                start_time: "09:00",
                type: "Consulta de avaliação",
                status: "Agendada",
            })
        );
        expect(revalidatePath).toHaveBeenCalledWith("/agenda");
    });

    it("returns the Supabase error message on failure", async () => {
        insert.mockReturnValue(
            Promise.resolve({ error: { message: "connection refused" } })
        );

        const { createAppointment } = await import("./actions");

        const result = await createAppointment(
            null,
            buildFormData({
                patient_id: "patient-1",
                date: "2026-05-22",
                start_time: "09:00",
                type: "Limpeza",
            })
        );

        expect(result?.error).toBe(
            "Erro ao agendar consulta: connection refused"
        );
    });
});
