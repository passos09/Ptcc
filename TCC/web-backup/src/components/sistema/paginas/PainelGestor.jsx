function PainelGestor({ usuario }) {
  return (
    <>
      <div className="page-title">
        <div>
          <span>GESTOR • {usuario?.nome?.toUpperCase()}</span>
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
          <h2>Empresas sob seu acompanhamento</h2>
          <p>
            Aqui você acompanha as empresas que foram atribuídas ao seu perfil,
            suas pendências e os alertas que precisam de atenção.
          </p>
          <div className="mini-tags">
            <span>12 em dia</span>
            <span>2 pendentes</span>
            <span>2 alertas ativos</span>
          </div>
        </div>
      </section>

      <div className="metric-grid">
        <Metric value="12" text="Empresas em dia" />
        <Metric value="02" text="Pendências em aberto" alert />
        <Metric value="02" text="Alertas ativos" alert />
        <Metric value="14" text="Empresas atribuídas" />
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-title">
            <h2>Empresas que precisam de atenção</h2>
          </div>

          <CompanyRow
            name="Vale Sul Comércio Ltda."
            cnpj="12.345.678/0001-90"
            status="Pendente"
          />
          <CompanyRow
            name="Nordeste Materiais ME"
            cnpj="98.765.432/0001-11"
            status="Atenção"
          />
        </section>

        <section className="panel">
          <div className="panel-title">
            <h2>Últimos alertas</h2>
            <span className="dot-alert">●</span>
          </div>

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

      <section className="manager-info">
        <strong>Seu acesso é de Gestor</strong>
        <span>
          Você pode acompanhar pendências e documentos das empresas atribuídas.
          Cadastro de empresas e gerenciamento de usuários ficam disponíveis somente para administradores.
        </span>
      </section>
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

export default PainelGestor;