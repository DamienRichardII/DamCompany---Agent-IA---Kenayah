-- À la création d'un compte (Supabase Auth), créer le profil applicatif et les préférences par défaut de KENAYAH.
-- Salaire : base « net annuel » indiquée par DamCompany ; salary_confirmed_at reste NULL jusqu'à confirmation de Sandrine dans l'interface.
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.users (id, email, full_name) values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)));
  insert into public.career_preferences (user_id, salary_min, salary_max, salary_basis, target_titles, sectors, priority_companies, benefits)
  values (new.id, 40000, 45000, 'net_annuel',
    array['Chargée de projets marketing','Cheffe de projet marketing','Cheffe de projet','Chargée de relation client','Cheffe de produit','Global Brand Manager','Marketing Product Manager','Talent Manager','Assistante de direction','Gestionnaire de clientèle','Chargée de communication','Responsable marketing'],
    array['Cosmétique et beauté','Mode et luxe','Construction durable','Retail','Télécommunications','CAC 40'],
    array['L''Oréal','Saint-Gobain','Edenred','Orange'],
    array['Intéressement','Participation','Titres-restaurant','Cantine','CSE']);
  insert into public.professional_profiles (user_id, source) values (new.id, 'CV_CDI_2026-7.pdf (à confirmer)');
  return new;
end $$;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
