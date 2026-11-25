import { useState } from "react";

const formularioInicial = {
  nome: "",
  cnpj: "",
  telefone: "",
  endereco: "",
  email: ""
};

function validarCNPJ(valor) {
  const cnpj = valor.replace(/\D/g, "");

  if (cnpj.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpj)) return false;

  function calcularDigito(base, pesos) {
    const soma = pesos.reduce(
      (total, peso, i) => total + Number(base[i]) * peso,
      0
    );

    const resto = soma % 11;

    return resto < 2 ? 0 : 11 - resto;
  }

  const primeiro = calcularDigito(
    cnpj,
    [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  );

  const segundo = calcularDigito(
    cnpj,
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  );

  return (
    primeiro === Number(cnpj[12]) &&
    segundo === Number(cnpj[13])
  );
}

function Empresas({ empresas, onAdicionar }) {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [salvou, setSalvou] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  function alterar(campo, valor) {
    setFormulario((atual) => ({
      ...atual,
      [campo]: valor
    }));

    setSalvou(false);
    setErro("");
  }

  async function salvar(evento) {
    evento.preventDefault();

    if (salvando) return;

    setErro("");
    setSalvou(false);

    if (!formulario.nome.trim()) {
      setErro("Informe a razão social.");
      return;
    }

    if (!validarCNPJ(formulario.cnpj)) {
      setErro("Informe um CNPJ numérico válido.");
      return;
    }

    setSalvando(true);

    try {
      await onAdicionar(formulario);

      setFormulario(formularioInicial);
      setSalvou(true);
    } catch (error) {
      setErro(error.message || "Erro ao cadastrar empresa.");
    } finally {
      setSalvando(false);
    }
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
          <h2>Nova empresa</h2>

          <form onSubmit={salvar}>
            <label>RAZÃO SOCIAL</label>
            <input
              value={formulario.nome}
              onChange={(e) => alterar("nome", e.target.value)}
              placeholder="Nome da empresa"
              required
              disabled={salvando}
            />

            <div className="form-row">
              <div>
                <label>CNPJ</label>
                <input
                  value={formulario.cnpj}
                  onChange={(e) => alterar("cnpj", e.target.value)}
                  placeholder="12.345.678/0001-90"
                  required
                  disabled={salvando}
                />
              </div>

              <div>
                <label>TELEFONE</label>
                <input
                  value={formulario.telefone}
                  onChange={(e) => alterar("telefone", e.target.value)}
                  placeholder="(11) 4000-1000"
                  disabled={salvando}
                />
              </div>
            </div>

            <label>ENDEREÇO</label>
            <input
              value={formulario.endereco}
              onChange={(e) => alterar("endereco", e.target.value)}
              placeholder="Rua, número — Cidade/SP"
              disabled={salvando}
            />

            <label>E-MAIL</label>
            <input
              type="email"
              value={formulario.email}
              onChange={(e) => alterar("email", e.target.value)}
              placeholder="financeiro@empresa.com.br"
              disabled={salvando}
            />

            <p className="form-help">
              Depois do cadastro, a empresa fica disponível
              para acompanhamento de pendências e documentos.
            </p>

            <button
              className="button-primary"
              disabled={salvando}
            >
              {salvando ? "Salvando..." : "Salvar empresa"}
            </button>

            {erro && (
              <p role="alert" style={{ color: "#ef4444" }}>
                {erro}
              </p>
            )}

            {salvou && (
              <p className="success-message">
                Empresa cadastrada com sucesso.
              </p>
            )}
          </form>
        </section>

        <section className="panel">
          <h2>Empresas cadastradas</h2>

          <p className="panel-description">
            {empresas.length} empresas monitoradas
          </p>

          {empresas.map((empresa) => (
            <CartaoEmpresa
              key={empresa.id}
              nome={empresa.nome}
              cnpj={empresa.cnpj}
            />
          ))}
        </section>
      </div>
    </>
  );
}

function CartaoEmpresa({ nome, cnpj }) {
  return (
    <div className="company-card">
      <strong>{nome}</strong>
      <small>{cnpj}</small>
    </div>
  );
}

export default Empresas;