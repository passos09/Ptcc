import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

const statusDisponiveis = {
  aberta: "Aberta",
  em_andamento: "Em andamento",
  resolvida: "Resolvida",
  cancelada: "Cancelada"
};

function Pendencias({ empresas }) {
  const [pendencias, setPendencias] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [abrirFormulario, setAbrirFormulario] = useState(false);
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const [formulario, setFormulario] = useState({
    empresa_id: "",
    tipo_id: "",
    titulo: "",
    descricao: "",
    data_vencimento: "",
    prioridade: "media"
  });

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setCarregando(true);

    try {
      const [resultado, resultadoTipos] = await Promise.all([
        supabase.from("pendencia")
          .select("*")
          .order("criado_em", { ascending: false }),

        supabase.from("tipo_pendencia")
          .select("*")
          .order("id")
      ]);

      if (resultado.error) throw resultado.error;
      if (resultadoTipos.error) throw resultadoTipos.error;

      setPendencias(resultado.data);
      setTipos(resultadoTipos.data);
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
  }

  async function salvar(evento) {
    evento.preventDefault();
    if (salvando) return;

    setErro("");
    setSalvando(true);

    try {
      const { error } = await supabase
        .from("pendencia")
        .insert({
          empresa_id: Number(formulario.empresa_id),
          tipo_id: Number(formulario.tipo_id),
          titulo: formulario.titulo.trim(),
          descricao: formulario.descricao.trim() || null,
          data_vencimento: formulario.data_vencimento || null,
          prioridade: formulario.prioridade,
          status: "aberta"
        });

      if (error) throw error;

      setAbrirFormulario(false);
      setFormulario({
        empresa_id: "",
        tipo_id: "",
        titulo: "",
        descricao: "",
        data_vencimento: "",
        prioridade: "media"
      });

      await carregarDados();
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  }

  async function alterarStatus(id, status) {
    setErro("");

    const { error } = await supabase
      .from("pendencia")
      .update({
        status,
        data_resolucao:
          status === "resolvida"
            ? new Date().toISOString()
            : null,
        atualizado_em: new Date().toISOString()
      })
      .eq("id", id)
      .select("id")
      .single();

    if (error) {
      setErro(error.message);
      return;
    }

    await carregarDados();
  }

  const pendenciasVisiveis = pendencias.filter(
    (item) => empresas.some(
      (empresa) => empresa.id === item.empresa_id
    )
  );

  function nomeEmpresa(id) {
    return empresas.find((e) => e.id === id)?.nome || "Empresa";
  }

  function formatarData(data) {
    return data ? data.split("-").reverse().join("/") : "Sem prazo";
  }

  return (
    <>
      <div className="page-title page-title-button">
        <div>
          <span>GESTÃO DOCUMENTAL</span>
          <h1>Pendências por empresa</h1>
        </div>

        <button
          className="button-primary small-button"
          disabled={!empresas.length}
          onClick={() => {
            setErro("");
            setAbrirFormulario(true);
          }}
        >
          + Nova pendência
        </button>
      </div>

      <p className="panel-description">
        Ambiente acadêmico. Pendências documentais
        não comprovam irregularidade fiscal.
      </p>

      {erro && (
        <p role="alert" style={{ color: "#ef4444" }}>
          {erro}
        </p>
      )}

      <section className="panel table-panel">
        <div className="table-head">
          <span>DESCRIÇÃO</span>
          <span>EMPRESA</span>
          <span>VENCIMENTO</span>
          <span>STATUS</span>
        </div>

        {carregando && <p>Carregando pendências...</p>}

        {!carregando && !pendenciasVisiveis.length && (
          <p>Nenhuma pendência registrada.</p>
        )}

        {pendenciasVisiveis.map((item) => (
          <div className="table-row" key={item.id}>
            <strong>
              {item.titulo}
              <small>{item.prioridade}</small>
            </strong>

            <span>{nomeEmpresa(item.empresa_id)}</span>

            <span>{formatarData(item.data_vencimento)}</span>

            <select
              value={item.status}
              onChange={(e) =>
                alterarStatus(item.id, e.target.value)
              }
            >
              {Object.entries(statusDisponiveis).map(
                ([valor, nome]) => (
                  <option key={valor} value={valor}>
                    {nome}
                  </option>
                )
              )}
            </select>
          </div>
        ))}
      </section>

      {abrirFormulario && (
        <div className="modal-fundo">
          <section className="modal">
            <div className="modal-cabecalho">
              <div>
                <span>CADASTRO</span>
                <h2>Nova pendência</h2>
              </div>
              <button
                disabled={salvando}
                onClick={() => setAbrirFormulario(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={salvar}>
              <label>EMPRESA</label>

              <select
                required
                value={formulario.empresa_id}
                onChange={(e) =>
                  alterar("empresa_id", e.target.value)
                }
              >
                <option value="">Selecione</option>

                {empresas.map((empresa) => (
                  <option key={empresa.id} value={empresa.id}>
                    {empresa.nome}
                  </option>
                ))}
              </select>

              <label>TÍTULO</label>
              <input
                required
                value={formulario.titulo}
                onChange={(e) =>
                  alterar("titulo", e.target.value)
                }
              />

              <label>DESCRIÇÃO</label>
              <input
                value={formulario.descricao}
                onChange={(e) =>
                  alterar("descricao", e.target.value)
                }
              />

              <label>TIPO</label>
              <select
                required
                value={formulario.tipo_id}
                onChange={(e) =>
                  alterar("tipo_id", e.target.value)
                }
              >
                <option value="">Selecione</option>

                {tipos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nome}
                  </option>
                ))}
              </select>

              <label>VENCIMENTO</label>
              <input
                type="date"
                value={formulario.data_vencimento}
                onChange={(e) =>
                  alterar("data_vencimento", e.target.value)
                }
              />

              <label>PRIORIDADE</label>
              <select
                value={formulario.prioridade}
                onChange={(e) =>
                  alterar("prioridade", e.target.value)
                }
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
                <option value="urgente">Urgente</option>
              </select>

              {erro && (
                <p style={{ color: "#ef4444" }}>{erro}</p>
              )}

              <div className="modal-acoes">
                <button
                  type="button"
                  className="button-secondary"
                  disabled={salvando}
                  onClick={() => setAbrirFormulario(false)}
                >
                  Cancelar
                </button>

                <button
                  className="button-primary"
                  disabled={salvando}
                >
                  {salvando ? "Salvando..." : "Salvar pendência"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

export default Pendencias;