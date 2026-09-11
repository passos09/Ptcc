import styles from './Usuarios.module.css';
import { Perfil } from './Usuario.types';

interface PerfilBadgeProps {
  perfil: Perfil;
}

export function PerfilBadge({ perfil }: PerfilBadgeProps) {
  const label = perfil === 'administrador' ? 'Administrador' : 'Gerente';
  const cssClass = perfil === 'administrador' ? styles.badgeOk : styles.badgeWarn;

  return <span className={`${styles.badge} ${cssClass}`}>{label}</span>;
}
