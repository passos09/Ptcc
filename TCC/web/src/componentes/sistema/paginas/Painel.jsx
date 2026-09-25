function Painel({ empresas = [], pendencias = [] }) {
  const pendentes = pendencias.filter((item) => item.status === "Pendente").length;
  const alertas = pendencias.filter((item) => item.status !== "Regular").length;
  const regulares = pendencias.filter((item) => item.status === "Regular").length;

  return (
    <>
      <div className="page-title"><div><span>GERAL</span><h1>Visão geral</h1></div></div>
      <section className="overview-card">
        <div className="gauge"><div><strong>82%</strong><span>REGULARIDADE</span></div></div>
        <div className="overview-text">
          <h2>{empresas.length} empresas sob monitoramento contínuo</h2>
          <p>O sistema acompanha pendências fiscais e documentais por empresa, mantendo as informações organizadas e destacando o que precisa de atenção.</p>
          <div className="mini-tags"><span>{regulares} em dia</span><span>{pendentes} pendentes</span><span>{alertas} alertas ativos</span></div>
        </div>
      </section>

      <div className="metric-grid">
        <Metrica valor={String(Math.max(0, pendencias.length - pendentes))} texto="Pendências regulares" />
        <Metrica valor={String(pendentes).padStart(2, "0")} texto="Pendências em aberto" alerta />
        <Metrica valor={String(alertas).padStart(2, "0")} texto="Alertas ativos" alerta />
        <Metrica valor={String(empresas.length).padStart(2, "0")} texto="Empresas monitoradas" />
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-title"><h2>Empresas com pendência</h2></div>
          {empresas.map((empresa) => {
            const empresaPendencias = pendencias.filter((item) => item.empresaId === empresa.id);
            const status = empresaPendencias.some((item) => item.status === "Pendente") ? "Pendente" : empresaPendencias.length ? "Atenção" : "Regular";
            return <LinhaEmpresa key={empresa.id} nome={empresa.nome} cnpj={empresa.cnpj} status={status} />;
          })}
        </section>

        <section className="panel">
          <div className="panel-title"><h2>Situação documental: atenção</h2><span className="dot-alert">●</span></div>
          <div className="alert-box"><strong>{alertas} ocorrência(s) precisam de atenção.</strong></div>
          <h3 className="subheading">Últimos alertas</h3>
          {pendencias.filter((item) => item.status !== "Regular").slice(0, 2).map((item) => (
            <div className="small-alert" key={item.id}><span className={`alert-icon ${item.status === "Atenção" ? "yellow" : ""}`}>!</span><div><strong>{item.descricao}</strong><small>{item.vencimento}</small></div><small>{item.status}</small></div>
          ))}
        </section>
      </div>
    </>
  );
}

function Metrica({ valor, texto, alerta }) {
  return <div className="metric"><strong className={alerta ? "metric-alert" : ""}>{valor}</strong><span>{texto}</span></div>;
}

function LinhaEmpresa({ nome, cnpj, status }) {
  return <div className="company-row"><div><strong>{nome}</strong><small>{cnpj}</small></div><span className={`status status-${status.toLowerCase().replace("ã", "a")}`}>{status}</span></div>;
}

export default Painel;
