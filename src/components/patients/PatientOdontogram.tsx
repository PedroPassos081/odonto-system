"use client";

import Image from "next/image";
import { useState } from "react";

type ToothRecord = {
  condition: string;
  plannedProcedure: string;
  completedProcedure: string;
  notes: string;
  status: string;
};

const toothPositions = [
  // Arcada superior
  { tooth: 18, x: "6.5%", y: "37%" },
  { tooth: 17, x: "12.5%", y: "37%" },
  { tooth: 16, x: "18.5%", y: "37%" },
  { tooth: 15, x: "24.5%", y: "37%" },
  { tooth: 14, x: "30.4%", y: "37%" },
  { tooth: 13, x: "36.4%", y: "37%" },
  { tooth: 12, x: "42.4%", y: "37%" },
  { tooth: 11, x: "48.3%", y: "37%" },

  { tooth: 21, x: "54.4%", y: "37%" },
  { tooth: 22, x: "60.3%", y: "37%" },
  { tooth: 23, x: "66.3%", y: "37%" },
  { tooth: 24, x: "72.3%", y: "37%" },
  { tooth: 25, x: "78.3%", y: "37%" },
  { tooth: 26, x: "84.3%", y: "37%" },
  { tooth: 27, x: "90.3%", y: "37%" },
  { tooth: 28, x: "96.2%", y: "37%" },

  // Arcada inferior
  { tooth: 48, x: "6.5%", y: "63%" },
  { tooth: 47, x: "12.5%", y: "63%" },
  { tooth: 46, x: "18.5%", y: "63%" },
  { tooth: 45, x: "24.5%", y: "63%" },
  { tooth: 44, x: "30.4%", y: "63%" },
  { tooth: 43, x: "36.4%", y: "63%" },
  { tooth: 42, x: "42.4%", y: "63%" },
  { tooth: 41, x: "48.3%", y: "63%" },

  { tooth: 31, x: "54.4%", y: "63%" },
  { tooth: 32, x: "60.3%", y: "63%" },
  { tooth: 33, x: "66.3%", y: "63%" },
  { tooth: 34, x: "72.3%", y: "63%" },
  { tooth: 35, x: "78.3%", y: "63%" },
  { tooth: 36, x: "84.3%", y: "63%" },
  { tooth: 37, x: "90.3%", y: "63%" },
  { tooth: 38, x: "96.2%", y: "63%" },
];

const defaultRecord: ToothRecord = {
  condition: "",
  plannedProcedure: "",
  completedProcedure: "",
  notes: "",
  status: "Planejado",
};

export function PatientOdontogram() {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [records, setRecords] = useState<Record<number, ToothRecord>>({});

  const currentRecord = selectedTooth
    ? records[selectedTooth] || defaultRecord
    : undefined;

  function updateField(field: keyof ToothRecord, value: string) {
    if (!selectedTooth) return;

    setRecords((prev) => ({
      ...prev,
      [selectedTooth]: {
        condition: prev[selectedTooth]?.condition || "",
        plannedProcedure: prev[selectedTooth]?.plannedProcedure || "",
        completedProcedure: prev[selectedTooth]?.completedProcedure || "",
        notes: prev[selectedTooth]?.notes || "",
        status: prev[selectedTooth]?.status || "Planejado",
        [field]: value,
      },
    }));
  }

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_380px]">
      <section className="rounded-3xl border border-[#D8EDF8] bg-white p-8 shadow-sm">
        <div className="mb-6 border-b border-[#EEF7FB] pb-5">
          <h2 className="text-lg font-semibold text-[#12384D]">
            Odontograma
          </h2>

          <p className="mt-1 text-sm text-[#60758A]">
            Clique em um dente para adicionar ou consultar informações.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-2xl bg-white">
          <Image
            src="/odontogram.png"
            alt="Odontograma anatômico"
            width={1600}
            height={900}
            className="h-auto w-full select-none"
            priority
          />

          {toothPositions.map((item) => {
            return (
              <button
                key={item.tooth}
                type="button"
                onClick={() => setSelectedTooth(item.tooth)}
                title={`Dente ${item.tooth}`}
                className="absolute h-14 w-10 -translate-x-1/2 -translate-y-1/2 bg-transparent"
                style={{
                  left: item.x,
                  top: item.y,
                }}
              />
            );
          })}
        </div>

      </section>

      <aside className="rounded-3xl border border-[#D8EDF8] bg-white p-7 shadow-sm">
        <h2 className="text-lg font-semibold text-[#12384D]">
          {selectedTooth ? `Dente ${selectedTooth}` : "Registo do dente"}
        </h2>

        {selectedTooth ? (
          <div className="mt-6 space-y-5">
            <div className="rounded-2xl bg-[#F8FBFD] p-4">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#60758A]">
                Dente selecionado
              </p>

              <p className="mt-2 text-3xl font-light text-[#12384D]">
                {selectedTooth}
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Condição
              </label>

              <input
                type="text"
                value={currentRecord?.condition || ""}
                onChange={(event) =>
                  updateField("condition", event.target.value)
                }
                placeholder="Ex: cárie, sensibilidade, fratura..."
                className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Procedimento planejado
              </label>

              <input
                type="text"
                value={currentRecord?.plannedProcedure || ""}
                onChange={(event) =>
                  updateField("plannedProcedure", event.target.value)
                }
                placeholder="Ex: restauração, canal, extração..."
                className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Procedimento realizado
              </label>

              <input
                type="text"
                value={currentRecord?.completedProcedure || ""}
                onChange={(event) =>
                  updateField("completedProcedure", event.target.value)
                }
                placeholder="Ex: restauração concluída..."
                className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Status
              </label>

              <select
                value={currentRecord?.status || "Planejado"}
                onChange={(event) => updateField("status", event.target.value)}
                className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
              >
                <option>Planejado</option>
                <option>Em andamento</option>
                <option>Concluído</option>
                <option>Acompanhamento</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Observações
              </label>

              <textarea
                rows={5}
                value={currentRecord?.notes || ""}
                onChange={(event) => updateField("notes", event.target.value)}
                placeholder="Escreva observações específicas sobre este dente..."
                className="w-full resize-none rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-2xl bg-[#399DCA] px-5 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2E91BD]"
            >
              Guardar registo
            </button>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-[#B5E0FB] bg-[#F8FBFD] p-6 text-center">
            <p className="text-sm font-semibold text-[#12384D]">
              Nenhum dente selecionado.
            </p>

            <p className="mt-2 text-sm text-[#60758A]">
              Selecione um dente no odontograma para começar o registo.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}