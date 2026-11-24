import { useState } from "react";
import { entrarComSupabase } from "../../supabaseClient";

function TelaEntrada({ onLogin, onVoltar }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar(evento) {
    evento.preventDefault();
    setErro("");

    if (!email.trim() || !senha) {
      setErro("Preencha o e-mail e a senha.");
      return;
    }

    setCarregando(true);

    const resultado = await entrarComSupabase(email.trim(), senha);

    setCarregando(false);

    if (resultado.erro) {
      setErro(resultado.erro);
      return;
    }

    onLogin(resultado.usuario);
  }

  return (
    <div className="login-page">
      <div className="login-shape login-shape-one"></div>
      <div className="login-shape login-shape-two"></div>

      <button className="login-back" onClick={onVoltar}>
        ← Voltar
      </button>

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
            type="email"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            autoComplete="email"
          />

          <label>SENHA</label>

          <input
            type="password"
            value={senha}
            onChange={(evento) => setSenha(evento.target.value)}
            autoComplete="current-password"
          />

          <div className="identified-user">
            <span>●</span>

            <div>
              <strong>Autenticação segura</strong>
              <small>Login conectado ao DOC-SYSTEM</small>
            </div>
          </div>

          {erro && <p className="login-error">{erro}</p>}

          <button
            className="button-primary login-button"
            type="submit"
            disabled={carregando}
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TelaEntrada;