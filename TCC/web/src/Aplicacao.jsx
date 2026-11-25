import {
  testarConexao,
  verificarSessao,
  carregarUsuarioDaSessao,
  sairDoSupabase,
  carregarUsuarios
} from "./supabaseClient";
import { useEffect } from "react";
import { useState } from "react";
import { usuariosIniciais } from "./dados";
import PaginaInicial from "./componentes/inicio/PaginaInicial";
import TelaEntrada from "./componentes/sistema/TelaEntrada";
import Sistema from "./componentes/sistema/Sistema";

function Aplicacao() {
  const [tela, setTela] = useState("inicio");
  const [usuario, setUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    async function restaurarSessao() {
      testarConexao();
      verificarSessao();

      const resultado = await carregarUsuarioDaSessao();

      if (resultado.usuario) {
        setUsuario(resultado.usuario);

        if (resultado.usuario.cargo === "Administrador") {
          const resultadoUsuarios = await carregarUsuarios();

          if (!resultadoUsuarios.erro) {
            setUsuarios(resultadoUsuarios.dados);
          }
        }

        setTela("dashboard");
      }
    }

    restaurarSessao();
  }, []);

  async function entrar(usuarioLogado) {
    setUsuario(usuarioLogado);

    if (usuarioLogado.cargo === "Administrador") {
      const resultadoUsuarios = await carregarUsuarios();

      if (!resultadoUsuarios.erro) {
        setUsuarios(resultadoUsuarios.dados);
      }
    }

    setTela("dashboard");
  }

  async function sair() {
    await sairDoSupabase();
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
