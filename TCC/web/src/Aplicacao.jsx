import { useState } from "react";
import { usuariosIniciais } from "./dados";
import PaginaInicial from "./componentes/inicio/PaginaInicial";
import TelaEntrada from "./componentes/sistema/TelaEntrada";
import Sistema from "./componentes/sistema/Sistema";

function Aplicacao() {
  const [tela, setTela] = useState("inicio");
  const [usuario, setUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState(usuariosIniciais);

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
    return <TelaEntrada usuarios={usuarios} onLogin={entrar} onVoltar={() => setTela("inicio")} />;
  }

  return <Sistema usuario={usuario} usuarios={usuarios} setUsuarios={setUsuarios} onSair={sair} />;
}

export default Aplicacao;
