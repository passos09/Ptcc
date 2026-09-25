import { useMemo, useState } from "react";
import BarraLateral from "./BarraLateral";
import BarraSuperior from "./BarraSuperior";
import Painel from "./paginas/Painel";
import PainelGestor from "./paginas/PainelGestor";
import Empresas from "./paginas/Empresas";
import Pendencias from "./paginas/Pendencias";
import Documentos from "./paginas/Documentos";
import Usuarios from "./paginas/Usuarios";
import Alertas from "./paginas/Alertas";
import { empresasIniciais, pendenciasIniciais } from "../../dados";

function Sistema({ usuario, usuarios, setUsuarios, onSair }) {
  const [tela, setTela] = useState("dashboard");
  const [empresas, setEmpresas] = useState(empresasIniciais);
  const [pendencias, setPendencias] = useState(pendenciasIniciais);

  const administrador = usuario?.cargo === "Administrador";

  const empresasVisiveis = useMemo(() => {
    if (administrador) return empresas;
    return empresas.filter((empresa) => usuario?.empresas?.includes(empresa.id));
  }, [administrador, empresas, usuario]);

  const pendenciasVisiveis = useMemo(() => {
    const ids = empresasVisiveis.map((empresa) => empresa.id);
    return pendencias.filter((pendencia) => ids.includes(pendencia.empresaId));
  }, [empresasVisiveis, pendencias]);

  function adicionarEmpresa(novaEmpresa) {
    setEmpresas((atuais) => [...atuais, { ...novaEmpresa, id: Date.now() }]);
  }

  function adicionarPendencia(novaPendencia) {
    setPendencias((atuais) => [...atuais, { ...novaPendencia, id: Date.now() }]);
  }

  function adicionarUsuario(novoUsuario) {
    setUsuarios((atuais) => [...atuais, { ...novoUsuario, id: Date.now(), senha: "123456", empresas: [] }]);
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
        documentos: <Documentos empresas={empresasVisiveis} />,
        usuarios: <Usuarios usuarios={usuarios} onAdicionar={adicionarUsuario} />
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
        documentos: <Documentos empresas={empresasVisiveis} />
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
