import { useState } from "react";
import { supabase } from "./supabaseClient";
import PaginaInicial from "./componentes/inicio/PaginaInicial";
import TelaEntrada from "./componentes/sistema/TelaEntrada";
import Sistema from "./componentes/sistema/Sistema";

function Aplicacao() {
  const [tela, setTela] = useState("inicio");
  const [usuario, setUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

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