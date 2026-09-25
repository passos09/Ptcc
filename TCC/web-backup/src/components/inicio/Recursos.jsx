function Recursos() {
  const recursos = [
    ["01", "Monitoramento contínuo", "Acompanhe a situação das empresas sem precisar consultar tudo manualmente."],
    ["02", "Documentos por esfera", "Federal, estadual, municipal e contratual organizados em um único lugar."],
    ["03", "Alertas preventivos", "Veja pendências e prazos antes que eles se transformem em problemas."],
    ["04", "Perfis de acesso", "Cada usuário visualiza somente o que precisa para trabalhar."]
  ];

  return (
    <section className="section" id="recursos">
      <div className="section-heading">
        <span className="section-label">RECURSOS</span>
        <h2>Controle simples da sua carteira.</h2>
      </div>

      <div className="feature-grid">
        {recursos.map(([numero, titulo, texto]) => (
          <article className="feature-card" key={numero}>
            <span>{numero}</span>
            <h3>{titulo}</h3>
            <p>{texto}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Recursos;