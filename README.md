Visão Geral do Projeto

**ADN Developer** é uma plataforma web completa desenvolvida com **Next.js + React + TypeScript + Tailwind CSS**, dedicada a promover oportunidades de desenvolvimento técnico e crescimento profissional em países africanos de língua portuguesa (Angola, Brasil, Moçambique, Portugal, São Tomé e Príncipe, Guiné-Bissau e Cabo-Verde).

A plataforma oferece workshops, palestras, bolsas de estudo, hackathons, competições e um guia completo para startups.

## Estrutura do Projeto

### **Raiz do Projeto**
```
adndeveloper/
├── app/                    # Páginas e layouts Next.js (App Router)
├── components/             # Componentes reutilizáveis React
├── data/                   # Tipos e dados estáticos
├── hooks/                  # Custom hooks React
├── lib/                    # Funções utilitárias
├── public/                 # Arquivos estáticos (imagens, ícones)
├── styles/                 # Estilos CSS globais
├── package.json            # Dependências e scripts do projeto
├── tailwind.config.js      # Configuração do Tailwind CSS
├── tsconfig.json           # Configuração do TypeScript
└── next.config.mjs         # Configuração do Next.js
```

---

## Detalhamento de Cada Pasta

### **1. `/app` - Páginas e Layout Principal**

#### **Arquivos Principais:**
- **`layout.tsx`** - Layout raiz do projeto
  - Configura metadados globais (título, descrição, ícones)
  - Define idioma como português-Brasil
  - Integra Analytics do Vercel
  - Fornece layout padrão para todas as páginas

- **`page.tsx`** - Página inicial (Home)
  - Componente raiz que renderiza a página inicial
  - Importa todas as seções principais da plataforma
  - Contém dados dos serviços oferecidos (Workshops, Palestras, Bolsas, etc.)
  - Organiza seções: Hero, Cards, LogoCloud, Vision, Partners, Testimonials, Equipe

- **`globals.css`** - Estilos globais
  - Reset CSS básico
  - Importação do Tailwind CSS
  - Variáveis CSS customizadas
  - Estilos base para tipografia

#### **Páginas Específicas (Subpastas):**

##### **`/app/bolsas`**
- Página dedicada a **Bolsas de Estudo**
- Exibe oportunidades de financiamento para estudantes
- Componentes: Hero, AboutUs, BigTechCompanies, Carousel, Leadership, Recent

##### **`/app/community`**
- Página de **Comunidades**
- Mostra comunidades de desenvolvimento de software
- Componentes: Cards, Grid, Badges, Tags

##### **`/app/comp`**
- Página de **Competições**
- Lista competições e desafios técnicos
- Componentes: Hero, InfoSection, RecentEvents, OnlineEvents

##### **`/app/events`**
- Página de **Eventos**
- Gerencia eventos técnicos com filtros por localização
- Estados de busca, localização, filtro online
- Componentes: Filters, EventCard, Pagination

##### **`/app/quiz`**
- Página de **Quiz de Orientação Profissional**
- "Qual área é para mim?" - identifica melhor área para o desenvolvedor
- Usa FontAwesome Icons
- Componentes: `QuizGame`, `CareerTips`, `ProgressBar`, `Button`
- Banco completo de perguntas em `app/quiz/data.ts` (`FULL_QUESTION_BANK`) e resultados personalizados por área

##### **`/app/cursos`**
- Página de **Roteiros de Aprendizado**
- Mostra caminhos de aprendizado por especialidade (Frontend, Backend, DevOps, etc.)
- Componentes: RoadmapCard, ProjectGrid, TechIcon, DetailView
- Dados de projetos organizados por dificuldade (Junior, Mid, Senior)

##### **`/app/startups`**
- Página de **Guia para Startups**
- Informações sobre como criar e gerenciar uma startup
- Componentes: Hero, Features, Matchmaking, ChallengesSection, NewsletterSection

