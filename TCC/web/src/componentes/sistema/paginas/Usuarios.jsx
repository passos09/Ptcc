import { useState } from "react";

function Usuarios({ usuarios, onAdicionar }) {
  const [abrirFormulario, setAbrirFormulario] = useState(false);
  const [formulario, setFormulario] = useState({ nome: "", email: "", cargo: "Gestor" });

  function salvar(evento) {
    evento.preventDefault();
    if (!formulario.nome || !formulario.email) return;
    onAdicionar(formulario);
    setFormulario({ nome: "", email: "", cargo: "Gestor" });
    setAbrirFormulario(false);
  }

  return (
    <>
      <div className="page-title page-title-button">
        <div><span>ADMINISTRAÇÃO</span><h1>Usuários e permissões</h1></div>
        <button className="button-primary small-button" onClick={() => setAbrirFormulario(true)}>+ Novo usuário</button>
      </div>

      <section className="panel table-panel">
        <span className="panel-company">{usuarios.length} USUÁRIOS COM ACESSO AO SISTEMA</span>
        <div className="user-table-head"><span>NOME</span><span>E-MAIL</span><span>PERFIL</span><span>STATUS</span></div>
        {usuarios.map((usuario) => (
          <div className="user-table-row" key={usuario.email}>
            <strong>{usuario.nome}</strong>
            <span>{usuario.email}</span>
            <span className={`role-badge role-${usuario.cargo.toLowerCase()}`}>{usuario.cargo}</span>
            <span className="status status-ativo">Ativo</span>
          </div>
        ))}
      </section>

      <p className="table-note">O administrador define o perfil de cada usuário e controla o acesso às áreas do sistema.</p>

      {abrirFormulario && (
        <div className="modal-fundo" onClick={() => setAbrirFormulario(false)}>
          <section className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-cabecalho"><div><span>ADMINISTRAÇÃO</span><h2>Novo usuário</h2></div><button onClick={() => setAbrirFormulario(false)}>×</button></div>
            <form onSubmit={salvar}>
              <label>NOME</label>
              <input value={formulario.nome} onChange={(e) => setFormulario({ ...formulario, nome: e.target.value })} placeholder="Nome do usuário" required />
              <label>E-MAIL</label>
              <input type="email" value={formulario.email} onChange={(e) => setFormulario({ ...formulario, email: e.target.value })} placeholder="usuario@docsystem.com.br" required />
              <label>PERFIL</label>
              <select value={formulario.cargo} onChange={(e) => setFormulario({ ...formulario, cargo: e.target.value })}><option>Gestor</option><option>Administrador</option></select>
              <p className="form-help">A senha inicial para a demonstração será 123456.</p>
              <div className="modal-acoes"><button type="button" className="button-secondary" onClick={() => setAbrirFormulario(false)}>Cancelar</button><button className="button-primary">Salvar usuário</button></div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

export default Usuarios;
