import { useState } from "react";

function Pendencias({ empresas, pendencias, onAdicionar }) {
  const [abrirFormulario, setAbrirFormulario] = useState(false);
  const [formulario, setFormulario] = useState({
    empresaId: empresas[0]?.id || "",
    descricao: "",
    tipo: "Fiscal",
    vencimento: "",
    status: "Pendente"
  });

  function salvar(evento) {
    evento.preventDefault();
    if (!formulario.empresaId || !formulario.descricao || !formulario.vencimento) return;
    onAdicionar({ ...formulario, empresaId: Number(formulario.empresaId) });
    setFormulario({
      empresaId: empresas[0]?.id || "",
      descricao: "",
      tipo: "Fiscal",
      vencimento: "",
      status: "Pendente"
    });
    setAbrirFormulario(false);
  }

  function nomeEmpresa(id) {
    return empresas.find((empresa) => empresa.id === id)?.nome || "Empresa";
  }

  return (
    <>
      <div className="page-title page-title-button">
        <div><span>PENDÊNCIAS REGISTRADAS</span><h1>Pendências por empresa</h1></div>
        <button className="button-primary small-button" onClick={() => setAbrirFormulario(true)}>+ Nova pendência</button>
      </div>

      <section className="panel table-panel">
        <div className="table-head">
          <span>DESCRIÇÃO</span><span>EMPRESA</span><span>VENCIMENTO</span><span>STATUS</span>
        </div>
        {pendencias.map((item) => (
          <div className="table-row" key={item.id}>
            <strong>{item.descricao}<small>{item.tipo}</small></strong>
            <span>{nomeEmpresa(item.empresaId)}</span>
            <span>{item.vencimento}</span>
            <span className={`status status-${item.status.toLowerCase().replace("ã", "a")}`}>{item.status}</span>
          </div>
        ))}
      </section>

      {abrirFormulario && (
        <div className="modal-fundo" onClick={() => setAbrirFormulario(false)}>
          <section className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-cabecalho"><div><span>CADASTRO</span><h2>Nova pendência</h2></div><button onClick={() => setAbrirFormulario(false)}>×</button></div>
            <form onSubmit={salvar}>
              <label>EMPRESA</label>
              <select value={formulario.empresaId} onChange={(e) => setFormulario({ ...formulario, empresaId: e.target.value })}>
                {empresas.map((empresa) => <option key={empresa.id} value={empresa.id}>{empresa.nome}</option>)}
              </select>
              <label>DESCRIÇÃO</label>
              <input value={formulario.descricao} onChange={(e) => setFormulario({ ...formulario, descricao: e.target.value })} placeholder="Ex.: Certidão estadual vencida" required />
              <div className="form-row">
                <div><label>TIPO</label><select value={formulario.tipo} onChange={(e) => setFormulario({ ...formulario, tipo: e.target.value })}><option>Fiscal</option><option>Documental</option></select></div>
                <div><label>VENCIMENTO</label><input value={formulario.vencimento} onChange={(e) => setFormulario({ ...formulario, vencimento: e.target.value })} placeholder="10/10/2026" required /></div>
              </div>
              <div className="modal-acoes"><button type="button" className="button-secondary" onClick={() => setAbrirFormulario(false)}>Cancelar</button><button className="button-primary">Salvar pendência</button></div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

export default Pendencias;
