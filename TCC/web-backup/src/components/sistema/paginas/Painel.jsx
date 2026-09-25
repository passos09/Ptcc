function Painel() {
  return (
    <>
      <div className="page-title">
        <div>
          <span>GERAL</span>
          <h1>Visão geral</h1>
        </div>
      </div>

      <section className="overview-card">
        <div className="gauge">
          <div>
            <strong>82%</strong>
            <span>REGULARIDADE</span>
          </div>
        </div>

        <div className="overview-text">
          <h2>21 empresas sob monitoramento contínuo</h2>
          <p>
            O sistema acompanha pendências fiscais e documentais por empresa,
            atualizando o índice de regularidade e disparando alertas preventivos.
          </p>
          <div className="mini-tags">
            <span>18 em dia</span>
            <span>3 pendentes</span>
            <span>2 alertas ativos</span>
          </div>
        </div>
      </section>

      <div className="metric-grid">
        <Metric value="18" text="Pendências resolvidas" />
        <Metric value="03" text="Pendências em aberto" alert />
        <Metric value="02" text="Alertas ativos" alert />
        <Metric value="21" text="Empresas monitoradas" />
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-title">
            <h2>Empresas com pendência</h2>
          </div>

          <CompanyRow name="Vale Sul Comércio Ltda." cnpj="12.345.678/0001-90" status="Pendente" />
          <CompanyRow name="Nordeste Materiais ME" cnpj="98.765.432/0001-11" status="Atenção" />
          <CompanyRow name="Central Distribuidora S.A." cnpj="45.222.111/0001-30" status="Regular" />
        </section>

        <section className="panel">
          <div className="panel-title">
            <h2>Situação documental: atenção</h2>
            <span className="dot-alert">●</span>
          </div>

          <div className="alert-box">
            <strong>1 empresa com contrato vencido há mais de 30 dias</strong>
          </div>

          <h3 className="subheading">Últimos alertas</h3>

          <div className="small-alert">
            <span className="alert-icon">!</span>
            <div>
              <strong>Pendência fiscal em aberto</strong>
              <small>Vale Sul Comércio Ltda.</small>
            </div>
            <small>há 2h</small>
          </div>

          <div className="small-alert">
            <span className="alert-icon yellow">!</span>
            <div>
              <strong>Certidão a vencer</strong>
              <small>Prefeitura de Guarulhos</small>
            </div>
            <small>01/10</small>
          </div>
        </section>
      </div>
    </>
  );
}

function Metric({ value, text, alert }) {
  return (
    <div className="metric">
      <strong className={alert ? "metric-alert" : ""}>{value}</strong>
      <span>{text}</span>
    </div>
  );
}

function CompanyRow({ name, cnpj, status }) {
  return (
    <div className="company-row">
      <div>
        <strong>{name}</strong>
        <small>{cnpj}</small>
      </div>
      <span className={`status status-${status.toLowerCase()}`}>{status}</span>
    </div>
  );
}

export default Painel;