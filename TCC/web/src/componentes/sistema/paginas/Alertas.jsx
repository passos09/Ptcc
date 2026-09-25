function Alertas({ pendencias = [] }) {
  const alertas = pendencias.filter((item) => item.status !== "Regular");

  return (
    <>
      <div className="page-title"><div><span>GERAL</span><h1>Alertas</h1></div></div>
      <section className="panel table-panel">
        {alertas.length === 0 ? (
          <p className="vazio">Nenhum alerta ativo.</p>
        ) : (
          alertas.map((item) => (
            <div className="alert-list-row" key={item.id}>
              <span className={`alert-icon ${item.status === "Atenção" ? "yellow" : ""}`}>!</span>
              <div><strong>{item.descricao}</strong><small>{item.tipo} • vencimento {item.vencimento}</small></div>
              <span className={`status status-${item.status.toLowerCase().replace("ã", "a")}`}>{item.status}</span>
            </div>
          ))
        )}
      </section>
    </>
  );
}

export default Alertas;
