import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

function Painel({ empresas = [], usuario }) {
  const [pendencias, setPendencias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarPendencias();
  }, []);

  async function carregarPendencias() {
    const { data, error } = await supabase
      .from("pendencia")
      .select("*")
      .order("criado_em", { ascending: false });

    if (error) {
      setErro(error.message);
    } else {
      setPendencias(data);
    }

    setCarregando(false);
  }

  const registros = pendencias.filter((p) =>
    empresas.some((e) => e.id === p.empresa_id)
  );

  const abertas = registros.filter((p) =>
    ["aberta", "em_andamento"].includes(p.status)
  );

  const resolvidas = registros.filter(
    (p) => p.status === "resolvida"
  );

  const alertas = abertas.filter(
    (p) => [2, 3].includes(p.tipo_id)
  );

  const empresasComPendencia = empresas.filter((e) =>
    abertas.some((p) => p.empresa_id === e.id)
  );

  const total = abertas.length + resolvidas.length;

  const percentual = total
    ? Math.round(resolvidas.length / total * 100)
    : 0;

  if (carregando) {
    return <p>Carregando dashboard...</p>;
  }

  if (erro) {
    return <p>Erro ao carregar painel: {erro}</p>;
  }

  return (
    <>
      <div className="page-title">
        <div>
          <span>{usuario?.cargo || "GERAL"}</span>
          <h1>Visão geral</h1>
        </div>
      </div>

      <p className="panel-description">
        Ambiente acadêmico — indicadores documentais
        não comprovam regularidade fiscal.
      </p>

      <section className="overview-card">
        <div
          className="gauge"
          style={{
            background: `conic-gradient(
              var(--green) ${percentual}%,
              var(--line) 0
            )`
          }}
        >
          <div>
            <strong>{total ? `${percentual}%` : "—"}</strong>
            <span>RESOLUÇÃO</span>
          </div>
        </div>

        <div className="overview-text">
          <h2>
            {empresas.length} empresas sob monitoramento
          </h2>

          <p>
            Acompanhe as pendências, os alertas de
            vencimento e os registros resolvidos.
          </p>

          <div className="mini-tags">
            <span>{resolvidas.length} resolvidas</span>
            <span>{abertas.length} em aberto</span>
            <span>{alertas.length} alertas ativos</span>
          </div>
        </div>
      </section>

      <div className="metric-grid">
        <Metrica
          valor={resolvidas.length}
          texto="Pendências resolvidas"
        />

        <Metrica
          valor={abertas.length}
          texto="Pendências em aberto"
          alerta
        />

        <Metrica
          valor={alertas.length}
          texto="Alertas de vencimento"
          alerta
        />

        <Metrica
          valor={empresas.length}
          texto="Empresas monitoradas"
        />
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-title">
            <h2>Situação das empresas</h2>
          </div>

          {empresas.map((empresa) => {
            const quantidade = abertas.filter(
              (p) => p.empresa_id === empresa.id
            ).length;

            return (
              <div className="company-row" key={empresa.id}>
                <div>
                  <strong>{empresa.nome}</strong>
                  <small>{empresa.cnpj}</small>
                </div>

                <span
                  className={`status ${
                    quantidade
                      ? "status-atencao"
                      : "status-regular"
                  }`}
                >
                  {quantidade
                    ? `${quantidade} pendência(s)`
                    : "Sem pendências abertas"}
                </span>
              </div>
            );
          })}
        </section>

        <section className="panel">
          <div className="panel-title">
            <h2>Pendências ativas</h2>
          </div>

          <div className="alert-box">
            <strong>
              {empresasComPendencia.length} empresa(s)
              precisam de acompanhamento.
            </strong>
          </div>

          {abertas.slice(0, 5).map((item) => (
            <div className="small-alert" key={item.id}>
              <span className="alert-icon yellow">!</span>

              <div>
                <strong>{item.titulo}</strong>
                <small>
                  {empresas.find(
                    (e) => e.id === item.empresa_id
                  )?.nome}
                </small>
              </div>

              <small>{item.prioridade}</small>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

function Metrica({ valor, texto, alerta }) {
  return (
    <div className="metric">
      <strong className={alerta ? "metric-alert" : ""}>
        {valor}
      </strong>
      <span>{texto}</span>
    </div>
  );
}

export default Painel;