# AdminFRB

Base do dashboard administrativo white-label, construída com React, TypeScript e Vite.

## Desenvolvimento

Requisitos: Node.js 22 ou superior.

```bash
npm install
npm run dev
```

Comandos de validação:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
# ou todos em sequência:
npm run validate
```

## Estrutura

- `src/app`: composição da aplicação e configuração global.
- `src/components`: componentes reutilizáveis entre funcionalidades.
- `src/features`: módulos organizados por domínio.
- `src/layouts`: estruturas visuais compartilhadas pelas páginas.
- `src/pages`: páginas e pontos de entrada de rotas.
- `src/services`: integrações com APIs e serviços externos.
- `src/styles`: estilos globais e tokens visuais.
- `src/types`: tipos compartilhados.

O alias `@/*` aponta para `src/*`, permitindo imports como `@/app/App`.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e ajuste os valores para o ambiente local. O arquivo de exemplo não contém credenciais.
