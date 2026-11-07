# ADN Developer 🚀

> O maior hub de oportunidades, tecnologia e ecossistema de startups da Lusofonia.

**ADN Developer** é uma plataforma comunitária aberta concebida para acelerar o crescimento de desenvolvedores e conectar ecossistemas tecnológicos nos países de língua portuguesa: **Angola, Brasil, Cabo Verde, Guiné-Bissau, Moçambique, Portugal, São Tomé e Príncipe e Timor-Leste**.

---

## 🌟 Módulos Principais

- 🚀 **Startups Lusófonas (Estilo Product Hunt)**
  - Feed com **Destaque do Dia**, tendências e catálogo ordenado.
  - Filtros avançados por país lusófono, setor e estágio (Pre-seed, Seed, Série A, etc.).
  - Interação comunitária: seguir startups, comentar, responder e curtir feedbacks.
  - Painel administrativo com gestão de catálogo, reordenação e **ações em massa** (publicar, despublicar e eliminar).

- 🏆 **Ranking de Tecnologias da Comunidade**
  - Votação comunitária real (upvote/downvote) com 1 voto ativo por utilizador.
  - Filtro por país (ranking nacional ou visão agregada global).
  - Pódio Top 3, métricas dinâmicas e categorização por áreas (Web, Mobile, IA/ML, DevOps, etc.).

- 🎓 **Oportunidades & Capacitação**
  - **Bolsas de Estudo**: Financiamento e capacitação em tech para talentos lusófonos.
  - **Competições & Hackathons**: Desafios práticos e maratonas de programação.
  - **Eventos & Workshops**: Calendário de palestras e encontros presenciais/online com filtros regionais.

- 🧭 **Carreira & Aprendizagem**
  - **Quiz de Orientação**: Teste interativo vocacional para direcionar áreas de especialização em tech.
  - **Roadmaps**: Trilhas práticas e estruturadas para desenvolvedores frontend, backend, fullstack e mobile.

- 👥 **Comunidades & Diversidade**
  - Diretório de comunidades tecnológicas ativas no espaço lusófono.
  - Seção dedicada para iniciativas **Women Techmakers (WTM)** e inclusão feminina no ecossistema.

- 🛡️ **Segurança & Gestão Administrativa**
  - Sistema de permissões RBAC com NextAuth.js.
  - Camada de rotas administrativas com proteção e ofuscação de endpoints.
  - Rate limiting inteligente via Upstash Redis e moderação de conteúdo em tempo real.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologias |
| :--- | :--- |
| **Framework & Core** | [Next.js 15 (App Router)](https://nextjs.org), [React 19](https://react.dev), [TypeScript](https://www.typescriptlang.org) |
| **Estilização & UI** | [Tailwind CSS](https://tailwindcss.com), [Radix UI](https://www.radix-ui.com), [Lucide React](https://lucide.dev), [Framer Motion](https://www.framer.com/motion) |
| **Autenticação** | [NextAuth.js](https://next-auth.js.org) (Credenciais, RBAC, Sessões seguras) |
| **Banco de Dados** | [Supabase](https://supabase.com) (PostgreSQL) + Fallback em memória integrado para desenvolvimento |
| **Segurança & Cache** | [Upstash Redis](https://upstash.com) (Rate Limiting, proteção anti-abuso) |

---

## 📁 Estrutura do Projeto

```text
adndeveloper/
├── app/                      # Rotas e páginas do Next.js (App Router)
│   ├── api/                  # Endpoints REST (Startups, Ranking, Admin, Auth)
│   ├── startups/             # Feed e páginas de detalhe das Startups (/startups/[slug])
│   ├── ranking/              # Ranking comunitário de tecnologias
│   ├── bolsas/               # Oportunidades de bolsas de estudo
│   ├── comp/                 # Competições e Hackathons
│   ├── events/               # Eventos técnicos e workshops
│   ├── quiz/                 # Quiz vocacional de orientação de carreira
│   ├── community/            # Comunidades tech lusófonas
│   └── (admin)/              # Painel de gestão administrativa e moderação
├── components/               # Componentes reutilizáveis (UI, layout, módulos específicos)
├── data/                     # Dados estáticos e tipos auxiliares
├── lib/                      # Serviços, clientes de banco (Supabase), regras e auth
├── public/                   # Recursos estáticos (logos, ícones e ilustrações)
└── styles/                   # Configurações globais de CSS
```

---

## 🚀 Como Executar Localmente

### 1. Pré-requisitos
- **Node.js** 18.18+ ou superior
- **npm**, **pnpm** ou **yarn**

### 2. Clonar e Instalar Dependências
```bash
git clone https://github.com/seu-usuario/adn-developer.git
cd adn-developer
npm install
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz baseado no `.env.example`:
```bash
cp .env.example .env
```

Preencha as variáveis essenciais:
```ini
NEXTAUTH_SECRET=sua-chave-secreta-aqui
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Administradores autorizados (separados por vírgula)
ADMIN_EMAILS=admin@adndeveloper.com

# Opcional (se não fornecido, o app usa persistência local/em memória)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### 4. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```

Acesse a aplicação no navegador em [http://localhost:3000](http://localhost:3000).

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local de desenvolvimento na porta 3000 |
| `npm run build` | Compila a aplicação para produção |
| `npm run start` | Executa o build de produção |
| `npm run lint` | Executa a validação de tipos TypeScript (`tsc --noEmit`) |

---

## 🤝 Contribuição

Contribuições são muito bem-vindas! Se tens sugestões de melhorias, queres cadastrar uma nova comunidade ou relatar um problema:

1. Faz um **Fork** do repositório.
2. Cria uma branch para a tua funcionalidade (`git checkout -b feature/minha-melhoria`).
3. Faz commit das tuas alterações (`git commit -m 'feat: adiciona nova funcionalidade'`).
4. Envia para o branch (`git push origin feature/minha-melhoria`).
5. Abre um **Pull Request**.

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).
Feito com 💜 para fortalecer o ecossistema tecnológico lusófono.