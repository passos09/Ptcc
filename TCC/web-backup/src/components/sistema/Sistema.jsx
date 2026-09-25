import { useState } from "react";
import BarraLateral from "./BarraLateral";
import BarraSuperior from "./BarraSuperior";
import Painel from "./paginas/Painel";
import PainelGestor from "./paginas/PainelGestor";
import Empresas from "./paginas/Empresas";
import Pendencias from "./paginas/Pendencias";
import Documentos from "./paginas/Documentos";
import Usuarios from "./paginas/Usuarios";
import Alertas from "./paginas/Alertas";

function Sistema({ telaInicial = "dashboard", usuario, onSair }) {
  const [tela, setTela] = useState(telaInicial);

  const administrador = usuario?.cargo === "Administrador";

  const paginas = administrador
    ? {
        dashboard: <Painel usuario={usuario} />,
        alertas: <Alertas usuario={usuario} />,
        empresas: <Empresas />,
        pendencias: <Pendencias />,
        documentos: <Documentos />,
        usuarios: <Usuarios />
      }
    : {
        dashboard: <PainelGestor usuario={usuario} />,
        alertas: <Alertas usuario={usuario} />,
        pendencias: <Pendencias />,
        documentos: <Documentos />
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