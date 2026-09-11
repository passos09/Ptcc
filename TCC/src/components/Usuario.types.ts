export type Perfil = 'administrador' | 'gerente';
export type StatusUsuario = 'ativo' | 'inativo';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: Perfil;
  empresasVisiveis: string;
  status: StatusUsuario;
}
