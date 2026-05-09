/**
 * SOFT SKILLS E IDIOMAS PRÉ-DEFINIDOS
 * 
 * Este arquivo contém listas de soft skills comuns e idiomas
 * dos diferentes continentes para facilitar a seleção do utilizador.
 */

// ============================================
// SOFT SKILLS PRÉ-DEFINIDAS
// ============================================
export const PREDEFINED_SOFT_SKILLS = [
  "Comunicação",
  "Liderança",
  "Trabalho em equipa",
  "Resolução de problemas",
  "Pensamento crítico",
  "Criatividade",
  "Adaptabilidade",
  "Gestão de tempo",
  "Inteligência emocional",
  "Negociação",
  "Empatia",
  "Oralidade",
  "Escuta ativa",
  "Confiança",
  "Responsabilidade",
  "Flexibilidade",
  "Paciência",
  "Proatividade",
  "Organização",
  "Perseverança",
  "Visão estratégica",
  "Capacidade analítica",
  "Mentalidade de crescimento",
  "Colaboração",
];

// ============================================
// IDIOMAS POR CONTINENTE
// ============================================
export const LANGUAGES_BY_CONTINENT = {
  europa: {
    label: "Europa 🇪🇺",
    languages: [
      "Português",
      "Inglês",
      "Espanhol",
      "Francês",
      "Alemão",
      "Italiano",
      "Holandês",
      "Sueco",
      "Dinamarquês",
      "Norueguês",
      "Polaco",
      "Grego",
      "Húngaro",
      "Checo",
      "Romeno",
      "Russo",
      "Finlandês",
    ]
  },
  africa: {
    label: "África 🌍",
    languages: [
      "Português",
      "Inglês",
      "Árabe",
      "Suaíli",
      "Iorubá",
      "Igbo",
      "Amárico",
      "Somalí",
      "Hauçá",
      "Xona",
      "Setswana",
      "Zulu",
      "Xhosa",
      "Berbere",
      "Luba",
      "Bambara",
      "Malgaxe",
    ]
  },
  asia: {
    label: "Ásia 🏯",
    languages: [
      "Inglês",
      "Mandarim",
      "Hindi",
      "Bengali",
      "Vietnamita",
      "Indonésio",
      "Tailandês",
      "Tagalo",
      "Japonês",
      "Coreano",
      "Malásio",
      "Paquistanês",
      "Cazaque",
      "Uzbeque",
      "Turco",
      "Persa",
      "Árabe",
    ]
  },
  america: {
    label: "América 🌎",
    languages: [
      "Inglês",
      "Português",
      "Espanhol",
      "Francês",
      "Quíchua",
      "Aimará",
      "Guarani",
      "Nahuatl",
      "Maia",
      "Crioulo haitiano",
      "Navajó",
      "Inuktitut",
    ]
  }
};

// ============================================
// FLATTENED LANGUAGES LIST (para fácil acesso)
// ============================================
export const ALL_PREDEFINED_LANGUAGES = Object.values(LANGUAGES_BY_CONTINENT)
  .flatMap(continent => continent.languages)
  .sort((a, b) => a.localeCompare(b));

// Remove duplicatas
export const UNIQUE_PREDEFINED_LANGUAGES = Array.from(new Set(ALL_PREDEFINED_LANGUAGES)).sort();
