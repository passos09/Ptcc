function BarraLateral({ tela, onMudarTela, onSair, administrador }) {
  const menuGeral = [
    ["dashboard", "Painel"],
    ["alertas", "Alertas"]
  ];

  const menuGestao = [
    ["empresas", "Empresas"],
    ["pendencias", "Pendências"],
    ["documentos", "Documentos"]
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-mark">D</span>
        <div>
          <strong>3DS - DOC-SYSTEM</strong>
          <small>v1.0 • fiscal</small>
        </div>
      </div>

      <div className="menu-label">GERAL</div>

      <nav className="side-menu">
        {menuGeral.map(([id, nome]) => (
          <button
            key={id}
            className={tela === id ? "active" : ""}
            onClick={() => onMudarTela(id)}
          >
            {nome}
          </button>
        ))}
      </nav>

      <div className="menu-label">GESTÃO</div>

      <nav className="side-menu">
        {(administrador ? menuGestao : menuGestao.slice(1)).map(([id, nome]) => (
          <button
            key={id}
            className={tela === id ? "active" : ""}
            onClick={() => onMudarTela(id)}
          >
            {nome}
          </button>
        ))}
      </nav>

      {administrador && (
        <>
          <div className="menu-label">ADMINISTRAÇÃO</div>

          <nav className="side-menu">
            <button
              className={tela === "usuarios" ? "active" : ""}
              onClick={() => onMudarTela("usuarios")}
            >
              Usuários
            </button>
          </nav>
        </>
      )}

      <button className="side-logout" onClick={onSair}>Sair</button>

      <div className="logged-user">
        <span className="user-dot"></span>
        <div>
          <strong>{administrador ? "Administrador" : "Gestor"}</strong>
          <small>{administrador ? "Acesso completo" : "Acesso limitado"}</small>
        </div>
      </div>
    </aside>
  );
}

export default BarraLateral;