-- Etapa 1: fecha o acesso à tabela `patients` para apenas usuários autenticados.
--
-- IMPORTANTE: antes de rodar, confira no painel do Supabase
-- (Authentication > Policies > patients) se já existem policies antigas
-- permitindo acesso anônimo/público. Se existirem, apague-as manualmente
-- antes ou depois de rodar este script — este script não sabe os nomes
-- de policies pré-existentes e não vai removê-las por você.
--
-- Rode este arquivo inteiro no SQL Editor do painel do Supabase.

alter table public.patients enable row level security;

drop policy if exists "Authenticated users can read patients" on public.patients;
create policy "Authenticated users can read patients"
  on public.patients
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can insert patients" on public.patients;
create policy "Authenticated users can insert patients"
  on public.patients
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update patients" on public.patients;
create policy "Authenticated users can update patients"
  on public.patients
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can delete patients" on public.patients;
create policy "Authenticated users can delete patients"
  on public.patients
  for delete
  to authenticated
  using (true);
