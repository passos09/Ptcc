# 3DS - DOC-SYSTEM

Sistema web em React para monitoramento fiscal e documental.

## Perfis de acesso

### Administradores
- Wendell — wendell@docsystem.com.br
- Matheus — matheus@docsystem.com.br

Acessam todas as áreas do sistema.

### Gestores
- PedroMoia — pedromoia@docsystem.com.br
- PedroHenrique — pedrohenrique@docsystem.com.br

Acessam Painel, Alertas, Pendências e Documentos.

### Senha de demonstração
`123456`

## Executar

Dentro da pasta `web`:

```bash
npm install
npm run dev
```

Depois, abra o endereço mostrado pelo Vite no navegador.

## Estrutura

- `src/Aplicacao.jsx` — controla as telas principais.
- `src/dados.js` — guarda os dados de demonstração.
- `src/componentes/inicio` — página inicial.
- `src/componentes/sistema` — login, navegação e sistema.
- `src/componentes/sistema/paginas` — telas do sistema.
- `src/styles.css` — estilos.
