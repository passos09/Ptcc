function Navegacao({ onEntrar }) {
  return (
    <header className="site-navbar">
      <div className="brand">
        <img src="/favicon.png" alt="DOC-SYSTEM" className="brand-mark" />
        <span>DOC-SYSTEM</span>
      </div>
      <nav>
        <a href="#como-funciona">Como funciona</a>
        <a href="#recursos">Recursos</a>
        <a href="#contato">Fale conosco</a>
        <button onClick={onEntrar}>Acessar o sistema</button>
      </nav>
    </header>
  );
}

export default Navegacao;
