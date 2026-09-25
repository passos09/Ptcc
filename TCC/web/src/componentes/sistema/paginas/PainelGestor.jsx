function PainelGestor({ usuario, empresas = [], pendencias = [] }) {
  const pendentes = pendencias.filter((item) => item.status === "Pendente").length;
  const alertas = pendencias.filter((item) => item.status !== "Regular").length;

  return (
    <>
      <div className="page-title"><div><span>GESTOR • {usuario?.nome?.toUpperCase()}</span><h1>Visão geral</h1></div></div>
      <section className="overview-card">
        <div className="gauge"><div><strong>82%</strong><span>REGULARIDADE</span></div></div>
        <div className="overview-text">
          <h2>Empresas sob seu acompanhamento</h2>
          <p>Aqui você acompanha as empresas atribuídas ao seu perfil, suas pendências e os alertas que precisam de atenção.</p>
          <div className="mini-tags"><span>{Math.max(0, empresas.length - pendentes)} em dia</span><span>{pendentes} pendentes</span><span>{alertas} alertas ativos</span></div>
        </div>
      </section>

      <div className="metric-grid">
        <Metrica valor={String(empresas.length)} texto="Empresas atribuídas" />
        <Metrica valor={String(pendentes).padStart(2, "0")} texto="Pendências em aberto" alerta />
        <Metrica valor={String(alertas).padStart(2, "0")} texto="Alertas ativos" alerta />
        <Metrica valor={String(pendencias.length)} texto="Registros acompanhados" />
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-title"><h2>Empresas que precisam de atenção</h2></div>
          {empresas.map((empresa) => {
            const temPendencia = pendencias.some((item) => item.empresaId === empresa.id && item.status !== "Regular");
            return <LinhaEmpresa key={empresa.id} nome={empresa.nome} cnpj={empresa.cnpj} status={temPendencia ? "Atenção" : "Regular"} />;
          })}
        </section>
        <section className="panel">
          <div className="panel-title"><h2>Últimos alertas</h2><span className="dot-alert">●</span></div>
          {pendencias.filter((item) => item.status !== "Regular").slice(0, 2).map((item) => (
            <div className="small-alert" key={item.id}><span className={`alert-icon ${item.status === "Atenção" ? "yellow" : ""}`}>!</span><div><strong>{item.descricao}</strong><small>{item.vencimento}</small></div><small>{item.status}</small></div>
          ))}
        </section>
      </div>

      <section className="manager-info"><strong>Seu acesso é de Gestor</strong><span>Você pode acompanhar pendências e documentos das empresas atribuídas. Cadastro de empresas e gerenciamento de usuários ficam disponíveis somente para administradores.</span></section>
    </>
  );
}

function Metrica({ valor, texto, alerta }) {
  return <div className="metric"><strong className={alerta ? "metric-alert" : ""}>{valor}</strong><span>{texto}</span></div>;
}

function LinhaEmpresa({ nome, cnpj, status }) {
  return <div className="company-row"><div><strong>{nome}</strong><small>{cnpj}</small></div><span className={`status status-${status.toLowerCase().replace("ã", "a")}`}>{status}</span></div>;
}

export default PainelGestor;
