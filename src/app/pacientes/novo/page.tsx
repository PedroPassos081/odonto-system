import { AppShell } from "@/components/layout/AppShell";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { createPatient } from "../actions";

export default function NewPatientPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#60758A]">
            Pacientes
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-[-0.03em] text-[#12384D]">
            Novo paciente
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#60758A]">
            Preencha os dados principais do paciente para criar a ficha clínica.
          </p>
        </div>

        <Link
          href="/pacientes"
          className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D8EDF8] bg-white px-6 py-4 text-sm font-medium text-[#12384D] shadow-sm transition hover:bg-[#F8FBFD]"
        >
          <ArrowLeft size={18} />
          Voltar
        </Link>
      </div>

      <form action={createPatient} className="mt-9 space-y-8">
        <section className="rounded-3xl border border-[#D8EDF8] bg-white p-8 shadow-sm">
          <div className="border-b border-[#EEF7FB] pb-6">
            <h2 className="text-xl font-semibold text-[#12384D]">
              Dados pessoais
            </h2>

            <p className="mt-2 text-sm text-[#60758A]">
              Informações básicas de identificação do paciente.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Nome completo
              </label>
              <input
                name="full_name"
                type="text"
                required
                className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-5 py-4 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Data de nascimento
              </label>
              <input
                name="birth_date"
                type="date"
                className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-5 py-4 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                NIF
              </label>
              <input
                name="nif"
                type="text"
                placeholder="Ex: 123456789"
                className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-5 py-4 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Status
              </label>
              <select
                name="status"
                defaultValue="Ativo"
                className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-5 py-4 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
              >
                <option value="Ativo">Ativo</option>
                <option value="Em tratamento">Em tratamento</option>
                <option value="Retorno pendente">Retorno pendente</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-[#D8EDF8] bg-white p-8 shadow-sm">
          <div className="border-b border-[#EEF7FB] pb-6">
            <h2 className="text-xl font-semibold text-[#12384D]">Contacto</h2>

            <p className="mt-2 text-sm text-[#60758A]">
              Dados para comunicação e confirmação de consultas.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Telefone/WhatsApp
              </label>
              <input
                name="phone"
                type="tel"
                placeholder="+351 912 345 678"
                className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-5 py-4 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                E-mail
              </label>
              <input
                name="email"
                type="email"
                placeholder="email@exemplo.com"
                className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-5 py-4 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Morada
              </label>
              <input
                name="address"
                type="text"
                placeholder="Rua, número, cidade"
                className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-5 py-4 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
              />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-[#D8EDF8] bg-white p-8 shadow-sm">
          <div className="border-b border-[#EEF7FB] pb-6">
            <h2 className="text-xl font-semibold text-[#12384D]">
              Informações clínicas
            </h2>

            <p className="mt-2 text-sm text-[#60758A]">
              Dados importantes para segurança e acompanhamento do tratamento.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Histórico médico
              </label>
              <textarea
                name="medical_history"
                rows={4}
                placeholder="Ex: hipertensão, diabetes, cirurgias anteriores..."
                className="w-full resize-none rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-5 py-4 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Alergias
              </label>
              <textarea
                name="allergies"
                rows={3}
                placeholder="Ex: alergia a anestesia, antibióticos, látex..."
                className="w-full resize-none rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-5 py-4 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Medicamentos em uso
              </label>
              <textarea
                name="medications"
                rows={3}
                placeholder="Ex: anticoagulantes, medicação para pressão..."
                className="w-full resize-none rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-5 py-4 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
              />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-[#D8EDF8] bg-white p-8 shadow-sm">
          <div className="border-b border-[#EEF7FB] pb-6">
            <h2 className="text-xl font-semibold text-[#12384D]">
              Observações
            </h2>

            <p className="mt-2 text-sm text-[#60758A]">
              Informações adicionais sobre preferências, cuidados ou alertas.
            </p>
          </div>

          <div className="mt-7">
            <label className="mb-2 block text-sm font-medium text-[#12384D]">
              Observações importantes
            </label>
            <textarea
              name="notes"
              rows={4}
              placeholder="Ex: paciente ansiosa, prefere consultas no período da manhã..."
              className="w-full resize-none rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-5 py-4 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
            />
          </div>
        </section>

        <div className="flex items-center justify-end gap-4">
          <Link
            href="/pacientes"
            className="inline-flex items-center justify-center rounded-2xl border border-[#D8EDF8] bg-white px-7 py-4 text-sm font-medium text-[#12384D] shadow-sm transition hover:bg-[#F8FBFD]"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#399DCA] px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2E91BD]"
          >
            <Save size={18} />
            Guardar paciente
          </button>
        </div>
      </form>
    </AppShell>
  );
}