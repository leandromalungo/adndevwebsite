"use client";

// File: pages/store/Page.tsx
import React, { useState, useMemo } from 'react';
import VideoHero from '@/components/store/VideoHero';
import Breadcrumbs from '@/components/store/Breadcrumbs';
import FilterBar from '@/components/store/FilterBar';
import { BreadcrumbItem, FilterOption, Product, FilterState, CountryInfo } from '@/data/types';
import Navbar from '@/components/Navbar';
import  Footer  from '@/components/Footer';

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

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: "T-shirt Gamenex Classic", price: 19.99, platform: "Unisex", category: "T-shirts", condition: "Novo", rating: 5, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400", availableCountries: ['PT', 'AO', 'MZ', 'CV', 'BR', 'GW', 'GQ', 'ST'] },
  { id: 2, name: "Boné Snapback 'Gamer'", price: 14.99, platform: "Acessórios", category: "Chapéus", condition: "Novo", rating: 4, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=400", availableCountries: ['PT', 'AO', 'BR', 'MZ'] },
  { id: 3, name: "Pack de Stickers Neon (10 unidades)", price: 5.00, platform: "Decoração", category: "Stickers", condition: "Novo", rating: 5, image: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&q=80&w=400", availableCountries: ['PT', 'AO', 'MZ', 'CV', 'GW', 'GQ', 'ST', 'BR'] },
  { id: 4, name: "Cantil Térmico Alumínio 500ml", price: 12.50, platform: "Utilitários", category: "Items", condition: "Novo", rating: 5, image: "https://images.unsplash.com/photo-1602143301015-8120d0442654?auto=format&fit=crop&q=80&w=400", availableCountries: ['PT', 'MZ', 'ST', 'AO'] },
  { id: 5, name: "Chávena Cerâmica 'Loading...'", price: 8.99, platform: "Cozinha", category: "Items", condition: "Novo", rating: 4, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400", availableCountries: ['PT', 'BR', 'AO'] },
  { id: 6, name: "T-shirt Retro Console Edition", price: 21.99, platform: "Unisex", category: "T-shirts", condition: "Novo", rating: 5, image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=400", availableCountries: ['PT', 'CV', 'ST', 'BR'] },
  { id: 7, name: "Gorro de Lã Black Edition", price: 12.00, platform: "Acessórios", category: "Chapéus", condition: "Novo", rating: 3, image: "https://images.unsplash.com/photo-1576871333020-2219bc2456bc?auto=format&fit=crop&q=80&w=400", availableCountries: ['PT', 'BR'] },
  { id: 8, name: "Sticker Gigante 'GG Easy'", price: 3.50, platform: "Decoração", category: "Stickers", condition: "Novo", rating: 5, image: "https://images.unsplash.com/photo-1589384273441-c5bfc29384c4?auto=format&fit=crop&q=80&w=400", availableCountries: ['PT', 'AO', 'MZ', 'BR'] },
  { id: 9, name: "Saco de Pano Eco-Game", price: 9.99, platform: "Lifestyle", category: "Outro", condition: "Novo", rating: 4, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400", availableCountries: ['PT', 'AO', 'CV', 'MZ', 'ST', 'BR'] },
  { id: 10, name: "Tapete de Rato XL", price: 25.00, platform: "Setup", category: "Outro", condition: "Novo", rating: 5, image: "https://images.unsplash.com/photo-1616627561839-01417f761505?auto=format&fit=crop&q=80&w=400", availableCountries: ['PT', 'AO', 'MZ', 'CV', 'GW', 'GQ', 'ST', 'BR'] },
];

const Page = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo>(COUNTRIES[0]);
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    rating: null,
    condition: null,
    platform: null,
    maxPrice: null,
    sort: null,
  });

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Merchandising', href: '#' },
    { label: 'Coleções', href: '#' },
    { label: 'Gamenex Store', href: '#' },
  ];

  const filterOptions: FilterOption[] = [
    { id: 'regiao', label: 'Região', options: COUNTRIES.map(c => c.name) },
    { id: 'categoria', label: 'Categoria', options: ['T-shirts', 'Chapéus', 'Stickers', 'Items', 'Outro'] },
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
        case 'category': next.category = value; break;
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
  };

  const formatPrice = (eurPrice: number) => {
    const converted = eurPrice * selectedCountry.rate;
    return new Intl.NumberFormat(selectedCountry.code === 'BR' ? 'pt-BR' : 'pt-PT', {
      style: 'currency',
      currency: selectedCountry.currency,
    }).format(converted);
  };

  const handleBuy = (e: React.MouseEvent, productName: string) => {
    e.stopPropagation();
    alert(`A iniciar processo de compra para: ${productName} em ${selectedCountry.name}`);
  };

  const filteredProducts = useMemo(() => {
    let result = MOCK_PRODUCTS.filter(p => p.availableCountries.includes(selectedCountry.code));
    if (filters.category) result = result.filter(p => p.category === filters.category);
    if (filters.sort) {
      if (filters.sort.includes('Baixo a Alto')) result.sort((a, b) => a.price - b.price);
      if (filters.sort.includes('Alto a Baixo')) result.sort((a, b) => b.price - a.price);
    }
    return result;
  }, [filters, selectedCountry]);

  const videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-city-street-at-night-4006-large.mp4';

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        {/* Coleção exclusiva */}
        <div className="text-[11px] text-gray-400 mb-2 font-medium uppercase tracking-tighter">
          Coleção Exclusiva • {selectedCountry.name}
        </div>

        {/* Video Hero */}
        <VideoHero 
          videoUrl={videoUrl}
          title={`Merchandising em ${selectedCountry.name}`}
          subtitle="Produtos exclusivos para a comunidade CPLP"
        />

        {/* Breadcrumbs e título */}
        <section className="mt-8">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Produtos</h2>
              <p className="text-gray-500 text-sm mt-1">{filteredProducts.length} itens disponíveis em {selectedCountry.name}</p>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="mt-2">
          <FilterBar
            filters={filterOptions}
            activeFilters={filters}
            selectedCountry={selectedCountry}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </section>

        {/* Produtos */}
        {filteredProducts.length > 0 ? (
          <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in duration-500">
            {filteredProducts.map(product => (
              <div key={product.id} className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl p-2 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 mb-4 shadow-sm">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl text-sm font-black text-gray-900 shadow-sm">
                    {formatPrice(product.price)}
                  </div>
                  <div className="absolute bottom-3 left-3 flex gap-1">
                    <span className="bg-black/60 backdrop-blur-md text-[10px] text-white px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="px-2 flex-grow">
                  <h3 className="font-bold text-gray-900 leading-tight group-hover:text-cyan-600 transition-colors line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                  <div className="flex items-center text-xs text-gray-500 space-x-2 mt-1">
                    <span className="flex items-center">
                      <i className="fa-solid fa-star text-yellow-400 mr-1"></i>
                      {product.rating}.0
                    </span>
                    <span>•</span>
                    <span className="font-bold text-cyan-600">{product.condition}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex -space-x-1.5 overflow-hidden">
                      {product.availableCountries.slice(0, 3).map(c => (
                        <div key={c} className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-gray-100 text-[8px] flex items-center justify-center font-bold text-gray-600 shadow-sm">{c}</div>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">Entrega em {selectedCountry.name}</span>
                  </div>
                </div>

                <div className="mt-4 px-2 pb-2">
                  <button 
                    onClick={e => handleBuy(e, product.name)}
                    className="w-full bg-gray-900 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-cyan-600 active:scale-95 transition-all shadow-lg shadow-gray-200 hover:shadow-cyan-100 flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-cart-shopping text-xs"></i>
                    Comprar
                  </button>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <section className="mt-24 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-4">
              <i className="fa-solid fa-box-open text-3xl text-gray-300"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Sem stock em {selectedCountry.name}</h3>
            <p className="text-gray-500 mt-2">Esta categoria pode estar disponível noutras regiões.</p>
            <button 
              onClick={() => {
                handleClearFilters();
                setSelectedCountry(COUNTRIES[0]);
              }}
              className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              Ver mercado de Portugal
            </button>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Page;
