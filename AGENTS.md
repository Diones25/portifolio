<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Arquitetura do Projeto — Portfolio

## Visão Geral

| Detalhe | Valor |
|---|---|
| **Tipo** | Portfolio pessoal / SPA (Single-Page Application) |
| **Framework** | **Next.js 16.2.9** (App Router) |
| **React** | **19.2.4** (React 19) |
| **Linguagem** | **TypeScript 5.x** (strict mode) |
| **Estilo** | Estética terminal/desenvolvedor, tema escuro |

---

## Estrutura de Diretórios

```
portfolio/
├── AGENTS.md                    # Instruções para agentes de IA
├── CLAUDE.md                    # Referência ao AGENTS.md
├── README.md                    # Readme padrão do create-next-app
├── package.json
├── package-lock.json
├── next.config.ts               # Configuração padrão do Next.js (vazio)
├── next-env.d.ts                # Declarações TypeScript do Next.js
├── tsconfig.json
├── eslint.config.mjs            # ESLint flat config (v9)
├── postcss.config.mjs           # PostCSS com @tailwindcss/postcss v4
├── .gitignore
├── .next/                       # Output do build (gitignored)
├── node_modules/
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   ├── window.svg
│   └── projects/
│       ├── banking-api/         # 1.svg, 2.svg
│       ├── microservices/       # 1.svg, 2.svg, 3.svg
│       ├── movie-app/           # 1.svg, 2.svg
│       └── real-time-comms/     # 1.svg, 2.svg, 3.svg
└── app/
    ├── favicon.ico
    ├── globals.css              # Estilos globais + importação do Tailwind v4
    ├── layout.tsx               # Layout raiz (Server Component)
    ├── page.tsx                 # Página principal (Client Component, ~878 linhas)
    ├── components/
    │   └── ProjectGallery.tsx   # Componente de galeria de imagens/lightbox
    └── i18n/
        ├── context.tsx          # Contexto React de i18n customizado + provider
        └── messages/
            ├── en.json          # Traduções em inglês (~167 linhas)
            └── pt-BR.json       # Traduções em português brasileiro (~167 linhas)
```

---

## Configurações Principais

### package.json
- **Scripts**: `dev`, `build`, `start`, `lint` (padrão Next.js)
- **Sem framework de testes** configurado (sem Jest, Vitest, Playwright, etc.)
- **Sem configuração CI/CD** (sem `.github/workflows/`, sem Dockerfile)

### next.config.ts
Configuração completamente vazia — opções padrão do Next.js.

### tsconfig.json
- **Target**: ES2017
- **Module**: esnext com resolução via bundler
- **Strict mode**: ativado
- **Path alias**: `@/*` mapeia para a raiz do projeto (`"./*"`)
- **JSX**: react-jsx (runtime automático)
- **Inclui**: `*.ts`, `*.tsx`, `*.mts`, mais `.next/types`

### postcss.config.mjs
Usa `@tailwindcss/postcss` (plugin PostCSS do Tailwind CSS v4) — sem arquivo `tailwind.config.js` pois o Tailwind v4 usa configuração baseada em CSS.

### eslint.config.mjs
Usa o novo formato **flat config** do ESLint (v9) com:
- `eslint-config-next/core-web-vitals`
- `eslint-config-next/typescript`
- Ignora `.next/`, `out/`, `build/`, `next-env.d.ts`

---

## Estrutura do App (App Router)

### Layout — `app/layout.tsx`
- **Server Component** (sem diretiva `"use client"`)
- Define **metadata** (título, descrição, keywords, OpenGraph, Twitter card) — todos estaticamente definidos
- Carrega **Google Fonts** via tags `<link>` (Inter + JetBrains Mono) ao invés da otimização `next/font`
- Envolpe children em `<LocaleProvider>` para o contexto de i18n
- Define estilos base via atributo `style` inline no `<body>`

### Página — `app/page.tsx`
- **Client Component** (`"use client"`)
- É a **aplicação inteira** — um portfolio de página única
- Contém **todos os componentes de seção** definidos inline no mesmo arquivo (~878 linhas):
  - `SectionLabel` (helper)
  - `FadeIn` (wrapper de animação)
  - `Nav` (barra de navegação fixa)
  - `Hero` (seção hero com efeito typewriter)
  - `About` (seção sobre com estatísticas)
  - `Skills` (grid de stack técnica)
  - `Projects` (cards de projetos com galeria)
  - `Experience` (timeline + certificações)
  - `Contact` (email + links sociais)
  - `Footer`
- O export padrão é `Home()` que renderiza todas as seções sequencialmente

### Sem rotas aninhadas
Existe apenas uma única página. Nenhum segmento de rota adicional (`app/about/page.tsx`, etc.) existe.

---

## Organização dos Componentes

### Componentes Extraídos

| Arquivo | Componente | Função |
|---|---|---|
| `app/components/ProjectGallery.tsx` | `ProjectGallery` | Galeria modal de imagens/lightbox com navegação por teclado (Escape, Setas), paginação por pontos, transições animadas |

