import Navegacao from "./Navegacao";
import Destaque from "./Destaque";
import Recursos from "./Recursos";
import Estatisticas from "./Estatisticas";
import Rodape from "./Rodape";

function PaginaInicial({ onEntrar }) {
  return (
    <div className="landing">
      <Navegacao onEntrar={onEntrar} />
      <Destaque onEntrar={onEntrar} />
      <Recursos />
      <Estatisticas />
      <section className="landing-cta">
        <div>
          <span className="section-label">3DS - DOC-SYSTEM</span>
          <h2>Menos preocupação.<br />Mais controle.</h2>
          <p>
            Centralize o acompanhamento fiscal e documental das empresas
            em um só lugar.
          </p>
        </div>
        <button className="button-primary" onClick={onEntrar}>
          Acessar o sistema
        </button>
      </section>
      <Rodape />
    </div>
  );
}

export default PaginaInicial;