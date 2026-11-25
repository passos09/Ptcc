function Historico({ historicos = [] }) {
  function formatarData(data) {
    if (!data) return "";

    return new Date(data).toLocaleString("pt-BR");
  }

  function formatarStatus(status) {
    if (!status) return "—";

    return status
      .replace("_", " ")
      .replace(/^./, (letra) => letra.toUpperCase());
  }

  return (
    <>
      <div className="page-title">
        <div>
          <span>AUDITORIA</span>
          <h1>Histórico de alterações</h1>
        </div>
      </div>

      <section className="panel table-panel">
        {historicos.length === 0 ? (
          <p className="vazio">
            Nenhuma alteração registrada.
          </p>
        ) : (
          historicos.map((item) => (
            <div className="alert-list-row" key={item.id}>
              <span className="alert-icon">
                ↻
              </span>

              <div>
                <strong>{item.pendencia}</strong>

                <small>
                  {formatarStatus(item.statusAnterior)}
                  {" → "}
                  {formatarStatus(item.statusNovo)}
                </small>

                <small>
                  {item.usuario} • {formatarData(item.criadoEm)}
                </small>

                {item.observacao && (
                  <small>{item.observacao}</small>
                )}
              </div>

              <span className="status status-regular">
                {item.origem === "sistema"
                  ? "Sistema"
                  : "Usuário"}
              </span>
            </div>
          ))
        )}
      </section>
    </>
  );
}

export default Historico;