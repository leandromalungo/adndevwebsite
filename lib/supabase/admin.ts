import 'server-only';
import { createClient } from '@supabase/supabase-js';

// VALIDAÇÃO: Verificar que credenciais de ambiente estão presentes
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

/**
 * Verificação de Ambiente:
 * Lança erro apenas se não estivermos em fase de Build.
 */
const isBuild = process.env.NEXT_PHASE === 'phase-production-build';

if (!supabaseUrl || !serviceRoleKey) {
  const missing = [];
  if (!supabaseUrl) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!serviceRoleKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");

  const errorMsg = `ERRO: Variáveis de ambiente em falta: ${missing.join(", ")}`;

  if (process.env.NODE_ENV === 'production' && !isBuild) {
    throw new Error(errorMsg);
  } else {
  }
}

/**
 * Cliente ADMIN (Ignora RLS - Acesso Total)
 * APENAS PARA USO EM SERVER ACTIONS E API ROUTES.
 * Este ficheiro tem "server-only" para impedir importações no frontend.
 */
export const supabaseAdmin = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  serviceRoleKey || 'placeholder'
);
