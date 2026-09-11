import { Usuario } from './Usuario.types';

export const usuariosMock: Usuario[] = [
  {
    id: '1',
    nome: 'Marina Souza',
    email: 'marina@contabilvalesul.com.br',
    perfil: 'administrador',
    empresasVisiveis: 'Todas',
    status: 'ativo',
  },
  {
    id: '2',
    nome: 'Rodrigo Alves',
    email: 'rodrigo@contabilvalesul.com.br',
    perfil: 'gerente',
    empresasVisiveis: 'Vale Sul, Central Distribuidora',
    status: 'ativo',
  },
  {
    id: '3',
    nome: 'Camila Nogueira',
    email: 'camila@contabilvalesul.com.br',
    perfil: 'gerente',
    empresasVisiveis: 'Nordeste Materiais',
    status: 'ativo',
  },
  {
    id: '4',
    nome: 'Paulo Ramos',
    email: 'paulo@contabilvalesul.com.br',
    perfil: 'gerente',
    empresasVisiveis: '—',
    status: 'inativo',
  },
];
