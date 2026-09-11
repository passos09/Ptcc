import styles from './Usuarios.module.css';

interface UsuariosToolbarProps {
  total: number;
  onNovoUsuario: () => void;
}

export function UsuariosToolbar({ total, onNovoUsuario }: UsuariosToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <span className={styles.count}>{total} usuários com acesso ao sistema</span>
      <button className={styles.btn} onClick={onNovoUsuario}>
        + Novo usuário
      </button>
    </div>
  );
}
