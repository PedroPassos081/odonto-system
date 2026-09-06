"use client";

import { AppShell } from "@/components/layout/AppShell";
import { createAppointment } from "@/app/agenda/actions";
import { formatIsoDate } from "@/lib/format";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Search,
  X,
} from "lucide-react";
import { useActionState, useMemo, useState } from "react";

type Patient = {
  id: string;
  full_name: string;
};

type AppointmentRow = {
  id: string;
  date: string;
  start_time: string;
  end_time: string | null;
  type: string;
  status: string;
  professional: string | null;
  notes: string | null;
  patients: { id: string; full_name: string }[] | null;
};

type AgendaViewProps = {
  appointments: AppointmentRow[];
  patients: Patient[];
};

const WEEKDAY_LABELS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const CALENDAR_HEADER_LABELS = ["S", "T", "Q", "Q", "S", "S", "D"];

function getWeekDates(reference: Date) {
  const weekday = (reference.getDay() + 6) % 7; // 0 = Monday
  const monday = new Date(reference);
  monday.setDate(reference.getDate() - weekday);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return date;
  });
}

function getMonthCells(year: number, month: number) {
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (string | null)[] = Array(firstWeekday).fill(null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(formatIsoDate(new Date(year, month, day)));
  }

  return cells;
}

function computeDuration(startTime: string, endTime: string | null) {
  if (!endTime) {
    return null;
  }

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  if (
    [startHour, startMinute, endHour, endMinute].some((value) =>
      Number.isNaN(value)
    )
  ) {
    return null;
  }

  const minutes = endHour * 60 + endMinute - (startHour * 60 + startMinute);

  return minutes > 0 ? `${minutes} min` : null;
}

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

