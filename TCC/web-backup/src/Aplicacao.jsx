import { useState } from "react";

import PaginaInicial from "./components/inicio/PaginaInicial";
import TelaEntrada from "./components/sistema/TelaEntrada";
import Sistema from "./components/sistema/Sistema";

function Aplicacao() {
  const [tela, setTela] = useState("inicio");
  const [usuario, setUsuario] = useState(null);

  function entrar(usuarioLogado) {
    setUsuario(usuarioLogado);
    setTela("dashboard");
  }

  function sair() {
    setUsuario(null);
    setTela("inicio");
  }

  if (tela === "inicio") {
    return <PaginaInicial onEntrar={() => setTela("login")} />;
  }

  if (tela === "login") {
    return (
      <TelaEntrada
        onLogin={entrar}
        onVoltar={() => setTela("inicio")}
      />
    );
  }

  return (
    <Sistema
      telaInicial={tela}
      usuario={usuario}
      onSair={sair}
    />
  );
}

export default Aplicacao;