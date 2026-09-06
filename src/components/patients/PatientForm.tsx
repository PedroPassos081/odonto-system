import { Save } from "lucide-react";
import Link from "next/link";

const inputClassName =
  "w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-5 py-4 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30";

const textareaClassName = `${inputClassName} resize-none`;

const labelClassName = "mb-2 block text-sm font-medium text-[#12384D]";

export type PatientFormValues = {
  full_name?: string | null;
  birth_date?: string | null;
  nif?: string | null;
  status?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  medical_history?: string | null;
  allergies?: string | null;
  medications?: string | null;
  notes?: string | null;
};

type PatientFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: PatientFormValues;
  submitLabel: string;
  cancelHref: string;
};

export function PatientForm({
  action,
  defaultValues,
  submitLabel,
  cancelHref,
}: PatientFormProps) {
  return (
    <form action={action} className="mt-9 space-y-8">
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
            <label className={labelClassName}>Nome completo</label>
            <input
              name="full_name"
              type="text"
              required
              defaultValue={defaultValues?.full_name ?? ""}
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>Data de nascimento</label>
            <input
              name="birth_date"
              type="date"
              defaultValue={defaultValues?.birth_date ?? ""}
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>NIF</label>
            <input
              name="nif"
              type="text"
              placeholder="Ex: 123456789"
              defaultValue={defaultValues?.nif ?? ""}
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>Status</label>
            <select
              name="status"
              defaultValue={defaultValues?.status ?? "Ativo"}
              className={inputClassName}
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
            <label className={labelClassName}>Telefone/WhatsApp</label>
            <input
              name="phone"
              type="tel"
              placeholder="+351 912 345 678"
              defaultValue={defaultValues?.phone ?? ""}
              className={inputClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>E-mail</label>
            <input
              name="email"
              type="email"
              placeholder="email@exemplo.com"
              defaultValue={defaultValues?.email ?? ""}
              className={inputClassName}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClassName}>Morada</label>
            <input
              name="address"
              type="text"
              placeholder="Rua, número, cidade"
              defaultValue={defaultValues?.address ?? ""}
              className={inputClassName}
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
            <label className={labelClassName}>Histórico médico</label>
            <textarea
              name="medical_history"
              rows={4}
              placeholder="Ex: hipertensão, diabetes, cirurgias anteriores..."
              defaultValue={defaultValues?.medical_history ?? ""}
              className={textareaClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>Alergias</label>
            <textarea
              name="allergies"
              rows={3}
              placeholder="Ex: alergia a anestesia, antibióticos, látex..."
              defaultValue={defaultValues?.allergies ?? ""}
              className={textareaClassName}
            />
          </div>

          <div>
            <label className={labelClassName}>Medicamentos em uso</label>
            <textarea
              name="medications"
              rows={3}
              placeholder="Ex: anticoagulantes, medicação para pressão..."
              defaultValue={defaultValues?.medications ?? ""}
              className={textareaClassName}
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
          <label className={labelClassName}>Observações importantes</label>
          <textarea
            name="notes"
            rows={4}
            placeholder="Ex: paciente ansiosa, prefere consultas no período da manhã..."
            defaultValue={defaultValues?.notes ?? ""}
            className={textareaClassName}
          />
        </div>
      </section>

      <div className="flex items-center justify-end gap-4">
        <Link
          href={cancelHref}
          className="inline-flex items-center justify-center rounded-2xl border border-[#D8EDF8] bg-white px-7 py-4 text-sm font-medium text-[#12384D] shadow-sm transition hover:bg-[#F8FBFD]"
        >
          Cancelar
        </Link>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#399DCA] px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2E91BD]"
        >
          <Save size={18} />
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
