import { Usuario } from './Usuario.types';
import { UsuarioRow } from './UsuarioRow';
import styles from './Usuarios.module.css';

interface UsuariosTableProps {
  usuarios: Usuario[];
}

export function UsuariosTable({ usuarios }: UsuariosTableProps) {
  return (
    <div className={styles.panel}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Perfil</th>
            <th>Empresas visíveis</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <UsuarioRow key={usuario.id} usuario={usuario} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
