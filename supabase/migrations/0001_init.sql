-- KENAYAH AI — schéma initial (DamCompany). PostgreSQL / Supabase.
create extension if not exists vector with schema extensions;

create type app_status as enum ('decouverte','preparee','en_validation','envoyee','accuse','entretien','refus','archivee');
create type automation_mode as enum ('manuel','assiste','automatique_encadre');
create type agent_name as enum ('scout','match','tailor','apply','tracker','analyst','orchestrator');
create type run_status as enum ('queued','running','succeeded','failed','paused','cancelled');
create type salary_basis as enum ('net_annuel','brut_annuel','inconnu');

create or replace function set_updated_at() returns trigger language plpgsql set search_path = '' as $$ begin new.updated_at = now(); return new; end $$;

-- Utilisateurs (profil applicatif lié à auth.users de Supabase)
create table users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique, full_name text not null, role text not null default 'candidate' check (role in ('candidate','admin')),
  consent_data_processing_at timestamptz, retention_days int not null default 365,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());

create table professional_profiles (
  id uuid primary key default gen_random_uuid(), user_id uuid not null unique references users(id) on delete cascade,
  headline text, summary text, location text, languages jsonb not null default '[]',
  verified_at timestamptz,                       -- NULL = non confirmé par la candidate : interdit en candidature réelle
  source text, created_at timestamptz not null default now(), updated_at timestamptz not null default now());

create table career_preferences (
  id uuid primary key default gen_random_uuid(), user_id uuid not null unique references users(id) on delete cascade,
  contract text not null default 'CDI' check (contract = 'CDI'), regions text[] not null default '{Île-de-France}',
  target_titles text[] not null default '{}', sectors text[] not null default '{}', priority_companies text[] not null default '{}',
  salary_min int, salary_max int, salary_basis salary_basis not null default 'inconnu',
  salary_confirmed_at timestamptz,               -- le filtre salaire reste inactif tant que NULL
  benefits text[] not null default '{}', score_weights jsonb not null default
    '{"competences":30,"missions":25,"localisation":15,"experience":15,"salaire":10,"secteur_avantages":5}',
  automation automation_mode not null default 'assiste', daily_target int not null default 5 check (daily_target between 0 and 10),
  schedule jsonb not null default '{"tz":"Europe/Paris","days":[1,2,3,4,5],"times":["07:00","09:00","11:00","14:00","17:30"]}',
  auto_submit_paused boolean not null default false,
  constraint weights_sum check ((score_weights->>'competences')::int + (score_weights->>'missions')::int + (score_weights->>'localisation')::int
    + (score_weights->>'experience')::int + (score_weights->>'salaire')::int + (score_weights->>'secteur_avantages')::int = 100),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());

create table work_experiences (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references users(id) on delete cascade,
  org text not null, role text not null, start_date date, end_date date, missions text[] not null default '{}', tools text[] not null default '{}',
  verified boolean not null default false, embedding extensions.vector(1536), created_at timestamptz not null default now());
create table educations (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references users(id) on delete cascade,
  school text not null, degree text not null, start_year int, end_year int, verified boolean not null default false);
create table skills (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references users(id) on delete cascade,
  name text not null, level text, verified boolean not null default false, unique (user_id, name));

create table resumes (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references users(id) on delete cascade,
  label text not null, storage_path text not null, is_master boolean not null default false, created_at timestamptz not null default now());
create table resume_versions (
  id uuid primary key default gen_random_uuid(), resume_id uuid not null references resumes(id) on delete cascade,
  job_offer_id uuid, storage_path text not null, content jsonb not null, fact_check_passed boolean not null default false, created_at timestamptz not null default now());
create table cover_letters (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references users(id) on delete cascade,
  job_offer_id uuid, storage_path text, body text not null, fact_check_passed boolean not null default false, created_at timestamptz not null default now());

create table companies (
  id uuid primary key default gen_random_uuid(), name text not null unique, sector text, careers_url text, is_priority boolean not null default false, in_cac40 boolean);
