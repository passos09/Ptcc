import { useState } from 'react';
import { UsuariosToolbar } from './UsuariosToolbar';
import { UsuariosTable } from './UsuariosTable';
import { UsuariosMock } from './UsuariosMock';
import styles from './Usuarios.module.css';

export function UsuariosPage() {
  const [usuarios] = useState(UsuariosMock);

  function handleNovoUsuario() {
       console.log('abrir cadastro de novo usuário');
  }

  return (
    <div className={styles.page}>
      <UsuariosToolbar total={usuarios.length} onNovoUsuario={handleNovoUsuario} />
      <UsuariosTable usuarios={usuarios} />
      <p className={styles.hint}>
        O administrador cadastra usuários, define o perfil de acesso (Administrador
        ou Gerente) e escolhe quais empresas cada gerente pode visualizar.
      </p>
    </div>
  );
}
