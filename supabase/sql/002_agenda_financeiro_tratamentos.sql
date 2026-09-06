-- Etapa 4: tabelas para Agenda, Tratamentos e Financeiro, com o mesmo
-- padrão de RLS já aplicado a `patients` (001_rls_patients.sql).
--
-- Rode este arquivo inteiro no SQL Editor do painel do Supabase, depois
-- de já ter rodado o 001.

-- Agenda ----------------------------------------------------------------

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  date date not null,
  start_time text not null,
  end_time text,
  type text not null,
  status text not null default 'Agendada',
  professional text,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.appointments enable row level security;

drop policy if exists "Authenticated users can read appointments" on public.appointments;
create policy "Authenticated users can read appointments"
  on public.appointments for select to authenticated using (true);

drop policy if exists "Authenticated users can insert appointments" on public.appointments;
create policy "Authenticated users can insert appointments"
  on public.appointments for insert to authenticated with check (true);

drop policy if exists "Authenticated users can update appointments" on public.appointments;
create policy "Authenticated users can update appointments"
  on public.appointments for update to authenticated using (true) with check (true);

drop policy if exists "Authenticated users can delete appointments" on public.appointments;
create policy "Authenticated users can delete appointments"
  on public.appointments for delete to authenticated using (true);

-- Tratamentos -------------------------------------------------------------

create table if not exists public.treatment_plans (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  title text not null,
  status text not null default 'Planejado',
  notes text,
  created_at timestamptz not null default now()
);

alter table public.treatment_plans enable row level security;

drop policy if exists "Authenticated users can read treatment_plans" on public.treatment_plans;
create policy "Authenticated users can read treatment_plans"
  on public.treatment_plans for select to authenticated using (true);

drop policy if exists "Authenticated users can insert treatment_plans" on public.treatment_plans;
create policy "Authenticated users can insert treatment_plans"
  on public.treatment_plans for insert to authenticated with check (true);

drop policy if exists "Authenticated users can update treatment_plans" on public.treatment_plans;
create policy "Authenticated users can update treatment_plans"
  on public.treatment_plans for update to authenticated using (true) with check (true);

drop policy if exists "Authenticated users can delete treatment_plans" on public.treatment_plans;
create policy "Authenticated users can delete treatment_plans"
  on public.treatment_plans for delete to authenticated using (true);

create table if not exists public.treatment_procedures (
  id uuid primary key default gen_random_uuid(),
  treatment_plan_id uuid not null references public.treatment_plans(id) on delete cascade,
  name text not null,
  tooth text,
  price numeric(10, 2) not null default 0,
  status text not null default 'Planejado',
  created_at timestamptz not null default now()
);

alter table public.treatment_procedures enable row level security;

drop policy if exists "Authenticated users can read treatment_procedures" on public.treatment_procedures;
create policy "Authenticated users can read treatment_procedures"
  on public.treatment_procedures for select to authenticated using (true);

drop policy if exists "Authenticated users can insert treatment_procedures" on public.treatment_procedures;
create policy "Authenticated users can insert treatment_procedures"
  on public.treatment_procedures for insert to authenticated with check (true);

drop policy if exists "Authenticated users can update treatment_procedures" on public.treatment_procedures;
create policy "Authenticated users can update treatment_procedures"
  on public.treatment_procedures for update to authenticated using (true) with check (true);

drop policy if exists "Authenticated users can delete treatment_procedures" on public.treatment_procedures;
create policy "Authenticated users can delete treatment_procedures"
  on public.treatment_procedures for delete to authenticated using (true);

-- Financeiro --------------------------------------------------------------

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  treatment_plan_id uuid references public.treatment_plans(id) on delete set null,
  total_value numeric(10, 2) not null default 0,
  paid_value numeric(10, 2) not null default 0,
  method text,
  status text not null default 'Pendente',
  date date not null,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.payments enable row level security;

drop policy if exists "Authenticated users can read payments" on public.payments;
create policy "Authenticated users can read payments"
  on public.payments for select to authenticated using (true);

drop policy if exists "Authenticated users can insert payments" on public.payments;
create policy "Authenticated users can insert payments"
  on public.payments for insert to authenticated with check (true);

drop policy if exists "Authenticated users can update payments" on public.payments;
create policy "Authenticated users can update payments"
  on public.payments for update to authenticated using (true) with check (true);

drop policy if exists "Authenticated users can delete payments" on public.payments;
create policy "Authenticated users can delete payments"
  on public.payments for delete to authenticated using (true);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  description text not null,
  supplier text,
  category text,
  amount numeric(10, 2) not null default 0,
  due_date date not null,
  paid_at date,
  method text,
  status text not null default 'Pendente',
  created_at timestamptz not null default now()
);

alter table public.expenses enable row level security;

drop policy if exists "Authenticated users can read expenses" on public.expenses;
create policy "Authenticated users can read expenses"
  on public.expenses for select to authenticated using (true);

drop policy if exists "Authenticated users can insert expenses" on public.expenses;
create policy "Authenticated users can insert expenses"
  on public.expenses for insert to authenticated with check (true);

drop policy if exists "Authenticated users can update expenses" on public.expenses;
create policy "Authenticated users can update expenses"
  on public.expenses for update to authenticated using (true) with check (true);

drop policy if exists "Authenticated users can delete expenses" on public.expenses;
create policy "Authenticated users can delete expenses"
  on public.expenses for delete to authenticated using (true);