##### **`/app/wtm`**
- Página de **Women in Technology (Mulheres na TI)**
- Reconhece líderes femininas na tecnologia
- Componentes: HeroCarousel, LeadershipSection, RecursosOrganizador

---

### **2. `/components` - Componentes Reutilizáveis**

#### **Componentes Globais:**
- **`Navbar.tsx`** - Barra de navegação principal
  - Links para todas as páginas principais
  - Menu responsivo (mobile/desktop)
  - Logo da empresa
  - Botão "Qual área é para mim?"

- **`Footer.tsx`** - Rodapé do site
  - Links rápidos
  - Informações de contato
  - Redes sociais

- **`theme-provider.tsx`** - Provedor de tema
  - Configuração de temas (claro/escuro)
  - Context para aplicar temas globalmente

- **`CountryFilter.tsx`** - Filtro por país com tipo `FilterTab`
  - Permite seleção por países lusófonos (Angola, Brasil, Moçambique, Portugal, São Tomé e Príncipe, Guiné-Bissau, Cabo Verde, Timor-Leste)
  - Integrado em diversas seções (WTM, Startups, Community, Bolsas, Subscription)
  - Estilos de foco e acessibilidade configurados em `styles/globals.css`

#### **`/components/home` - Seções da Página Inicial**
- **`hero.tsx`** - Seção herói principal
- **`CardHero.tsx`** - Cards de serviços
- **`sectionHero.tsx`** - Seção de serviços
- **`logosHero.tsx`** - Nuvem de logos de partners
- **`VisionHero.tsx`** - Visão e missão
- **`PartnersHero.tsx`** - Carrossel de parceiros
- **`TestimonialsHero.tsx`** - Depoimentos de usuários
- **`TeamMember.tsx`** - Seção da equipe
- **`faqHero.tsx`** - Perguntas frequentes
- **`Tag.tsx`** - Componente de tag/badge

#### **`/components/bolsas` - Componentes de Bolsas de Estudo**
- **`Hero.tsx`** - Hero section
- **`AboutUsSection.tsx`** - Sobre bolsas
- **`BigTechBo.tsx`** - Grandes empresas de tech
- **`CarroselBo.tsx`** - Carrossel de bolsas
- **`LeaderBo.tsx`** - Líderes do programa
- **`WorkCard.tsx`** - Card de trabalho/bolsa
- **`RecentSection.tsx`** - Seção recente

#### **`/components/community` - Componentes de Comunidades**
- **`CommunityCard.tsx`** - Card individual
- **`CommunityCardL.tsx`** - Card em layout alternativo
- **`CommunityGrid.tsx`** - Grid de comunidades
- **`MicrosoftCommunitySection.tsx`** - Seção específica Microsoft
- **`Badge.tsx`** - Badges de categorias
- **`Tag.tsx`** - Tags personalizadas

#### **`/components/comp` - Componentes de Competições**
- **`Hero.tsx`** - Hero section
- **`InfoSection.tsx`** - Informações
- **`MoreCom.tsx`** - Mais competições
- **`OnlineEvents.tsx`** - Eventos online
- **`RecentEvents.tsx`** - Eventos recentes

#### **`/components/events` - Componentes de Eventos**
- **`EventCard.tsx`** - Card de evento
- **`Filters.tsx`** - Filtros (localização, online, busca)
- **`constants.tsx`** - Dados mockados de eventos

#### **`/components/quiz` - Componentes do Quiz**
- **`Button.tsx`** - Botão customizado
- **`ProgressBar.tsx`** - Barra de progresso

#### **`/components/roadmaps` - Componentes de Roteiros**
- **`RoadmapCard.tsx`** - Card de roadmap
- **`ProjectGridCard.tsx`** - Card de projeto em grid
- **`RoadmapDetailView.tsx`** - Visualização detalhada
- **`TechIcon.tsx`** - Ícone de tecnologia com categorização automática
- **`BookmarkIcon.tsx`** - Ícone de bookmark (arquivo vazio)
- **`/components/roadmaps/courses`** - Cursos e coleções

