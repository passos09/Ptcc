import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hbxkoeakmollppjzxpdf.supabase.co'
const supabaseKey = 'sb_publishable_VjVk5uEjUWZFc4T0P6uwQw_7rxqdJF-'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)
export async function testarConexao() {
    
  const { data, error } = await supabase
    .from("empresa")
    .select("*")
    .limit(1);

  if (error) {
    console.error("Erro na consulta:", error.message);
  } else {
    console.log("Consulta realizada:", data);
  }
}

export async function verificarSessao() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("Erro ao verificar sessão:", error.message);
    return;
  }

  console.log(
    "Usuário autenticado no Supabase:",
    data.session?.user?.email ?? "Nenhum"
  );
}

export async function entrarComSupabase(email, senha) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha
  });

  if (error) {
    return { usuario: null, erro: error.message };
  }

  return { usuario: data.user, erro: null };
}