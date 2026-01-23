# 🛍️ Guia Completo do Store - Loja Expandida

## 📋 Resumo das Funcionalidades Implementadas

O sistema de store foi completamente reformulado para oferecer uma experiência abrangente de comercialização e prestação de serviços para a comunidade tech lusófona.

---

## ✨ Principais Melhorias

### 1. **Sistema de Abas Inteligentes** 

A loja agora possui 3 seções claramente separadas:

```
┌──────────────────┬──────────────────┬──────────────────┐
│  Produtos Próprios │  Recomendados  │     Serviços      │
│    (5 itens)      │   (6 itens)    │    (4 serviços)  │
└──────────────────┴──────────────────┴──────────────────┘
```

#### **Aba 1: Produtos Próprios** 🏆
- Merchandise oficial da comunidade
- Verificado com badge "Nosso Produto" (verde)
- Compra direta através do site
- 5 produtos curados

#### **Aba 2: Produtos Recomendados** ⭐
- Produtos de parceiros externos
- Links para AliExpress, Amazon, Mercado Livre
- Badge mostra marketplace origem
- 6 produtos recomendados de confiança

#### **Aba 3: Serviços** 💼
- Consultoria técnica
- Treinamento corporativo
- Code review
- Mentoria 1-on-1
- Botão "Agendar" para cada serviço

---

### 2. **Barra de Pesquisa Global** 🔍

Funcionalidade de busca que atravessa:
- ✅ Nome do produto/serviço
- ✅ Descrição detalhada
- ✅ Todas as abas simultaneamente
- ✅ Case-insensitive
- ✅ Resultado em tempo real

**Exemplo:**
```
Digitar "1080p" → Filtra: Webcam 1080p USB, Monitor 24" IPS
Digitar "Treinamento" → Filtra: Serviço de Treinamento Corporativo
```

---

### 3. **Sistema de Filtros Avançados** 🎯

Mantém todos os filtros anteriores + novas funcionalidades:

| Filtro | Opções |
|--------|--------|
| **Região** | 8 países lusófonos com conversão de moeda |
| **Categoria** | T-shirts, Chapéus, Stickers, Items, Setup, Outro |
| **Ordenação** | Preço: Baixo→Alto / Alto→Baixo |
| **Limpeza** | Botão "Limpar filtros" + reset de busca |

---

### 4. **Integração com Marketplaces Externos** 🔗

#### Marketplaces Suportados:
1. **AliExpress** - Produtos de tech (teclados, mouses, etc)
2. **Amazon** - Webcams, monitores, periféricos
3. **Mercado Livre** - Foco em Brasil (headsets, acessórios)
4. **Genérico** - Links customizados para outros

#### Como Funciona:
- Botão "Ver em [Marketplace]" com cor distinctive
- Abre link em nova aba (`_blank`)
- Rastreamento de cliques (alerta com nome do produto)
- URL mapeada para cada produto

**Exemplo de URLs:**
```tsx
// AliExpress
externalUrl: 'https://aliexpress.com/wholesale?SearchText=mechanical+keyboard+rgb'

// Amazon
externalUrl: 'https://amazon.com/s?k=1080p+webcam+usb'

// Mercado Livre Brasil
externalUrl: 'https://www.mercadolivre.com.br/headset-gamer-wireless'
```

---

### 5. **Conversão de Moeda Dinâmica** 💱

Sistema mantido e expandido para 8 moedas:

```
Portugal:     € EUR (taxa base 1.0)
Brasil:       R$ BRL (taxa 6.12)
Angola:       Kz AOA (taxa 915.50)
Moçambique:   MT MZN (taxa 68.45)
Cabo Verde:   $ CVE (taxa 110.26)
Guiné-Bissau: CFA XOF (taxa 655.95)
Guiné Eq.:    FCFA XAF (taxa 655.95)
São Tomé:     Db STN (taxa 24.50)
```

**Localização de Preço:**
```javascript
// Automático baseado no país selecionado
formatPrice(25.00) // Portugal: €25.00
formatPrice(25.00) // Brasil: R$ 153,00
formatPrice(25.00) // Angola: 22.887,50 Kz
```

---

### 6. **Componentes de Card Customizados** 🎨

#### ProductCard (Produtos Próprios)
```tsx
- Imagem com hover zoom
- Badge verde "Nosso Produto"
- Preço com fundo semitransparente
- Descrição do produto
- Botão "Comprar" verde
```

#### RecommendedProductCard (Produtos Recomendados)
```tsx
- Imagem com hover zoom
- Badge amarelo com nome do marketplace
- Preço convertido
- Descrição
- Botão "Ver em [Marketplace]" amarelo
- Link externo automático
```

#### ServiceCard (Serviços)
```tsx
- Ícone Font Awesome grande
- Fundo gradiente azul
- Tags de especialidade
- Duração e preço
- Botão "Agendar"
```

---

## 📁 Estrutura de Arquivos

### Novo Arquivo: `data/storeData.ts`
Centraliza toda a informação de produtos e serviços:

```typescript
export const OWN_PRODUCTS: Product[]          // 5 produtos
export const RECOMMENDED_PRODUCTS: Product[]   // 6 produtos  
export const SERVICES: Service[]              // 4 serviços
export const PRODUCT_CATEGORIES: string[]      // Categorias
export const SERVICE_CATEGORIES: string[]      // Serviços
export const EXTERNAL_MARKETPLACES: object[]   // Marketplaces
```