#### **`/components/startups` - Componentes para Startups**
- **`Hero.tsx`** - Hero section
- **`Features.tsx`** - Recursos principais
- **`AccessSection.tsx`** - Seção de acesso
- **`Matchmaking.tsx`** - Matching de ideias/co-fundadores
- **`ChallengesSection.tsx`** - Desafios
- **`NewsletterSection.tsx`** - Newsletter
- **`HubShowcase.tsx`** - Showcase de hub
- **`DecorativeGrid.tsx`** - Grid decorativo

#### **`/components/wtm` - Componentes Women in Tech**
- **`LeadershipSection.tsx`** - Seção de líderes
- **`HeroCarousel.tsx`** - Carrossel hero
- **`RecursosOrganizador.tsx`** - Recursos para organizadores
- **`OutrosRecursos.tsx`** - Outros recursos

#### **`/components/ui` - Componentes UI/Shadcn**
Biblioteca de componentes reutilizáveis baseada em **Shadcn**:

**Componentes Base:**
- `button.tsx` - Botões
- `input.tsx` - Campos de entrada
- `textarea.tsx` - Áreas de texto
- `label.tsx` - Labels
- `badge.tsx` - Badges/etiquetas

**Componentes Complexos:**
- `accordion.tsx` - Acordeão expansível
- `card.tsx` - Cards
- `carousel.tsx` - Carrossel
- `dialog.tsx` - Modal/diálogo
- `drawer.tsx` - Gaveta lateral
- `dropdown-menu.tsx` - Menu suspenso
- `navigation-menu.tsx` - Menu de navegação
- `sidebar.tsx` - Barra lateral
- `sheet.tsx` - Folha lateral
- `tabs.tsx` - Abas

**Componentes de Seleção:**
- `select.tsx` - Seletor
- `checkbox.tsx` - Checkbox
- `radio-group.tsx` - Grupo de rádio
- `toggle.tsx` - Toggle
- `toggle-group.tsx` - Grupo toggle

**Componentes de Informação:**
- `alert.tsx` - Alertas
- `alert-dialog.tsx` - Diálogo de alerta
- `toast.tsx` / `toaster.tsx` - Notificações toast
- `tooltip.tsx` - Dicas de ferramentas
- `hover-card.tsx` - Card ao passar mouse

**Componentes de Dados:**
- `table.tsx` - Tabelas
- `pagination.tsx` - Paginação
- `progress.tsx` - Barra de progresso
- `slider.tsx` - Controle deslizante
- `chart.tsx` - Gráficos (Recharts)

**Componentes Utilitários:**
- `aspect-ratio.tsx` - Proporção de aspecto
- `avatar.tsx` - Avatar/foto de perfil
- `breadcrumb.tsx` - Navegação breadcrumb
- `collapsible.tsx` - Colapsível
- `command.tsx` - Comando/busca
- `context-menu.tsx` - Menu de contexto
- `empty.tsx` - Estado vazio
- `field.tsx` - Campo de formulário
- `form.tsx` - Formulário
- `input-group.tsx` - Grupo de entrada
- `input-otp.tsx` - Entrada OTP
- `item.tsx` - Item genérico
- `kbd.tsx` - Tecla de teclado
- `menubar.tsx` - Barra de menu
- `popover.tsx` - Popover
- `resizable.tsx` - Redimensionável
- `scroll-area.tsx` - Área com scroll
- `separator.tsx` - Separador
- `skeleton.tsx` - Skeleton loader
- `spinner.tsx` - Spinner/loader
- `switch.tsx` - Interruptor
- `sonner.tsx` - Notificações Sonner

**Hooks UI:**
- `use-mobile.ts` - Hook para detectar modo mobile
- `use-toast.ts` - Hook para controlar toasts

---

### **3. `/data` - Tipos e Dados Estáticos**