create table job_sources (
  id uuid primary key default gen_random_uuid(), key text not null unique, label text not null, kind text not null check (kind in ('api','careers_site','feed','manual')),
  terms_checked_at timestamptz, allows_auto_apply boolean not null default false,
  connector_tested_at timestamptz,               -- NULL = connecteur jamais testé : ne pas afficher « opérationnel »
  enabled boolean not null default false);

create table job_offers (
  id uuid primary key default gen_random_uuid(), source_id uuid not null references job_sources(id), company_id uuid references companies(id),
  external_id text, url text not null, title text not null, location text, contract text, description text,
  salary_text text, salary_min int, salary_max int, salary_basis salary_basis not null default 'inconnu',
  published_at timestamptz, discovered_at timestamptz not null default now(), expires_at timestamptz, is_active boolean not null default true,
  dedupe_hash text not null, embedding extensions.vector(1536), raw jsonb,
  unique (source_id, external_id), unique (dedupe_hash));
create index job_offers_discovered_idx on job_offers (discovered_at desc);
create index job_offers_embedding_idx on job_offers using hnsw (embedding extensions.vector_cosine_ops);

create table job_matches (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references users(id) on delete cascade, job_offer_id uuid not null references job_offers(id) on delete cascade,
  score int not null check (score between 0 and 100), breakdown jsonb not null, missing text[] not null default '{}',
  confidence text not null check (confidence in ('haute','moyenne','faible')), justification text not null, weights_used jsonb not null,
  created_at timestamptz not null default now(), unique (user_id, job_offer_id));
create index job_matches_score_idx on job_matches (user_id, score desc);

create table applications (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references users(id) on delete cascade, job_offer_id uuid not null references job_offers(id),
  status app_status not null default 'decouverte', channel text, applied_at timestamptz,
  submission_proof jsonb,                         -- obligatoire pour passer à 'envoyee'
  next_action text, last_activity_at timestamptz not null default now(),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique (user_id, job_offer_id),                  -- anti-candidatures multiples
  constraint sent_requires_proof check (status not in ('envoyee','accuse','entretien') or (submission_proof is not null and applied_at is not null)));
create table application_documents (
  id uuid primary key default gen_random_uuid(), application_id uuid not null references applications(id) on delete cascade,
  kind text not null check (kind in ('cv','lettre','preuve')), resume_version_id uuid references resume_versions(id), cover_letter_id uuid references cover_letters(id), storage_path text);
create table application_events (
  id uuid primary key default gen_random_uuid(), application_id uuid not null references applications(id) on delete cascade,
  type text not null, actor text not null, payload jsonb not null default '{}', created_at timestamptz not null default now());
create table email_threads (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references users(id) on delete cascade, application_id uuid references applications(id) on delete set null,
  provider text not null check (provider in ('gmail','outlook')), provider_thread_id text not null, classification text check (classification in ('accuse','refus','entretien','autre')),
  match_confidence numeric(3,2), needs_confirmation boolean not null default false, snippet text, received_at timestamptz, unique (user_id, provider, provider_thread_id));
create table interviews (
  id uuid primary key default gen_random_uuid(), application_id uuid not null references applications(id) on delete cascade, scheduled_at timestamptz, location text, status text not null default 'detecte' check (status in ('detecte','confirme','termine','annule')), calendar_event_id text);

create table agent_runs (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references users(id) on delete cascade, agent agent_name not null, status run_status not null default 'queued',
  trigger text not null default 'schedule', started_at timestamptz, finished_at timestamptz, actions int not null default 0, error text, idempotency_key text unique);
create table agent_tasks (
  id uuid primary key default gen_random_uuid(), run_id uuid not null references agent_runs(id) on delete cascade, kind text not null, status run_status not null default 'queued',
  attempts int not null default 0, payload jsonb not null default '{}', result jsonb, scheduled_for timestamptz not null default now());
