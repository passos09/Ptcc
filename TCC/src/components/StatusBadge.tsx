import styles from './Usuarios.module.css';
import { StatusUsuario } from './Usuario.types';

interface StatusBadgeProps {
  status: StatusUsuario;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const label = status === 'ativo' ? 'Ativo' : 'Inativo';
  const cssClass = status === 'ativo' ? styles.badgeOk : styles.badgeAlert;

  return <span className={`${styles.badge} ${cssClass}`}>{label}</span>;
}
