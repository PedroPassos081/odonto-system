"use client";

import { AppShell } from "@/components/layout/AppShell";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  MoreHorizontal,
  Plus,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";

const appointments = [
  {
    id: 1,
    patient: "Maria Fernandes",
    time: "09:00",
    duration: "45 min",
    type: "Consulta de avaliação",
    status: "Confirmada",
    professional: "Drª Susana Lourenço",
  },
  {
    id: 2,
    patient: "João Pereira",
    time: "10:30",
    duration: "60 min",
    type: "Restauração",
    status: "Agendada",
    professional: "Drª Susana Lourenço",
  },
  {
    id: 3,
    patient: "Ana Martins",
    time: "14:00",
    duration: "30 min",
    type: "Retorno",
    status: "Realizada",
    professional: "Drª Susana Lourenço",
  },
  {
    id: 4,
    patient: "Carlos Mendes",
    time: "16:00",
    duration: "45 min",
    type: "Limpeza",
    status: "Faltou",
    professional: "Drª Susana Lourenço",
  },
];

const days = [
  { day: "Seg", date: "18", active: false },
  { day: "Ter", date: "19", active: false },
  { day: "Qua", date: "20", active: false },
  { day: "Qui", date: "21", active: false },
  { day: "Sex", date: "22", active: true },
  { day: "Sáb", date: "23", active: false },
  { day: "Dom", date: "24", active: false },
];

const calendarDays = [
  "", "", "", "1", "2", "3", "4",
  "5", "6", "7", "8", "9", "10", "11",
  "12", "13", "14", "15", "16", "17", "18",
  "19", "20", "21", "22", "23", "24", "25",
  "26", "27", "28", "29", "30", "31", "",
];

function getStatusStyle(status: string) {
  switch (status) {
    case "Confirmada":
      return "border-[#BCEBD3] bg-[#E6F7EF] text-[#2F855A]";
    case "Agendada":
      return "border-[#B5E0FB] bg-[#E8F5FB] text-[#2E91BD]";
    case "Realizada":
      return "border-[#D8EDF8] bg-[#F8FBFD] text-[#60758A]";
    case "Faltou":
      return "border-[#FBD38D] bg-[#FFF7E6] text-[#B7791F]";
    case "Cancelada":
      return "border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]";
    default:
      return "border-[#D8EDF8] bg-[#F8FBFD] text-[#60758A]";
  }
}

