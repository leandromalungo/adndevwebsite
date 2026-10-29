/**
 * Data de localizações dos países lusófonos
 * Inclui estados, províncias e regiões de cada país
 */

export interface Location {
  country: string;
  states: {
    name: string;
    cities?: string[];
  }[];
}

export const LUSOPHONE_LOCATIONS: Location[] = [
  {
    country: 'Angola',
    states: [
      { name: 'Bengo', cities: ['Caxito', 'Ícolo e Bengo'] },
      { name: 'Benguela', cities: ['Benguela', 'Baía Farta', 'Lobito'] },
      { name: 'Bié', cities: ['Kuito', 'Andulo', 'Camacupa'] },
      { name: 'Cabinda', cities: ['Cabinda', 'Tchiova', 'Belize'] },
      { name: 'Cuando Cubango', cities: ['Menongue', 'Cuangar', 'Ninda'] },
      { name: 'Cuanza Norte', cities: ['N\'Dalatando', 'Lucala', 'Cunda'] },
      { name: 'Cuanza Sul', cities: ['Sumbe', 'Libolo', 'Amba'] },
      { name: 'Cunene', cities: ['Ondjiva', 'Ombadja', 'Curoca'] },
      { name: 'Huambo', cities: ['Huambo', 'Bailundo', 'Londuimbali'] },
      { name: 'Huíla', cities: ['Lubango', 'Humpata', 'Caluquembe'] },
      { name: 'Kwando Kubango', cities: ['Menongue', 'Cuangar'] },
      { name: 'Kwanza Norte', cities: ['N\'Dalatando', 'Lucala'] },
      { name: 'Kwanza Sul', cities: ['Sumbe', 'Libolo'] },
      { name: 'Luanda', cities: ['Luanda', 'Cacuaco', 'Cazenga'] },
      { name: 'Lunda Norte', cities: ['Dundo', 'Malanje', 'Saurimo'] },
      { name: 'Lunda Sul', cities: ['Saurimo', 'Lucapa', 'Dala'] },
      { name: 'Malanje', cities: ['Malanje', 'Kalandula', 'Massango'] },
      { name: 'Moxico', cities: ['Luena', 'Bundibugyo', 'Alto Zambeze'] },
      { name: 'Namibe', cities: ['Namibe', 'Tómbua'] },
      { name: 'Uíge', cities: ['Uíge', 'Quela', 'Maquela do Zombo'] },
      { name: 'Zaire', cities: ['Mbanza-Kongo', 'Soio', 'Nzeto'] }
    ]
  },
  {
    country: 'Brasil',
    states: [
      { name: 'Acre', cities: ['Rio Branco', 'Cruzeiro do Sul'] },
      { name: 'Alagoas', cities: ['Maceió', 'Rio Largo'] },
      { name: 'Amapá', cities: ['Macapá', 'Santana'] },
      { name: 'Amazonas', cities: ['Manaus', 'Itacoatiara'] },
      { name: 'Bahia', cities: ['Salvador', 'Feira de Santana', 'Vitória da Conquista'] },
      { name: 'Ceará', cities: ['Fortaleza', 'Caucaia', 'Juazeiro do Norte'] },
      { name: 'Distrito Federal', cities: ['Brasília'] },
      { name: 'Espírito Santo', cities: ['Vitória', 'Vila Velha', 'Cariacica'] },
      { name: 'Goiás', cities: ['Goiânia', 'Anápolis', 'Rio Verde'] },
      { name: 'Maranhão', cities: ['São Luís', 'Imperatriz', 'Caxias'] },
      { name: 'Mato Grosso', cities: ['Cuiabá', 'Rondonópolis', 'Sinop'] },
      { name: 'Mato Grosso do Sul', cities: ['Campo Grande', 'Dourados'] },
      { name: 'Minas Gerais', cities: ['Belo Horizonte', 'Uberlândia', 'Contagem'] },
      { name: 'Pará', cities: ['Belém', 'Ananindeua', 'Santarém'] },
      { name: 'Paraíba', cities: ['João Pessoa', 'Campina Grande'] },
      { name: 'Paraná', cities: ['Curitiba', 'São José dos Pinhais', 'Londrina'] },
      { name: 'Pernambuco', cities: ['Recife', 'Jaboatão dos Guararapes', 'Olinda'] },
      { name: 'Piauí', cities: ['Teresina', 'Parnaíba'] },
      { name: 'Rio de Janeiro', cities: ['Rio de Janeiro', 'Niterói', 'Duque de Caxias'] },
      { name: 'Rio Grande do Norte', cities: ['Natal', 'Parnamirim'] },
      { name: 'Rio Grande do Sul', cities: ['Porto Alegre', 'Caxias do Sul', 'Pelotas'] },
      { name: 'Rondônia', cities: ['Porto Velho', 'Ariquemes'] },
      { name: 'Roraima', cities: ['Boa Vista', 'Caracaraí'] },
      { name: 'Santa Catarina', cities: ['Florianópolis', 'Joinville', 'Blumenau'] },
      { name: 'São Paulo', cities: ['São Paulo', 'Guarulhos', 'Campinas'] },
      { name: 'Sergipe', cities: ['Aracaju', 'Nossa Senhora do Socorro'] },
      { name: 'Tocantins', cities: ['Palmas', 'Araguaína'] }
    ]
  },
  {
    country: 'Portugal',
    states: [
      { name: 'Aveiro', cities: ['Aveiro', 'Ilhavo', 'Ovar'] },
      { name: 'Beja', cities: ['Beja', 'Moura', 'Serpa'] },
      { name: 'Braga', cities: ['Braga', 'Guimarães', 'Barcelos'] },
      { name: 'Bragança', cities: ['Bragança', 'Mirandela', 'Macedo de Cavaleiros'] },
      { name: 'Castelo Branco', cities: ['Castelo Branco', 'Covilhã', 'Fundão'] },
      { name: 'Covilhã', cities: ['Covilhã', 'Pinhel'] },
      { name: 'Covilhã', cities: ['Covilhã', 'Pinhel'] },
      { name: 'Évora', cities: ['Évora', 'Estremoz', 'Borba'] },
      { name: 'Faro', cities: ['Faro', 'Loulé', 'Tavira'] },
      { name: 'Guarda', cities: ['Guarda', 'Covilhã', 'Manteigas'] },
      { name: 'Leiria', cities: ['Leiria', 'Caldas da Rainha', 'Nazaré'] },
      { name: 'Lisboa', cities: ['Lisboa', 'Amadora', 'Oeiras'] },
      { name: 'Madeira', cities: ['Funchal', 'Câmara de Lobos'] },
      { name: 'Portalegre', cities: ['Portalegre', 'Marvão', 'Castelo de Vide'] },
      { name: 'Porto', cities: ['Porto', 'Vila do Conde', 'Matosinhos'] },
      { name: 'Santarém', cities: ['Santarém', 'Tomar', 'Alcanena'] },
      { name: 'Setúbal', cities: ['Setúbal', 'Barreiro', 'Sines'] },
      { name: 'Viana do Castelo', cities: ['Viana do Castelo', 'Ponte de Lima'] },
      { name: 'Vila Real', cities: ['Vila Real', 'Lamego', 'Peso da Régua'] },
      { name: 'Viseu', cities: ['Viseu', 'Mangualde', 'Sátão'] },
      { name: 'Açores', cities: ['Ponta Delgada', 'Angra do Heroísmo'] }
    ]
  },
  {
    country: 'Moçambique',
    states: [
      { name: 'Inhambane', cities: ['Inhambane', 'Maxixe', 'Homoine'] },
      { name: 'Gaza', cities: ['Chokwe', 'Xai-Xai', 'Massangena'] },
      { name: 'Sofala', cities: ['Beira', 'Dondo', 'Gorongosa'] },
      { name: 'Manica', cities: ['Chimoio', 'Manica', 'Machipanda'] },
      { name: 'Tete', cities: ['Tete', 'Moatize', 'Chibata'] },
      { name: 'Zambézia', cities: ['Quelimane', 'Namacurra', 'Mocuba'] },
      { name: 'Nampula', cities: ['Nampula', 'Nacala', 'Angoche'] },
      { name: 'Niassa', cities: ['Lichinga', 'Cuamba', 'Mandimba'] },
      { name: 'Cabo Delgado', cities: ['Pemba', 'Montepuez', 'Mueda'] },
      { name: 'Maputo', cities: ['Maputo', 'Matola'] },
      { name: 'Cidade de Maputo', cities: ['Maputo'] }
    ]
  },
  {
    country: 'São Tomé e Príncipe',
    states: [
      { name: 'São Tomé', cities: ['São Tomé', 'Santo Amaro', 'Neves'] },
      { name: 'Príncipe', cities: ['Santo António', 'Sundy'] }
    ]
  },
  {
    country: 'Guiné-Bissau',
    states: [
      { name: 'Bissau', cities: ['Bissau'] },
      { name: 'Bafatá', cities: ['Bafatá', 'Bambadinca'] },
      { name: 'Biombo', cities: ['Quinara', 'Antula'] },
      { name: 'Bolama/Bijagós', cities: ['Bolama', 'Bubaque'] },
      { name: 'Cacheu', cities: ['Cacheu', 'Canchungo'] },
      { name: 'Gabu', cities: ['Gabu', 'Geba'] },
      { name: 'Oio', cities: ['Bissora', 'Mansoa'] },
      { name: 'Quinara', cities: ['Fulacunda', 'Buba'] },
      { name: 'Tombali', cities: ['Catió', 'Cacine'] }
    ]
  },
  {
    country: 'Cabo Verde',
    states: [
      { name: 'Santo Antão', cities: ['Porto Novo', 'Ribeira Grande'] },
      { name: 'São Vicente', cities: ['Mindelo', 'São Vicente'] },
      { name: 'São Nicolau', cities: ['Praia', 'Tarrafal'] },
      { name: 'Sal', cities: ['Espargos', 'Santa Maria'] },
      { name: 'Boa Vista', cities: ['Boa Vista', 'Rabil'] },
      { name: 'Maio', cities: ['Porto Inglês', 'Santa Maria'] },
      { name: 'Santiago', cities: ['Praia', 'Tarrafal'] },
      { name: 'Fogo', cities: ['São Filipe', 'Mosteiros'] },
      { name: 'Brava', cities: ['Vila Nova Sintra', 'Furna'] }
    ]
  },
  {
    country: 'Timor-Leste',
    states: [
      { name: 'Dili', cities: ['Dili'] },
      { name: 'Aileu', cities: ['Aileu', 'Remexio'] },
      { name: 'Ainaro', cities: ['Ainaro', 'Maubisse'] },
      { name: 'Baucau', cities: ['Baucau', 'Lospalos'] },
      { name: 'Bobonaro', cities: ['Maliana', 'Balibo'] },
      { name: 'Covalima', cities: ['Suai', 'Tilomar'] },
      { name: 'Ermera', cities: ['Gleno', 'Hatulia'] },
      { name: 'Lautém', cities: ['Lospalos', 'Tutuala'] },
      { name: 'Liquiçá', cities: ['Liquiçá', 'Maubara'] },
      { name: 'Manatuto', cities: ['Manatuto', 'Barique'] },
      { name: 'Manufahi', cities: ['Same', 'Alas'] },
      { name: 'Oecusse', cities: ['Oecusse', 'Pante Macassar'] },
      { name: 'Viqueque', cities: ['Viqueque', 'Uatocarbau'] }
    ]
  }
];

export const EVENT_CATEGORIES = [
  'Workshop Técnico',
  'Conferência',
  'Hackathon',
  'Meetup',
  'Webinar',
  'Palestra',
  'Bootcamp',
  'Networking',
  'Treinamento',
  'Competição',
  'Outro'
];

/**
 * Função para obter todos os estados de um país
 */
export const getStatesByCountry = (country: string): string[] => {
  const location = LUSOPHONE_LOCATIONS.find(l => l.country === country);
  return location ? location.states.map(s => s.name) : [];
};

/**
 * Função para obter cidades de um estado específico
 */
export const getCitiesByState = (country: string, state: string): string[] => {
  const location = LUSOPHONE_LOCATIONS.find(l => l.country === country);
  const stateData = location?.states.find(s => s.name === state);
  return stateData?.cities || [];
};

/**
 * Função para obter lista de países
 */
export const getCountries = (): string[] => {
  return LUSOPHONE_LOCATIONS.map(l => l.country);
};
