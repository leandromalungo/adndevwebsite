"use client";

import React, { useState, useMemo } from 'react';
import VideoHero from '@/components/store/VideoHero';
import Breadcrumbs from '@/components/store/Breadcrumbs';
import FilterBar from '@/components/store/FilterBar';
import { BreadcrumbItem, FilterOption, Product, Service, FilterState, CountryInfo } from '@/data/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { OWN_PRODUCTS, RECOMMENDED_PRODUCTS, EVENT_TICKETS, type EventTicket } from '@/data/storeData';

const COUNTRIES: CountryInfo[] = [
  { code: 'AO', name: 'Angola', currency: 'AOA', symbol: 'Kz', rate: 915.50 },
  { code: 'BR', name: 'Brasil', currency: 'BRL', symbol: 'R$', rate: 6.12 },
  { code: 'MZ', name: 'Moçambique', currency: 'MZN', symbol: 'MT', rate: 68.45 },
  { code: 'CV', name: 'Cabo Verde', currency: 'CVE', symbol: '$', rate: 110.26 },
  { code: 'GW', name: 'Guiné-Bissau', currency: 'XOF', symbol: 'CFA', rate: 655.95 },
  { code: 'GQ', name: 'Guiné Equatorial', currency: 'XAF', symbol: 'FCFA', rate: 655.95 },
  { code: 'ST', name: 'São Tomé e Príncipe', currency: 'STN', symbol: 'Db', rate: 24.50 },
  { code: 'PT', name: 'Portugal', currency: 'EUR', symbol: '€', rate: 1 },
];

