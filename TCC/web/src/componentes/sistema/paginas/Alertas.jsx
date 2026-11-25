import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

function Alertas({ usuario, empresas = [] }) {
  const [notificacoes, setNotificacoes] = useState([]);
  const [pendencias, setPendencias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setErro("");
    setCarregando(true);

    try {
      const [not, pend] = await Promise.all([
        supabase
          .from("notificacao")
          .select("*")
          .eq("usuario_id", usuario.id)
          .order("criada_em", { ascending: false }),

        supabase
          .from("pendencia")
          .select("id, empresa_id, status")
      ]);

      if (not.error) throw not.error;
      if (pend.error) throw pend.error;

      setNotificacoes(not.data);
      setPendencias(pend.data);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  async function marcarComoLida(id) {
    setErro("");

    const { error } = await supabase
      .from("notificacao")
      .update({ lida: true })
      .eq("id", id)
      .eq("usuario_id", usuario.id)
      .select("id")
      .single();

    if (error) {
      setErro(error.message);
      return;
    }

    setNotificacoes((atuais) =>
      atuais.map((n) =>
        n.id === id ? { ...n, lida: true } : n
      )
    );
  }

  const visiveis = notificacoes.filter((n) => {
    if (!n.pendencia_id) return true;

    const p = pendencias.find(
      (item) => item.id === n.pendencia_id
    );

    return p && empresas.some(
      (e) => e.id === p.empresa_id
    );
  });

  const naoLidas = visiveis.filter(
    (n) => !n.lida
  ).length;

  return (
    <>
      <div className="page-title">
        <div>
          <span>MONITORAMENTO</span>
          <h1>Alertas e notificações</h1>
        </div>
      </div>

      <p className="panel-description">
        Ambiente acadêmico — notificações documentais.
      </p>

      <div className="metric-grid">
        <div className="metric">
          <strong>{visiveis.length}</strong>
          <span>Total de notificações</span>
        </div>

        <div className="metric">
          <strong className="metric-alert">
            {naoLidas}
          </strong>
          <span>Não lidas</span>
        </div>

        <div className="metric">
          <strong>
            {visiveis.length - naoLidas}
          </strong>
          <span>Lidas</span>
        </div>
      </div>

      {erro && (
        <p role="alert" style={{ color: "#ef4444" }}>
          {erro}
        </p>
      )}

      <section className="panel">
        <h2>Central de notificações</h2>

        {carregando && <p>Carregando...</p>}

        {!carregando && !visiveis.length && (
          <p>Nenhuma notificação encontrada.</p>
        )}

        {visiveis.map((n) => (
          <div
            className="company-card"
            key={n.id}
            style={{
              marginTop: 12,
              opacity: n.lida ? 0.65 : 1
            }}
          >
            <strong>{n.mensagem}</strong>

            <p>
              {new Date(n.criada_em)
                .toLocaleString("pt-BR")}
            </p>

            <small>
              {n.lida ? "Lida" : "Nova notificação"}
            </small>

            {!n.lida && (
              <button
                className="button-primary small-button"
                onClick={() => marcarComoLida(n.id)}
                style={{ marginTop: 10 }}
              >
                Marcar como lida
              </button>
            )}
          </div>
        ))}
      </section>
    </>
  );
}

export default Alertas;