#### **`types.ts` - Tipos TypeScript Globais**
```typescript
// Eventos
interface Event { ... }

// Filtros
type FilterTab = 'Angola' | 'Brasil' | ...

// Comentários
interface Comment { ... }

// Comunidades e Projetos
interface Community { ... }

// Notícias e Hero
interface News { ... }

// Mídia
interface Media { ... }
```

#### **`dataCommunity.ts`** - Dados mockados de comunidades
- Lista de comunidades de desenvolvimento
- Informações de cada comunidade

#### **`metadata.json`** - Metadados do projeto

---

### **4. `/hooks` - Custom Hooks React**

- **`use-mobile.ts`** - Detecta se o dispositivo é mobile
- **`use-toast.ts`** - Gerencia notificações toast
  - Adicionar toast
  - Remover toast
  - Atualizar toast

---

### **5. `/lib` - Funções Utilitárias**

- **`utils.ts`** - Funções helper
  - `cn()` - Merge de classes CSS (clsx + tailwind-merge)
  - Outras funções utilitárias

---

### **6. `/public` - Arquivos Estáticos**

- **`/images`** - Imagens do projeto
  - Logos
  - Screenshots
  - Backgrounds
  - Ícones

- **`/videos`** - Vídeos do projeto

---

### **7. `/styles` - Estilos CSS**

- **`globals.css`** - Estilos globais
  - Importação Tailwind
  - Reset CSS
  - Variáveis customizadas

---

## Configurações Importantes

### **`next.config.mjs`** - Configuração Next.js
- Configurações de build
- Otimizações de imagem
- Variáveis de ambiente

### **`tailwind.config.js`** - Configuração Tailwind
- Paleta de cores customizada
- Extensões de tema
- Plugins

### **`tsconfig.json`** - Configuração TypeScript
- Caminhos de alias (`@/*`)
- Configurações de compilação

### **`postcss.config.mjs`** - Configuração PostCSS
- Tailwind CSS
- Autoprefixer

---

## Dependências Principais

### **Framework e Ferramentas**
- `next` - Framework React
- `react` - Biblioteca UI
- `typescript` - Tipagem estática

### **UI e Componentes**
- `@radix-ui/*` - Componentes acessíveis
- `recharts` - Gráficos
- `embla-carousel-react` - Carrossel

### **Formulários**
- `@hookform/resolvers` - Validação de formulários
- `react-hook-form` - Gerenciamento de formulários

### **Ícones**
- `@fortawesome/*` - Ícones FontAwesome

### **Styling**
- `tailwindcss` - Utility-first CSS
- `autoprefixer` - Prefixos CSS automáticos

### **Utilitários**
- `class-variance-authority` - Variantes de componentes
- `clsx` - Merge de classes
- `date-fns` - Manipulação de datas
- `cmdk` - Paleta de comandos

### **IA e APIs**
- `@google/generative-ai` - API Google Gemini (opcional)

### **Analytics**
- `@vercel/analytics` - Analytics do Vercel

---

## esign System

O projeto utiliza **Tailwind CSS** com um design system customizado:

### **Paleta de Cores**
- **Primária**: Teal (`#0d9488`)
- **Secundária**: Cinza (`#f3f4f6`)
- **Escura**: Preto (`#000000`)
- **Clara**: Branco (`#ffffff`)

### **Espaçamento**
- Segue escala padrão do Tailwind

### **Tipografia**
- Font: Geist (Google Fonts)
- Tamanhos: xs, sm, base, lg, xl, 2xl, etc.

---

## Como Executar o Projeto

### **Instalação**
```bash
npm install
# ou
pnpm install
```

### **Desenvolvimento**
```bash
npm run dev
# ou
pnpm dev
```

Acesse http://localhost:3000

### **Build**
```bash
npm run build
npm start
```

### **Lint**
```bash
npm run lint
```

---

## Páginas do Projeto

