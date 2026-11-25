import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

const status = {
  aberta: "Aberta",
  em_andamento: "Em andamento",
  resolvida: "Resolvida",
  cancelada: "Cancelada"
};

function Historico({ empresas = [] }) {
  const [registros, setRegistros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarHistorico();
  }, []);

  async function carregarHistorico() {
    try {
      const { data, error } = await supabase
        .from("historico_pendencia")
        .select(`
          *,
          pendencia(titulo, empresa_id),
          usuario(nome)
        `)
        .order("criado_em", { ascending: false });

      if (error) throw error;

      setRegistros(data);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  const visiveis = registros.filter((item) =>
    empresas.some(
      (e) => e.id === item.pendencia?.empresa_id
    )
  );

  return (
    <>
      <div className="page-title">
        <div>
          <span>AUDITORIA</span>
          <h1>Histórico de pendências</h1>
        </div>
      </div>

      <p className="panel-description">
        Registro das alterações realizadas no sistema.
      </p>

      {erro && (
        <p style={{ color: "#ef4444" }}>{erro}</p>
      )}

      <section className="panel">
        <h2>Histórico de alterações</h2>

        {carregando && <p>Carregando histórico...</p>}

        {!carregando && !erro && !visiveis.length && (
          <p>Nenhuma alteração registrada.</p>
        )}

        {visiveis.map((item) => (
          <div
            className="company-card"
            key={item.id}
            style={{ marginTop: 12 }}
          >
            <strong>{item.pendencia?.titulo}</strong>

            <p>
              Empresa: {empresas.find(
                (e) => e.id === item.pendencia?.empresa_id
              )?.nome}
            </p>

            <p>
              {status[item.status_anterior] || "—"}
              {" → "}
              {status[item.status_novo] || "—"}
            </p>

            <p>
              Responsável: {
                item.origem === "sistema"
                  ? "Sistema automático"
                  : item.usuario?.nome ||
                    "Usuário não disponível"
              }
            </p>

            <small>
              {new Date(item.criado_em)
                .toLocaleString("pt-BR")}
            </small>

            {item.observacao && (
              <p>{item.observacao}</p>
            )}
          </div>
        ))}
      </section>
    </>
  );
}

export default Historico;