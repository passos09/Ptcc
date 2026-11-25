import { useEffect, useMemo, useState } from "react";
import BarraLateral from "./BarraLateral";
import BarraSuperior from "./BarraSuperior";
import Painel from "./paginas/Painel";
import PainelGestor from "./paginas/PainelGestor";
import Empresas from "./paginas/Empresas";
import Pendencias from "./paginas/Pendencias";
import Documentos from "./paginas/Documentos";
import Usuarios from "./paginas/Usuarios";
import Alertas from "./paginas/Alertas";
import {
  carregarEmpresas,
  carregarPendencias,
  criarPendenciaManual,
  criarEmpresa,
  carregarUsuarios,
  criarUsuarioReal
} from "../../supabaseClient";

function Sistema({ usuario, usuarios, setUsuarios, onSair }) {
  const [tela, setTela] = useState("dashboard");
  const [empresas, setEmpresas] = useState([]);
  const [pendencias, setPendencias] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      const [resultadoEmpresas, resultadoPendencias] = await Promise.all([
        carregarEmpresas(),
        carregarPendencias()
      ]);

      if (!resultadoEmpresas.erro) {
        setEmpresas(resultadoEmpresas.dados);
      }

      if (!resultadoPendencias.erro) {
        setPendencias(resultadoPendencias.dados);
      }
    }

    carregarDados();
  }, []);
  async function atualizarPendencias() {
    const resultado = await carregarPendencias();

    if (!resultado.erro) {
      setPendencias(resultado.dados);
    }
  }

  const administrador = usuario?.cargo === "Administrador";

  const empresasVisiveis = useMemo(() => {
    if (administrador) return empresas;
    return empresas.filter((empresa) => usuario?.empresas?.includes(empresa.id));
  }, [administrador, empresas, usuario]);

  const pendenciasVisiveis = useMemo(() => {
    const ids = empresasVisiveis.map((empresa) => empresa.id);
    return pendencias.filter((pendencia) => ids.includes(pendencia.empresaId));
  }, [empresasVisiveis, pendencias]);

  async function adicionarEmpresa(novaEmpresa) {
    const resultado = await criarEmpresa(novaEmpresa);

    if (resultado.erro) {
      console.error("Erro ao cadastrar empresa:", resultado.erro);
      return false;
    }

    const [resultadoEmpresas, resultadoPendencias] = await Promise.all([
      carregarEmpresas(),
      carregarPendencias()
    ]);

    if (!resultadoEmpresas.erro) {
      setEmpresas(resultadoEmpresas.dados);
    }

    if (!resultadoPendencias.erro) {
      setPendencias(resultadoPendencias.dados);
    }

    return true;
  }

  async function adicionarPendencia(novaPendencia) {
    const resultado = await criarPendenciaManual(novaPendencia);

    if (resultado.erro) {
      console.error("Erro ao cadastrar pendência:", resultado.erro);
      return false;
    }

    const resultadoPendencias = await carregarPendencias();

    if (!resultadoPendencias.erro) {
      setPendencias(resultadoPendencias.dados);
    }

    return true;
  }

  async function adicionarUsuario(novoUsuario) {
    const resultado = await criarUsuarioReal(novoUsuario);

    if (resultado.erro) {
      console.error("Erro ao criar usuário:", resultado.erro);
      return {
        sucesso: false,
        erro: resultado.erro
      };
    }

    const resultadoUsuarios = await carregarUsuarios();

    if (!resultadoUsuarios.erro) {
      setUsuarios(resultadoUsuarios.dados);
    }

    return {
      sucesso: true,
      erro: null
    };
  }

  const paginas = administrador
    ? {
      dashboard: <Painel empresas={empresas} pendencias={pendencias} />,
      alertas: <Alertas pendencias={pendenciasVisiveis} />,
      empresas: <Empresas empresas={empresas} onAdicionar={adicionarEmpresa} />,
      pendencias: (
        <Pendencias
          empresas={empresas}
          pendencias={pendencias}
          onAdicionar={adicionarPendencia}
        />
      ),
      documentos: <Documentos
        empresas={empresasVisiveis}
        usuario={usuario}
        onDocumentoEnviado={atualizarPendencias}
      />,
      usuarios: (
        <Usuarios
          usuarios={usuarios}
          empresas={empresas}
          onAdicionar={adicionarUsuario}
        />
      )
    }
    : {
      dashboard: <PainelGestor usuario={usuario} empresas={empresasVisiveis} pendencias={pendenciasVisiveis} />,
      alertas: <Alertas pendencias={pendenciasVisiveis} />,
      pendencias: (
        <Pendencias
          empresas={empresasVisiveis}
          pendencias={pendenciasVisiveis}
          onAdicionar={adicionarPendencia}
        />
      ),
      documentos: <Documentos
        empresas={empresasVisiveis}
        usuario={usuario}
        onDocumentoEnviado={atualizarPendencias}
      />
    };

  return (
    <div className="system">
      <BarraLateral
        tela={tela}
        onMudarTela={setTela}
        onSair={onSair}
        administrador={administrador}
      />
      <main className="system-main">
        <BarraSuperior usuario={usuario} />
        <div className="page-content">
          {paginas[tela] || paginas.dashboard}
        </div>
      </main>
    </div>
  );
}

export default Sistema;
