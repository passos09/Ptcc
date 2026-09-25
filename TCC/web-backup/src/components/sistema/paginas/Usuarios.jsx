function Usuarios() {
  const usuarios = [
    ["Wendell", "wendell@docsystem.com.br", "Administrador", "Ativo"],
    ["Matheus", "matheus@docsystem.com.br", "Administrador", "Ativo"],
    ["PedroMoia", "pedromoia@docsystem.com.br", "Gestor", "Ativo"],
    ["PedroHenrique", "pedrohenrique@docsystem.com.br", "Gestor", "Ativo"]
  ];

  return (
    <>
      <div className="page-title page-title-button">
        <div>
          <span>ADMINISTRAÇÃO</span>
          <h1>Usuários e permissões</h1>
        </div>
        <button className="button-primary small-button">+ Novo usuário</button>
      </div>

      <section className="panel table-panel">
        <span className="panel-company">4 USUÁRIOS COM ACESSO AO SISTEMA</span>

        <div className="user-table-head">
          <span>NOME</span>
          <span>E-MAIL</span>
          <span>PERFIL</span>
          <span>STATUS</span>
        </div>

        {usuarios.map((usuario) => (
          <div className="user-table-row" key={usuario[1]}>
            <strong>{usuario[0]}</strong>
            <span>{usuario[1]}</span>
            <span className={`role-badge role-${usuario[2].toLowerCase()}`}>{usuario[2]}</span>
            <span className={`status status-${usuario[3].toLowerCase()}`}>{usuario[3]}</span>
          </div>
        ))}
      </section>

      <p className="table-note">
        O administrador define o perfil de cada usuário e escolhe quais empresas cada gerente pode visualizar.
      </p>
    </>
  );
}

export default Usuarios;