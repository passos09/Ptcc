function BarraSuperior({ usuario }) {
  return (
    <header className="system-topbar">
      <div>
        <span>STATUS • 3DS - DOC-SYSTEM</span>
      </div>

      <div className="topbar-right">
        <span className="role">{usuario?.cargo?.toUpperCase()}</span>
        <span>{usuario?.nome}</span>
      </div>
    </header>
  );
}

export default BarraSuperior;