-- Sources inscrites DÉSACTIVÉES : conditions d'utilisation à vérifier et connecteur à tester avant activation.
insert into job_sources (key,label,kind) values
 ('france_travail','France Travail','api'),('hellowork','Hellowork (ATS partner API)','api'),('wttj_mantiks','Welcome to the Jungle (via Mantiks)','api'),
 ('indeed_hasdata','Indeed (via HasData)','api'),('apec','APEC','feed'),('linkedin','LinkedIn Jobs','feed'),('careers_generic','Sites carrières entreprises','careers_site')
on conflict (key) do nothing;
insert into companies (name,is_priority) values ('L''Oréal',true),('Saint-Gobain',true),('Edenred',true),('Orange',true) on conflict (name) do nothing;