### Atualizado: `app/store/page.tsx`
- Importa dados de `storeData.ts`
- Remove duplicação de dados
- Implementa lógica de abas
- Gerencia estado de busca e filtros
- Renderiza componentes customizados

### Atualizado: `data/types.ts`
Tipos TypeScript adicionados:
```typescript
interface Product {
  isOwn?: boolean;           // Flag de produto próprio
  externalStore?: string;    // Marketplace (aliexpress|amazon|etc)
  externalUrl?: string;      // URL para compra externa
  description?: string;      // Descrição longa
}

interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;             // Classe Font Awesome
  price: string;
  duration: string;
  category: string;
  tags: string[];
  image: string;
  availableCountries: string[];
}
```

---

## 🔄 Fluxo de Dados

```
App Inicializa
        ↓
Carrega COUNTRIES (8 países)
        ↓
Importa OWN_PRODUCTS, RECOMMENDED_PRODUCTS, SERVICES
        ↓
Estado: [selectedCountry, activeTab, searchQuery, filters]
        ↓
        ├─→ Filtra por país selecionado ✓
        ├─→ Busca por query em nome/descrição ✓
        ├─→ Filtra por categoria ✓
        ├─→ Ordena por preço ✓
        └─→ Renderiza componentes customizados ✓
```

---

## 💡 Casos de Uso

### Caso 1: Cliente procura "Teclado"
```
1. Digita "Teclado" na barra de busca
2. Sistema filtra OWN_PRODUCTS + RECOMMENDED_PRODUCTS
3. Encontra: "Teclado Mecânico RGB" (Recomendado - AliExpress)
4. Clica "Ver em aliexpress"
5. Abre link em nova aba para compra
```

### Caso 2: Empresa procura Treinamento em Brasil
```
1. Seleciona "Brasil" no filtro de região
2. Clica aba "Serviços"
3. Vê "Treinamento Corporativo" (disponível no Brasil)
4. Clica "Agendar"
5. Sistema pode redirecionar para formulário de contato
```

### Caso 3: Comparação de preços por país
```
1. Seleciona "Portugal" - vê "Tapete XL" por €25,00
2. Muda para "Brasil" - vê mesmo tapete por R$153,00
3. Ajusta orçamento automaticamente
4. Compra na melhor moeda
```

---

## 🎯 Funcionalidades Futuras Recomendadas

1. **Sistema de Carrinho** - Múltiplos produtos
2. **Wishlist** - Favoritos persistidos
3. **Avaliações** - Rating de clientes
4. **Cupons de Desconto** - Códigos promocionais
5. **Programa de Afiliado** - Comissão em recomendados
6. **Analytics** - Rastrear cliques para marketplaces
7. **Integração de Pagamento** - Stripe, PayPal, Mercado Pago
8. **Histórico de Compras** - Para clientes autenticados
9. **Notificações** - Alertas de novos produtos
10. **Admin Panel** - Gerenciar produtos e serviços

---

## 📊 Estatísticas Atuais

- **Produtos Próprios**: 5
- **Produtos Recomendados**: 6
- **Serviços Oferecidos**: 4
- **Países Suportados**: 8
- **Moedas**: 8
- **Marketplaces Externos**: 3 + genérico
- **Componentes Customizados**: 3 (Product, Recommended, Service)

---

## ✅ Checklist de Implementação

- [x] Sistema de abas (Produtos | Recomendados | Serviços)
- [x] Barra de pesquisa global
- [x] Componente ProductCard com badge "Nosso Produto"
- [x] Componente RecommendedProductCard com marketplace
- [x] Componente ServiceCard com ícones
- [x] Integração AliExpress, Amazon, Mercado Livre
- [x] Conversão de moeda para 8 países
- [x] Filtros avançados mantidos
- [x] Centralização de dados em `storeData.ts`
- [x] TypeScript types para todos os elementos
- [x] Handles para compra e agendamento
- [x] Link externo com rastreamento
- [x] Responsiveness mobile/tablet/desktop
- [x] Dark mode compatible (Tailwind)

---

## 🚀 Como Usar

### Adicionar Novo Produto Próprio
```typescript
// Em data/storeData.ts
{
  id: 22,
  name: "Novo Produto XYZ",
  price: 19.99,
  platform: "Categoria",
  category: "Items",
  condition: "Novo",
  rating: 5,
  image: "/images/store/22.jpg",
  availableCountries: ['PT', 'BR', 'AO'],
  isOwn: true,
  description: "Descrição completa do produto..."
}
```

### Adicionar Novo Marketplace
```typescript
// Em data/storeData.ts > EXTERNAL_MARKETPLACES
{ 
  id: 'ebay', 
  name: 'eBay', 
  icon: 'fa-shopping-cart', 
  color: 'bg-red-600' 
}

// No produto
externalStore: 'ebay',
externalUrl: 'https://ebay.com/sch/...'
```

### Adicionar Novo Serviço
```typescript
// Em data/storeData.ts > SERVICES
{
  id: 'ser-6',
  name: "Novo Serviço",
  description: "Descrição...",
  icon: "fa-icon-name",
  price: "€XX/hora",
  duration: "1h",
  category: "Categoria",
  tags: ['tag1', 'tag2'],
  image: "/images/store/6.jpg",
  availableCountries: ['PT', 'BR', 'AO']
}
```

---

**Versão**: 2.0 | **Atualizado**: 2025 | **Status**: ✅ Completo e Testado
