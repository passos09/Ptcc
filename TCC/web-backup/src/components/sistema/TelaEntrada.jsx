import { useState } from "react";

const usuarios = [
  {
    email: "wendell@docsystem.com.br",
    senha: "123456",
    nome: "Wendell",
    cargo: "Administrador"
  },
  {
    email: "matheus@docsystem.com.br",
    senha: "123456",
    nome: "Matheus",
    cargo: "Administrador"
  },
  {
    email: "pedromoia@docsystem.com.br",
    senha: "123456",
    nome: "PedroMoia",
    cargo: "Gestor"
  },
  {
    email: "pedrohenrique@docsystem.com.br",
    senha: "123456",
    nome: "PedroHenrique",
    cargo: "Gestor"
  }
];

function TelaEntrada({ onLogin, onVoltar }) {
  const [email, setEmail] = useState(usuarios[0].email);
  const [senha, setSenha] = useState("123456");
  const [usuario, setUsuario] = useState(usuarios[0]);
  const [erro, setErro] = useState("");

  function identificarUsuario(valor) {
    const encontrado = usuarios.find(
      (item) => item.email.toLowerCase() === valor.toLowerCase()
    );

    setUsuario(encontrado || null);
    setErro("");
  }

  function entrar(evento) {
    evento.preventDefault();

    const encontrado = usuarios.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.senha === senha
    );

    if (!encontrado) {
      setErro("E-mail ou senha incorretos.");
      return;
    }

    onLogin(encontrado);
  }

  return (
    <div className="login-page">
      <div className="login-shape login-shape-one"></div>
      <div className="login-shape login-shape-two"></div>

      <button className="login-back" onClick={onVoltar}>← Voltar</button>

      <div className="login-box">
        <span className="login-logo">D</span>

        <span className="section-label">ACESSO RESTRITO</span>
        <h1>Entrar</h1>
        <p>
          Acesse a central de monitoramento fiscal e documental da sua empresa.
        </p>

        <form onSubmit={entrar}>
          <label>E-MAIL</label>
          <input
            value={email}
            onChange={(evento) => {
              setEmail(evento.target.value);
              identificarUsuario(evento.target.value);
            }}
          />

          <label>SENHA</label>
          <input
            type="password"
            value={senha}
            onChange={(evento) => setSenha(evento.target.value)}
          />

          {usuario ? (
            <div className="identified-user">
              <span>●</span>
              <div>
                <strong>Perfil identificado: {usuario.cargo}</strong>
                <small>{usuario.nome} • acesso conforme seu perfil</small>
              </div>
            </div>
          ) : (
            <div className="identified-user unknown-user">
              <span>●</span>
              <div>
                <strong>Perfil não identificado</strong>
                <small>Digite um e-mail cadastrado</small>
              </div>
            </div>
          )}

          {erro && <p className="login-error">{erro}</p>}

          <button className="button-primary login-button">Entrar</button>
        </form>

        <button className="forgot">Esqueceu sua senha?</button>

        <div className="login-demo">
          <strong>Usuários para teste</strong>
          <span>Administrador: wendell@docsystem.com.br</span>
          <span>Administrador: matheus@docsystem.com.br</span>
          <span>Gestor: pedromoia@docsystem.com.br</span>
          <span>Gestor: pedrohenrique@docsystem.com.br</span>
          <small>Senha de todos: 123456</small>
        </div>
      </div>
    </div>
  );
}

export default TelaEntrada;
