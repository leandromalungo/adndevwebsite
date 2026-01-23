"use client";

import React, { useState, useMemo } from 'react';
import VideoHero from '@/components/store/VideoHero';
import Breadcrumbs from '@/components/store/Breadcrumbs';
import FilterBar from '@/components/store/FilterBar';
import { BreadcrumbItem, FilterOption, Product, Service, FilterState, CountryInfo } from '@/data/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { OWN_PRODUCTS, RECOMMENDED_PRODUCTS, SERVICES } from '@/data/storeData';

const COUNTRIES: CountryInfo[] = [
  { code: 'PT', name: 'Portugal', currency: 'EUR', symbol: '€', rate: 1 },
  { code: 'AO', name: 'Angola', currency: 'AOA', symbol: 'Kz', rate: 915.50 },
  { code: 'BR', name: 'Brasil', currency: 'BRL', symbol: 'R$', rate: 6.12 },
  { code: 'MZ', name: 'Moçambique', currency: 'MZN', symbol: 'MT', rate: 68.45 },
  { code: 'CV', name: 'Cabo Verde', currency: 'CVE', symbol: '$', rate: 110.26 },
  { code: 'GW', name: 'Guiné-Bissau', currency: 'XOF', symbol: 'CFA', rate: 655.95 },
  { code: 'GQ', name: 'Guiné Equatorial', currency: 'XAF', symbol: 'FCFA', rate: 655.95 },
  { code: 'ST', name: 'São Tomé e Príncipe', currency: 'STN', symbol: 'Db', rate: 24.50 },
];

