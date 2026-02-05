export const levels = [
  { id: 1, name: "Débutant", description: "Bases du Lingala" },
  { id: 2, name: "Intermédiaire", description: "Phrases courantes" },
  { id: 3, name: "Avancé", description: "Discussions complexes" },
];

export const lessons = [
  {
    id: 1,
    title: "Salutations (Mbote)",
    level: "Débutant",
    wordsCount: 5,
    status: "Published",
    lastUpdated: "2023-10-27",
  },
  {
    id: 2,
    title: "Présentation (Nkombo na ngai)",
    level: "Débutant",
    wordsCount: 8,
    status: "Draft",
    lastUpdated: "2023-10-28",
  },
  {
    id: 3,
    title: "Au marché (Zando)",
    level: "Intermédiaire",
    wordsCount: 12,
    status: "Published",
    lastUpdated: "2023-10-25",
  },
];

export const users = [
  { id: 1, name: "Jean Kabuya", email: "jean@example.com", status: "Premium", progress: "Lvl 2" },
  { id: 2, name: "Marie Lisanga", email: "marie@example.com", status: "Free", progress: "Lvl 1" },
  { id: 3, name: "Paul Matondo", email: "paul@example.com", status: "Free", progress: "Lvl 1" },
];
