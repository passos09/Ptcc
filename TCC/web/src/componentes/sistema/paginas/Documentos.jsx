function Documentos({ empresas = [] }) {
  const empresa = empresas[0];

  if (!empresa) {
    return <section className="panel vazio">Nenhuma empresa disponível para este usuário.</section>;
  }

  return (
    <>
      <div className="page-title"><div><span>GESTÃO</span><h1>Documentos por esfera</h1></div></div>
      <section className="panel documents-panel">
        <span className="panel-company">{empresa.nome.toUpperCase()} • CERTIDÕES E CONTRATOS</span>
        <GrupoDocumento titulo="FEDERAL" nome="Receita Federal / PGFN" data="Validade até 14/12/2026" status="Regular" />
        <GrupoDocumento titulo="ESTADUAL" nome="Sefaz-SP — Inscrição estadual" data="Vencida em 28/08/2026" status="Pendente" />
        <GrupoDocumento titulo="MUNICIPAL" nome="Prefeitura de Guarulhos" data="Validade até 05/09/2026" status="Atenção" />
        <GrupoDocumento titulo="CONTRATUAL" nome="Contrato social — atualização anual" data="Próxima revisão: 03/2027" status="Regular" />
      </section>
    </>
  );
}

function GrupoDocumento({ titulo, nome, data, status }) {
  return (
    <div className="document-group">
      <span>{titulo}</span>
      <div className="document-row"><div><strong>{nome}</strong><small>{data}</small></div><span className={`status status-${status.toLowerCase().replace("ã", "a")}`}>{status}</span></div>
    </div>
  );
}

export default Documentos;
