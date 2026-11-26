import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import PaginaInicial from "./componentes/inicio/PaginaInicial";
import TelaEntrada from "./componentes/sistema/TelaEntrada";
import Sistema from "./componentes/sistema/Sistema";

function Aplicacao() {
  const [tela, setTela] = useState("inicio");
  const [usuario, setUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroSessao, setErroSessao] = useState("");

  useEffect(() => {
    recuperarSessao();
  }, []);

  async function recuperarSessao() {
    setCarregando(true);
    setErroSessao("");

    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) throw error;
      if (!data.session) return;

      const { data: cadastro, error: erro } = await supabase
        .from("usuario")
        .select("id, nome, email, perfil_id, empresa_id, ativo")
        .eq("auth_user_id", data.session.user.id)
        .eq("ativo", true)
        .maybeSingle();

      if (erro) throw erro;

      if (!cadastro || ![1, 2].includes(cadastro.perfil_id)) {
        await supabase.auth.signOut();
        return;
      }

      entrar({
        ...cadastro,
        cargo: cadastro.perfil_id === 1
          ? "Administrador"
          : "Gestor",
        empresas: cadastro.empresa_id
          ? [cadastro.empresa_id]
          : []
      });

    } catch (error) {
      setErroSessao("Não foi possível recuperar a sessão.");
      console.error(error);
    } finally {
      setCarregando(false);
    }
  }

  function entrar(usuarioLogado) {
    setUsuario(usuarioLogado);
    setTela("dashboard");
  }

  async function sair() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Não foi possível encerrar a sessão.");
      return;
    }

    setUsuario(null);
    setUsuarios([]);
    setTela("inicio");
  }

  if (carregando) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#101c19",
        color: "#ffffff"
      }}>
        Carregando DOC-SYSTEM...
      </div>
    );
  }

  if (erroSessao) {
    return (
      <div style={{ padding: 30 }}>
        <p>{erroSessao}</p>
        <button onClick={recuperarSessao}>
          Tentar novamente
        </button>
        <button onClick={async () => {
          await sair();
          setErroSessao("");
        }}>
          Sair
        </button>
      </div>
    );
  }
  <form className="login-card" autoComplete="off"></form>

  if (tela === "inicio") {
    return (
      <PaginaInicial
        onEntrar={() => setTela("login")}
      />
    );
  }

  if (tela === "login" || !usuario) {
    return (
      <TelaEntrada
        onLogin={entrar}
        onVoltar={() => setTela("inicio")}
      />
    );
  }

  return (
    <Sistema
      usuario={usuario}
      usuarios={usuarios}
      setUsuarios={setUsuarios}
      onSair={sair}
    />
  );
}

export default Aplicacao;