const Page = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo>(COUNTRIES[0]);
  const [activeTab, setActiveTab] = useState<'products' | 'recommended' | 'services'>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    rating: null,
    condition: null,
    platform: null,
    maxPrice: null,
    sort: null,
  });

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Loja', href: '#' },
    { label: 'Produtos & Serviços', href: '#' },
    { label: 'Store', href: '#' },
  ];

  const filterOptions: FilterOption[] = [
    { id: 'regiao', label: 'Região', options: COUNTRIES.map(c => c.name) },
    { id: 'categoria', label: 'Categoria', options: ['T-shirts', 'Chapéus', 'Stickers', 'Items', 'Setup', 'Outro'] },
    { id: 'ordenar', label: 'Ordenar por', options: ['Preço: Baixo a Alto', 'Preço: Alto a Baixo'] },
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
  const filteredServices = useMemo(() => {
    return SERVICES.filter(s => s.availableCountries.includes(selectedCountry.code) &&
      (searchQuery === '' || 
       s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       s.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [selectedCountry, searchQuery]);

  const videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-city-street-at-night-4006-large.mp4';

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="text-[11px] text-gray-400 mb-2 font-medium uppercase tracking-tighter">
          Loja Exclusiva • {selectedCountry.name}
        </div>

        <VideoHero 
          videoUrl={videoUrl}
          title={`Produtos & Serviços em ${selectedCountry.name}`}
          subtitle="Merchandising exclusivo + Produtos recomendados + Serviços técnicos"
        />

        <section className="mt-8">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Loja</h2>
              <p className="text-gray-500 text-sm mt-1">Explore nossos produtos e serviços</p>
            </div>
          </div>
        </section>

        {/* Abas de navegação */}
        <section className="mt-8 flex gap-2 border-b border-gray-200 flex-wrap">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'products'
                ? 'border-cyan-600 text-cyan-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="fa-solid fa-shop mr-2"></i>
            Produtos Próprios ({filteredOwnProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('recommended')}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'recommended'
                ? 'border-cyan-600 text-cyan-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="fa-solid fa-star mr-2"></i>
            Recomendados ({filteredRecommendedProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'services'
                ? 'border-cyan-600 text-cyan-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="fa-solid fa-briefcase mr-2"></i>
            Serviços ({filteredServices.length})
          </button>
        </section>

        {/* Search Bar */}
        <section className="mt-6">
          <div className="relative">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Pesquisar produtos ou serviços..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none"
            />
          </div>
        </section>

        {/* Filter Bar */}
        <section className="mt-4">
          <FilterBar
            filters={filterOptions}
            activeFilters={filters}
            selectedCountry={selectedCountry}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </section>

        {/* CONTEÚDO POR ABA */}
        {activeTab === 'products' && (
          <section className="mt-12">
            <h3 className="text-xl font-bold mb-6 text-gray-900">
              <i className="fa-solid fa-badge-check mr-2 text-green-600"></i>
              Produtos Próprios Certificados
            </h3>
            {filteredOwnProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredOwnProducts.map(product => (
                  <ProductCard key={product.id} product={product} selectedCountry={selectedCountry} formatPrice={formatPrice} handleBuy={handleBuy} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-12">Nenhum produto encontrado</p>
            )}
          </section>
        )}

        {activeTab === 'recommended' && (
          <section className="mt-12">
            <h3 className="text-xl font-bold mb-6 text-gray-900">
              <i className="fa-solid fa-star mr-2 text-yellow-500"></i>
              Produtos Recomendados de Parceiros
            </h3>
            {filteredRecommendedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredRecommendedProducts.map(product => (
                  <RecommendedProductCard key={product.id} product={product} selectedCountry={selectedCountry} formatPrice={formatPrice} handleBuy={handleBuy} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-12">Nenhum produto recomendado encontrado</p>
            )}
          </section>
        )}

        {activeTab === 'services' && (
          <section className="mt-12">
            <h3 className="text-xl font-bold mb-6 text-gray-900">
              <i className="fa-solid fa-briefcase mr-2 text-blue-600"></i>
              Nossos Serviços
            </h3>
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-12">Nenhum serviço disponível</p>
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
  <div className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl p-2 hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-300">
    <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 mb-4 shadow-sm">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
        Nosso Produto
      </div>
      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl text-sm font-black text-gray-900 shadow-sm">
        {formatPrice(product.price)}
      </div>
    </div>
    <div className="px-2 flex-grow">
      <h3 className="font-bold text-gray-900 leading-tight group-hover:text-green-600 transition-colors line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
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
  <div className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl p-2 hover:shadow-xl transition-all duration-300 border border-yellow-100 hover:border-yellow-300">
    <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 mb-4 shadow-sm">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-3 left-3 flex gap-1">
        <span className="bg-yellow-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
          {product.externalStore?.toUpperCase()}
        </span>
      </div>
      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl text-sm font-black text-gray-900 shadow-sm">
        {formatPrice(product.price)}
      </div>
    </div>
    <div className="px-2 flex-grow">
      <h3 className="font-bold text-gray-900 leading-tight group-hover:text-yellow-600 transition-colors line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
      <p className="text-xs text-gray-500 mt-2">{product.description}</p>
    </div>
    <div className="mt-4 px-2 pb-2">
      <button 
        onClick={e => { handleBuy(e, product.name, true); window.open(product.externalUrl, '_blank'); }}
        className="w-full bg-yellow-500 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-yellow-600 active:scale-95 transition-all shadow-lg"
      >
        <i className="fa-solid fa-external-link mr-2"></i>
        Ver em {product.externalStore}
      </button>
    </div>
  </div>
);

// Componente para Serviço
const ServiceCard = ({ service }: any) => (
  <div className="group cursor-pointer flex flex-col h-full bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-300">
    <div className="mb-4 text-4xl text-blue-600">
      <i className={`fa-solid ${service.icon}`}></i>
    </div>
    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{service.name}</h3>
    <p className="text-sm text-gray-600 mb-4 flex-grow">{service.description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {service.tags.map((tag: string) => (
        <span key={tag} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{tag}</span>
      ))}
    </div>
    <div className="flex justify-between items-center text-sm text-gray-600 mb-4 pt-4 border-t border-blue-100">
      <span><i className="fa-solid fa-hourglass mr-2"></i>{service.duration}</span>
      <span className="font-bold text-blue-600">{service.price}</span>
    </div>
    <button className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 active:scale-95 transition-all shadow-lg">
      <i className="fa-solid fa-calendar mr-2"></i>
      Agendar
    </button>
  </div>
);

export default Page;