| Página | URL | Descrição |
|--------|-----|-----------|
| **Home** | `/` | Página inicial com visão geral |
| **Roadmaps** | `/roadmaps` | Roteiros de aprendizado |
| **Eventos** | `/events` | Eventos técnicos com filtros |
| **Competições** | `/comp` | Competições e desafios |
| **Comunidades** | `/community` | Comunidades de desenvolvedores |
| **Mulheres na TI** | `/wtm` | Foco em mulheres na tecnologia |
| **Bolsas de Estudo** | `/bolsas` | Oportunidades de financiamento |
| **Guia Startup** | `/startups` | Informações para empreendedores |
| **Quiz** | `/quiz` | Identifica área ideal do desenvolvedor |
| **Assinatura** | `/assinatura` | Fluxo de assinatura e confirmação (página de assinatura e página de sucesso) |

---

## Funcionalidades Principais

### **1. Navegação Responsiva**
- Menu desktop completo
- Menu mobile com hamburger
- Navbar sticky

### **2. Filtros de Eventos**
- Busca por nome
- Filtro por localização (7 países/regiões)
- Filtro por eventos online
- Filtro por datas
  
  **Atualizações (Jan 2026):**
  - Sistema avançado de filtros por **país**, **estado/província** e **cidade**
  - Filtro por **categoria de evento** (Workshop, Conferência, Hackathon, Meetup, etc.)
  - Suporte para buscas que combinam termos (ex.: país + estado + categoria)
  - Base de dados mockada e parcial real com eventos por estado/província em países lusófonos
  - Componente `AdvancedFilters` em `components/events/AdvancedFilters.tsx`
  - Dados de localização em `data/locationsData.ts` e eventos em `data/eventsDatabase.ts`

### **3. Carrosséis**
- Carrossel de partners infinito
- Carrossel de bolsas com dots
- Carrossel hero com navegação

### **4. Quiz Interativo**
- Identifica melhor área de desenvolvimento
- Progresso visual
- Resultados personalizados

### **5. Roadmaps de Aprendizado**
- Caminhos por especialidade
- Projetos por nível de dificuldade
- Ícones de tecnologia categorizados

### **6. Sistema de Componentes UI**
- Biblioteca completa de componentes
- Acessibilidade (Radix UI)
- Totalmente customizável com Tailwind

---

## Idiomas Suportados

O projeto é totalmente em **português** com suporte a:
- Angola
- Brasil
- Moçambique
- Portugal
- São Tomé e Príncipe
- Guiné-Bissau
- Cabo-Verde

---

## Responsividade

O projeto é **100% responsivo** com breakpoints Tailwind:
- `sm` - 640px
- `md` - 768px
- `lg` - 1024px
- `xl` - 1280px
- `2xl` - 1536px

---

## Pontos Destacados

[✓] **Next.js App Router** - Roteamento moderno
[✓] **TypeScript** - Código tipado e seguro
[✓] **Tailwind CSS** - Styling eficiente
[✓] **Radix UI** - Componentes acessíveis
[✓] **Totalmente em Português** - Comentários e conteúdo
[✓] **Mobile-First** - Design responsivo
[✓] **Analytics** - Tracking de eventos
[✓] **Componentes Reutilizáveis** - DRY principle

---

## Segurança

- TypeScript para validação de tipos
- Sanitização de inputs
- Variáveis de ambiente
- CORS configurado

---

## Recursos Adicionais

- Documentação Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com
- Radix UI: https://www.radix-ui.com
- React Hook Form: https://react-hook-form.com
- Recharts: https://recharts.org

---

--- O projeto implementa um sistema robusto de proteção para rotas administrativas e APIs sensíveis, utilizando autenticação baseada em token JWT, cookies HTTP-only e middleware do Next.js. Veja como funciona:

