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
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password: senha
    });

  if (authError) {
    return { usuario: null, erro: "E-mail ou senha incorretos." };
  }

  const authUser = authData.user;

  const { data: usuarioBanco, error: usuarioError } = await supabase
    .from("usuario")
    .select("id, nome, email, perfil_id, empresa_id, ativo")
    .eq("auth_user_id", authUser.id)
    .eq("ativo", true)
    .single();

  if (usuarioError || !usuarioBanco) {
    await supabase.auth.signOut();

    return {
      usuario: null,
      erro: "Usuário não está cadastrado ou está inativo."
    };
  }

  const { data: perfil, error: perfilError } = await supabase
    .from("perfil")
    .select("nome")
    .eq("id", usuarioBanco.perfil_id)
    .single();

  if (perfilError || !perfil) {
    await supabase.auth.signOut();

    return {
      usuario: null,
      erro: "Não foi possível identificar o perfil do usuário."
    };
  }

  return {
    usuario: {
      id: usuarioBanco.id,
      nome: usuarioBanco.nome,
      email: usuarioBanco.email,
      cargo: perfil.nome,
      empresas:
        perfil.nome === "Administrador"
          ? []
          : usuarioBanco.empresa_id
            ? [usuarioBanco.empresa_id]
            : []
    },
    erro: null
  };
}
export async function carregarEmpresas() {
  const { data, error } = await supabase
    .from("empresa")
    .select("id, razao_social, nome_fantasia, cnpj, email_contato, telefone, ativa")
    .eq("ativa", true)
    .order("id");

  if (error) {
    console.error("Erro ao carregar empresas:", error.message);
    return { dados: [], erro: error.message };
  }

  const empresas = data.map((empresa) => ({
    id: empresa.id,
    nome: empresa.razao_social,
    nomeFantasia: empresa.nome_fantasia,
    cnpj: empresa.cnpj,
    telefone: empresa.telefone || "",
    email: empresa.email_contato || "",
    endereco: ""
  }));

  return { dados: empresas, erro: null };
}

