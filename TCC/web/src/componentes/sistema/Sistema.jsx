import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import BarraLateral from "./BarraLateral";
import BarraSuperior from "./BarraSuperior";
import Empresas from "./paginas/Empresas";

function formatarEmpresa(empresa) {
  return {
    ...empresa,
    nome: empresa.razao_social,
    email: empresa.email_contato
  };
}

function Sistema({ usuario, onSair }) {
  const [tela, setTela] = useState("dashboard");
  const [empresas, setEmpresas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const administrador = usuario?.cargo === "Administrador";

  useEffect(() => {
    carregarEmpresas();
  }, []);

  async function carregarEmpresas() {
    setCarregando(true);
    setErro("");

    try {
      const { data, error } = await supabase
        .from("empresa")
        .select("*")
        .eq("ativa", true)
        .order("razao_social");

      if (error) throw error;

      setEmpresas(data.map(formatarEmpresa));
    } catch (error) {
      setErro("Erro ao carregar empresas: " + error.message);
    } finally {
      setCarregando(false);
    }
  }

  async function adicionarEmpresa(novaEmpresa) {
    if (!administrador) {
      throw new Error("Acesso não autorizado.");
    }

    const cnpj = novaEmpresa.cnpj.replace(/\D/g, "");

    if (cnpj.length !== 14) {
      throw new Error("O CNPJ deve possuir 14 números.");
    }

    const { data, error } = await supabase
      .from("empresa")
      .insert({
        razao_social: novaEmpresa.nome.trim(),
        cnpj: cnpj,
        telefone: novaEmpresa.telefone.trim() || null,
        endereco: novaEmpresa.endereco.trim() || null,
        email_contato: novaEmpresa.email.trim() || null
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        throw new Error("Este CNPJ já está cadastrado.");
      }

      throw new Error(error.message);
    }

    setEmpresas((atuais) =>
      [...atuais, formatarEmpresa(data)].sort(
        (a, b) => a.nome.localeCompare(b.nome)
      )
    );
  }

  function renderizarPagina() {
    if (carregando) {
      return <p>Carregando dados do Supabase...</p>;
    }

    if (erro) {
      return (
        <section className="panel">
          <p>{erro}</p>
          <button
            className="button-primary"
            onClick={carregarEmpresas}
          >
            Tentar novamente
          </button>
        </section>
      );
    }

    if (tela === "empresas" && administrador) {
      return (
        <Empresas
          empresas={empresas}
          onAdicionar={adicionarEmpresa}
        />
      );
    }

    if (tela === "dashboard") {
      return (
        <>
          <div className="page-title">
            <div>
              <span>GERAL</span>
              <h1>Visão geral</h1>
            </div>
          </div>

          <section className="panel">
            <h2>Empresas monitoradas: {empresas.length}</h2>
            <p>Dados consultados diretamente do Supabase.</p>
            <p>Indicadores documentais em integração.</p>
          </section>
        </>
      );
    }

    return (
      <section className="panel">
        <h2>Módulo em integração</h2>
        <p>Esta funcionalidade está sendo conectada ao banco de dados.</p>
      </section>
    );
  }

  return (
    <div className="system">
      <BarraLateral
        tela={tela}
        onMudarTela={setTela}
        onSair={onSair}
        administrador={administrador}
      />

      <main className="system-main">
        <BarraSuperior usuario={usuario} />

        <div className="page-content">
          {renderizarPagina()}
        </div>
      </main>
    </div>
  );
}

export default Sistema;