create table agent_logs (
  id bigserial primary key, run_id uuid references agent_runs(id) on delete cascade, level text not null default 'info', message text not null, decision jsonb, created_at timestamptz not null default now());
create table approval_requests (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references users(id) on delete cascade, application_id uuid not null references applications(id) on delete cascade,
  reason text not null, status text not null default 'pending' check (status in ('pending','approved','rejected','expired')), decided_at timestamptz, created_at timestamptz not null default now());
create table notifications (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references users(id) on delete cascade, kind text not null, title text not null, body text, read_at timestamptz, created_at timestamptz not null default now());
create table daily_reports (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references users(id) on delete cascade, report_date date not null, metrics jsonb not null, summary text, pdf_path text, emailed_at timestamptz, unique (user_id, report_date));
create table integration_connections (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references users(id) on delete cascade, provider text not null, scopes text[] not null default '{}',
  secret_ref text not null,                       -- référence au coffre (jamais le token en clair)
  status text not null default 'pending', last_tested_at timestamptz, unique (user_id, provider));
create table audit_logs (
  id bigserial primary key, user_id uuid references users(id) on delete set null, actor text not null, action text not null, entity text, entity_id text, details jsonb, created_at timestamptz not null default now());
create table system_settings (key text primary key, value jsonb not null, updated_at timestamptz not null default now());

-- Triggers updated_at
create trigger t_users_u before update on users for each row execute function set_updated_at();
create trigger t_pp_u before update on professional_profiles for each row execute function set_updated_at();
create trigger t_cp_u before update on career_preferences for each row execute function set_updated_at();
create trigger t_app_u before update on applications for each row execute function set_updated_at();

-- Row Level Security : chaque candidate ne voit que ses données.
do $$ declare t text; begin
  foreach t in array array['users','professional_profiles','career_preferences','work_experiences','educations','skills','resumes','cover_letters','job_matches','applications','email_threads','agent_runs','approval_requests','notifications','daily_reports','integration_connections','audit_logs'] loop
    execute format('alter table %I enable row level security', t);
  end loop; end $$;
create policy own_users on users for all using (id = (select auth.uid())) with check (id = (select auth.uid()));
do $$ declare t text; begin
  foreach t in array array['professional_profiles','career_preferences','work_experiences','educations','skills','resumes','cover_letters','job_matches','applications','email_threads','agent_runs','approval_requests','notifications','daily_reports','integration_connections'] loop
    execute format('create policy own_%1$s on %1$I for all using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()))', t);
  end loop; end $$;
create policy own_audit_read on audit_logs for select using (user_id = (select auth.uid()));
-- Tables enfants : accès via la candidature parente
alter table application_documents enable row level security; alter table application_events enable row level security; alter table interviews enable row level security;
alter table resume_versions enable row level security; alter table agent_tasks enable row level security; alter table agent_logs enable row level security;
create policy own_ad on application_documents for all using (exists (select 1 from applications a where a.id = application_id and a.user_id = (select auth.uid())));
create policy own_ae on application_events for all using (exists (select 1 from applications a where a.id = application_id and a.user_id = (select auth.uid())));
create policy own_iv on interviews for all using (exists (select 1 from applications a where a.id = application_id and a.user_id = (select auth.uid())));
create policy own_rv on resume_versions for all using (exists (select 1 from resumes r where r.id = resume_id and r.user_id = (select auth.uid())));
create policy own_at on agent_tasks for select using (exists (select 1 from agent_runs r where r.id = run_id and r.user_id = (select auth.uid())));
create policy own_al on agent_logs for select using (exists (select 1 from agent_runs r where r.id = run_id and r.user_id = (select auth.uid())));
-- Catalogues partagés en lecture seule ; écritures par le service (clé service_role, hors RLS)
alter table companies enable row level security; alter table job_sources enable row level security; alter table job_offers enable row level security; alter table system_settings enable row level security;
create policy read_companies on companies for select to authenticated using (true);
create policy read_sources on job_sources for select to authenticated using (true);
create policy read_offers on job_offers for select to authenticated using (true);