export async function carregarPendencias() {
  const [
    { data: pendencias, error: pendenciasError },
    { data: tipos, error: tiposError }
  ] = await Promise.all([
    supabase
      .from("pendencia")
      .select(
        "id, empresa_id, tipo_id, titulo, descricao, prioridade, status, data_vencimento"
      )
      .order("id"),

    supabase
      .from("tipo_pendencia")
      .select("id, nome")
  ]);

  if (pendenciasError) {
    console.error("Erro ao carregar pendências:", pendenciasError.message);
    return { dados: [], erro: pendenciasError.message };
  }

  if (tiposError) {
    console.error("Erro ao carregar tipos de pendência:", tiposError.message);
    return { dados: [], erro: tiposError.message };
  }

  const nomesTipos = new Map(
    tipos.map((tipo) => [tipo.id, tipo.nome])
  );

  const formatarData = (data) => {
    if (!data) return "Sem vencimento";

    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const converterStatus = (status, prioridade) => {
    if (status === "resolvida" || status === "cancelada") {
      return "Regular";
    }

    if (prioridade === "alta" || prioridade === "urgente") {
      return "Pendente";
    }

    return "Atenção";
  };

  const dados = pendencias.map((pendencia) => ({
    id: pendencia.id,
    empresaId: pendencia.empresa_id,
    descricao: pendencia.titulo || pendencia.descricao,
    tipo: nomesTipos.get(pendencia.tipo_id) || "Pendência",
    vencimento: formatarData(pendencia.data_vencimento),
    status: converterStatus(
      pendencia.status,
      pendencia.prioridade
    )
  }));

  return { dados, erro: null };
}
export async function criarPendenciaManual({
  empresaId,
  descricao,
  vencimento
}) {
  const { data: tipoManual, error: tipoError } = await supabase
    .from("tipo_pendencia")
    .select("id")
    .eq("nome", "Pendência manual")
    .single();

  if (tipoError || !tipoManual) {
    return {
      pendencia: null,
      erro: "Tipo de pendência manual não encontrado."
    };
  }

  let dataVencimento = null;

  if (vencimento) {
    const partes = vencimento.split("/");

    if (partes.length === 3) {
      const [dia, mes, ano] = partes;
      dataVencimento = `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
    }
  }

  const { data, error } = await supabase
    .from("pendencia")
    .insert({
      empresa_id: Number(empresaId),
      tipo_id: tipoManual.id,
      titulo: descricao,
      descricao: "Pendência cadastrada manualmente pelo sistema.",
      prioridade: "media",
      status: "aberta",
      data_vencimento: dataVencimento
    })
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar pendência:", error.message);

    return {
      pendencia: null,
      erro: error.message
    };
  }

  return {
    pendencia: data,
    erro: null
  };
}
export async function carregarDocumentosObrigatorios(empresaId) {
  const [
    { data: obrigatorios, error: obrigatoriosError },
    { data: tipos, error: tiposError },
    { data: documentos, error: documentosError }
  ] = await Promise.all([
    supabase
      .from("empresa_tipo_documento")
      .select("tipo_documento_id, obrigatorio, dias_alerta")
      .eq("empresa_id", empresaId)
      .eq("ativo", true)
      .order("tipo_documento_id"),

    supabase
      .from("tipo_documento")
      .select("id, nome, categoria, exige_validade")
      .eq("ativo", true),

    supabase
      .from("documento")
      .select(
        "id, empresa_id, tipo_documento_id, nome_arquivo, caminho, tipo_arquivo, tamanho_bytes, data_emissao, data_vencimento, enviado_em"
      )
      .eq("empresa_id", empresaId)
      .order("enviado_em", { ascending: false })
  ]);

  if (obrigatoriosError || tiposError || documentosError) {
    const erro =
      obrigatoriosError?.message ||
      tiposError?.message ||
      documentosError?.message;

    console.error("Erro ao carregar documentos:", erro);

    return {
      dados: [],
      erro
    };
  }

  const mapaTipos = new Map(
    tipos.map((tipo) => [tipo.id, tipo])
  );

  const documentosMaisRecentes = new Map();

  for (const documento of documentos) {
    if (!documentosMaisRecentes.has(documento.tipo_documento_id)) {
      documentosMaisRecentes.set(
        documento.tipo_documento_id,
        documento
      );
    }
  }

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const dados = obrigatorios.map((item) => {
    const tipo = mapaTipos.get(item.tipo_documento_id);
    const documento = documentosMaisRecentes.get(
      item.tipo_documento_id
    );

    let status = "Ausente";

    if (documento) {
      if (!tipo?.exige_validade || !documento.data_vencimento) {
        status = "Regular";
      } else {
        const vencimento = new Date(
          `${documento.data_vencimento}T00:00:00`
        );

        const limiteAlerta = new Date(hoje);
        limiteAlerta.setDate(
          limiteAlerta.getDate() + Number(item.dias_alerta || 30)
        );

        if (vencimento < hoje) {
          status = "Vencido";
        } else if (vencimento <= limiteAlerta) {
          status = "Atenção";
        } else {
          status = "Regular";
        }
      }
    }

    return {
      tipoDocumentoId: item.tipo_documento_id,
      nome: tipo?.nome || "Documento",
      categoria: tipo?.categoria || "outro",
      exigeValidade: tipo?.exige_validade ?? true,
      obrigatorio: item.obrigatorio,
      diasAlerta: item.dias_alerta,
      documento,
      status
    };
  });

  return {
    dados,
    erro: null
  };
}

export async function enviarDocumento({
  empresaId,
  tipoDocumentoId,
  usuarioId,
  arquivo,
  dataEmissao,
  dataVencimento
}) {
  if (!arquivo) {
    return {
      documento: null,
      erro: "Selecione um arquivo."
    };
  }

  const nomeSeguro = arquivo.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_");

  const caminho =
    `${empresaId}/${tipoDocumentoId}/` +
    `${Date.now()}-${nomeSeguro}`;

  const { error: uploadError } = await supabase.storage
    .from("documentos")
    .upload(caminho, arquivo, {
      contentType: arquivo.type || undefined,
      upsert: false
    });

  if (uploadError) {
    console.error("Erro no upload:", uploadError.message);

    return {
      documento: null,
      erro: uploadError.message
    };
  }

  const { data, error: bancoError } = await supabase
    .from("documento")
    .insert({
      enviado_por: usuarioId,
      nome_arquivo: arquivo.name,
      caminho,
      tipo_arquivo: arquivo.type || null,
      tamanho_bytes: arquivo.size,
      empresa_id: Number(empresaId),
      tipo_documento_id: Number(tipoDocumentoId),
      data_emissao: dataEmissao || null,
      data_vencimento: dataVencimento || null
    })
    .select()
    .single();

  if (bancoError) {
    console.error(
      "Erro ao registrar documento:",
      bancoError.message
    );

    await supabase.storage
      .from("documentos")
      .remove([caminho]);

    return {
      documento: null,
      erro: bancoError.message
    };
  }

  return {
    documento: data,
    erro: null
  };
}

export async function baixarDocumento(caminho) {
  const { data, error } = await supabase.storage
    .from("documentos")
    .download(caminho);

  if (error) {
    return {
      arquivo: null,
      erro: error.message
    };
  }

  return {
    arquivo: data,
    erro: null
  };
}