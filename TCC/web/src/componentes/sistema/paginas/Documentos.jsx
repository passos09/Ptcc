import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

const inicial = {
  empresa_id: "",
  tipo_documento_id: "",
  data_emissao: "",
  data_vencimento: ""
};

function Documentos({ empresas = [], usuario }) {
  const [documentos, setDocumentos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [formulario, setFormulario] = useState(inicial);
  const [arquivo, setArquivo] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setCarregando(true);

    try {
      const [docs, tiposDocs] = await Promise.all([
        supabase.from("documento")
          .select("*")
          .order("enviado_em", { ascending: false }),

        supabase.from("tipo_documento")
          .select("*")
          .eq("ativo", true)
          .order("nome")
      ]);

      if (docs.error) throw docs.error;
      if (tiposDocs.error) throw tiposDocs.error;

      setDocumentos(docs.data);
      setTipos(tiposDocs.data);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  function alterar(campo, valor) {
    setFormulario((atual) => ({
      ...atual,
      [campo]: valor
    }));

    setErro("");
    setSucesso("");
  }

  const tipoSelecionado = tipos.find(
    (t) => t.id === Number(formulario.tipo_documento_id)
  );

  async function salvar(evento) {
    evento.preventDefault();

    if (salvando) return;

    const form = evento.currentTarget;

    setErro("");
    setSucesso("");

    if (!arquivo || arquivo.type !== "application/pdf") {
      setErro("Selecione um arquivo PDF.");
      return;
    }

    if (arquivo.size > 10 * 1024 * 1024) {
      setErro("O arquivo deve possuir até 10 MB.");
      return;
    }

    if (
      tipoSelecionado?.exige_validade &&
      !formulario.data_vencimento
    ) {
      setErro("Informe a data de vencimento.");
      return;
    }

    if (
      formulario.data_emissao &&
      formulario.data_vencimento &&
      formulario.data_vencimento < formulario.data_emissao
    ) {
      setErro("O vencimento não pode ser anterior à emissão.");
      return;
    }

    setSalvando(true);

    const caminho =
      `${formulario.empresa_id}/${crypto.randomUUID()}.pdf`;

    let enviado = false;
    let registrado = false;

    try {
      const upload = await supabase.storage
        .from("documentos")
        .upload(caminho, arquivo, {
          contentType: "application/pdf",
          upsert: false
        });

      if (upload.error) throw upload.error;

      enviado = true;

      const { error } = await supabase
        .from("documento")
        .insert({
          empresa_id: Number(formulario.empresa_id),
          tipo_documento_id: Number(formulario.tipo_documento_id),
          enviado_por: usuario.id,
          nome_arquivo: arquivo.name,
          caminho: caminho,
          tipo_arquivo: arquivo.type,
          tamanho_bytes: arquivo.size,
          data_emissao: formulario.data_emissao || null,
          data_vencimento: formulario.data_vencimento || null
        });

      if (error) throw error;

      registrado = true;

      setFormulario(inicial);
      setArquivo(null);
      form.reset();
      setSucesso("Documento cadastrado com sucesso.");

      await carregarDados();

    } catch (error) {
      if (enviado && !registrado) {
        const limpeza = await supabase.storage
          .from("documentos")
          .remove([caminho]);

        if (limpeza.error) {
          setErro(
            error.message +
            " Não foi possível remover o arquivo do Storage."
          );
          return;
        }
      }

      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  }

  async function visualizar(documento) {
    setErro("");

    const { data, error } = await supabase.storage
      .from("documentos")
      .createSignedUrl(documento.caminho, 60);

    if (error) {
      setErro(error.message);
      return;
    }

    window.open(
      data.signedUrl,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function formatarData(data) {
    return data
      ? data.split("-").reverse().join("/")
      : "Sem validade";
  }

  function situacao(data) {
    if (!data) return "Sem validade";

    const agora = new Date();

    const hoje = Date.UTC(
      agora.getFullYear(),
      agora.getMonth(),
      agora.getDate()
    );

    const vencimento = Date.parse(data + "T00:00:00Z");

    const dias = Math.round(
      (vencimento - hoje) / 86400000
    );

    if (dias < 0) return "Vencido";
    if (dias <= 30) return "Próximo do vencimento";

    return "Dentro da validade";
  }

  const documentosVisiveis = documentos.filter(
    (d) => empresas.some((e) => e.id === d.empresa_id)
  );

  return (
    <>
      <div className="page-title">
        <div>
          <span>GESTÃO DOCUMENTAL</span>
          <h1>Documentos</h1>
        </div>
      </div>

      <p className="panel-description">
        Ambiente acadêmico. O controle de validade
        não comprova autenticidade ou regularidade fiscal.
      </p>

      <div className="two-columns">
        <section className="panel form-panel">
          <h2>Novo documento</h2>

          <form onSubmit={salvar}>
            <fieldset
              disabled={salvando}
              style={{ border: 0, padding: 0, margin: 0 }}
            >
              <label>EMPRESA</label>

              <select
                required
                value={formulario.empresa_id}
                onChange={(e) =>
                  alterar("empresa_id", e.target.value)
                }
              >
                <option value="">Selecione a empresa</option>

                {empresas.map((empresa) => (
                  <option key={empresa.id} value={empresa.id}>
                    {empresa.nome}
                  </option>
                ))}
              </select>

              <label>TIPO DE DOCUMENTO</label>

              <select
                required
                value={formulario.tipo_documento_id}
                onChange={(e) =>
                  alterar("tipo_documento_id", e.target.value)
                }
              >
                <option value="">Selecione o tipo</option>

                {tipos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nome}
                  </option>
                ))}
              </select>

              <label>DATA DE EMISSÃO</label>

              <input
                type="date"
                value={formulario.data_emissao}
                onChange={(e) =>
                  alterar("data_emissao", e.target.value)
                }
              />

              <label>DATA DE VENCIMENTO</label>

              <input
                type="date"
                required={!!tipoSelecionado?.exige_validade}
                value={formulario.data_vencimento}
                onChange={(e) =>
                  alterar("data_vencimento", e.target.value)
                }
              />

              <label>ARQUIVO PDF</label>

              <input
                type="file"
                accept=".pdf,application/pdf"
                required
                onChange={(e) =>
                  setArquivo(e.target.files[0] || null)
                }
              />

              <p className="form-help">
                Tamanho máximo: 10 MB.
              </p>

              <button
                className="button-primary"
                disabled={salvando || !empresas.length}
              >
                {salvando
                  ? "Enviando documento..."
                  : "Salvar documento"}
              </button>
            </fieldset>

            {erro && (
              <p role="alert" style={{ color: "#ef4444" }}>
                {erro}
              </p>
            )}

            {sucesso && (
              <p className="success-message">
                {sucesso}
              </p>
            )}
          </form>
        </section>

        <section className="panel">
          <h2>Documentos cadastrados</h2>

          <p className="panel-description">
            {documentosVisiveis.length} documentos
          </p>

          {carregando && <p>Carregando...</p>}

          {!carregando && !documentosVisiveis.length && (
            <p>Nenhum documento cadastrado.</p>
          )}

          {documentosVisiveis.map((doc) => (
            <div
              className="company-card"
              key={doc.id}
              style={{ marginBottom: 12 }}
            >
              <strong>{doc.nome_arquivo}</strong>

              <p>
                {empresas.find(
                  (e) => e.id === doc.empresa_id
                )?.nome}
              </p>

              <p>
                {tipos.find(
                  (t) => t.id === doc.tipo_documento_id
                )?.nome}
              </p>

              <small>
                Vencimento: {formatarData(doc.data_vencimento)}
              </small>

              <p
                style={{
                  color: !doc.data_vencimento
                    ? "inherit"
                    : situacao(doc.data_vencimento) === "Vencido"
                      ? "#ef4444"
                      : situacao(doc.data_vencimento) ===
                        "Próximo do vencimento"
                        ? "#f59e0b"
                        : "#62d6a4"
                }}
              >
                {situacao(doc.data_vencimento)}
              </p>

              <button
                className="button-secondary"
                onClick={() => visualizar(doc)}
              >
                Abrir PDF
              </button>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default Documentos;
