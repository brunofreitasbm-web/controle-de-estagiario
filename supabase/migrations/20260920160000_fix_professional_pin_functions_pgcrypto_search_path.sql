-- As funções de PIN de prestadores PJ (professional_pins) usam crypt()/gen_salt(),
-- que vivem no schema 'extensions' (ver 20260910_fix_pgcrypto_search_path.sql).
-- Todas elas foram criadas com SET search_path = public (sem 'extensions'), então
-- toda chamada a crypt()/gen_salt() falhava com "function crypt(text, text) does
-- not exist". Isso quebrava silenciosamente qualquer verificação/gravação de PIN
-- de profissional — inclusive o trigger que provisiona o PIN padrão '000000' na
-- validação do cadastro (professional_assign_default_pin), o que fazia um
-- prestador validado ficar sem nenhuma linha em professional_pins e o quiosque
-- mostrar "Este prestador ainda não possui PIN" mesmo digitando o PIN padrão
-- corretamente.
ALTER FUNCTION public.verify_professional_pin_internal(uuid, text) SET search_path = public, extensions, pg_catalog;
ALTER FUNCTION public.set_professional_pin(uuid, text) SET search_path = public, extensions, pg_catalog;
ALTER FUNCTION public.change_professional_pin(uuid, text, text) SET search_path = public, extensions, pg_catalog;
ALTER FUNCTION public.accept_professional_terms(uuid, text, text) SET search_path = public, extensions, pg_catalog;
ALTER FUNCTION public.register_professional_presence(uuid, text, text, jsonb, text) SET search_path = public, extensions, pg_catalog;
ALTER FUNCTION public.professional_has_pin(uuid) SET search_path = public, extensions, pg_catalog;
ALTER FUNCTION public.professional_must_change_pin(uuid) SET search_path = public, extensions, pg_catalog;
ALTER FUNCTION public.professional_assign_default_pin() SET search_path = public, extensions, pg_catalog;