### Componentes Inline (em `app/page.tsx`)

Todos os outros componentes são definidos como funções dentro de `page.tsx` e **não são extraídos** em arquivos separados:
- `SectionLabel`, `FadeIn`, `Nav`, `Hero`, `About`, `Skills`, `Projects`, `Experience`, `Contact`, `Footer`

---

## Abordagem de Estilização

O projeto usa uma **abordagem híbrida de estilização**:

### Principal: **Estilos Inline**
A maioria absoluta da estilização é feita através de objetos React `style={}` diretamente no JSX. Cores, espaçamento, layout, transições — tudo inline.

### Tailwind CSS v4 (uso mínimo)
- **Instalado**: `tailwindcss@^4` + `@tailwindcss/postcss@^4`
- **Importado** em `globals.css`: `@import "tailwindcss";`
- **Tema customizado** definido em CSS via `@theme inline`:
  ```css
  @theme inline {
    --color-bg: #0A0A0F;
    --color-surface: #13131A;
    --color-border: #1E1E2E;
    --color-accent: #3B82F6;
    /* ... */
    --font-sans: 'Inter', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  }
  ```
- Porém, **nenhuma classe utilitária do Tailwind** é usada no JSX.

### CSS Global (`globals.css`)
- Reset CSS (`* { box-sizing: border-box; margin: 0; padding: 0; }`)
- Estilização customizada de scrollbar
- Classe `.mono` para JetBrains Mono
- Animação `.cursor-blink` para efeito typewriter
- Animação `.fade-in-up` (não usada — o componente `FadeIn` usa framer-motion)
- Media query `prefers-reduced-motion` para acessibilidade
- Cores customizadas de `::selection`

### Sistema de Design (manual)
Uma paleta de cores escura consistente é usada em todo o projeto:
- Background: `#0A0A0F`
- Surface/cards: `#13131A`
- Bordas: `#1E1E2E`
- Accent: `#3B82F6` (azul)
- Texto: `#F0F0F5`
- Muted: `#6B7280`
- Highlight: `#A5B4FC`

---

## Padrões de Busca de Dados

**Não existe busca de dados server-side.** Todos os dados são:

1. **Hardcoded em arquivos JSON de tradução** (`en.json`, `pt-BR.json`):
   - Itens de navegação
   - Texto do hero
   - Parágrafos e estatísticas da seção sobre
   - Categorias de skills
   - Itens de projetos (título, descrição, tags, imagens, links de repo)
   - Timeline de experiência (5 jobs com empresa, cargo, datas, descrições)
   - Informações de contato
   - Texto do footer

2. **Acessados via React context client-side**:
   - `useLocale()` retorna `t()` para buscas de string e `tm()` para buscas de objeto/array
   - `useMessages()` retorna a função `tm()` bruta para acessar dados complexos (arrays de objetos)

3. **Assets estáticos** em `public/projects/`:
   - Ilustrações SVG para cada projeto (4 projetos, 2-3 imagens cada)

Não existem chamadas `fetch()`, não há `getServerSideProps`, `getStaticProps`, server actions, nem chamadas de API para serviços externos.

---

## Rotas de API

**Nenhuma.** Não existem rotas `app/api/`, arquivos `route.ts`, nem endpoints de backend. Esta é uma aplicação frontend puramente estática.

---

## Autenticação

**Nenhuma.** Não há sistema de autenticação, login, sessões, nem bibliotecas de auth. O email de contato (`hello@dionesalves.dev`) é hardcoded.

---

## Banco de Dados / ORM

**Nenhum.** Não há banco de dados, ORM (Prisma, Drizzle, etc.), nem camada de dados. Todo o conteúdo é JSON estático.

---

## Configuração de Deploy

- **Destinado ao Vercel**: O README menciona deploy no Vercel, e `.gitignore` inclui `.vercel`
- **Sem configuração explícita do Vercel** (`vercel.json`)
- **Sem Dockerfile** ou configuração de container
- **Sem pipelines CI/CD** (sem `.github/workflows/`, sem `.gitlab-ci.yml`)
- **Sem variáveis de ambiente** (arquivos `.env*` são gitignored e não existem)

---

## Dependências Principais

### Production Dependencies

| Biblioteca | Versão | Função |
|---|---|---|
| `next` | 16.2.9 | Framework React (bleeding edge) |
| `react` | 19.2.4 | Biblioteca UI (React 19) |
| `react-dom` | 19.2.4 | Renderer DOM do React |
| `framer-motion` | ^12.40.0 | Animações (fade-in, motion, AnimatePresence) |
| `lucide-react` | ^1.21.0 | Biblioteca de ícones (instalada mas **não utilizada**) |
| `next-intl` | ^4.13.0 | Biblioteca de i18n (instalada mas **não utilizada**) |

### Dev Dependencies

