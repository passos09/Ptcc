import { useState } from "react";

function Usuarios({ usuarios, empresas = [], onAdicionar }) {
  const [abrirFormulario, setAbrirFormulario] = useState(false);

  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    senha: "",
    cargo: "Gestor",
    empresaId: empresas[0]?.id || ""
  });

  const [erro, setErro] = useState("");

  async function salvar(evento) {
    evento.preventDefault();
    setErro("");

    if (!formulario.nome || !formulario.email || !formulario.senha) {
      setErro("Preencha nome, e-mail e senha.");
      return;
    }

    if (formulario.senha.length < 8) {
      setErro("A senha deve possuir pelo menos 8 caracteres.");
      return;
    }

    if (formulario.cargo === "Gestor" && !formulario.empresaId) {
      setErro("Selecione uma empresa para o Gestor.");
      return;
    }

    const resultado = await onAdicionar(formulario);

    if (!resultado.sucesso) {
      setErro(resultado.erro || "Não foi possível criar o usuário.");
      return;
    }

    setFormulario({
      nome: "",
      email: "",
      senha: "",
      cargo: "Gestor",
      empresaId: empresas[0]?.id || ""
    });

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
              <label>SENHA</label>
              <input
                type="password"
                value={formulario.senha}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
                    senha: e.target.value
                  })
                }
                placeholder="Mínimo de 8 caracteres"
                required
              />

              <label>PERFIL</label>
              <select
                value={formulario.cargo}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
                    cargo: e.target.value,
                    empresaId:
                      e.target.value === "Gestor"
                        ? formulario.empresaId || empresas[0]?.id || ""
                        : ""
                  })
                }
              >
                <option>Gestor</option>
                <option>Administrador</option>
              </select>

              {formulario.cargo === "Gestor" && (
                <>
                  <label>EMPRESA</label>
                  <select
                    value={formulario.empresaId}
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        empresaId: e.target.value
                      })
                    }
                    required
                  >
                    <option value="">Selecione...</option>

                    {empresas.map((empresa) => (
                      <option key={empresa.id} value={empresa.id}>
                        {empresa.nome}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {erro && (
                <p className="login-error">
                  {erro}
                </p>
              )}
              <div className="modal-acoes"><button type="button" className="button-secondary" onClick={() => setAbrirFormulario(false)}>Cancelar</button><button className="button-primary">Salvar usuário</button></div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

export default Usuarios;
