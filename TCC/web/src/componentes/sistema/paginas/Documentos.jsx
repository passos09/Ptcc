import { useEffect, useState } from "react";
import {
  carregarDocumentosObrigatorios,
  enviarDocumento,
  baixarDocumento
} from "../../../supabaseClient";

function Documentos({
  empresas = [],
  usuario,
  onDocumentoEnviado
}) {
  const [empresaId, setEmpresaId] = useState(empresas[0]?.id || "");
  const [documentos, setDocumentos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [arquivo, setArquivo] = useState(null);
  const [dataEmissao, setDataEmissao] = useState("");
  const [dataVencimento, setDataVencimento] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [chaveArquivo, setChaveArquivo] = useState(0);

  const empresaSelecionada = empresas.find(
    (empresa) => empresa.id === Number(empresaId)
  );

  async function atualizarDocumentos(idEmpresa = empresaId) {
    if (!idEmpresa) return;

    setCarregando(true);

    const resultado =
      await carregarDocumentosObrigatorios(Number(idEmpresa));

    if (resultado.erro) {
      setErro(resultado.erro);
      setDocumentos([]);
    } else {
      setDocumentos(resultado.dados);
      setErro("");
    }

    setCarregando(false);
  }

  useEffect(() => {
    if (empresas.length === 0) return;

    const primeiroId = empresas[0].id;

    setEmpresaId(primeiroId);
    atualizarDocumentos(primeiroId);
  }, [empresas]);

  async function salvarDocumento(evento) {
    evento.preventDefault();

    setErro("");
    setMensagem("");

    if (!empresaId || !tipoSelecionado || !arquivo) {
      setErro("Selecione a empresa, o tipo de documento e o arquivo.");
      return;
    }

    const tipo = documentos.find(
      (item) =>
        item.tipoDocumentoId === Number(tipoSelecionado)
    );

    if (
      tipo?.exigeValidade &&
      !dataVencimento
    ) {
      setErro("Informe a data de vencimento deste documento.");
      return;
    }

    setCarregando(true);

    const resultado = await enviarDocumento({
      empresaId: Number(empresaId),
      tipoDocumentoId: Number(tipoSelecionado),
      usuarioId: usuario.id,
      arquivo,
      dataEmissao,
      dataVencimento
    });

    if (resultado.erro) {
      setErro(resultado.erro);
      setCarregando(false);
      return;
    }

    setMensagem("Documento enviado com sucesso.");
    setTipoSelecionado("");
    setArquivo(null);
    setDataEmissao("");
    setDataVencimento("");
    setChaveArquivo((atual) => atual + 1);

    await atualizarDocumentos();

    if (onDocumentoEnviado) {
      await onDocumentoEnviado();
    }

    setCarregando(false);
  }

  async function abrirDocumento(documento) {
    setErro("");

    const resultado = await baixarDocumento(documento.caminho);

    if (resultado.erro) {
      setErro(resultado.erro);
      return;
    }

    const url = URL.createObjectURL(resultado.arquivo);
    window.open(url, "_blank");

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 60000);
  }

  if (empresas.length === 0) {
    return (
      <section className="panel vazio">
        Nenhuma empresa disponível para este usuário.
      </section>
    );
  }

  const tipoAtual = documentos.find(
    (item) =>
      item.tipoDocumentoId === Number(tipoSelecionado)
  );

  return (
    <>
      <div className="page-title">
        <div>
          <span>GESTÃO DOCUMENTAL</span>
          <h1>Documentos da empresa</h1>
        </div>
      </div>

      <div className="two-columns">
        <section className="panel form-panel">
          <h2>Enviar documento</h2>

          <form onSubmit={salvarDocumento}>
            <label>EMPRESA</label>

            <select
              value={empresaId}
              onChange={(evento) => {
                const novoId = evento.target.value;

                setEmpresaId(novoId);
                setTipoSelecionado("");
                atualizarDocumentos(novoId);
              }}
            >
              {empresas.map((empresa) => (
                <option
                  key={empresa.id}
                  value={empresa.id}
                >
                  {empresa.nome}
                </option>
              ))}
            </select>

            <label>TIPO DE DOCUMENTO</label>

            <select
              value={tipoSelecionado}
              onChange={(evento) =>
                setTipoSelecionado(evento.target.value)
              }
              required
            >
              <option value="">
                Selecione...
              </option>

              {documentos.map((item) => (
                <option
                  key={item.tipoDocumentoId}
                  value={item.tipoDocumentoId}
                >
                  {item.nome}
                </option>
              ))}
            </select>

            <label>ARQUIVO</label>

            <input
              key={chaveArquivo}
              type="file"
              accept=".pdf,.xml,.jpg,.jpeg,.png,.xlsx"
              onChange={(evento) =>
                setArquivo(evento.target.files?.[0] || null)
              }
              required
            />

            <div className="form-row">
              <div>
                <label>DATA DE EMISSÃO</label>

                <input
                  type="date"
                  value={dataEmissao}
                  onChange={(evento) =>
                    setDataEmissao(evento.target.value)
                  }
                />
              </div>

              <div>
                <label>
                  DATA DE VENCIMENTO
                </label>

                <input
                  type="date"
                  value={dataVencimento}
                  onChange={(evento) =>
                    setDataVencimento(evento.target.value)
                  }
                  required={tipoAtual?.exigeValidade}
                />
              </div>
            </div>

            {tipoAtual && !tipoAtual.exigeValidade && (
              <p className="form-help">
                Este tipo de documento não exige data de vencimento.
              </p>
            )}

            <button
              className="button-primary"
              disabled={carregando}
            >
              {carregando
                ? "Enviando..."
                : "Enviar documento"}
            </button>

            {mensagem && (
              <p className="success-message">
                {mensagem}
              </p>
            )}

            {erro && (
              <p className="login-error">
                {erro}
              </p>
            )}
          </form>
        </section>

        <section className="panel">
          <h2>
            {empresaSelecionada?.nome || "Documentos"}
          </h2>

          <p className="panel-description">
            {documentos.length} documentos obrigatórios
          </p>

          {documentos.map((item) => (
            <Documento
              key={item.tipoDocumentoId}
              item={item}
              onAbrir={abrirDocumento}
            />
          ))}
        </section>
      </div>
    </>
  );
}

function Documento({ item, onAbrir }) {
  const classeStatus =
    item.status === "Regular"
      ? "regular"
      : item.status === "Atenção"
        ? "atencao"
        : "pendente";

  return (
    <div className="company-card">
      <div>
        <strong>{item.nome}</strong>

        <small>
          {item.documento
            ? item.documento.nome_arquivo
            : "Documento ainda não enviado"}
        </small>

        {item.documento?.data_vencimento && (
          <small>
            Vencimento:{" "}
            {item.documento.data_vencimento
              .split("-")
              .reverse()
              .join("/")}
          </small>
        )}
      </div>

      <div>
        <span
          className={`status status-${classeStatus}`}
        >
          {item.status}
        </span>

        {item.documento && (
          <button
            type="button"
            className="button-secondary small-button"
            onClick={() => onAbrir(item.documento)}
          >
            Abrir
          </button>
        )}
      </div>
    </div>
  );
}

export default Documentos;