## 1. Middleware Global (middleware.ts)
Protege todas as rotas /admin e /api/admin automaticamente.
Validação de token:
O middleware lê o cookie admin_token (HTTP-only, seguro, sameSite=strict).
Se não houver token, redireciona para /login.
Se o token existir, chama validateAdminToken (em auth.ts) para validar assinatura, expiração e papel de admin.
Se inválido, redireciona para /login (fail closed).
Se válido, permite acesso à rota.
Configuração:
O matcher do middleware garante que apenas /admin/:path* e /api/admin/:path* são protegidos.

## 2. Validação Centralizada (auth.ts)
Função validateAdminToken(token: string): Promise<boolean>:
Decodifica e valida o JWT usando segredo do ambiente (JWT_SECRET).
Verifica expiração (exp) e se o papel é admin.
Pronto para integração com backend real (pode ser adaptado para consultar API de autenticação).
Qualquer erro resulta em acesso negado.

## 3. Layout Protegido no Admin (AdminProtectedLayout.tsx)
Todas as páginas do admin são renderizadas dentro de AdminProtectedLayout.
No SSR, verifica se o cookie admin_token existe.
Se não autenticado, redireciona para /login.
Não há lógica de proteção no client-side (tudo é feito no servidor/middleware).

## 4. Página de Login (/login)
Formulário simples que envia usuário e senha para /api/login (exemplo, pronto para integração real).
Ao autenticar, o backend deve emitir o cookie admin_token (HTTP-only).

## 5. Boas Práticas Adotadas
Fail closed: Qualquer falha na validação bloqueia o acesso.
Cookies HTTP-only: Impede acesso via JavaScript, protegendo contra XSS.
Validação de papel: Apenas usuários com role: "admin" acessam rotas protegidas.
Pronto para produção: Basta integrar o backend real de autenticação.

## 6. Outras Medidas
TypeScript para validação de tipos.
Sanitização de inputs.
Variáveis de ambiente para segredos.
CORS configurado (atenção: restrinja sempre para origens confiáveis em produção!).
// Comentário: Verifique se o backend e o Next.js estão configurados para aceitar apenas domínios autorizados.
// Comentário: Nunca exponha variáveis de ambiente, segredos ou dados sensíveis no frontend ou em arquivos públicos.
Novidades e Atualizações Recentes
Sistema de proteção de rotas admin com middleware e JWT.
Filtros avançados de eventos por país, estado e categoria.
Componente global CountryFilter para seleção de país.
Quiz profissional com banco completo de perguntas e resultados personalizados.
Novos componentes UI baseados em Shadcn.
Páginas e dados mockados para eventos, bolsas, comunidades e startups.
Ajustes de acessibilidade e responsividade.

## Desenvolvimento

O código segue as melhores práticas:
- **Componentes funcionais** com Hooks
- **Props tipadas** com TypeScript
- **Separação de responsabilidades**
- **Componentes reutilizáveis**
- **Comentários em português**
- **Naming conventions claras**
 - **Novas implementações (Jan 2026):**
   - `components/events/AdvancedFilters.tsx` — dropdowns para país, estado e categoria
   - `data/locationsData.ts` — lista de países lusófonos e seus estados/províncias
   - `data/eventsDatabase.ts` — eventos mockados (60+) organizados por estado/província
   - `components/news` — correção de imports de tipos para `@/data/types`
   - Páginas `app/events/page.tsx` atualizada para consumir o novo sistema de filtros
   - `components/CountryFilter.tsx` — componente de seleção por país (`FilterTab`) consumido globalmente (WTM, Startups, Community, Bolsas, Subscription)
   - `app/assinatura` e `app/assinatura/sucesso` — fluxo de assinatura e confirmação
   - `components/quiz/QuizGame.tsx` e `app/quiz/data.ts` (`FULL_QUESTION_BANK`) — quiz com banco completo de perguntas e resultados aprimorados
   - `styles/globals.css` — ajustes de foco e acessibilidade para `CountryFilter`

---

## Licença

Projeto ADN Developer - Todos os direitos reservados.

---

**Última atualização:** Janeiro 2026
**Versão:** 0.1.0
