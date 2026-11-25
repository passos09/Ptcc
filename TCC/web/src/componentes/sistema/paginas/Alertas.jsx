function Alertas({ notificacoes = [], onMarcarLida }) {
  function formatarData(data) {
    if (!data) return "";

    return new Date(data).toLocaleString("pt-BR");
  }

  return (
    <>
      <div className="page-title">
        <div>
          <span>GERAL</span>
          <h1>Alertas e notificações</h1>
        </div>
      </div>

      <section className="panel table-panel">
        {notificacoes.length === 0 ? (
          <p className="vazio">
            Nenhuma notificação disponível.
          </p>
        ) : (
          notificacoes.map((item) => (
            <div
              className="alert-list-row"
              key={item.id}
            >
              <span
                className={`alert-icon ${
                  item.lida ? "yellow" : ""
                }`}
              >
                !
              </span>

              <div>
                <strong>{item.mensagem}</strong>

                <small>
                  {formatarData(item.criada_em)}
                </small>
              </div>

              {item.lida ? (
                <span className="status status-regular">
                  Lida
                </span>
              ) : (
                <button
                  type="button"
                  className="button-secondary small-button"
                  onClick={() => onMarcarLida(item.id)}
                >
                  Marcar como lida
                </button>
              )}
            </div>
          ))
        )}
      </section>
    </>
  );
}

export default Alertas;