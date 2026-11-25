import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

function Usuarios({ empresas = [], usuario }) {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(null);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    setCarregando(true);

    const { data, error } = await supabase
      .from("usuario")
      .select("id, nome, email, perfil_id, empresa_id, ativo")
      .order("nome");

    if (error) {
      setErro(error.message);
    } else {
      setUsuarios(data);
    }

    setCarregando(false);
  }

  async function atualizar(id, campos) {
    if (salvando !== null) return;

    setErro("");
    setSucesso("");
    setSalvando(id);

    try {
      const { data, error } = await supabase
        .from("usuario")
        .update(campos)
        .eq("id", id)
        .select("id, nome, email, perfil_id, empresa_id, ativo")
        .single();

      if (error) throw error;

      setUsuarios((atuais) =>
        atuais.map((u) => u.id === id ? data : u)
      );

      setSucesso("Usuário atualizado com sucesso.");
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(null);
    }
  }

  if (usuario?.perfil_id !== 1) {
    return <p>Acesso não autorizado.</p>;
  }

  return (
    <>
      <div className="page-title">
        <div>
          <span>ADMINISTRAÇÃO</span>
          <h1>Gerenciamento de usuários</h1>
        </div>
      </div>

      <div className="metric-grid">
        <div className="metric">
          <strong>{usuarios.length}</strong>
          <span>Total de usuários</span>
        </div>

        <div className="metric">
          <strong>
            {usuarios.filter(u => u.perfil_id === 1).length}
          </strong>
          <span>Administradores</span>
        </div>

        <div className="metric">
          <strong>
            {usuarios.filter(u => u.perfil_id === 2).length}
          </strong>
          <span>Gestores</span>
        </div>

        <div className="metric">
          <strong>
            {usuarios.filter(u => u.ativo).length}
          </strong>
          <span>Usuários ativos</span>
        </div>
      </div>

      {erro && (
        <p style={{ color: "#ef4444" }}>{erro}</p>
      )}

      {sucesso && (
        <p className="success-message">{sucesso}</p>
      )}

      <section className="panel">
        <h2>Usuários cadastrados</h2>

        {carregando && <p>Carregando usuários...</p>}

        {usuarios.map((u) => (
          <div
            className="company-card"
            key={u.id}
            style={{ marginTop: 12 }}
          >
            <strong>{u.nome}</strong>

            <p>{u.email}</p>

            <p>
              Perfil: {
                u.perfil_id === 1
                  ? "Administrador"
                  : "Gestor"
              }
            </p>

            <p style={{
              color: u.ativo ? "#62d6a4" : "#ef4444"
            }}>
              {u.ativo ? "Ativo" : "Inativo"}
            </p>

            {u.perfil_id === 2 && (
              <div>
                <label>EMPRESA VINCULADA</label>

                <select
                  value={u.empresa_id ?? ""}
                  disabled={salvando !== null}
                  onChange={(e) =>
                    atualizar(u.id, {
                      empresa_id: e.target.value
                        ? Number(e.target.value)
                        : null
                    })
                  }
                  style={{
                    display: "block",
                    margin: "10px 0",
                    padding: 10,
                    width: "100%",
                    background: "#18352f",
                    color: "#ffffff",
                    borderRadius: 6
                  }}
                >
                  <option value="">
                    Sem empresa vinculada
                  </option>

                  {empresas.map((empresa) => (
                    <option
                      key={empresa.id}
                      value={empresa.id}
                    >
                      {empresa.nome}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {u.perfil_id === 2 && u.id !== usuario.id && (
              <button
                className="button-primary small-button"
                disabled={salvando !== null}
                onClick={() => {
                  if (window.confirm(
                    u.ativo
                      ? "Desativar este gestor?"
                      : "Ativar este gestor?"
                  )) {
                    atualizar(u.id, { ativo: !u.ativo });
                  }
                }}
              >
                {salvando === u.id
                  ? "Salvando..."
                  : u.ativo
                    ? "Desativar"
                    : "Ativar"}
              </button>
            )}

            {u.id === usuario.id && (
              <small>Sua conta atual</small>
            )}
          </div>
        ))}
      </section>
    </>
  );
}

export default Usuarios;
