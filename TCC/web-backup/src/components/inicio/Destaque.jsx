function Destaque({ onEntrar }) {
  return (
    <main className="hero">
      <div className="hero-text">
        <span className="section-label">MONITORAMENTO FISCAL E DOCUMENTAL</span>

        <h1>
          Sua carteira de empresas
          <strong> sempre em dia.</strong>
        </h1>

        <p>
          O 3DS - DOC-SYSTEM acompanha pendências fiscais e documentais
          para você agir antes que um problema vire prazo perdido.
        </p>

        <div className="hero-buttons">
          <button className="button-primary" onClick={onEntrar}>
            Acessar o sistema
          </button>
          <a href="#como-funciona" className="button-secondary">
            Como funciona
          </a>
        </div>
      </div>

      <div className="hero-preview">
        <div className="preview-top">
          <div>
            <span>3DS - DOC-SYSTEM</span>
            <strong>Visão da carteira</strong>
          </div>
          <span className="preview-status">● Monitorando</span>
        </div>

        <div className="preview-company">
          <div className="company-avatar">VS</div>
          <div>
            <strong>Vale Sul Comércio Ltda.</strong>
            <span>CNPJ 12.345.678/0001-90</span>
          </div>
          <span className="status status-atencao">Atenção</span>
        </div>

        <div className="preview-company">
          <div className="company-avatar">NM</div>
          <div>
            <strong>Nordeste Materiais ME</strong>
            <span>CNPJ 98.765.432/0001-11</span>
          </div>
          <span className="status status-regular">Regular</span>
        </div>

        <div className="preview-company">
          <div className="company-avatar">CD</div>
          <div>
            <strong>Central Distribuidora S.A.</strong>
            <span>CNPJ 45.222.111/0001-30</span>
          </div>
          <span className="status status-pendente">Pendente</span>
        </div>
      </div>
    </main>
  );
}

export default Destaque;