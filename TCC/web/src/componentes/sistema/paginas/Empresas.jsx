import { useState } from "react";

const formularioInicial = {
  nome: "",
  cnpj: "",
  telefone: "",
  endereco: "",
  email: ""
};

function Empresas({ empresas, onAdicionar }) {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [salvou, setSalvou] = useState(false);

  function alterar(campo, valor) {
    setFormulario((atual) => ({ ...atual, [campo]: valor }));
    setSalvou(false);
  }

  function salvar(evento) {
    evento.preventDefault();
    if (!formulario.nome || !formulario.cnpj) return;
    onAdicionar(formulario);
    setFormulario(formularioInicial);
    setSalvou(true);
  }

  return (
    <>
      <div className="page-title">
        <div><span>GESTÃO</span><h1>Cadastrar empresa</h1></div>
      </div>

      <div className="two-columns">
        <section className="panel form-panel">
          <h2>Nova empresa</h2>
          <form onSubmit={salvar}>
            <label>RAZÃO SOCIAL</label>
            <input value={formulario.nome} onChange={(e) => alterar("nome", e.target.value)} placeholder="Nome da empresa" required />

            <div className="form-row">
              <div>
                <label>CNPJ</label>
                <input value={formulario.cnpj} onChange={(e) => alterar("cnpj", e.target.value)} placeholder="12.345.678/0001-90" required />
              </div>
              <div>
                <label>TELEFONE</label>
                <input value={formulario.telefone} onChange={(e) => alterar("telefone", e.target.value)} placeholder="(11) 4000-1000" />
              </div>
            </div>

            <label>ENDEREÇO</label>
            <input value={formulario.endereco} onChange={(e) => alterar("endereco", e.target.value)} placeholder="Rua, número — Cidade/SP" />

            <label>E-MAIL</label>
            <input type="email" value={formulario.email} onChange={(e) => alterar("email", e.target.value)} placeholder="financeiro@empresa.com.br" />

            <p className="form-help">Depois do cadastro, a empresa fica disponível para acompanhamento de pendências e documentos.</p>
            <button className="button-primary">Salvar empresa</button>
            {salvou && <p className="success-message">Empresa cadastrada com sucesso.</p>}
          </form>
        </section>

        <section className="panel">
          <h2>Empresas cadastradas</h2>
          <p className="panel-description">{empresas.length} empresas monitoradas</p>
          {empresas.map((empresa) => (
            <CartaoEmpresa key={empresa.id} nome={empresa.nome} cnpj={empresa.cnpj} />
          ))}
        </section>
      </div>
    </>
  );
}

function CartaoEmpresa({ nome, cnpj }) {
  return <div className="company-card"><strong>{nome}</strong><small>{cnpj}</small></div>;
}

export default Empresas;