const Page = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo>(COUNTRIES[7]); // Portugal
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSection, setActiveSection] = useState<'products' | 'tickets'>('products');
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    rating: null,
    condition: null,
    platform: null,
    maxPrice: null,
    sort: null,
  });

  const filterOptions: FilterOption[] = [
    { id: 'categoria', label: 'Categoria', options: ['T-shirts', 'Chapéus', 'Stickers', 'Items', 'Setup', 'Outro'] },
    { id: 'ordenar', label: 'Ordenar por', options: ['Preço: Baixo a Alto', 'Preço: Alto a Baixo'] },
    { id: 'regiao', label: `${selectedCountry.name} (${selectedCountry.currency})`, options: COUNTRIES.map(c => c.name) },
  ];

  const handleFilterChange = (filterId: string, value: any) => {
    if (filterId === 'regiao') {
      const country = COUNTRIES.find(c => c.name === value);
      if (country) setSelectedCountry(country);
      return;
    }

    setFilters(prev => {
      const next = { ...prev };
      switch (filterId) {
        case 'categoria': next.category = value; break;
        case 'ordenar': next.sort = value; break;
      }
      return next;
    });
  };

  const handleClearFilters = () => {
    setFilters({
      category: null,
      rating: null,
      condition: null,
      platform: null,
      maxPrice: null,
      sort: null,
    });
    setSearchQuery('');
  };

  const formatPrice = (eurPrice: number) => {
    const converted = eurPrice * selectedCountry.rate;
    return new Intl.NumberFormat(selectedCountry.code === 'BR' ? 'pt-BR' : 'pt-PT', {
      style: 'currency',
      currency: selectedCountry.currency,
    }).format(converted);
  };

  const handleBuy = (e: React.MouseEvent, productName: string, isExternal: boolean = false) => {
    e.stopPropagation();
    const message = isExternal 
      ? `Redirecionando para compra de: ${productName}`
      : `A iniciar processo de compra para: ${productName} em ${selectedCountry.name}`;
    alert(message);
  };

  const filterAndSearch = (products: Product[]) => {
    let result = products.filter(p => p.availableCountries.includes(selectedCountry.code));
    
    if (filters.category) result = result.filter(p => p.category === filters.category);
    
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filters.sort) {
      if (filters.sort.includes('Baixo a Alto')) result.sort((a, b) => a.price - b.price);
      if (filters.sort.includes('Alto a Baixo')) result.sort((a, b) => b.price - a.price);
    }
    
    return result;
  };

  const filteredOwnProducts = useMemo(() => filterAndSearch(OWN_PRODUCTS), [filters, selectedCountry, searchQuery]);
  const filteredRecommendedProducts = useMemo(() => filterAndSearch(RECOMMENDED_PRODUCTS), [filters, selectedCountry, searchQuery]);
  const allProducts = useMemo(() => [...filteredOwnProducts, ...filteredRecommendedProducts], [filteredOwnProducts, filteredRecommendedProducts]);

  // Gerar sugestões de pesquisa
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const allProds = [...OWN_PRODUCTS, ...RECOMMENDED_PRODUCTS];
    const filtered = allProds
      .filter(p => p.availableCountries.includes(selectedCountry.code))
      .filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 6); // Limitar a 6 sugestões
    
    return filtered;
  }, [searchQuery, selectedCountry]);

  // Filtrar tickets por país e pesquisa
  const filteredTickets = useMemo(() => {
    return EVENT_TICKETS.filter(ticket => {
      const inCountry = ticket.availableCountries.includes(selectedCountry.code);
      const matchesSearch = searchQuery === '' || 
        ticket.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.name.toLowerCase().includes(searchQuery.toLowerCase());
      return inCountry && matchesSearch;
    });
  }, [selectedCountry, searchQuery]);

  const videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-city-street-at-night-4006-large.mp4';

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <VideoHero 
          videoUrl={videoUrl}
          title={`BEM-VINDO À NOSSA LOJA`}
          subtitle="Tudo o que precisas para o teu setup de desenvolvimento e mais, com descontos exclusivos. Produtos próprios e recomendados do mundo inteiro"
        />

        {/* Search Bar com Sugestões */}
        <section className="mt-6">
          <div className="relative">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            <input
              type="text"
              placeholder="Pesquisar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none"
            />
            
            {/* Dropdown de Sugestões */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg z-10 max-h-80 overflow-y-auto">
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      setSearchQuery(product.name);
                      setShowSuggestions(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-cyan-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center gap-3"
                  >
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
                    <div className="flex-grow">
                      <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      product.isOwn 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {product.isOwn ? 'Nosso' : 'Recomendado'}
                    </span>
                  </button>
                ))}
              </div>
            )}
            
            {/* Mensagem quando não há sugestões */}
            {showSuggestions && searchQuery.trim() && suggestions.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-4 text-center text-gray-500">
                <i className="fa-solid fa-magnifying-glass mr-2"></i>
                Nenhum produto encontrado com "{searchQuery}"
              </div>
            )}
          </div>
        </section>

        {/* Filter Bar com Secção */}
        <div className="w-full mt-4 border-b border-gray-100">
          <div className="flex flex-wrap gap-4 py-4 items-center">
            {/* Botões de Secção (Produtos/Ingressos) */}
            <button
              onClick={() => setActiveSection('products')}
              className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all focus:outline-none whitespace-nowrap border ${
                activeSection === 'products'
                  ? 'bg-cyan-50 border-cyan-500 text-cyan-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-cyan-500'
              }`}
            >
              <i className="fa-solid fa-shopping-bag mr-2"></i>
              Produtos
            </button>
            <button
              onClick={() => setActiveSection('tickets')}
              className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all focus:outline-none whitespace-nowrap border ${
                activeSection === 'tickets'
                   ? 'bg-cyan-50 border-cyan-500 text-cyan-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-cyan-500'
              }`}
            >
              <i className="fa-solid fa-ticket mr-2"></i>
              Ingressos
            </button>

            {/* Filter Bar */}
            <div className="flex-1 flex flex-wrap gap-3 items-center min-w-[200px]">
              <FilterBar
                filters={filterOptions}
                activeFilters={filters}
                selectedCountry={selectedCountry}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>
        </div>

        {/* TODOS OS PRODUTOS */}
        {activeSection === 'products' && (
        <section className="mt-12">
          <h3 className="text-xl font-bold mb-6 text-gray-900">
            <i className="fa-solid fa-shopping-bag mr-2 text-cyan-600"></i>
            Todos os Produtos
          </h3>
          {allProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {allProducts.map(product => {
                const isOwn = product.isOwn;
                return isOwn ? (
                  <ProductCard key={product.id} product={product} selectedCountry={selectedCountry} formatPrice={formatPrice} handleBuy={handleBuy} />
                ) : (
                  <RecommendedProductCard key={product.id} product={product} selectedCountry={selectedCountry} formatPrice={formatPrice} handleBuy={handleBuy} />
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">Nenhum produto encontrado</p>
          )}
        </section>
        )}

        {/* TICKETS DE EVENTOS */}
        {activeSection === 'tickets' && (
        <section className="mt-12">
          <h3 className="text-xl font-bold mb-6 text-gray-900">
            <i className="fa-solid fa-ticket mr-2 text-purple-600"></i>
            Ingressos para Eventos
          </h3>
          {filteredTickets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTickets.map(ticket => (
                <EventTicketCard key={ticket.id} ticket={ticket} selectedCountry={selectedCountry} formatPrice={formatPrice} handleBuy={handleBuy} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">Nenhum ingresso disponível</p>
          )}
        </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

// Componente para Produto Próprio
const ProductCard = ({ product, selectedCountry, formatPrice, handleBuy }: any) => (
  <div className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl p-2 hover:shadow-xl transition-all duration-300 border border-yellow-50 hover:border-yellow-100">
    <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 mb-4 shadow-sm">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl text-sm font-black text-gray-900 shadow-sm">
        {formatPrice(product.price)}
      </div>
    </div>
    <div className="px-2 flex-grow">
      <h3 className="font-bold text-gray-900 leading-tight transition-colors line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
      <p className="text-xs text-gray-500 mt-2">{product.description}</p>
    </div>
    <div className="mt-4 px-2 pb-2">
      <button 
        onClick={e => handleBuy(e, product.name, false)}
        className="w-full bg-green-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 active:scale-95 transition-all shadow-lg"
      >
        <i className="fa-solid fa-cart-shopping mr-2"></i>
        Comprar
      </button>
    </div>
  </div>
);

// Componente para Produto Recomendado
const RecommendedProductCard = ({ product, selectedCountry, formatPrice, handleBuy }: any) => (
  <div className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl p-2 hover:shadow-xl transition-all duration-300 border border-yellow-50 hover:border-yellow-100">
    <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 mb-4 shadow-sm">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-3 left-3 flex gap-1">
        <span className="bg-gray-50 text-gray-500 px-2 py-1 rounded-lg text-xs opacity-20 font-bold shadow-sm">
          {product.externalStore?.toUpperCase()}
        </span>
      </div>
      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl text-sm font-black text-gray-900 shadow-sm">
        {formatPrice(product.price)}
      </div>
    </div>
    <div className="px-2 flex-grow">
      <h3 className="font-bold text-gray-900 leading-tight transition-colors line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
      <p className="text-xs text-gray-500 mt-2">{product.description}</p>
    </div>
    <div className="mt-4 px-2 pb-2">
      <button 
        onClick={e => { handleBuy(e, product.name, true); window.open(product.externalUrl, '_blank'); }}
        className="w-full bg-green-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 active:scale-95 transition-all shadow-lg"
      >
        <i className="fa-solid fa-external-link mr-2"></i>
        Comprar
      </button>
    </div>
  </div>
);

// Componente para Ticket de Evento
const EventTicketCard = ({ ticket, selectedCountry, formatPrice, handleBuy }: { ticket: EventTicket; selectedCountry: CountryInfo; formatPrice: (price: number) => string; handleBuy: (e: React.MouseEvent, name: string, isExternal?: boolean) => void }) => {
  const typeColors: Record<string, string> = {
    'normal': 'bg-blue-100 text-blue-700',
    'vip': 'bg-purple-100 text-purple-700',
    'early-bird': 'bg-orange-100 text-orange-700'
  };

  const typeIcons: Record<string, string> = {
    'normal': 'fa-ticket',
    'vip': 'fa-crown',
    'early-bird': 'fa-zap'
  };

  const typeLabels: Record<string, string> = {
    'normal': 'Normal',
    'vip': 'VIP',
    'early-bird': 'Early Bird'
  };

  return (
    <div className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl p-2 hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-300">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-purple-50 mb-4 shadow-sm flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-2">
            <i className="fa-solid fa-calendar-days text-purple-600"></i>
          </div>
          <p className="text-sm font-bold text-purple-900">{ticket.date.split(' ')[0]}</p>
          <p className="text-xs text-purple-600">{ticket.location}</p>
        </div>
        <div className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-lg ${typeColors[ticket.type]}`}>
          <i className={`fa-solid ${typeIcons[ticket.type]} mr-1`}></i>
          {typeLabels[ticket.type]}
        </div>
      </div>
      <div className="px-2 flex-grow">
        <h3 className="font-bold text-gray-900 leading-tight group-hover:text-purple-600 transition-colors line-clamp-2 min-h-[2.5rem]">{ticket.event}</h3>
        <p className="text-xs text-gray-500 mt-2 line-clamp-2">{ticket.description}</p>
        <div className="mt-3 flex items-center text-xs text-gray-600">
          <i className="fa-solid fa-map-pin mr-1 text-purple-600"></i>
          {ticket.location}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-gray-500">Ingressos: {ticket.quantity}</span>
          <span className="text-lg font-black text-purple-600">{formatPrice(ticket.price)}</span>
        </div>
      </div>
      <div className="mt-4 px-2 pb-2">
        <button 
          onClick={e => handleBuy(e, `Ingresso - ${ticket.event}`)}
          className="w-full bg-purple-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-purple-700 active:scale-95 transition-all shadow-lg"
        >
          <i className="fa-solid fa-cart-shopping mr-2"></i>
          Comprar Ingresso
        </button>
      </div>
    </div>
  );
};

export default Page;