DO $$
DECLARE
  v_user_id uuid := 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22';
  v_gen_id uuid := 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a23';
BEGIN
  DELETE FROM auth.identities WHERE email IN ('antoniobarreto@portoterapia.com', 'generalissimo@portoterapia.com');
  DELETE FROM auth.users WHERE email IN ('antoniobarreto@portoterapia.com', 'generalissimo@portoterapia.com');

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
    'antoniobarreto@portoterapia.com',
    crypt('estagio123', gen_salt('bf')),
    now(),
    '{"provider": "email", "providers": ["email"], "role": "intern_unit", "unit_id": "antonio-barreto", "workspace_scope": []}'::jsonb,
    '{"name": "Estagiário Antônio Barreto", "role": "intern_unit", "unit_id": "antonio-barreto"}'::jsonb,
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
    jsonb_build_object('sub', v_user_id::text, 'email', 'antoniobarreto@portoterapia.com'),
    'email',
    v_user_id::text,
    now(),
    now(),
    now()
  );

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
    v_gen_id,
    '00000000-0000-0000-0000-000000000000',
    'generalissimo@portoterapia.com',
    crypt('estagio123', gen_salt('bf')),
    now(),
    '{"provider": "email", "providers": ["email"], "role": "intern_unit", "unit_id": "generalissimo", "workspace_scope": []}'::jsonb,
    '{"name": "Estagiário Generalíssimo", "role": "intern_unit", "unit_id": "generalissimo"}'::jsonb,
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
    v_gen_id,
    jsonb_build_object('sub', v_gen_id::text, 'email', 'generalissimo@portoterapia.com'),
    'email',
    v_gen_id::text,
    now(),
    now(),
    now()
  );
END $$;