export function AgendaView({ appointments, patients }: AgendaViewProps) {
  const today = useMemo(() => new Date(), []);
  const todayIso = formatIsoDate(today);

  const [selectedDate, setSelectedDate] = useState(todayIso);
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] =
    useState(false);

  const weekDates = useMemo(() => getWeekDates(today), [today]);
  const monthCells = useMemo(
    () => getMonthCells(today.getFullYear(), today.getMonth()),
    [today]
  );

  const todaysAppointments = appointments.filter((a) => a.date === todayIso);
  const selectedDayAppointments = appointments
    .filter((a) => a.date === selectedDate)
    .sort((a, b) => a.start_time.localeCompare(b.start_time));

  const confirmedToday = todaysAppointments.filter(
    (a) => a.status === "Confirmada"
  ).length;
  const doneToday = todaysAppointments.filter(
    (a) => a.status === "Realizada"
  ).length;
  const pendingToday = todaysAppointments.filter(
    (a) => a.status === "Agendada"
  ).length;

  const selectedDateLabel = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).format(new Date(`${selectedDate}T00:00:00`));

  const monthYearLabel = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(today);

  const weekRangeLabel = `Semana de ${weekDates[0].getDate()} a ${weekDates[6].getDate()} de ${new Intl.DateTimeFormat(
    "pt-BR",
    { month: "long" }
  ).format(weekDates[6])}`;

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
          <p className="mt-5 text-3xl font-light text-[#12384D]">
            {todaysAppointments.length}
          </p>
          <p className="mt-2 text-sm text-[#60758A]">
            {new Intl.DateTimeFormat("pt-BR", {
              day: "2-digit",
              month: "long",
            }).format(today)}
          </p>
        </div>

        <div className="rounded-3xl border border-[#D8EDF8] bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#60758A]">
            Confirmadas
          </p>
          <p className="mt-5 text-3xl font-light text-[#12384D]">
            {confirmedToday}
          </p>
          <p className="mt-2 text-sm text-[#60758A]">Presença confirmada</p>
        </div>

        <div className="rounded-3xl border border-[#D8EDF8] bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#60758A]">
            Realizadas
          </p>
          <p className="mt-5 text-3xl font-light text-[#12384D]">
            {doneToday}
          </p>
          <p className="mt-2 text-sm text-[#60758A]">Atendimentos concluídos</p>
        </div>

        <div className="rounded-3xl border border-[#D8EDF8] bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#60758A]">
            Pendentes
          </p>
          <p className="mt-5 text-3xl font-light text-[#12384D]">
            {pendingToday}
          </p>
          <p className="mt-2 text-sm text-[#60758A]">Aguardando atendimento</p>
        </div>
      </div>

      <section className="mt-9 rounded-3xl border border-[#D8EDF8] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-xl border border-[#D8EDF8] bg-white p-3 text-[#60758A] transition hover:bg-[#F8FBFD] hover:text-[#12384D]"
            >
              <ChevronLeft size={18} />
            </button>

            <div>
              <p className="text-lg font-semibold text-[#12384D] capitalize">
                {monthYearLabel}
              </p>
              <p className="mt-1 text-sm text-[#60758A]">{weekRangeLabel}</p>
            </div>

            <button
              type="button"
              className="rounded-xl border border-[#D8EDF8] bg-white p-3 text-[#60758A] transition hover:bg-[#F8FBFD] hover:text-[#12384D]"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-5 py-3">
            <Search size={18} className="text-[#60758A]" />
            <input
              type="text"
              placeholder="Procurar paciente..."
              className="bg-transparent text-sm text-[#12384D] outline-none placeholder:text-[#8AA0B2]"
            />
          </div>
        </div>

        <div className="mt-7 grid grid-cols-7 gap-3">
          {weekDates.map((date) => {
            const iso = formatIsoDate(date);
            const isActive = iso === selectedDate;

            return (
              <button
                key={iso}
                type="button"
                onClick={() => setSelectedDate(iso)}
                className={`rounded-2xl border px-4 py-4 text-center transition ${
                  isActive
                    ? "border-[#B5E0FB] bg-[#D7F5FC] text-[#12384D]"
                    : "border-[#D8EDF8] bg-white text-[#60758A] hover:bg-[#F8FBFD]"
                }`}
              >
                <p className="text-xs font-medium uppercase">
                  {WEEKDAY_LABELS[(date.getDay() + 6) % 7]}
                </p>
                <p className="mt-2 text-xl font-light">{date.getDate()}</p>
              </button>
            );
          })}
        </div>
      </section>

      <div className="mt-9 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_380px]">
        <section className="rounded-3xl border border-[#D8EDF8] bg-white p-7 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#EEF7FB] pb-5">
            <div>
              <h2 className="text-lg font-semibold text-[#12384D]">
                Consultas do dia
              </h2>
              <p className="mt-1 text-sm capitalize text-[#60758A]">
                {selectedDateLabel}
              </p>
            </div>

            <CalendarDays size={22} className="text-[#2E91BD]" />
          </div>

          <div className="mt-6 space-y-4">
            {selectedDayAppointments.length === 0 && (
              <p className="py-10 text-center text-sm text-[#60758A]">
                Sem consultas marcadas para este dia.
              </p>
            )}

            {selectedDayAppointments.map((appointment) => {
              const duration = computeDuration(
                appointment.start_time,
                appointment.end_time
              );

              return (
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
                            {appointment.start_time}
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
                          {appointment.patients?.[0]?.full_name ??
                            "Paciente removido"}
                        </p>

                        <p className="mt-1 text-sm text-[#60758A]">
                          {appointment.type}
                          {duration ? ` · ${duration}` : ""}
                        </p>

                        {appointment.professional && (
                          <p className="mt-1 text-xs text-[#8AA0B2]">
                            {appointment.professional}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <aside className="space-y-8">
          <section className="rounded-3xl border border-[#D8EDF8] bg-white p-7 shadow-sm">
            <h2 className="text-lg font-semibold text-[#12384D]">
              Calendário do mês
            </h2>

            <div className="mt-6 grid grid-cols-7 gap-2 text-center">
              {CALENDAR_HEADER_LABELS.map((day, index) => (
                <p
                  key={`${day}-${index}`}
                  className="py-2 text-xs font-semibold uppercase text-[#60758A]"
                >
                  {day}
                </p>
              ))}

              {monthCells.map((iso, index) => {
                const isToday = iso === todayIso;
                const isSelected = iso === selectedDate;
                const hasAppointment = appointments.some((a) => a.date === iso);

                return (
                  <button
                    key={iso ?? `empty-${index}`}
                    type="button"
                    disabled={!iso}
                    onClick={() => iso && setSelectedDate(iso)}
                    className={`relative flex h-10 items-center justify-center rounded-xl text-sm transition ${
                      isToday
                        ? "bg-[#399DCA] font-semibold text-white"
                        : isSelected
                        ? "bg-[#D7F5FC] text-[#12384D]"
                        : iso
                        ? "text-[#12384D] hover:bg-[#F8FBFD]"
                        : "text-transparent"
                    }`}
                  >
                    {iso ? Number(iso.slice(-2)) : ""}

                    {hasAppointment && !isToday && (
                      <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[#399DCA]" />
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-[#D8EDF8] bg-white p-7 shadow-sm">
            <h2 className="text-lg font-semibold text-[#12384D]">Legenda</h2>

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
        <NewAppointmentModal
          patients={patients}
          onClose={() => setIsNewAppointmentModalOpen(false)}
        />
      )}
    </AppShell>
  );
}

function NewAppointmentModal({
  patients,
  onClose,
}: {
  patients: Patient[];
  onClose: () => void;
}) {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: { error: string } | null, formData: FormData) => {
      const result = await createAppointment(_prevState, formData);
      if (!result?.error) {
        onClose();
      }
      return result;
    },
    null
  );

  return (
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
            onClick={onClose}
            className="rounded-xl p-2 text-[#60758A] transition hover:bg-[#F8FBFD] hover:text-[#12384D]"
          >
            <X size={22} />
          </button>
        </div>

        <form action={formAction} className="space-y-7 px-8 py-7">
          <section>
            <h3 className="text-base font-semibold text-[#12384D]">
              Dados da consulta
            </h3>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#12384D]">
                  Paciente
                </label>

                <select
                  name="patient_id"
                  required
                  className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
                >
                  <option value="">Selecione um paciente</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#12384D]">
                  Data
                </label>

                <input
                  name="date"
                  type="date"
                  required
                  className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#12384D]">
                  Tipo de consulta
                </label>

                <select
                  name="type"
                  required
                  className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
                >
                  <option value="">Selecione o tipo</option>
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
                  name="start_time"
                  type="time"
                  required
                  className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#12384D]">
                  Horário de fim
                </label>

                <input
                  name="end_time"
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

                <select
                  name="professional"
                  defaultValue="Drª Susana Lourenço"
                  className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
                >
                  <option>Drª Susana Lourenço</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#12384D]">
                  Status
                </label>

                <select
                  name="status"
                  defaultValue="Agendada"
                  className="w-full rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
                >
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
              name="notes"
              rows={4}
              placeholder="Ex: paciente pediu consulta no período da manhã, chegar 10 minutos antes..."
              className="w-full resize-none rounded-2xl border border-[#D8EDF8] bg-[#F8FBFD] px-4 py-3.5 text-sm text-[#12384D] outline-none transition placeholder:text-[#8AA0B2] focus:border-[#B5E0FB] focus:bg-white focus:ring-4 focus:ring-[#B5E0FB]/30"
            />
          </section>

          {state?.error && (
            <p className="text-sm font-medium text-[#C0392B]">
              {state.error}
            </p>
          )}

          <div className="sticky bottom-0 flex items-center justify-end gap-4 border-t border-[#EEF7FB] bg-white py-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-[#D8EDF8] bg-white px-6 py-3.5 text-sm font-medium text-[#12384D] transition hover:bg-[#F8FBFD]"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-2xl bg-[#399DCA] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2E91BD] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "A guardar..." : "Guardar consulta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
