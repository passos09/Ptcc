import { useState } from "react";

function Empresas() {
  const [salvou, setSalvou] = useState(false);

  function salvar(e) {
    e.preventDefault();
    setSalvou(true);
  }

  return (
    <>
      <div className="page-title">
        <div>
          <span>GESTÃO</span>
          <h1>Cadastrar empresa</h1>
        </div>
      </div>

      <div className="two-columns">
        <section className="panel form-panel">
          <h2>Cadastrar empresa</h2>

          <form onSubmit={salvar}>
            <label>RAZÃO SOCIAL</label>
            <input placeholder="Vale Sul Comércio Ltda." />

            <div className="form-row">
              <div>
                <label>CNPJ</label>
                <input placeholder="12.345.678/0001-90" />
              </div>
              <div>
                <label>TELEFONE</label>
                <input placeholder="(11) 4000-1000" />
              </div>
            </div>

            <label>ENDEREÇO</label>
            <input placeholder="Rua das Palmeiras, 100 — São Paulo/SP" />

            <label>E-MAIL</label>
            <input placeholder="financeiro@valesul.com.br" />

            <p className="form-help">
              O sistema cadastrará documentos e pendências e permitirá
              passar a monitorar automaticamente a empresa.
            </p>

            <button className="button-primary">Salvar empresa</button>

            {salvou && <p className="success-message">Empresa salva com sucesso.</p>}
          </form>
        </section>

        <section className="panel">
          <h2>Empresas cadastradas</h2>
          <p className="panel-description">3 empresas monitoradas</p>

          <CompanyCard name="Vale Sul Comércio Ltda." cnpj="12.345.678/0001-90" />
          <CompanyCard name="Nordeste Materiais ME" cnpj="98.765.432/0001-11" />
          <CompanyCard name="Central Distribuidora S.A." cnpj="45.222.111/0001-30" />
        </section>
      </div>
    </>
  );
}

function CompanyCard({ name, cnpj }) {
  return (
    <div className="company-card">
      <strong>{name}</strong>
      <small>{cnpj}</small>
    </div>
  );
}

export default Empresas;