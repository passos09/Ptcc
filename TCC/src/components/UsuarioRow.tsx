import { Usuario } from './Usuario.types';
import { PerfilBadge } from './PerfilBadge';
import { StatusBadge } from './StatusBadge';
import styles from './Usuarios.module.css';

interface UsuarioRowProps {
  usuario: Usuario;
}

export function UsuarioRow({ usuario }: UsuarioRowProps) {
  return (
    <tr>
      <td>{usuario.nome}</td>
      <td className={styles.cellMono}>{usuario.email}</td>
      <td>
        <PerfilBadge perfil={usuario.perfil} />
      </td>
      <td className={styles.cellMono}>{usuario.empresasVisiveis}</td>
      <td>
        <StatusBadge status={usuario.status} />
      </td>
    </tr>
  );
}
