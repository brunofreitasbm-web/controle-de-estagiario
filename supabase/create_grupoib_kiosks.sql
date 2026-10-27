DO $$
DECLARE
  kiosk_users RECORD;
  v_user_id uuid;
BEGIN
  -- Cria tabela temporária com os quiosques do Grupo IB
  CREATE TEMP TABLE tmp_kiosks (
    email text PRIMARY KEY,
    name text,
    role text,
    unit_id text
  ) ON COMMIT DROP;

  INSERT INTO tmp_kiosks (email, name, role, unit_id) VALUES
    -- Parque Shopping
    ('parqueshopping@grupoib.internal', 'Estagiário - FaçaAmigos Parque Shopping', 'intern_unit', 'faca-amigos-parque-shopping'),
    ('pj-parqueshopping@grupoib.internal', 'Profissionais PJ - FaçaAmigos Parque Shopping', 'professional_unit', 'faca-amigos-parque-shopping'),
    ('clt-parqueshopping@grupoib.internal', 'Funcionários CLT - FaçaAmigos Parque Shopping', 'employee_unit', 'faca-amigos-parque-shopping'),

    -- Grão Pará
    ('graopara@grupoib.internal', 'Estagiário - FaçaAmigos Grão Pará', 'intern_unit', 'faca-amigos-grao-para'),
    ('pj-graopara@grupoib.internal', 'Profissionais PJ - FaçaAmigos Grão Pará', 'professional_unit', 'faca-amigos-grao-para'),
    ('clt-graopara@grupoib.internal', 'Funcionários CLT - FaçaAmigos Grão Pará', 'employee_unit', 'faca-amigos-grao-para'),

    -- Clínica A
    ('clinicaa@grupoib.internal', 'Estagiário - FaçaAmigos, Centro de Terapia Comportamental', 'intern_unit', 'clinica-a'),
    ('pj-clinicaa@grupoib.internal', 'Profissionais PJ - FaçaAmigos, Centro de Terapia Comportamental', 'professional_unit', 'clinica-a'),
    ('clt-clinicaa@grupoib.internal', 'Funcionários CLT - FaçaAmigos, Centro de Terapia Comportamental', 'employee_unit', 'clinica-a'),

    -- Clínica B
    ('clinicab@grupoib.internal', 'Estagiário - Clínica B', 'intern_unit', 'clinica-b'),
    ('pj-clinicab@grupoib.internal', 'Profissionais PJ - Clínica B', 'professional_unit', 'clinica-b'),
    ('clt-clinicab@grupoib.internal', 'Funcionários CLT - Clínica B', 'employee_unit', 'clinica-b');

  FOR kiosk_users IN SELECT * FROM tmp_kiosks LOOP
    SELECT id INTO v_user_id FROM auth.users WHERE email = kiosk_users.email;

    IF v_user_id IS NOT NULL THEN
      -- Atualiza usuário existente mantendo ID e integridade referencial
      UPDATE auth.users
      SET
        encrypted_password = crypt('estagio123', gen_salt('bf')),
        email_confirmed_at = COALESCE(email_confirmed_at, now()),
        raw_app_meta_data = jsonb_build_object(
          'provider', 'email',
          'providers', jsonb_build_array('email'),
          'role', kiosk_users.role,
          'unit_id', kiosk_users.unit_id,
          'workspace_scope', jsonb_build_array()
        ),
        raw_user_meta_data = jsonb_build_object(
          'name', kiosk_users.name,
          'role', kiosk_users.role,
          'unit_id', kiosk_users.unit_id
        ),
        updated_at = now()
      WHERE id = v_user_id;

      -- Garante identidade de email
      IF NOT EXISTS (SELECT 1 FROM auth.identities WHERE user_id = v_user_id AND provider = 'email') THEN
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
          jsonb_build_object('sub', v_user_id::text, 'email', kiosk_users.email),
          'email',
          v_user_id::text,
          now(),
          now(),
          now()
        );
      END IF;
    ELSE
      -- Cria novo usuário
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
        kiosk_users.email,
        crypt('estagio123', gen_salt('bf')),
        now(),
        jsonb_build_object(
          'provider', 'email',
          'providers', jsonb_build_array('email'),
          'role', kiosk_users.role,
          'unit_id', kiosk_users.unit_id,
          'workspace_scope', jsonb_build_array()
        ),
        jsonb_build_object(
          'name', kiosk_users.name,
          'role', kiosk_users.role,
          'unit_id', kiosk_users.unit_id
        ),
        'authenticated',
        'authenticated',
        now(),
        now(),
        '',
        '',
        '',
        '',
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
        jsonb_build_object('sub', v_user_id::text, 'email', kiosk_users.email),
        'email',
        v_user_id::text,
        now(),
        now(),
        now()
      );
    END IF;
  END LOOP;
END $$;
