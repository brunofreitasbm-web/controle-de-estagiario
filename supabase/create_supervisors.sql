-- ============================================================
-- CRIAÇÃO / ATUALIZAÇÃO DE SUPERVISORES E ADMINISTRADORES
-- Senha padrão configurada: admin321
-- Papel: supervisor com escopo workspace_scope: ["all"]
-- ============================================================

DO $$
DECLARE
  sup_user record;
  v_user_id uuid;
BEGIN
  CREATE TEMP TABLE tmp_supervisors (
    email text,
    name text
  ) ON COMMIT DROP;

  INSERT INTO tmp_supervisors (email, name) VALUES
    ('bruno@portoterapia.com', 'Bruno'),
    ('brunofreitasbm@gmail.com', 'Bruno'),
    ('guimelly@portoterapia.com', 'Guimelly'),
    ('isabella@portoterapia.com', 'Isabella'),
    ('isabella.vgoncalves@gmail.com', 'Isabella'),
    ('silvania@portoterapia.com', 'Silvania'),
    ('alessandra@portoterapia.com', 'Alessandra'),
    ('alessandradeeoliveira@gmail.com', 'Alessandra'),
    ('safira@portoterapia.com', 'Safira'),
    ('pontessafira920@gmail.com', 'Safira'),
    ('ian@portoterapia.com', 'Ian'),
    ('supervisor@portoterapia.com', 'Supervisor Geral');

  FOR sup_user IN SELECT * FROM tmp_supervisors LOOP
    SELECT id INTO v_user_id FROM auth.users WHERE lower(email) = lower(sup_user.email);

    IF v_user_id IS NOT NULL THEN
      -- Atualiza usuário existente mantendo ID
      UPDATE auth.users
      SET
        encrypted_password = crypt(CASE WHEN lower(sup_user.email) LIKE '%bruno%' THEN 'admin123' ELSE 'admin321' END, gen_salt('bf')),
        email_confirmed_at = COALESCE(email_confirmed_at, now()),
        raw_app_meta_data = jsonb_build_object(
          'provider', 'email',
          'providers', jsonb_build_array('email'),
          'role', 'supervisor',
          'workspace_scope', jsonb_build_array('all')
        ),
        raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object(
          'name', sup_user.name,
          'role', 'supervisor',
          'workspace_scope', jsonb_build_array('all')
        ),
        updated_at = now()
      WHERE id = v_user_id;

      -- Garante identidade de email
      IF NOT EXISTS (SELECT 1 FROM auth.identities WHERE user_id = v_user_id AND provider = 'email') THEN
        INSERT INTO auth.identities (
          id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
        ) VALUES (
          gen_random_uuid(),
          v_user_id,
          jsonb_build_object('sub', v_user_id::text, 'email', sup_user.email),
          'email',
          v_user_id::text,
          now(),
          now(),
          now()
        );
      END IF;
    ELSE
      -- Cria novo usuário com id aleatório
      v_user_id := gen_random_uuid();

      INSERT INTO auth.users (
        id,
        instance_id,
        email,
        encrypted_password,
        email_confirmed_at,
        raw_app_meta_data,
        raw_user_meta_data,
        aud,
        role,
        created_at,
        updated_at,
        confirmation_token,
        recovery_token,
        email_change_token_new,
        email_change,
        is_sso_user,
        is_anonymous
      ) VALUES (
        v_user_id,
        '00000000-0000-0000-0000-000000000000',
        sup_user.email,
        crypt(CASE WHEN lower(sup_user.email) LIKE '%bruno%' THEN 'admin123' ELSE 'admin321' END, gen_salt('bf')),
        now(),
        jsonb_build_object(
          'provider', 'email',
          'providers', jsonb_build_array('email'),
          'role', 'supervisor',
          'workspace_scope', jsonb_build_array('all')
        ),
        jsonb_build_object(
          'name', sup_user.name,
          'role', 'supervisor',
          'workspace_scope', jsonb_build_array('all')
        ),
        'authenticated',
        'authenticated',
        now(),
        now(),
        '', '', '', '',
        false,
        false
      );

      INSERT INTO auth.identities (
        id,
        user_id,
        identity_data,
        provider,
        provider_id,
        last_sign_in_at,
        created_at,
        updated_at
      ) VALUES (
        gen_random_uuid(),
        v_user_id,
        jsonb_build_object('sub', v_user_id::text, 'email', sup_user.email),
        'email',
        v_user_id::text,
        now(),
        now(),
        now()
      );
    END IF;

    -- Concede permissões em system_user_permissions
    INSERT INTO public.system_user_permissions (user_id, permissions, notes, updated_at)
    VALUES (v_user_id, '{}'::jsonb, 'Supervisor configurado via script', now())
    ON CONFLICT (user_id) DO UPDATE SET updated_at = now();

  END LOOP;
END $$;
