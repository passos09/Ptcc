function Alertas() {
  return (
    <>
      <div className="page-title">
        <div>
          <span>GERAL</span>
          <h1>Alertas</h1>
        </div>
      </div>

      <section className="panel table-panel">
        <div className="alert-list-row">
          <span className="alert-icon">!</span>
          <div>
            <strong>Pendência fiscal em aberto</strong>
            <small>Vale Sul Comércio Ltda.</small>
          </div>
          <span className="status status-pendente">Pendente</span>
          <small>há 2h</small>
        </div>

        <div className="alert-list-row">
          <span className="alert-icon yellow">!</span>
          <div>
            <strong>Certidão a vencer</strong>
            <small>Prefeitura de Guarulhos</small>
          </div>
          <span className="status status-atencao">Atenção</span>
          <small>01/10/2026</small>
        </div>
      </section>
    </>
  );
}

export default Alertas;