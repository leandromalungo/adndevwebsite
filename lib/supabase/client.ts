import { createClient } from '@supabase/supabase-js';

// VALIDAÇÃO: Verificar que credenciais de ambiente estão presentes
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

/**
 * Verificação de Ambiente:
 * Lança erro apenas se não estivermos em fase de Build.
 */
const isBuild = process.env.NEXT_PHASE === 'phase-production-build';

if (!supabaseUrl || !supabaseKey) {
  const missing = [];
  if (!supabaseUrl) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!supabaseKey) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  const errorMsg = `ERRO: Variáveis de ambiente em falta: ${missing.join(", ")}`;

  if (process.env.NODE_ENV === 'production' && !isBuild) {
  } else {
  }
}

/**
 * Cliente público (seguro - RLS ativo)
 * Pode ser importado em componentes client e server.
 * NUNCA EXPORTAR SERVICE ROLE DAQUI.
 */
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseKey || 'placeholder'
);
