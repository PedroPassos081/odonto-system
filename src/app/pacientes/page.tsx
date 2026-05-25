import { AppShell } from "@/components/layout/AppShell";
import {
  ChevronDown,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";

const patients = [
  {
    id: 1,
    name: "Maria Fernandes",
    phone: "+351 912 345 678",
    lastAppointment: "20/05/2026",
    status: "Ativo",
  },
  {
    id: 2,
    name: "João Pereira",
    phone: "+351 934 222 111",
    lastAppointment: "18/05/2026",
    status: "Em tratamento",
  },
  {
    id: 3,
    name: "Ana Martins",
    phone: "+351 911 876 543",
    lastAppointment: "12/05/2026",
    status: "Retorno pendente",
  },
];

function getStatusStyles(status: string) {
  switch (status) {
    case "Ativo":
      return "bg-[#E6F7EF] text-[#2F855A] border-[#BCEBD3]";
    case "Em tratamento":
      return "bg-[#E8F5FB] text-[#2E91BD] border-[#B5E0FB]";
    case "Retorno pendente":
      return "bg-[#FFF7E6] text-[#B7791F] border-[#FBD38D]";
    default:
      return "bg-[#F1F5F9] text-[#60758A] border-[#D8EDF8]";
  }
}

export default function PatientsPage() {
  const hasPatients = patients.length > 0;

  return (
    <AppShell>
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#60758A]">
            Clínica
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-[-0.03em] text-[#12384D]">
            Pacientes
          </h1>
        </div>

        <button className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#399DCA] px-7 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2E91BD]">
          <Plus size={18} />
          Novo paciente
        </button>
      </div>

      <section className="mt-9 overflow-hidden rounded-3xl border border-[#D8EDF8] bg-white shadow-sm">
        <div className="grid grid-cols-1 gap-4 border-b border-[#D8EDF8] p-6 lg:grid-cols-[1fr_240px]">
          <div className="flex items-center gap-3 rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-5 py-4 shadow-sm">
            <Search size={20} className="text-[#60758A]" />

            <input
              type="text"
              placeholder="Procurar paciente por nome..."
              className="w-full bg-transparent text-sm text-[#12384D] outline-none placeholder:text-[#60758A]"
            />
          </div>

          <button className="flex items-center justify-between rounded-2xl border border-[#D8EDF8] bg-white px-5 py-4 text-sm text-[#12384D] shadow-sm transition hover:bg-[#F8FBFD]">
            Todos os status
            <ChevronDown size={18} className="text-[#60758A]" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-225 border-collapse">
            <thead>
              <tr className="border-b border-[#D8EDF8] bg-white">
                <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#60758A]">
                  Nome
                </th>

                <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#60758A]">
                  Telefone
                </th>

                <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#60758A]">
                  Última consulta
                </th>

                <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#60758A]">
                  Status
                </th>

                <th className="px-6 py-5 text-right text-xs font-semibold uppercase tracking-[0.12em] text-[#60758A]">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {hasPatients ? (
                patients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b border-[#EEF7FB] transition hover:bg-[#F8FBFD]"
                  >
                    <td className="px-6 py-5">
                      <div>
                        <p className="text-sm font-semibold text-[#12384D]">
                          {patient.name}
                        </p>
                        <p className="mt-1 text-xs text-[#60758A]">
                          Paciente #{patient.id.toString().padStart(3, "0")}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-[#60758A]">
                      {patient.phone}
                    </td>

                    <td className="px-6 py-5 text-sm text-[#60758A]">
                      {patient.lastAppointment}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyles(
                          patient.status
                        )}`}
                      >
                        {patient.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button className="inline-flex items-center gap-2 rounded-xl border border-[#D8EDF8] bg-white px-4 py-2 text-xs font-medium text-[#2E91BD] transition hover:bg-[#F0FAFE]">
                          <Eye size={15} />
                          Ver
                        </button>

                        <button className="rounded-xl p-2 text-[#60758A] transition hover:bg-[#F0FAFE] hover:text-[#12384D]">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="mx-auto max-w-sm">
                      <p className="text-base font-semibold text-[#12384D]">
                        Nenhum paciente cadastrado ainda.
                      </p>

                      <p className="mt-2 text-sm text-[#60758A]">
                        Clique em “Novo paciente” para começar a criar a ficha
                        do primeiro paciente.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}