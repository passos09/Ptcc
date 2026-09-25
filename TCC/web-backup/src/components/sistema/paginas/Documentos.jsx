function Documentos() {
  return (
    <>
      <div className="page-title">
        <div>
          <span>GESTÃO</span>
          <h1>Documentos por esfera</h1>
        </div>
      </div>

      <section className="panel documents-panel">
        <span className="panel-company">VALE SUL COMÉRCIO LTDA. • CERTIDÕES E CONTRATOS</span>

        <DocumentGroup
          title="FEDERAL"
          name="Receita Federal / PGFN"
          date="Validade até 14/12/2026"
          status="Regular"
        />

        <DocumentGroup
          title="ESTADUAL"
          name="Sefaz-SP — Inscrição estadual"
          date="Vencida em 28/08/2026"
          status="Pendente"
        />

        <DocumentGroup
          title="MUNICIPAL"
          name="Prefeitura de Guarulhos"
          date="Validade até 05/09/2026"
          status="Atenção"
        />

        <DocumentGroup
          title="CONTRATUAL"
          name="Contrato social — atualização anual"
          date="Próxima revisão: 03/2027"
          status="Regular"
        />
      </section>
    </>
  );
}

function DocumentGroup({ title, name, date, status }) {
  return (
    <div className="document-group">
      <span>{title}</span>
      <div className="document-row">
        <div>
          <strong>{name}</strong>
          <small>{date}</small>
        </div>
        <span className={`status status-${status.toLowerCase()}`}>{status}</span>
      </div>
    </div>
  );
}

export default Documentos;