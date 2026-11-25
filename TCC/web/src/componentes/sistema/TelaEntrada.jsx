import { useState } from "react";
import { supabase } from "../../supabaseClient";

function TelaEntrada({ onLogin, onVoltar }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar(evento) {
    evento.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: senha
        });

      if (error) {
        setErro("Não foi possível entrar. Verifique suas credenciais.");
        return;
      }

      const { data: usuario, error: erroUsuario } =
        await supabase
          .from("usuario")
          .select("id, nome, email, perfil_id, empresa_id, ativo")
          .eq("auth_user_id", data.user.id)
          .eq("ativo", true)
          .single();

      if (
        erroUsuario ||
        !usuario ||
        ![1, 2].includes(usuario.perfil_id)
      ) {
        await supabase.auth.signOut();
        setErro("Usuário sem acesso autorizado ao sistema.");
        return;
      }

      onLogin({
        ...usuario,
        cargo: usuario.perfil_id === 1
          ? "Administrador"
          : "Gestor",
        empresas: usuario.empresa_id
          ? [usuario.empresa_id]
          : []
      });

    } catch {
      await supabase.auth.signOut();
      setErro("Erro ao acessar o sistema.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-shape login-shape-one"></div>
      <div className="login-shape login-shape-two"></div>

      <button className="login-back" onClick={onVoltar} disabled={carregando}>
        ← Voltar
      </button>

      <div className="login-box">
        <span className="login-logo">D</span>
        <span className="section-label">ACESSO RESTRITO</span>

        <h1>Entrar</h1>

        <p>
          Acesse a central de monitoramento fiscal
          e documental da sua empresa.
        </p>

        <form onSubmit={entrar}>
          <label>E-MAIL</label>
          <input
            type="email"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            placeholder="Digite seu e-mail"
            autoComplete="username"
            required
          />

          <label>SENHA</label>
          <input
            type="password"
            value={senha}
            onChange={(evento) => setSenha(evento.target.value)}
            placeholder="Digite sua senha"
            autoComplete="current-password"
            required
          />

          {erro && <p className="login-error">{erro}</p>}

          <button
            className="button-primary login-button"
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
