export const usuariosIniciais = [
  {
    id: 1,
    nome: "Wendell",
    email: "wendell@docsystem.com.br",
    senha: "123456",
    cargo: "Administrador",
    empresas: []
  },
  {
    id: 2,
    nome: "Matheus",
    email: "matheus@docsystem.com.br",
    senha: "123456",
    cargo: "Administrador",
    empresas: []
  },
  {
    id: 3,
    nome: "PedroMoia",
    email: "pedromoia@docsystem.com.br",
    senha: "123456",
    cargo: "Gestor",
    empresas: [1, 2]
  },
  {
    id: 4,
    nome: "PedroHenrique",
    email: "pedrohenrique@docsystem.com.br",
    senha: "123456",
    cargo: "Gestor",
    empresas: [3]
  }
];

export const empresasIniciais = [
  {
    id: 1,
    nome: "Vale Sul Comércio Ltda.",
    cnpj: "12.345.678/0001-90",
    telefone: "(11) 4000-1000",
    endereco: "Rua das Palmeiras, 100 — São Paulo/SP",
    email: "financeiro@valesul.com.br"
  },
  {
    id: 2,
    nome: "Nordeste Materiais ME",
    cnpj: "98.765.432/0001-11",
    telefone: "(11) 4111-2000",
    endereco: "Av. Central, 250 — São Paulo/SP",
    email: "financeiro@nordestemateriais.com.br"
  },
  {
    id: 3,
    nome: "Central Distribuidora S.A.",
    cnpj: "45.222.111/0001-30",
    telefone: "(11) 4222-3000",
    endereco: "Rua Comercial, 500 — São Paulo/SP",
    email: "financeiro@centraldistribuidora.com.br"
  }
];

export const pendenciasIniciais = [
  {
    id: 1,
    empresaId: 1,
    descricao: "Pendência fiscal em aberto",
    tipo: "Fiscal",
    vencimento: "10/09/2026",
    status: "Pendente"
  },
  {
    id: 2,
    empresaId: 1,
    descricao: "Certidão estadual vencida — Sefaz-SP",
    tipo: "Documental",
    vencimento: "28/08/2026",
    status: "Pendente"
  },
  {
    id: 3,
    empresaId: 1,
    descricao: "Certidão municipal a vencer — Guarulhos",
    tipo: "Documental",
    vencimento: "12/09/2026",
    status: "Atenção"
  },
  {
    id: 4,
    empresaId: 2,
    descricao: "Obrigação fiscal municipal",
    tipo: "Fiscal",
    vencimento: "10/10/2026",
    status: "Regular"
  }
];
