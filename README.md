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

## Tokens visuais

Os tokens ficam em `src/styles/tokens.css` e são consumidos pelos estilos dos
componentes via variáveis CSS. O tema padrão é claro e neutro; o tema escuro
é ativado automaticamente pela preferência do sistema ou explicitamente com
`<html data-theme="dark">`. Para forçar o tema claro, use
`<html data-theme="light">`.

As variáveis agrupam cores, tipografia, espaçamentos, raios, sombras e
dimensões de layout. Para aplicar uma identidade visual, altere os valores
nesse arquivo em vez de substituir valores nos componentes.

## Configuração White-label

A aplicação possui arquitetura white-label tipada (`ClientConfig`) para personalização de marca, logotipo, favicon, cores de tema, navegação e canais de suporte sem necessidade de modificar componentes compartilhados.

Consulte os detalhes e guias em [`docs/configuration.md`](docs/configuration.md).

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e ajuste os valores para o ambiente local. O arquivo de exemplo não contém credenciais.