export default function AgendaPage() {
  const [view, setView] = useState<"dia" | "semana" | "mes">("dia");
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] =
  useState(false);
  return (
    <AppShell>
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#60758A]">
            Clínica
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-[-0.03em] text-[#12384D]">
            Agenda
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#60758A]">
            Visualize as consultas marcadas, acompanhe os horários do dia e organize os próximos atendimentos.
          </p>
        </div>

        <button
            type="button"
            onClick={() => setIsNewAppointmentModalOpen(true)}
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#399DCA] px-7 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2E91BD]"
                    >
                <Plus size={18} />
                Nova consulta
        </button>
      </div>

      <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-[#D8EDF8] bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#60758A]">
            Consultas hoje
          </p>
          <p className="mt-5 text-3xl font-light text-[#12384D]">4</p>
          <p className="mt-2 text-sm text-[#60758A]">22 de maio</p>
        </div>

        <div className="rounded-3xl border border-[#D8EDF8] bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#60758A]">
            Confirmadas
          </p>
          <p className="mt-5 text-3xl font-light text-[#12384D]">1</p>
          <p className="mt-2 text-sm text-[#60758A]">Presença confirmada</p>
        </div>

        <div className="rounded-3xl border border-[#D8EDF8] bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#60758A]">
            Realizadas
          </p>
          <p className="mt-5 text-3xl font-light text-[#12384D]">1</p>
          <p className="mt-2 text-sm text-[#60758A]">Atendimentos concluídos</p>
        </div>

        <div className="rounded-3xl border border-[#D8EDF8] bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#60758A]">
            Pendentes
          </p>
          <p className="mt-5 text-3xl font-light text-[#12384D]">2</p>
          <p className="mt-2 text-sm text-[#60758A]">Aguardando atendimento</p>
        </div>
      </div>

      <section className="mt-9 rounded-3xl border border-[#D8EDF8] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-3">
            <button className="rounded-xl border border-[#D8EDF8] bg-white p-3 text-[#60758A] transition hover:bg-[#F8FBFD] hover:text-[#12384D]">
              <ChevronLeft size={18} />
            </button>

            <div>
              <p className="text-lg font-semibold text-[#12384D]">
                Maio de 2026
              </p>
              <p className="mt-1 text-sm text-[#60758A]">
                Semana de 18 a 24 de maio
              </p>
            </div>

            <button className="rounded-xl border border-[#D8EDF8] bg-white p-3 text-[#60758A] transition hover:bg-[#F8FBFD] hover:text-[#12384D]">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-3 rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-5 py-3">
              <Search size={18} className="text-[#60758A]" />
              <input
                type="text"
                placeholder="Procurar paciente..."
                className="bg-transparent text-sm text-[#12384D] outline-none placeholder:text-[#8AA0B2]"
              />
            </div>

            <div className="flex rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] p-1">
              {["dia", "semana", "mes"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setView(item as "dia" | "semana" | "mes")}
                  className={`rounded-xl px-4 py-2 text-sm font-medium capitalize transition ${
                    view === item
                      ? "bg-white text-[#12384D] shadow-sm"
                      : "text-[#60758A] hover:text-[#12384D]"
                  }`}
                >
                  {item === "mes" ? "Mês" : item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-7 gap-3">
          {days.map((item) => (
            <button
              key={item.date}
              type="button"
              className={`rounded-2xl border px-4 py-4 text-center transition ${
                item.active
                  ? "border-[#B5E0FB] bg-[#D7F5FC] text-[#12384D]"
                  : "border-[#D8EDF8] bg-white text-[#60758A] hover:bg-[#F8FBFD]"
              }`}
            >
              <p className="text-xs font-medium uppercase">{item.day}</p>
              <p className="mt-2 text-xl font-light">{item.date}</p>
            </button>
          ))}
        </div>
      </section>

      <div className="mt-9 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_380px]">
        <section className="rounded-3xl border border-[#D8EDF8] bg-white p-7 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#EEF7FB] pb-5">
            <div>
              <h2 className="text-lg font-semibold text-[#12384D]">
                Consultas do dia
              </h2>
              <p className="mt-1 text-sm text-[#60758A]">
                Sexta-feira, 22 de maio
              </p>
            </div>

            <CalendarDays size={22} className="text-[#2E91BD]" />
          </div>

          <div className="mt-6 space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="rounded-3xl border border-[#D8EDF8] bg-[#F8FBFD] p-5 transition hover:bg-white hover:shadow-sm"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2E91BD]">
                      <Clock size={22} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="text-lg font-semibold text-[#12384D]">
                          {appointment.time}
                        </p>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyle(
                            appointment.status
                          )}`}
                        >
                          {appointment.status}
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-semibold text-[#12384D]">
                        {appointment.patient}
                      </p>

                      <p className="mt-1 text-sm text-[#60758A]">
                        {appointment.type} · {appointment.duration}
                      </p>

                      <p className="mt-1 text-xs text-[#8AA0B2]">
                        {appointment.professional}
                      </p>
                    </div>
                  </div>

                  <button className="rounded-xl p-2 text-[#60758A] transition hover:bg-white hover:text-[#12384D]">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-8">
          <section className="rounded-3xl border border-[#D8EDF8] bg-white p-7 shadow-sm">
            <h2 className="text-lg font-semibold text-[#12384D]">
              Calendário do mês
            </h2>

            <div className="mt-6 grid grid-cols-7 gap-2 text-center">
              {["S", "T", "Q", "Q", "S", "S", "D"].map((day, index) => (
                <p
                  key={`${day}-${index}`}
                  className="py-2 text-xs font-semibold uppercase text-[#60758A]"
                >
                  {day}
                </p>
              ))}

              {calendarDays.map((day, index) => {
                const isToday = day === "22";
                const hasAppointment = ["19", "20", "22", "28"].includes(day);

                return (
                  <button
                    key={`${day}-${index}`}
                    type="button"
                    disabled={!day}
                    className={`relative flex h-10 items-center justify-center rounded-xl text-sm transition ${
                      isToday
                        ? "bg-[#399DCA] font-semibold text-white"
                        : day
                        ? "text-[#12384D] hover:bg-[#F8FBFD]"
                        : "text-transparent"
                    }`}
                  >
                    {day}

                    {hasAppointment && !isToday && (
                      <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[#399DCA]" />
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-[#D8EDF8] bg-white p-7 shadow-sm">
            <h2 className="text-lg font-semibold text-[#12384D]">
              Legenda
            </h2>

            <div className="mt-5 space-y-3">
              {["Agendada", "Confirmada", "Realizada", "Faltou", "Cancelada"].map(
                (status) => (
                  <div key={status} className="flex items-center gap-3">
                    <span
                      className={`h-3 w-3 rounded-full border ${getStatusStyle(
                        status
                      )}`}
                    />
                    <p className="text-sm text-[#60758A]">{status}</p>
                  </div>
                )
              )}
            </div>
          </section>
        </aside>
      </div>
      {isNewAppointmentModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#12384D]/30 px-4 backdrop-blur-sm">
    <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#D8EDF8] bg-white shadow-xl">
      <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#EEF7FB] bg-white px-8 py-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#60758A]">
            Agenda
          </p>

          <h2 className="mt-2 text-2xl font-light tracking-[-0.03em] text-[#12384D]">
            Nova consulta
          </h2>

          <p className="mt-2 text-sm text-[#60758A]">
            Preencha os dados para agendar uma nova consulta.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsNewAppointmentModalOpen(false)}
          className="rounded-xl p-2 text-[#60758A] transition hover:bg-[#F8FBFD] hover:text-[#12384D]"
        >
          <X size={22} />
        </button>
      </div>

      <form className="space-y-7 px-8 py-7">
        <section>
          <h3 className="text-base font-semibold text-[#12384D]">
            Dados da consulta
          </h3>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Paciente
              </label>

              <select className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30">
                <option>Selecione um paciente</option>
                <option>Maria Fernandes</option>
                <option>João Pereira</option>
                <option>Ana Martins</option>
                <option>Carlos Mendes</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Data
              </label>

              <input
                type="date"
                className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Tipo de consulta
              </label>

              <select className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30">
                <option>Selecione o tipo</option>
                <option>Consulta de avaliação</option>
                <option>Restauração</option>
                <option>Limpeza</option>
                <option>Retorno</option>
                <option>Extração</option>
                <option>Urgência</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Horário de início
              </label>

              <input
                type="time"
                className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Horário de fim
              </label>

              <input
                type="time"
                className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
              />
            </div>
          </div>
        </section>

        <section className="border-t border-[#EEF7FB] pt-7">
          <h3 className="text-base font-semibold text-[#12384D]">
            Profissional e status
          </h3>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Profissional
              </label>

              <select className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30">
                <option>Drª Susana Lourenço</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#12384D]">
                Status
              </label>

              <select className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30">
                <option>Agendada</option>
                <option>Confirmada</option>
                <option>Realizada</option>
                <option>Faltou</option>
                <option>Cancelada</option>
              </select>
            </div>
          </div>
        </section>

        <section className="border-t border-[#EEF7FB] pt-7">
          <label className="mb-2 block text-sm font-medium text-[#12384D]">
            Observações
          </label>

          <textarea
            rows={4}
            placeholder="Ex: paciente pediu consulta no período da manhã, chegar 10 minutos antes..."
            className="w-full resize-none rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
          />
        </section>

        <div className="sticky bottom-0 flex items-center justify-end gap-4 border-t border-[#EEF7FB] bg-white py-5">
          <button
            type="button"
            onClick={() => setIsNewAppointmentModalOpen(false)}
            className="rounded-2xl border border-[#D8EDF8] bg-white px-6 py-3.5 text-sm font-medium text-[#12384D] transition hover:bg-[#F8FBFD]"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="rounded-2xl bg-[#399DCA] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2E91BD]"
          >
            Guardar consulta
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </AppShell>
  );
}