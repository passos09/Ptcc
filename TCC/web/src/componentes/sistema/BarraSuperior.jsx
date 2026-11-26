import { useState, useEffect } from "react";

function BarraSuperior({ usuario }) {
  const [tema, setTema] = useState(
    () => localStorage.getItem("docsystem-tema") || "verde"
  );

  useEffect(() => {
    document.documentElement.dataset.tema = tema;
    localStorage.setItem("docsystem-tema", tema);
  }, [tema]);

  return (
    <header className="system-topbar">
      <div>
        <span>STATUS • DOC-SYSTEM</span>
      </div>

      <div className="topbar-right">
        <select
          className="seletor-tema"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          aria-label="Tema do sistema"
        >
          <option value="verde">Verde original</option>
<option value="escuro">Grafite</option>
<option value="claro">Cinza suave</option>

        </select>
        <span className="role">{usuario?.cargo?.toUpperCase()}</span>
        <span>{usuario?.nome}</span>
      </div>
    </header>
  );
}

export default BarraSuperior;