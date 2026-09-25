function Pendencias() {
  const itens = [
    ["Pendência fiscal em aberto", "Fiscal", "10/09/2026", "Pendente"],
    ["Certidão estadual vencida — Sefaz-SP", "Documental", "28/08/2026", "Pendente"],
    ["Certidão municipal a vencer — Guarulhos", "Documental", "12/09/2026", "Atenção"],
    ["Obrigação fiscal municipal", "Fiscal", "10/10/2026", "Regular"]
  ];

  return (
    <>
      <div className="page-title page-title-button">
        <div>
          <span>VALE SUL COMÉRCIO LTDA. • 4 PENDÊNCIAS REGISTRADAS</span>
          <h1>Pendências por empresa</h1>
        </div>
        <button className="button-primary small-button">+ Nova pendência</button>
      </div>

      <section className="panel table-panel">
        <div className="table-head">
          <span>DESCRIÇÃO</span>
          <span>TIPO</span>
          <span>VENCIMENTO</span>
          <span>STATUS</span>
        </div>

        {itens.map((item) => (
          <div className="table-row" key={item[0]}>
            <strong>{item[0]}</strong>
            <span>{item[1]}</span>
            <span>{item[2]}</span>
            <span className={`status status-${item[3].toLowerCase()}`}>{item[3]}</span>
          </div>
        ))}
      </section>
    </>
  );
}

export default Pendencias;