| Biblioteca | Versão | Função |
|---|---|---|
| `tailwindcss` | ^4 | Framework CSS (instalado mas pouco usado) |
| `@tailwindcss/postcss` | ^4 | Plugin PostCSS do Tailwind |
| `typescript` | ^5 | Compilador TypeScript |
| `@types/node` | ^20 | Definições de tipo do Node.js |
| `@types/react` | ^19 | Definições de tipo do React |
| `@types/react-dom` | ^19 | Definições de tipo do React DOM |
| `eslint` | ^9 | Linter |
| `eslint-config-next` | 16.2.9 | Regras ESLint do Next.js |

### Dependências Não Utilizadas
- **`lucide-react`**: Instalada em `package.json` mas nunca importada no código fonte.
- **`next-intl`**: Instalada em `package.json` mas o projeto implementa seu próprio sistema de i18n customizado em `app/i18n/context.tsx`. Esta dependência parece ser residual ou planejada para uso futuro.

---

## Padrões e Decisões Arquiteturais

### Sistema de i18n Customizado (sem usar next-intl)
Apesar de ter `next-intl` instalado, o projeto implementa um **sistema de i18n próprio**:
- **Baseado em Context**: `LocaleProvider` envolve a aplicação, armazenando o locale atual em estado React
- **Persistência**: A preferência de locale é salva no `localStorage` com a chave `portfolio-locale`
- **Dois locales**: Inglês (`en`) e Português Brasileiro (`pt-BR`)
- **Duas funções de busca**:
  - `t(key)` — retorna uma string via caminho de chave com notação de ponto (ex: `t("hero.name")`)
  - `tm(key)` — retorna qualquer tipo (usado para arrays de objetos como itens de projetos e entradas de experiência)
- **Resolução de valores aninhados**: Utilitário customizado `getNestedValue()` que divide caminhos separados por pontos e percorre a árvore JSON

### Arquivo Único
Toda a lógica da aplicação vive em **um arquivo `page.tsx` de 878 linhas** com todos os componentes de seção definidos inline. Esta é uma escolha intencional de simplicidade — sem complexidade de rotas, sem code splitting entre seções.

### Renderização Client-Side (Modo SPA)
Apesar de usar o App Router do Next.js (que suporta SSR/SSG), a página principal é marcada `"use client"`, significando:
- A página renderiza inteiramente no client
- Sem benefícios de SEO via server rendering (apesar do metadata ser definido no layout server)
- Sem vantagens de geração estática aproveitadas

### Efeito Typewriter
A seção Hero implementa uma animação typewriter customizada usando `useState` + `useEffect` + `setInterval` que digita o título caractere por caractere a cada 45ms.

### Animações por Intersection Observer
O componente `FadeIn` usa o hook `useInView` do `framer-motion` para disparar animações fade-in-up quando as seções entram no viewport durante a rolagem, com delay configurável e `once: true` para evitar re-disparos.

### Navegação Baseada em Scroll
O componente `Nav` usa um listener de evento `scroll` para:
- Detectar qual seção está visível e destacar o link de navegação correspondente
- Aplicar efeito glass-morphism (backdrop blur + background) após rolar além de 40px

### Estilização por Hover Inline
Todos os efeitos interativos de hover são implementados via handlers `onMouseEnter`/`onMouseLeave` que mutam diretamente `element.style` — ao invés de pseudo-classes CSS `:hover` ou utilitários hover do Tailwind.

### Design Responsivo (Mínimo)
- Links de nav são `display: none` em mobile, mostrados via tag `<style>` inline com `@media(min-width:640px)`
- Tamanhos de fonte usam `clamp()` para tipografia fluida
- Layouts de grid usam `repeat(auto-fit, minmax(...))` para colunas responsivas
- Sem menu hamburger mobile dedicado ou breakpoints mobile-first

### Considerações de Acessibilidade
- Media query `prefers-reduced-motion` desativa todas as animações
- Navegação por teclado na galeria de imagens (Escape, Setas)
- HTML semântico (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`)
- `scroll-behavior: smooth` no `<html>`

### Estética de Design
O portfolio segue uma **estética de terminal/desenvolvedor**:
- Tema escuro com acentos de fonte monoespaçada
- Labels de seção formatados como `~/about`, `~/skills` (estilo caminho de arquivo)
- Animação de cursor piscando no título do hero
- Cor de accent azul (`#3B82F6`) contra fundos quase pretos

---

## Resumo

Este é um **site portfolio leve, renderizado client-side**, construído com as versões mais recentes do Next.js (16.2.9) e React (19.2.4). A arquitetura é simples — uma aplicação de página única sem backend, sem banco de dados, sem rotas de API e sem autenticação. Todo o conteúdo é codificado em arquivos JSON de tradução e renderizado no client. A estilização é predominantemente inline com um tema mínimo do Tailwind v4 definido mas amplamente não utilizado. Duas dependências instaladas (`lucide-react`, `next-intl`) não são realmente usadas no codebase, sugerindo funcionalidades planejadas ou dependências residuais de iterações de desenvolvimento.
