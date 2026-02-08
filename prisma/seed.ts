import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ============================================================
// LINGALA VOCABULARY DATA - 10 Units
// ============================================================

interface VocabWord {
  lingala: string;
  french: string;
  icon?: string; // emoji for image_selection
}

interface LessonData {
  title: string;
  words: VocabWord[];
  phrases: { lingala: string; french: string }[];
  fillBlanks: { sentence: string; answer: string; distractors: string[] }[];
}

interface UnitData {
  title: string;
  description: string;
  color: string;
  lessons: LessonData[];
}

// ---- UNIT 1: Salutations ----
const unit1: UnitData = {
  title: "Mbote! - Salutations",
  description: "Les bases : salutations, politesse et premiers mots",
  color: "bg-brand-green",
  lessons: [
    {
      title: "Bonjour et Au revoir",
      words: [
        { lingala: "Mbote", french: "Bonjour", icon: "👋" },
        { lingala: "Kende malamu", french: "Au revoir", icon: "🫡" },
        { lingala: "Tokanani", french: "A bientôt", icon: "😊" },
        { lingala: "Butu elamu", french: "Bonne nuit", icon: "🌙" },
      ],
      phrases: [
        { lingala: "Mbote na yo", french: "Bonjour à toi" },
        { lingala: "Kende malamu ndeko", french: "Au revoir frère" },
      ],
      fillBlanks: [
        { sentence: "___ na yo", answer: "Mbote", distractors: ["Kende", "Butu"] },
        { sentence: "Butu ___", answer: "elamu", distractors: ["malamu", "mbote"] },
      ],
    },
    {
      title: "Comment ça va ?",
      words: [
        { lingala: "Sango nini?", french: "Quoi de neuf ?", icon: "❓" },
        { lingala: "Malamu", french: "Bien", icon: "👍" },
        { lingala: "Mabe", french: "Mal", icon: "👎" },
        { lingala: "Nazali malamu", french: "Je vais bien", icon: "😃" },
      ],
      phrases: [
        { lingala: "Ozali malamu?", french: "Tu vas bien ?" },
        { lingala: "Nazali malamu, merci", french: "Je vais bien, merci" },
      ],
      fillBlanks: [
        { sentence: "Nazali ___", answer: "malamu", distractors: ["mabe", "nini"] },
        { sentence: "Ozali ___?", answer: "malamu", distractors: ["mbote", "kende"] },
      ],
    },
    {
      title: "Se présenter",
      words: [
        { lingala: "Kombo", french: "Nom", icon: "📛" },
        { lingala: "Nazo benga", french: "Je m'appelle", icon: "🙋" },
        { lingala: "Ozo benga nani?", french: "Comment tu t'appelles ?", icon: "❓" },
        { lingala: "Ngai", french: "Moi", icon: "👤" },
      ],
      phrases: [
        { lingala: "Nazo benga Marie", french: "Je m'appelle Marie" },
        { lingala: "Kombo na ngai Marie", french: "Mon nom est Marie" },
      ],
      fillBlanks: [
        { sentence: "Nazo ___ Paul", answer: "benga", distractors: ["zali", "komi"] },
        { sentence: "Kombo na ___ Jean", answer: "ngai", distractors: ["yo", "ye"] },
      ],
    },
    {
      title: "Oui et Non",
      words: [
        { lingala: "Iyo", french: "Oui", icon: "✅" },
        { lingala: "Te", french: "Non", icon: "❌" },
        { lingala: "Peut-être", french: "Mbala mosusu", icon: "🤔" },
        { lingala: "Nandimi", french: "Je suis d'accord", icon: "🤝" },
      ],
      phrases: [
        { lingala: "Iyo, nazali awa", french: "Oui, je suis ici" },
        { lingala: "Te, naboyi", french: "Non, je refuse" },
      ],
      fillBlanks: [
        { sentence: "___, nazali awa", answer: "Iyo", distractors: ["Te", "Mbala"] },
        { sentence: "Te, ___", answer: "naboyi", distractors: ["nandimi", "nazali"] },
      ],
    },
    {
      title: "Merci et Pardon",
      words: [
        { lingala: "Matondo", french: "Merci", icon: "🙏" },
        { lingala: "Bolimbisi ngai", french: "Pardonne-moi", icon: "😔" },
        { lingala: "Limbisa ngai", french: "Excuse-moi", icon: "🙇" },
        { lingala: "Likambo te", french: "Pas de problème", icon: "🆗" },
      ],
      phrases: [
        { lingala: "Matondo mingi", french: "Merci beaucoup" },
        { lingala: "Bolimbisi ngai ndeko", french: "Pardonne-moi frère" },
      ],
      fillBlanks: [
        { sentence: "Matondo ___", answer: "mingi", distractors: ["mabe", "malamu"] },
        { sentence: "___ ngai", answer: "Limbisa", distractors: ["Matondo", "Mbote"] },
      ],
    },
    {
      title: "Les pronoms personnels",
      words: [
        { lingala: "Ngai", french: "Moi / Je", icon: "👤" },
        { lingala: "Yo", french: "Toi / Tu", icon: "👉" },
        { lingala: "Ye", french: "Lui / Elle", icon: "👤" },
        { lingala: "Biso", french: "Nous", icon: "👥" },
      ],
      phrases: [
        { lingala: "Ngai nazali awa", french: "Moi je suis ici" },
        { lingala: "Biso tokei", french: "Nous partons" },
      ],
      fillBlanks: [
        { sentence: "___ nazali awa", answer: "Ngai", distractors: ["Yo", "Ye"] },
        { sentence: "___ tokei", answer: "Biso", distractors: ["Bango", "Ngai"] },
      ],
    },
    {
      title: "Où es-tu ?",
      words: [
        { lingala: "Awa", french: "Ici", icon: "📍" },
        { lingala: "Kuna", french: "Là-bas", icon: "👀" },
        { lingala: "Wapi?", french: "Où ?", icon: "🗺️" },
        { lingala: "Ndako", french: "Maison", icon: "🏠" },
      ],
      phrases: [
        { lingala: "Ozali wapi?", french: "Tu es où ?" },
        { lingala: "Nazali na ndako", french: "Je suis à la maison" },
      ],
      fillBlanks: [
        { sentence: "Ozali ___?", answer: "wapi", distractors: ["nani", "nini"] },
        { sentence: "Nazali na ___", answer: "ndako", distractors: ["nzela", "mai"] },
      ],
    },
    {
      title: "Les verbes être et avoir",
      words: [
        { lingala: "Kozala", french: "Être", icon: "🔵" },
        { lingala: "Kozwa", french: "Avoir / Recevoir", icon: "🤲" },
        { lingala: "Nazali", french: "Je suis", icon: "🧍" },
        { lingala: "Nazwi", french: "J'ai reçu", icon: "📦" },
      ],
      phrases: [
        { lingala: "Nazali na esengo", french: "Je suis content" },
        { lingala: "Nazwi mbongo", french: "J'ai reçu de l'argent" },
      ],
      fillBlanks: [
        { sentence: "___ na esengo", answer: "Nazali", distractors: ["Nazwi", "Nakei"] },
        { sentence: "Nazwi ___", answer: "mbongo", distractors: ["ndako", "nzela"] },
      ],
    },
    {
      title: "Questions de base",
      words: [
        { lingala: "Nani?", french: "Qui ?", icon: "🤷" },
        { lingala: "Nini?", french: "Quoi ?", icon: "❓" },
        { lingala: "Ntango nini?", french: "Quand ?", icon: "⏰" },
        { lingala: "Ndenge nini?", french: "Comment ?", icon: "🧐" },
      ],
      phrases: [
        { lingala: "Ozali nani?", french: "Tu es qui ?" },
        { lingala: "Olingi nini?", french: "Tu veux quoi ?" },
      ],
      fillBlanks: [
        { sentence: "Ozali ___?", answer: "nani", distractors: ["nini", "wapi"] },
        { sentence: "Olingi ___?", answer: "nini", distractors: ["nani", "wapi"] },
      ],
    },
    {
      title: "Révision : Premiers mots",
      words: [
        { lingala: "Mbote", french: "Bonjour", icon: "👋" },
        { lingala: "Matondo", french: "Merci", icon: "🙏" },
        { lingala: "Malamu", french: "Bien", icon: "👍" },
        { lingala: "Ndako", french: "Maison", icon: "🏠" },
      ],
      phrases: [
        { lingala: "Mbote, ozali malamu?", french: "Bonjour, tu vas bien ?" },
        { lingala: "Matondo mingi ndeko", french: "Merci beaucoup frère" },
      ],
      fillBlanks: [
        { sentence: "___, ozali malamu?", answer: "Mbote", distractors: ["Matondo", "Kende"] },
        { sentence: "Matondo ___ ndeko", answer: "mingi", distractors: ["malamu", "mabe"] },
      ],
    },
  ],
};

// ---- UNIT 2: La Famille ----
const unit2: UnitData = {
  title: "Libota - La Famille",
  description: "Les membres de la famille et les relations",
  color: "bg-brand-blue",
  lessons: [
    {
      title: "Papa et Maman",
      words: [
        { lingala: "Tata", french: "Papa", icon: "👨" },
        { lingala: "Mama", french: "Maman", icon: "👩" },
        { lingala: "Mobali", french: "Homme / Mari", icon: "🧔" },
        { lingala: "Mwasi", french: "Femme / Épouse", icon: "👱‍♀️" },
      ],
      phrases: [
        { lingala: "Tata na ngai azali awa", french: "Mon papa est ici" },
        { lingala: "Mama azali na ndako", french: "Maman est à la maison" },
      ],
      fillBlanks: [
        { sentence: "___ na ngai azali awa", answer: "Tata", distractors: ["Mama", "Ndeko"] },
        { sentence: "Mama azali na ___", answer: "ndako", distractors: ["nzela", "mai"] },
      ],
    },
    {
      title: "Frères et Soeurs",
      words: [
        { lingala: "Ndeko mobali", french: "Frère", icon: "👦" },
        { lingala: "Ndeko mwasi", french: "Soeur", icon: "👧" },
        { lingala: "Ndeko", french: "Frère / Soeur", icon: "🤝" },
        { lingala: "Leki", french: "Cadet(te)", icon: "👶" },
      ],
      phrases: [
        { lingala: "Ndeko na ngai azali kitoko", french: "Mon frère est beau" },
        { lingala: "Leki na ngai azali moke", french: "Mon cadet est petit" },
      ],
      fillBlanks: [
        { sentence: "___ na ngai azali kitoko", answer: "Ndeko", distractors: ["Tata", "Mama"] },
        { sentence: "Leki na ngai azali ___", answer: "moke", distractors: ["monene", "molai"] },
      ],
    },
    {
      title: "Grand-parents",
      words: [
        { lingala: "Nkoko mobali", french: "Grand-père", icon: "👴" },
        { lingala: "Nkoko mwasi", french: "Grand-mère", icon: "👵" },
        { lingala: "Nkoko", french: "Grand-parent", icon: "🧓" },
        { lingala: "Bokoko", french: "Ancêtre", icon: "🏛️" },
      ],
      phrases: [
        { lingala: "Nkoko azali na bwanya", french: "Grand-parent a de la sagesse" },
        { lingala: "Nalingi nkoko na ngai", french: "J'aime mon grand-parent" },
      ],
      fillBlanks: [
        { sentence: "___ azali na bwanya", answer: "Nkoko", distractors: ["Leki", "Ndeko"] },
        { sentence: "Nalingi ___ na ngai", answer: "nkoko", distractors: ["ndako", "nzela"] },
      ],
    },
    {
      title: "Les enfants",
      words: [
        { lingala: "Mwana", french: "Enfant", icon: "👶" },
        { lingala: "Mwana mobali", french: "Fils / Garçon", icon: "👦" },
        { lingala: "Mwana mwasi", french: "Fille", icon: "👧" },
        { lingala: "Bana", french: "Enfants", icon: "👨‍👩‍👧‍👦" },
      ],
      phrases: [
        { lingala: "Bana bazali kosala", french: "Les enfants jouent" },
        { lingala: "Mwana azali kolala", french: "L'enfant dort" },
      ],
      fillBlanks: [
        { sentence: "___ bazali kosala", answer: "Bana", distractors: ["Mwana", "Ndeko"] },
        { sentence: "Mwana azali ___", answer: "kolala", distractors: ["kosala", "kolia"] },
      ],
    },
    {
      title: "Oncles et Tantes",
      words: [
        { lingala: "Noko", french: "Oncle maternel", icon: "👨‍🦱" },
        { lingala: "Tata moke", french: "Oncle (petit papa)", icon: "👨" },
        { lingala: "Tantine", french: "Tante", icon: "👩‍🦱" },
        { lingala: "Yaya", french: "Aîné(e)", icon: "🧑" },
      ],
      phrases: [
        { lingala: "Noko na ngai azali na Kinshasa", french: "Mon oncle est à Kinshasa" },
        { lingala: "Yaya azali na bwanya", french: "L'aîné a de la sagesse" },
      ],
      fillBlanks: [
        { sentence: "___ na ngai azali na Kinshasa", answer: "Noko", distractors: ["Yaya", "Leki"] },
        { sentence: "Yaya azali na ___", answer: "bwanya", distractors: ["ndako", "mbongo"] },
      ],
    },
    {
      title: "Cousins et Cousines",
      words: [
        { lingala: "Ndeko ya tata", french: "Cousin paternel", icon: "👦" },
        { lingala: "Ndeko ya mama", french: "Cousin maternel", icon: "👧" },
        { lingala: "Baninga", french: "Amis / Proches", icon: "👫" },
        { lingala: "Moninga", french: "Ami(e)", icon: "🤗" },
      ],
      phrases: [
        { lingala: "Moninga na ngai azali awa", french: "Mon ami est ici" },
        { lingala: "Baninga bazali mingi", french: "Les amis sont nombreux" },
      ],
      fillBlanks: [
        { sentence: "___ na ngai azali awa", answer: "Moninga", distractors: ["Ndeko", "Tata"] },
        { sentence: "Baninga bazali ___", answer: "mingi", distractors: ["moke", "mabe"] },
      ],
    },
    {
      title: "Actions en famille",
      words: [
        { lingala: "Kolinga", french: "Aimer", icon: "❤️" },
        { lingala: "Kosalisa", french: "Aider", icon: "🤝" },
        { lingala: "Kosolola", french: "Parler ensemble", icon: "💬" },
        { lingala: "Kolia", french: "Manger", icon: "🍽️" },
      ],
      phrases: [
        { lingala: "Nalingi libota na ngai", french: "J'aime ma famille" },
        { lingala: "Tokolia esika moko", french: "Nous mangeons ensemble" },
      ],
      fillBlanks: [
        { sentence: "Nalingi ___ na ngai", answer: "libota", distractors: ["ndako", "nzela"] },
        { sentence: "Tokolia esika ___", answer: "moko", distractors: ["mingi", "mabe"] },
      ],
    },
    {
      title: "Décrire la famille",
      words: [
        { lingala: "Monene", french: "Grand(e)", icon: "📏" },
        { lingala: "Moke", french: "Petit(e)", icon: "🐜" },
        { lingala: "Kitoko", french: "Beau / Belle", icon: "✨" },
        { lingala: "Makasi", french: "Fort(e)", icon: "💪" },
      ],
      phrases: [
        { lingala: "Tata azali makasi", french: "Papa est fort" },
        { lingala: "Mama azali kitoko", french: "Maman est belle" },
      ],
      fillBlanks: [
        { sentence: "Tata azali ___", answer: "makasi", distractors: ["moke", "kitoko"] },
        { sentence: "Mama azali ___", answer: "kitoko", distractors: ["mabe", "monene"] },
      ],
    },
    {
      title: "La maison familiale",
      words: [
        { lingala: "Ndako", french: "Maison", icon: "🏠" },
        { lingala: "Shambre", french: "Chambre", icon: "🛏️" },
        { lingala: "Cuisine", french: "Cuisine", icon: "🍳" },
        { lingala: "Lopango", french: "Cour / Parcelle", icon: "🌳" },
      ],
      phrases: [
        { lingala: "Ndako na biso ezali monene", french: "Notre maison est grande" },
        { lingala: "Lopango ezali kitoko", french: "La cour est belle" },
      ],
      fillBlanks: [
        { sentence: "Ndako na biso ezali ___", answer: "monene", distractors: ["moke", "mabe"] },
        { sentence: "___ ezali kitoko", answer: "Lopango", distractors: ["Shambre", "Ndako"] },
      ],
    },
    {
      title: "Révision : La Famille",
      words: [
        { lingala: "Tata", french: "Papa", icon: "👨" },
        { lingala: "Mama", french: "Maman", icon: "👩" },
        { lingala: "Mwana", french: "Enfant", icon: "👶" },
        { lingala: "Libota", french: "Famille", icon: "👨‍👩‍👧‍👦" },
      ],
      phrases: [
        { lingala: "Libota na ngai ezali monene", french: "Ma famille est grande" },
        { lingala: "Nalingi libota na ngai", french: "J'aime ma famille" },
      ],
      fillBlanks: [
        { sentence: "___ na ngai ezali monene", answer: "Libota", distractors: ["Ndako", "Nzela"] },
        { sentence: "Nalingi ___ na ngai", answer: "libota", distractors: ["mbongo", "ndako"] },
      ],
    },
  ],
};

// ---- UNIT 3: Nourriture ----
const unit3: UnitData = {
  title: "Biloko ya kolya - Nourriture",
  description: "La nourriture, les boissons et commander au restaurant",
  color: "bg-brand-yellow",
  lessons: [
    {
      title: "Les aliments de base",
      words: [
        { lingala: "Loso", french: "Riz", icon: "🍚" },
        { lingala: "Kwanga", french: "Chikwangue (manioc)", icon: "🍞" },
        { lingala: "Pondu", french: "Feuilles de manioc", icon: "🥬" },
        { lingala: "Mbisi", french: "Poisson", icon: "🐟" },
      ],
      phrases: [
        { lingala: "Nalingi kolia loso", french: "Je veux manger du riz" },
        { lingala: "Pondu ezali malamu", french: "Le pondu est bon" },
      ],
      fillBlanks: [
        { sentence: "Nalingi kolia ___", answer: "loso", distractors: ["mai", "mbisi"] },
        { sentence: "___ ezali malamu", answer: "Pondu", distractors: ["Mai", "Loso"] },
      ],
    },
    {
      title: "Les boissons",
      words: [
        { lingala: "Mai", french: "Eau", icon: "💧" },
        { lingala: "Masanga", french: "Boisson / Alcool", icon: "🍺" },
        { lingala: "Café", french: "Café", icon: "☕" },
        { lingala: "Jus", french: "Jus", icon: "🧃" },
      ],
      phrases: [
        { lingala: "Pesa ngai mai", french: "Donne-moi de l'eau" },
        { lingala: "Nalingi komela jus", french: "Je veux boire du jus" },
      ],
      fillBlanks: [
        { sentence: "Pesa ngai ___", answer: "mai", distractors: ["loso", "mbisi"] },
        { sentence: "Nalingi komela ___", answer: "jus", distractors: ["loso", "pondu"] },
      ],
    },
    {
      title: "Les fruits",
      words: [
        { lingala: "Mbuma", french: "Fruit", icon: "🍎" },
        { lingala: "Likemba", french: "Banane", icon: "🍌" },
        { lingala: "Manga", french: "Mangue", icon: "🥭" },
        { lingala: "Makemba", french: "Bananes plantain", icon: "🍌" },
      ],
      phrases: [
        { lingala: "Manga ezali sukali", french: "La mangue est sucrée" },
        { lingala: "Nalingi kolia mbuma", french: "Je veux manger un fruit" },
      ],
      fillBlanks: [
        { sentence: "___ ezali sukali", answer: "Manga", distractors: ["Mai", "Loso"] },
        { sentence: "Nalingi kolia ___", answer: "mbuma", distractors: ["mai", "ndako"] },
      ],
    },
    {
      title: "Les légumes",
      words: [
        { lingala: "Ndunda", french: "Légume", icon: "🥗" },
        { lingala: "Tomate", french: "Tomate", icon: "🍅" },
        { lingala: "Salade", french: "Salade", icon: "🥬" },
        { lingala: "Tungu", french: "Oignon", icon: "🧅" },
      ],
      phrases: [
        { lingala: "Tikela ngai ndunda", french: "Laisse-moi des légumes" },
        { lingala: "Tomate ezali motane", french: "La tomate est rouge" },
      ],
      fillBlanks: [
        { sentence: "___ ezali motane", answer: "Tomate", distractors: ["Manga", "Mai"] },
        { sentence: "Tikela ngai ___", answer: "ndunda", distractors: ["ndako", "nzela"] },
      ],
    },
    {
      title: "La viande",
      words: [
        { lingala: "Nyama", french: "Viande", icon: "🍖" },
        { lingala: "Nsoso", french: "Poulet", icon: "🍗" },
        { lingala: "Ngulu", french: "Porc", icon: "🐖" },
        { lingala: "Ntaba", french: "Chèvre", icon: "🐐" },
      ],
      phrases: [
        { lingala: "Nalingi kolia nsoso", french: "Je veux manger du poulet" },
        { lingala: "Nyama ezali malamu", french: "La viande est bonne" },
      ],
      fillBlanks: [
        { sentence: "Nalingi kolia ___", answer: "nsoso", distractors: ["mai", "loso"] },
        { sentence: "___ ezali malamu", answer: "Nyama", distractors: ["Mai", "Nzela"] },
      ],
    },
    {
      title: "Au marché",
      words: [
        { lingala: "Zando", french: "Marché", icon: "🏪" },
        { lingala: "Talo", french: "Prix", icon: "💰" },
        { lingala: "Kosomba", french: "Acheter", icon: "🛒" },
        { lingala: "Koteka", french: "Vendre", icon: "🏷️" },
      ],
      phrases: [
        { lingala: "Nakei na zando", french: "Je vais au marché" },
        { lingala: "Talo ezali boni?", french: "C'est combien le prix ?" },
      ],
      fillBlanks: [
        { sentence: "Nakei na ___", answer: "zando", distractors: ["ndako", "shambre"] },
        { sentence: "___ ezali boni?", answer: "Talo", distractors: ["Kombo", "Mbisi"] },
      ],
    },
    {
      title: "Cuisiner",
      words: [
        { lingala: "Kolamba", french: "Cuisiner", icon: "👨‍🍳" },
        { lingala: "Moto", french: "Feu", icon: "🔥" },
        { lingala: "Nzungu", french: "Marmite", icon: "🍲" },
        { lingala: "Mafuta", french: "Huile", icon: "🫗" },
      ],
      phrases: [
        { lingala: "Mama azali kolamba", french: "Maman cuisine" },
        { lingala: "Tia mafuta na nzungu", french: "Mets l'huile dans la marmite" },
      ],
      fillBlanks: [
        { sentence: "Mama azali ___", answer: "kolamba", distractors: ["kolia", "komela"] },
        { sentence: "Tia ___ na nzungu", answer: "mafuta", distractors: ["mai", "loso"] },
      ],
    },
    {
      title: "Les goûts",
      words: [
        { lingala: "Sukali", french: "Sucré / Sucre", icon: "🍬" },
        { lingala: "Bololo", french: "Amer", icon: "😖" },
        { lingala: "Mungwa", french: "Sel / Salé", icon: "🧂" },
        { lingala: "Malamu", french: "Bon / Délicieux", icon: "😋" },
      ],
      phrases: [
        { lingala: "Bilei oyo ezali malamu", french: "Ce repas est bon" },
        { lingala: "Tia mungwa moke", french: "Mets un peu de sel" },
      ],
      fillBlanks: [
        { sentence: "Bilei oyo ezali ___", answer: "malamu", distractors: ["mabe", "bololo"] },
        { sentence: "Tia ___ moke", answer: "mungwa", distractors: ["mafuta", "sukali"] },
      ],
    },
    {
      title: "Au restaurant",
      words: [
        { lingala: "Esika ya kolia", french: "Restaurant", icon: "🍽️" },
        { lingala: "Mesa", french: "Table", icon: "🪑" },
        { lingala: "Kopo", french: "Verre", icon: "🥤" },
        { lingala: "Sani", french: "Assiette", icon: "🍽️" },
      ],
      phrases: [
        { lingala: "Pesa ngai sani ya loso", french: "Donne-moi une assiette de riz" },
        { lingala: "Biso tolingi kolia awa", french: "Nous voulons manger ici" },
      ],
      fillBlanks: [
        { sentence: "Pesa ngai ___ ya loso", answer: "sani", distractors: ["kopo", "mesa"] },
        { sentence: "Biso tolingi ___ awa", answer: "kolia", distractors: ["kolala", "kokende"] },
      ],
    },
    {
      title: "Révision : Nourriture",
      words: [
        { lingala: "Loso", french: "Riz", icon: "🍚" },
        { lingala: "Mai", french: "Eau", icon: "💧" },
        { lingala: "Nyama", french: "Viande", icon: "🍖" },
        { lingala: "Zando", french: "Marché", icon: "🏪" },
      ],
      phrases: [
        { lingala: "Nakei na zando kosomba nyama", french: "Je vais au marché acheter de la viande" },
        { lingala: "Pesa ngai mai na loso", french: "Donne-moi de l'eau et du riz" },
      ],
      fillBlanks: [
        { sentence: "Nakei na ___ kosomba nyama", answer: "zando", distractors: ["ndako", "nzela"] },
        { sentence: "Pesa ngai ___ na loso", answer: "mai", distractors: ["mbisi", "mafuta"] },
      ],
    },
  ],
};

// ---- UNIT 4: Les Nombres ----
const unit4: UnitData = {
  title: "Manombré - Les Nombres",
  description: "Compter, les chiffres, les jours et le temps",
  color: "bg-brand-red",
  lessons: [
    {
      title: "Nombres 1-5",
      words: [
        { lingala: "Moko", french: "Un (1)", icon: "1️⃣" },
        { lingala: "Mibale", french: "Deux (2)", icon: "2️⃣" },
        { lingala: "Misato", french: "Trois (3)", icon: "3️⃣" },
        { lingala: "Minei", french: "Quatre (4)", icon: "4️⃣" },
      ],
      phrases: [
        { lingala: "Nazali na bana mibale", french: "J'ai deux enfants" },
        { lingala: "Pesa ngai misato", french: "Donne-moi trois" },
      ],
      fillBlanks: [
        { sentence: "Nazali na bana ___", answer: "mibale", distractors: ["moko", "misato"] },
        { sentence: "Pesa ngai ___", answer: "misato", distractors: ["minei", "moko"] },
      ],
    },
    {
      title: "Nombres 6-10",
      words: [
        { lingala: "Motoba", french: "Six (6)", icon: "6️⃣" },
        { lingala: "Sambo", french: "Sept (7)", icon: "7️⃣" },
        { lingala: "Mwambe", french: "Huit (8)", icon: "8️⃣" },
        { lingala: "Libwa", french: "Neuf (9)", icon: "9️⃣" },
      ],
      phrases: [
        { lingala: "Tozali bato sambo", french: "Nous sommes sept personnes" },
        { lingala: "Ezali ngonga mwambe", french: "Il est huit heures" },
      ],
      fillBlanks: [
        { sentence: "Tozali bato ___", answer: "sambo", distractors: ["motoba", "libwa"] },
        { sentence: "Ezali ngonga ___", answer: "mwambe", distractors: ["sambo", "motoba"] },
      ],
    },
    {
      title: "Dizaines et centaines",
      words: [
        { lingala: "Zomi", french: "Dix (10)", icon: "🔟" },
        { lingala: "Tuku mibale", french: "Vingt (20)", icon: "🔢" },
        { lingala: "Tuku misato", french: "Trente (30)", icon: "🔢" },
        { lingala: "Nkama", french: "Cent (100)", icon: "💯" },
      ],
      phrases: [
        { lingala: "Nazali na mbula tuku mibale", french: "J'ai vingt ans" },
        { lingala: "Ezali francs nkama", french: "C'est cent francs" },
      ],
      fillBlanks: [
        { sentence: "Nazali na mbula tuku ___", answer: "mibale", distractors: ["moko", "zomi"] },
        { sentence: "Ezali francs ___", answer: "nkama", distractors: ["zomi", "moko"] },
      ],
    },
    {
      title: "Les jours de la semaine",
      words: [
        { lingala: "Mokolo ya yambo", french: "Lundi", icon: "📅" },
        { lingala: "Mokolo ya mibale", french: "Mardi", icon: "📅" },
        { lingala: "Mokolo ya misato", french: "Mercredi", icon: "📅" },
        { lingala: "Mokolo ya minei", french: "Jeudi", icon: "📅" },
      ],
      phrases: [
        { lingala: "Lelo ezali mokolo ya yambo", french: "Aujourd'hui c'est lundi" },
        { lingala: "Lobi ezali mokolo ya mibale", french: "Demain c'est mardi" },
      ],
      fillBlanks: [
        { sentence: "Lelo ezali mokolo ya ___", answer: "yambo", distractors: ["mibale", "misato"] },
        { sentence: "___ ezali mokolo ya mibale", answer: "Lobi", distractors: ["Lelo", "Kala"] },
      ],
    },
    {
      title: "Vendredi à Dimanche",
      words: [
        { lingala: "Mokolo ya mitano", french: "Vendredi", icon: "📅" },
        { lingala: "Mposo", french: "Samedi", icon: "📅" },
        { lingala: "Lomingo", french: "Dimanche", icon: "⛪" },
        { lingala: "Poso", french: "Semaine", icon: "🗓️" },
      ],
      phrases: [
        { lingala: "Lomingo tokei na ndako ya Nzambe", french: "Dimanche on va à l'église" },
        { lingala: "Poso oyo ezali malamu", french: "Cette semaine est bonne" },
      ],
      fillBlanks: [
        { sentence: "___ tokei na ndako ya Nzambe", answer: "Lomingo", distractors: ["Mposo", "Lelo"] },
        { sentence: "Poso oyo ezali ___", answer: "malamu", distractors: ["mabe", "monene"] },
      ],
    },
    {
      title: "L'heure",
      words: [
        { lingala: "Ngonga", french: "Heure", icon: "🕐" },
        { lingala: "Moniti", french: "Minute", icon: "⏱️" },
        { lingala: "Ntango", french: "Temps", icon: "⏰" },
        { lingala: "Midi", french: "Midi", icon: "☀️" },
      ],
      phrases: [
        { lingala: "Ezali ngonga nini?", french: "Il est quelle heure ?" },
        { lingala: "Ezali ngonga zomi na mibale", french: "Il est midi" },
      ],
      fillBlanks: [
        { sentence: "Ezali ___ nini?", answer: "ngonga", distractors: ["ntango", "moniti"] },
        { sentence: "Ezali ngonga zomi na ___", answer: "mibale", distractors: ["moko", "misato"] },
      ],
    },
    {
      title: "Hier, Aujourd'hui, Demain",
      words: [
        { lingala: "Lelo", french: "Aujourd'hui", icon: "📍" },
        { lingala: "Lobi", french: "Demain / Hier", icon: "🔄" },
        { lingala: "Kala", french: "Autrefois", icon: "🕰️" },
        { lingala: "Sik'oyo", french: "Maintenant", icon: "⚡" },
      ],
      phrases: [
        { lingala: "Lelo nazali na esengo", french: "Aujourd'hui je suis content" },
        { lingala: "Lobi tokokutana", french: "Demain on se retrouve" },
      ],
      fillBlanks: [
        { sentence: "___ nazali na esengo", answer: "Lelo", distractors: ["Lobi", "Kala"] },
        { sentence: "Lobi ___", answer: "tokokutana", distractors: ["tokolia", "tokolala"] },
      ],
    },
    {
      title: "Les mois",
      words: [
        { lingala: "Sanza ya yambo", french: "Janvier", icon: "📆" },
        { lingala: "Sanza ya mibale", french: "Février", icon: "📆" },
        { lingala: "Sanza", french: "Mois / Lune", icon: "🌙" },
        { lingala: "Mobu", french: "Année", icon: "🗓️" },
      ],
      phrases: [
        { lingala: "Tozali na sanza ya mitano", french: "On est au mois de mai" },
        { lingala: "Mobu oyo ezali malamu", french: "Cette année est bonne" },
      ],
      fillBlanks: [
        { sentence: "Tozali na ___ ya mitano", answer: "sanza", distractors: ["mobu", "poso"] },
        { sentence: "___ oyo ezali malamu", answer: "Mobu", distractors: ["Sanza", "Poso"] },
      ],
    },
    {
      title: "Compter des objets",
      words: [
        { lingala: "Mitano", french: "Cinq (5)", icon: "5️⃣" },
        { lingala: "Zomi", french: "Dix (10)", icon: "🔟" },
        { lingala: "Nyonso", french: "Tout / Tous", icon: "🌐" },
        { lingala: "Mosusu", french: "Autre", icon: "➕" },
      ],
      phrases: [
        { lingala: "Nazali na buku mitano", french: "J'ai cinq livres" },
        { lingala: "Pesa ngai mosusu", french: "Donne-moi un autre" },
      ],
      fillBlanks: [
        { sentence: "Nazali na buku ___", answer: "mitano", distractors: ["mibale", "zomi"] },
        { sentence: "Pesa ngai ___", answer: "mosusu", distractors: ["nyonso", "moko"] },
      ],
    },
    {
      title: "Révision : Les Nombres",
      words: [
        { lingala: "Moko", french: "Un", icon: "1️⃣" },
        { lingala: "Zomi", french: "Dix", icon: "🔟" },
        { lingala: "Ngonga", french: "Heure", icon: "🕐" },
        { lingala: "Lelo", french: "Aujourd'hui", icon: "📍" },
      ],
      phrases: [
        { lingala: "Lelo ezali ngonga mitano", french: "Aujourd'hui il est cinq heures" },
        { lingala: "Nazali na mbula tuku misato", french: "J'ai trente ans" },
      ],
      fillBlanks: [
        { sentence: "Lelo ezali ___ mitano", answer: "ngonga", distractors: ["sanza", "mobu"] },
        { sentence: "Nazali na ___ tuku misato", answer: "mbula", distractors: ["ngonga", "sanza"] },
      ],
    },
  ],
};

// ---- UNIT 5: Le Corps ----
const unit5: UnitData = {
  title: "Nzoto - Le Corps",
  description: "Les parties du corps et la santé",
  color: "bg-brand-green",
  lessons: [
    {
      title: "La tête et le visage",
      words: [
        { lingala: "Moto", french: "Tête", icon: "🧠" },
        { lingala: "Liso", french: "Oeil", icon: "👁️" },
        { lingala: "Matoyi", french: "Oreilles", icon: "👂" },
        { lingala: "Monoko", french: "Bouche", icon: "👄" },
      ],
      phrases: [
        { lingala: "Moto na ngai ezali malamu", french: "Ma tête va bien" },
        { lingala: "Fungola miso", french: "Ouvre les yeux" },
      ],
      fillBlanks: [
        { sentence: "___ na ngai ezali malamu", answer: "Moto", distractors: ["Liso", "Monoko"] },
        { sentence: "Fungola ___", answer: "miso", distractors: ["monoko", "matoyi"] },
      ],
    },
    {
      title: "Le haut du corps",
      words: [
        { lingala: "Loboko", french: "Main / Bras", icon: "🤚" },
        { lingala: "Ntolo", french: "Épaule", icon: "💪" },
        { lingala: "Ntolo", french: "Dos", icon: "🔙" },
        { lingala: "Motema", french: "Coeur", icon: "❤️" },
      ],
      phrases: [
        { lingala: "Loboko na ngai ezali kosala", french: "Ma main travaille" },
        { lingala: "Motema na ngai ezali na esengo", french: "Mon coeur est joyeux" },
      ],
      fillBlanks: [
        { sentence: "___ na ngai ezali kosala", answer: "Loboko", distractors: ["Motema", "Ntolo"] },
        { sentence: "Motema na ngai ezali na ___", answer: "esengo", distractors: ["mabe", "mpasi"] },
      ],
    },
    {
      title: "Le bas du corps",
      words: [
        { lingala: "Lokolo", french: "Pied / Jambe", icon: "🦶" },
        { lingala: "Libumu", french: "Ventre", icon: "🫃" },
        { lingala: "Likonzi", french: "Genou", icon: "🦵" },
        { lingala: "Misapi", french: "Doigts", icon: "🖐️" },
      ],
      phrases: [
        { lingala: "Lokolo na ngai ezali kopesa mpasi", french: "Mon pied me fait mal" },
        { lingala: "Libumu na ngai etondi", french: "Mon ventre est plein" },
      ],
      fillBlanks: [
        { sentence: "___ na ngai ezali kopesa mpasi", answer: "Lokolo", distractors: ["Loboko", "Moto"] },
        { sentence: "Libumu na ngai ___", answer: "etondi", distractors: ["ezali", "eleki"] },
      ],
    },
    {
      title: "Chez le médecin",
      words: [
        { lingala: "Monganga", french: "Médecin", icon: "👨‍⚕️" },
        { lingala: "Maladi", french: "Maladie", icon: "🤒" },
        { lingala: "Mpasi", french: "Douleur", icon: "😣" },
        { lingala: "Nkisi", french: "Médicament", icon: "💊" },
      ],
      phrases: [
        { lingala: "Nazali na maladi", french: "Je suis malade" },
        { lingala: "Nakei na monganga", french: "Je vais chez le médecin" },
      ],
      fillBlanks: [
        { sentence: "Nazali na ___", answer: "maladi", distractors: ["esengo", "mpasi"] },
        { sentence: "Nakei na ___", answer: "monganga", distractors: ["zando", "ndako"] },
      ],
    },
    {
      title: "Se sentir bien ou mal",
      words: [
        { lingala: "Esengo", french: "Joie / Content", icon: "😊" },
        { lingala: "Mawa", french: "Tristesse", icon: "😢" },
        { lingala: "Nkanda", french: "Colère", icon: "😠" },
        { lingala: "Bobangi", french: "Peur", icon: "😨" },
      ],
      phrases: [
        { lingala: "Nazali na esengo", french: "Je suis content" },
        { lingala: "Nazali na mawa", french: "Je suis triste" },
      ],
      fillBlanks: [
        { sentence: "Nazali na ___", answer: "esengo", distractors: ["mawa", "nkanda"] },
        { sentence: "Azali na ___", answer: "bobangi", distractors: ["esengo", "malamu"] },
      ],
    },
    {
      title: "Actions du corps",
      words: [
        { lingala: "Kotambola", french: "Marcher", icon: "🚶" },
        { lingala: "Kopota", french: "Courir", icon: "🏃" },
        { lingala: "Kofanda", french: "S'asseoir", icon: "🪑" },
        { lingala: "Kolala", french: "Dormir", icon: "😴" },
      ],
      phrases: [
        { lingala: "Nalingi kolala", french: "Je veux dormir" },
        { lingala: "Tokei kotambola", french: "Allons marcher" },
      ],
      fillBlanks: [
        { sentence: "Nalingi ___", answer: "kolala", distractors: ["kopota", "kofanda"] },
        { sentence: "Tokei ___", answer: "kotambola", distractors: ["kolala", "kolia"] },
      ],
    },
    {
      title: "L'hygiène",
      words: [
        { lingala: "Kosukola", french: "Se laver", icon: "🚿" },
        { lingala: "Sabuni", french: "Savon", icon: "🧼" },
        { lingala: "Mino", french: "Dents", icon: "🦷" },
        { lingala: "Suki", french: "Cheveux", icon: "💇" },
      ],
      phrases: [
        { lingala: "Nakei kosukola", french: "Je vais me laver" },
        { lingala: "Sukola mino", french: "Brosse les dents" },
      ],
      fillBlanks: [
        { sentence: "Nakei ___", answer: "kosukola", distractors: ["kolala", "kolia"] },
        { sentence: "Sukola ___", answer: "mino", distractors: ["suki", "miso"] },
      ],
    },
    {
      title: "Les vêtements",
      words: [
        { lingala: "Elamba", french: "Vêtement", icon: "👕" },
        { lingala: "Sapato", french: "Chaussure", icon: "👟" },
        { lingala: "Liputa", french: "Pagne", icon: "👗" },
        { lingala: "Shapeau", french: "Chapeau", icon: "🎩" },
      ],
      phrases: [
        { lingala: "Latisa elamba", french: "Habille-toi" },
        { lingala: "Sapato oyo ezali kitoko", french: "Cette chaussure est belle" },
      ],
      fillBlanks: [
        { sentence: "Latisa ___", answer: "elamba", distractors: ["sapato", "liputa"] },
        { sentence: "Sapato oyo ezali ___", answer: "kitoko", distractors: ["mabe", "monene"] },
      ],
    },
    {
      title: "Descriptions physiques",
      words: [
        { lingala: "Molai", french: "Grand (taille)", icon: "📏" },
        { lingala: "Mokuse", french: "Court / Petit", icon: "📐" },
        { lingala: "Monene", french: "Gros / Grand", icon: "🫧" },
        { lingala: "Moke", french: "Petit / Mince", icon: "🐜" },
      ],
      phrases: [
        { lingala: "Tata azali molai", french: "Papa est grand" },
        { lingala: "Mwana azali moke", french: "L'enfant est petit" },
      ],
      fillBlanks: [
        { sentence: "Tata azali ___", answer: "molai", distractors: ["moke", "mokuse"] },
        { sentence: "Mwana azali ___", answer: "moke", distractors: ["molai", "monene"] },
      ],
    },
    {
      title: "Révision : Le Corps",
      words: [
        { lingala: "Nzoto", french: "Corps", icon: "🧍" },
        { lingala: "Monganga", french: "Médecin", icon: "👨‍⚕️" },
        { lingala: "Esengo", french: "Joie", icon: "😊" },
        { lingala: "Kosukola", french: "Se laver", icon: "🚿" },
      ],
      phrases: [
        { lingala: "Nzoto na ngai ezali malamu", french: "Mon corps va bien" },
        { lingala: "Nakei na monganga", french: "Je vais chez le médecin" },
      ],
      fillBlanks: [
        { sentence: "___ na ngai ezali malamu", answer: "Nzoto", distractors: ["Ndako", "Nzela"] },
        { sentence: "Nakei na ___", answer: "monganga", distractors: ["zando", "lopango"] },
      ],
    },
  ],
};

// ---- UNIT 6: Les Animaux ----
const unit6: UnitData = {
  title: "Banyama - Les Animaux",
  description: "Les animaux domestiques, sauvages et la nature",
  color: "bg-brand-blue",
  lessons: [
    {
      title: "Animaux domestiques",
      words: [
        { lingala: "Mbwa", french: "Chien", icon: "🐕" },
        { lingala: "Pusi", french: "Chat", icon: "🐈" },
        { lingala: "Nsoso", french: "Poule", icon: "🐔" },
        { lingala: "Ntaba", french: "Chèvre", icon: "🐐" },
      ],
      phrases: [
        { lingala: "Mbwa azali kolela", french: "Le chien aboie" },
        { lingala: "Pusi azali kolala", french: "Le chat dort" },
      ],
      fillBlanks: [
        { sentence: "___ azali kolela", answer: "Mbwa", distractors: ["Pusi", "Nsoso"] },
        { sentence: "Pusi azali ___", answer: "kolala", distractors: ["kolia", "kopota"] },
      ],
    },
    {
      title: "Animaux sauvages",
      words: [
        { lingala: "Nkoi", french: "Léopard", icon: "🐆" },
        { lingala: "Nzoku", french: "Éléphant", icon: "🐘" },
        { lingala: "Nyoka", french: "Serpent", icon: "🐍" },
        { lingala: "Ngando", french: "Crocodile", icon: "🐊" },
      ],
      phrases: [
        { lingala: "Nzoku azali monene", french: "L'éléphant est grand" },
        { lingala: "Nkoi azali makasi", french: "Le léopard est fort" },
      ],
      fillBlanks: [
        { sentence: "___ azali monene", answer: "Nzoku", distractors: ["Nkoi", "Nyoka"] },
        { sentence: "Nkoi azali ___", answer: "makasi", distractors: ["moke", "mabe"] },
      ],
    },
    {
      title: "Les oiseaux",
      words: [
        { lingala: "Ndeke", french: "Oiseau", icon: "🐦" },
        { lingala: "Ebenga", french: "Perroquet", icon: "🦜" },
        { lingala: "Libata", french: "Canard", icon: "🦆" },
        { lingala: "Mpongo", french: "Aigle", icon: "🦅" },
      ],
      phrases: [
        { lingala: "Ndeke azali kopumbwa", french: "L'oiseau vole" },
        { lingala: "Ebenga azali kosolola", french: "Le perroquet parle" },
      ],
      fillBlanks: [
        { sentence: "Ndeke azali ___", answer: "kopumbwa", distractors: ["kotambola", "kolala"] },
        { sentence: "___ azali kosolola", answer: "Ebenga", distractors: ["Ndeke", "Libata"] },
      ],
    },
    {
      title: "Les insectes",
      words: [
        { lingala: "Nzinzi", french: "Mouche", icon: "🪰" },
        { lingala: "Ngungi", french: "Moustique", icon: "🦟" },
        { lingala: "Nyuki", french: "Abeille", icon: "🐝" },
        { lingala: "Mpembe", french: "Papillon", icon: "🦋" },
      ],
      phrases: [
        { lingala: "Ngungi ezali kopesa mpasi", french: "Le moustique fait mal" },
        { lingala: "Nyuki ezali kosala mafuta", french: "L'abeille fait du miel" },
      ],
      fillBlanks: [
        { sentence: "___ ezali kopesa mpasi", answer: "Ngungi", distractors: ["Nyuki", "Nzinzi"] },
        { sentence: "Nyuki ezali kosala ___", answer: "mafuta", distractors: ["mpasi", "mai"] },
      ],
    },
    {
      title: "Les animaux d'eau",
      words: [
        { lingala: "Mbisi", french: "Poisson", icon: "🐟" },
        { lingala: "Ngando", french: "Crocodile", icon: "🐊" },
        { lingala: "Nyama ya mai", french: "Animal aquatique", icon: "🐋" },
        { lingala: "Koko", french: "Tortue", icon: "🐢" },
      ],
      phrases: [
        { lingala: "Mbisi azali na mai", french: "Le poisson est dans l'eau" },
        { lingala: "Ngando azali na ebale", french: "Le crocodile est dans la rivière" },
      ],
      fillBlanks: [
        { sentence: "Mbisi azali na ___", answer: "mai", distractors: ["moto", "nzela"] },
        { sentence: "Ngando azali na ___", answer: "ebale", distractors: ["ndako", "nzete"] },
      ],
    },
    {
      title: "La forêt",
      words: [
        { lingala: "Zamba", french: "Forêt", icon: "🌳" },
        { lingala: "Nzete", french: "Arbre", icon: "🌲" },
        { lingala: "Fololo", french: "Fleur", icon: "🌺" },
        { lingala: "Matiti", french: "Herbe", icon: "🌿" },
      ],
      phrases: [
        { lingala: "Zamba ezali monene", french: "La forêt est grande" },
        { lingala: "Nzete oyo ezali molai", french: "Cet arbre est grand" },
      ],
      fillBlanks: [
        { sentence: "___ ezali monene", answer: "Zamba", distractors: ["Ndako", "Nzela"] },
        { sentence: "Nzete oyo ezali ___", answer: "molai", distractors: ["moke", "mabe"] },
      ],
    },
    {
      title: "Le temps qu'il fait",
      words: [
        { lingala: "Mvula", french: "Pluie", icon: "🌧️" },
        { lingala: "Moi", french: "Soleil", icon: "☀️" },
        { lingala: "Mopepe", french: "Vent", icon: "💨" },
        { lingala: "Mapata", french: "Nuages", icon: "☁️" },
      ],
      phrases: [
        { lingala: "Mvula ezali kobeta", french: "Il pleut" },
        { lingala: "Moi ezali kongala", french: "Le soleil brille" },
      ],
      fillBlanks: [
        { sentence: "___ ezali kobeta", answer: "Mvula", distractors: ["Mopepe", "Moi"] },
        { sentence: "Moi ezali ___", answer: "kongala", distractors: ["kobeta", "kopesa"] },
      ],
    },
    {
      title: "La rivière et la terre",
      words: [
        { lingala: "Ebale", french: "Rivière / Fleuve", icon: "🏞️" },
        { lingala: "Mabele", french: "Terre / Sol", icon: "🌍" },
        { lingala: "Libanga", french: "Pierre", icon: "🪨" },
        { lingala: "Zelo", french: "Sable", icon: "🏖️" },
      ],
      phrases: [
        { lingala: "Ebale Congo ezali monene", french: "Le fleuve Congo est grand" },
        { lingala: "Mabele ezali pete", french: "La terre est molle" },
      ],
      fillBlanks: [
        { sentence: "Ebale Congo ezali ___", answer: "monene", distractors: ["moke", "mabe"] },
        { sentence: "___ ezali pete", answer: "Mabele", distractors: ["Libanga", "Zelo"] },
      ],
    },
    {
      title: "Sons des animaux",
      words: [
        { lingala: "Kolela", french: "Crier / Aboyer", icon: "🔊" },
        { lingala: "Konguluma", french: "Grogner", icon: "🐻" },
        { lingala: "Koyemba", french: "Chanter (oiseau)", icon: "🎵" },
        { lingala: "Kopumbwa", french: "Voler", icon: "🦅" },
      ],
      phrases: [
        { lingala: "Ndeke azali koyemba", french: "L'oiseau chante" },
        { lingala: "Mbwa azali kolela", french: "Le chien aboie" },
      ],
      fillBlanks: [
        { sentence: "Ndeke azali ___", answer: "koyemba", distractors: ["kolela", "kopumbwa"] },
        { sentence: "Mbwa azali ___", answer: "kolela", distractors: ["koyemba", "kolala"] },
      ],
    },
    {
      title: "Révision : Les Animaux",
      words: [
        { lingala: "Nzoku", french: "Éléphant", icon: "🐘" },
        { lingala: "Mbisi", french: "Poisson", icon: "🐟" },
        { lingala: "Ndeke", french: "Oiseau", icon: "🐦" },
        { lingala: "Zamba", french: "Forêt", icon: "🌳" },
      ],
      phrases: [
        { lingala: "Nzoku azali na zamba", french: "L'éléphant est dans la forêt" },
        { lingala: "Mbisi azali na ebale", french: "Le poisson est dans la rivière" },
      ],
      fillBlanks: [
        { sentence: "Nzoku azali na ___", answer: "zamba", distractors: ["ebale", "ndako"] },
        { sentence: "Mbisi azali na ___", answer: "ebale", distractors: ["zamba", "nzela"] },
      ],
    },
  ],
};

// ---- UNIT 7: Le Travail ----
const unit7: UnitData = {
  title: "Misala - Le Travail",
  description: "Les métiers, professions et la vie au bureau",
  color: "bg-brand-yellow",
  lessons: [
    {
      title: "Les métiers courants",
      words: [
        { lingala: "Molakisi", french: "Enseignant", icon: "👨‍🏫" },
        { lingala: "Monganga", french: "Médecin", icon: "👨‍⚕️" },
        { lingala: "Motongi ndako", french: "Maçon", icon: "👷" },
        { lingala: "Motuki bilamba", french: "Couturier", icon: "🧵" },
      ],
      phrases: [
        { lingala: "Nazali molakisi", french: "Je suis enseignant" },
        { lingala: "Alingi kozala monganga", french: "Il veut être médecin" },
      ],
      fillBlanks: [
        { sentence: "Nazali ___", answer: "molakisi", distractors: ["monganga", "motongi"] },
        { sentence: "Alingi kozala ___", answer: "monganga", distractors: ["molakisi", "motuki"] },
      ],
    },
    {
      title: "Au bureau",
      words: [
        { lingala: "Biro", french: "Bureau", icon: "🏢" },
        { lingala: "Mosala", french: "Travail", icon: "💼" },
        { lingala: "Mokonzi", french: "Chef / Patron", icon: "👔" },
        { lingala: "Kompanyi", french: "Entreprise", icon: "🏗️" },
      ],
      phrases: [
        { lingala: "Nakei na mosala", french: "Je vais au travail" },
        { lingala: "Mokonzi azali na biro", french: "Le chef est au bureau" },
      ],
      fillBlanks: [
        { sentence: "Nakei na ___", answer: "mosala", distractors: ["zando", "ndako"] },
        { sentence: "Mokonzi azali na ___", answer: "biro", distractors: ["ndako", "zando"] },
      ],
    },
    {
      title: "Gagner de l'argent",
      words: [
        { lingala: "Mbongo", french: "Argent", icon: "💵" },
        { lingala: "Lifuti", french: "Salaire", icon: "💰" },
        { lingala: "Kozwa", french: "Recevoir", icon: "🤲" },
        { lingala: "Kofuta", french: "Payer", icon: "💳" },
      ],
      phrases: [
        { lingala: "Nazwi lifuti na ngai", french: "J'ai reçu mon salaire" },
        { lingala: "Nafuti mbongo", french: "J'ai payé l'argent" },
      ],
      fillBlanks: [
        { sentence: "Nazwi ___ na ngai", answer: "lifuti", distractors: ["mbongo", "mosala"] },
        { sentence: "Nafuti ___", answer: "mbongo", distractors: ["lifuti", "mosala"] },
      ],
    },
    {
      title: "Les commerçants",
      words: [
        { lingala: "Moteki", french: "Vendeur", icon: "🧑‍💼" },
        { lingala: "Mosombi", french: "Acheteur", icon: "🛒" },
        { lingala: "Zando", french: "Marché", icon: "🏪" },
        { lingala: "Biloko", french: "Marchandises", icon: "📦" },
      ],
      phrases: [
        { lingala: "Moteki azali na zando", french: "Le vendeur est au marché" },
        { lingala: "Nasombi biloko", french: "J'achète des marchandises" },
      ],
      fillBlanks: [
        { sentence: "Moteki azali na ___", answer: "zando", distractors: ["biro", "ndako"] },
        { sentence: "Nasombi ___", answer: "biloko", distractors: ["mbongo", "mosala"] },
      ],
    },
    {
      title: "Artisans et artistes",
      words: [
        { lingala: "Moyembi", french: "Chanteur", icon: "🎤" },
        { lingala: "Mobini", french: "Danseur", icon: "💃" },
        { lingala: "Mosakoli", french: "Peintre / Artiste", icon: "🎨" },
        { lingala: "Mosani", french: "Musicien", icon: "🎸" },
      ],
      phrases: [
        { lingala: "Moyembi azali koyemba", french: "Le chanteur chante" },
        { lingala: "Mobini azali kobina", french: "Le danseur danse" },
      ],
      fillBlanks: [
        { sentence: "Moyembi azali ___", answer: "koyemba", distractors: ["kobina", "kosala"] },
        { sentence: "Mobini azali ___", answer: "kobina", distractors: ["koyemba", "kotambola"] },
      ],
    },
    {
      title: "Transport et chauffeurs",
      words: [
        { lingala: "Shofele", french: "Chauffeur", icon: "🚗" },
        { lingala: "Motuka", french: "Voiture", icon: "🚙" },
        { lingala: "Bisi", french: "Bus", icon: "🚌" },
        { lingala: "Piki-piki", french: "Moto", icon: "🏍️" },
      ],
      phrases: [
        { lingala: "Shofele azali kokamba motuka", french: "Le chauffeur conduit la voiture" },
        { lingala: "Nakei na bisi", french: "Je prends le bus" },
      ],
      fillBlanks: [
        { sentence: "Shofele azali kokamba ___", answer: "motuka", distractors: ["bisi", "piki-piki"] },
        { sentence: "Nakei na ___", answer: "bisi", distractors: ["motuka", "ndako"] },
      ],
    },
    {
      title: "À l'école",
      words: [
        { lingala: "Eteyelo", french: "École", icon: "🏫" },
        { lingala: "Buku", french: "Livre", icon: "📚" },
        { lingala: "Koyekola", french: "Apprendre", icon: "📖" },
        { lingala: "Molakisi", french: "Professeur", icon: "👩‍🏫" },
      ],
      phrases: [
        { lingala: "Nakei na eteyelo", french: "Je vais à l'école" },
        { lingala: "Nalingi koyekola", french: "J'aime apprendre" },
      ],
      fillBlanks: [
        { sentence: "Nakei na ___", answer: "eteyelo", distractors: ["zando", "biro"] },
        { sentence: "Nalingi ___", answer: "koyekola", distractors: ["kosala", "kolala"] },
      ],
    },
    {
      title: "Actions de travail",
      words: [
        { lingala: "Kosala", french: "Travailler / Faire", icon: "⚒️" },
        { lingala: "Kokoma", french: "Écrire", icon: "✍️" },
        { lingala: "Kotanga", french: "Lire / Compter", icon: "📖" },
        { lingala: "Kosilisa", french: "Finir / Terminer", icon: "✅" },
      ],
      phrases: [
        { lingala: "Nazali kosala", french: "Je travaille" },
        { lingala: "Nasilisi mosala", french: "J'ai fini le travail" },
      ],
      fillBlanks: [
        { sentence: "Nazali ___", answer: "kosala", distractors: ["kolala", "kolia"] },
        { sentence: "Nasilisi ___", answer: "mosala", distractors: ["ndako", "bilei"] },
      ],
    },
    {
      title: "Chercher du travail",
      words: [
        { lingala: "Koluka", french: "Chercher", icon: "🔍" },
        { lingala: "Kozwa mosala", french: "Trouver du travail", icon: "🎯" },
        { lingala: "Entretien", french: "Entretien", icon: "🤝" },
        { lingala: "CV", french: "CV", icon: "📄" },
      ],
      phrases: [
        { lingala: "Nazali koluka mosala", french: "Je cherche du travail" },
        { lingala: "Nazwi mosala ya sika", french: "J'ai trouvé un nouveau travail" },
      ],
      fillBlanks: [
        { sentence: "Nazali koluka ___", answer: "mosala", distractors: ["mbongo", "ndako"] },
        { sentence: "Nazwi mosala ya ___", answer: "sika", distractors: ["kala", "mabe"] },
      ],
    },
    {
      title: "Révision : Le Travail",
      words: [
        { lingala: "Mosala", french: "Travail", icon: "💼" },
        { lingala: "Mbongo", french: "Argent", icon: "💵" },
        { lingala: "Eteyelo", french: "École", icon: "🏫" },
        { lingala: "Kosala", french: "Travailler", icon: "⚒️" },
      ],
      phrases: [
        { lingala: "Nakei na mosala kosala", french: "Je vais au travail travailler" },
        { lingala: "Nalingi kozwa mbongo", french: "Je veux gagner de l'argent" },
      ],
      fillBlanks: [
        { sentence: "Nakei na ___ kosala", answer: "mosala", distractors: ["ndako", "zando"] },
        { sentence: "Nalingi kozwa ___", answer: "mbongo", distractors: ["mosala", "biloko"] },
      ],
    },
  ],
};

// ---- UNIT 8: Les Déplacements ----
const unit8: UnitData = {
  title: "Mobembo - Les Déplacements",
  description: "Voyager, se déplacer, les directions et le transport",
  color: "bg-brand-red",
  lessons: [
    {
      title: "Les moyens de transport",
      words: [
        { lingala: "Motuka", french: "Voiture", icon: "🚗" },
        { lingala: "Bisi", french: "Bus", icon: "🚌" },
        { lingala: "Masuwa", french: "Bateau", icon: "🚢" },
        { lingala: "Mpela", french: "Pirogue", icon: "🛶" },
      ],
      phrases: [
        { lingala: "Nakei na motuka", french: "J'y vais en voiture" },
        { lingala: "Masuwa ezali kokende", french: "Le bateau part" },
      ],
      fillBlanks: [
        { sentence: "Nakei na ___", answer: "motuka", distractors: ["masuwa", "mpela"] },
        { sentence: "___ ezali kokende", answer: "Masuwa", distractors: ["Motuka", "Bisi"] },
      ],
    },
    {
      title: "Les directions",
      words: [
        { lingala: "Loboko ya mobali", french: "À droite", icon: "👉" },
        { lingala: "Loboko ya mwasi", french: "À gauche", icon: "👈" },
        { lingala: "Liboso", french: "Devant / En avant", icon: "⬆️" },
        { lingala: "Nsima", french: "Derrière / Arrière", icon: "⬇️" },
      ],
      phrases: [
        { lingala: "Baluka na loboko ya mobali", french: "Tournez à droite" },
        { lingala: "Kende liboso", french: "Va tout droit" },
      ],
      fillBlanks: [
        { sentence: "Baluka na loboko ya ___", answer: "mobali", distractors: ["mwasi", "moko"] },
        { sentence: "Kende ___", answer: "liboso", distractors: ["nsima", "likolo"] },
      ],
    },
    {
      title: "Où aller ?",
      words: [
        { lingala: "Kokende", french: "Aller / Partir", icon: "🚶" },
        { lingala: "Kozonga", french: "Revenir / Retourner", icon: "🔙" },
        { lingala: "Kokoma", french: "Arriver", icon: "📍" },
        { lingala: "Koleka", french: "Passer", icon: "➡️" },
      ],
      phrases: [
        { lingala: "Nalingi kokende Brazza", french: "Je veux aller à Brazza" },
        { lingala: "Tozongaki na ndako", french: "Nous sommes rentrés à la maison" },
      ],
      fillBlanks: [
        { sentence: "Nalingi ___ Brazza", answer: "kokende", distractors: ["kozonga", "koleka"] },
        { sentence: "Tozongaki na ___", answer: "ndako", distractors: ["zando", "biro"] },
      ],
    },
    {
      title: "La ville",
      words: [
        { lingala: "Engumba", french: "Ville", icon: "🏙️" },
        { lingala: "Nzela", french: "Route / Chemin", icon: "🛣️" },
        { lingala: "Etando", french: "Place / Espace", icon: "🏟️" },
        { lingala: "Lopitalo", french: "Hôpital", icon: "🏥" },
      ],
      phrases: [
        { lingala: "Engumba ezali monene", french: "La ville est grande" },
        { lingala: "Nzela oyo ezali malamu", french: "Cette route est bonne" },
      ],
      fillBlanks: [
        { sentence: "___ ezali monene", answer: "Engumba", distractors: ["Nzela", "Ndako"] },
        { sentence: "Nzela oyo ezali ___", answer: "malamu", distractors: ["mabe", "moke"] },
      ],
    },
    {
      title: "Demander son chemin",
      words: [
        { lingala: "Nzela", french: "Chemin", icon: "🗺️" },
        { lingala: "Mosika", french: "Loin", icon: "🔭" },
        { lingala: "Pene", french: "Près / Proche", icon: "📍" },
        { lingala: "Pembeni", french: "À côté", icon: "↔️" },
      ],
      phrases: [
        { lingala: "Nzela ya zando ezali wapi?", french: "Où est le chemin du marché ?" },
        { lingala: "Ezali mosika te, ezali pene", french: "Ce n'est pas loin, c'est proche" },
      ],
      fillBlanks: [
        { sentence: "Nzela ya zando ezali ___?", answer: "wapi", distractors: ["nini", "nani"] },
        { sentence: "Ezali ___ te", answer: "mosika", distractors: ["pene", "pembeni"] },
      ],
    },
    {
      title: "Le voyage",
      words: [
        { lingala: "Mobembo", french: "Voyage", icon: "✈️" },
        { lingala: "Valizi", french: "Valise", icon: "🧳" },
        { lingala: "Passeport", french: "Passeport", icon: "🛂" },
        { lingala: "Aeroport", french: "Aéroport", icon: "🛬" },
      ],
      phrases: [
        { lingala: "Nakei na mobembo", french: "Je pars en voyage" },
        { lingala: "Bobongisa valizi", french: "Prépare ta valise" },
      ],
      fillBlanks: [
        { sentence: "Nakei na ___", answer: "mobembo", distractors: ["mosala", "ndako"] },
        { sentence: "Bobongisa ___", answer: "valizi", distractors: ["bilei", "elamba"] },
      ],
    },
    {
      title: "Les lieux importants",
      words: [
        { lingala: "Ndako ya Nzambe", french: "Église", icon: "⛪" },
        { lingala: "Eteyelo", french: "École", icon: "🏫" },
        { lingala: "Zando", french: "Marché", icon: "🏪" },
        { lingala: "Lopitalo", french: "Hôpital", icon: "🏥" },
      ],
      phrases: [
        { lingala: "Nakei na ndako ya Nzambe", french: "Je vais à l'église" },
        { lingala: "Lopitalo ezali pene", french: "L'hôpital est proche" },
      ],
      fillBlanks: [
        { sentence: "Nakei na ndako ya ___", answer: "Nzambe", distractors: ["mosala", "bilei"] },
        { sentence: "___ ezali pene", answer: "Lopitalo", distractors: ["Eteyelo", "Zando"] },
      ],
    },
    {
      title: "En haut, en bas",
      words: [
        { lingala: "Likolo", french: "En haut / Le ciel", icon: "⬆️" },
        { lingala: "Na nse", french: "En bas", icon: "⬇️" },
        { lingala: "Kati", french: "À l'intérieur", icon: "🔲" },
        { lingala: "Libanda", french: "À l'extérieur / Dehors", icon: "🏞️" },
      ],
      phrases: [
        { lingala: "Kende na likolo", french: "Monte en haut" },
        { lingala: "Bana bazali na libanda", french: "Les enfants sont dehors" },
      ],
      fillBlanks: [
        { sentence: "Kende na ___", answer: "likolo", distractors: ["nse", "kati"] },
        { sentence: "Bana bazali na ___", answer: "libanda", distractors: ["kati", "likolo"] },
      ],
    },
    {
      title: "Vite et lentement",
      words: [
        { lingala: "Noki", french: "Vite", icon: "⚡" },
        { lingala: "Malembe", french: "Lentement / Doucement", icon: "🐢" },
        { lingala: "Mokolo nyonso", french: "Tous les jours", icon: "📅" },
        { lingala: "Mbala moko", french: "Une fois", icon: "1️⃣" },
      ],
      phrases: [
        { lingala: "Kende noki!", french: "Va vite !" },
        { lingala: "Sala malembe malembe", french: "Fais doucement" },
      ],
      fillBlanks: [
        { sentence: "Kende ___!", answer: "noki", distractors: ["malembe", "malamu"] },
        { sentence: "Sala ___ malembe", answer: "malembe", distractors: ["noki", "mingi"] },
      ],
    },
    {
      title: "Révision : Déplacements",
      words: [
        { lingala: "Motuka", french: "Voiture", icon: "🚗" },
        { lingala: "Nzela", french: "Route", icon: "🛣️" },
        { lingala: "Mobembo", french: "Voyage", icon: "✈️" },
        { lingala: "Kokende", french: "Aller", icon: "🚶" },
      ],
      phrases: [
        { lingala: "Tokei na mobembo na motuka", french: "Nous partons en voyage en voiture" },
        { lingala: "Nzela ezali mosika", french: "La route est longue" },
      ],
      fillBlanks: [
        { sentence: "Tokei na ___ na motuka", answer: "mobembo", distractors: ["mosala", "zando"] },
        { sentence: "Nzela ezali ___", answer: "mosika", distractors: ["pene", "moke"] },
      ],
    },
  ],
};

// ---- UNIT 9: Les Émotions ----
const unit9: UnitData = {
  title: "Makanisi - Les Émotions",
  description: "Les sentiments, la vie quotidienne et la routine",
  color: "bg-brand-green",
  lessons: [
    {
      title: "Joie et tristesse",
      words: [
        { lingala: "Esengo", french: "Joie / Bonheur", icon: "😊" },
        { lingala: "Mawa", french: "Tristesse", icon: "😢" },
        { lingala: "Koseka", french: "Rire", icon: "😂" },
        { lingala: "Kolela", french: "Pleurer", icon: "😭" },
      ],
      phrases: [
        { lingala: "Nazali na esengo mingi", french: "Je suis très content" },
        { lingala: "Mwana azali kolela", french: "L'enfant pleure" },
      ],
      fillBlanks: [
        { sentence: "Nazali na ___ mingi", answer: "esengo", distractors: ["mawa", "nkanda"] },
        { sentence: "Mwana azali ___", answer: "kolela", distractors: ["koseka", "kolala"] },
      ],
    },
    {
      title: "La colère et la peur",
      words: [
        { lingala: "Nkanda", french: "Colère", icon: "😠" },
        { lingala: "Bobangi", french: "Peur", icon: "😨" },
        { lingala: "Kimya", french: "Paix / Calme", icon: "☮️" },
        { lingala: "Motema mabe", french: "Énervé", icon: "💢" },
      ],
      phrases: [
        { lingala: "Azali na nkanda", french: "Il est en colère" },
        { lingala: "Kobanga te", french: "N'aie pas peur" },
      ],
      fillBlanks: [
        { sentence: "Azali na ___", answer: "nkanda", distractors: ["esengo", "kimya"] },
        { sentence: "___ te", answer: "Kobanga", distractors: ["Kolela", "Koseka"] },
      ],
    },
    {
      title: "L'amour et l'amitié",
      words: [
        { lingala: "Bolingo", french: "Amour", icon: "❤️" },
        { lingala: "Moninga", french: "Ami(e)", icon: "🤗" },
        { lingala: "Boyokani", french: "Entente / Harmonie", icon: "🤝" },
        { lingala: "Limemia", french: "Respect", icon: "🙏" },
      ],
      phrases: [
        { lingala: "Nalingi yo", french: "Je t'aime" },
        { lingala: "Ozali moninga na ngai", french: "Tu es mon ami" },
      ],
      fillBlanks: [
        { sentence: "Nalingi ___", answer: "yo", distractors: ["ye", "ngai"] },
        { sentence: "Ozali ___ na ngai", answer: "moninga", distractors: ["ndeko", "mokonzi"] },
      ],
    },
    {
      title: "Le matin",
      words: [
        { lingala: "Ntongo", french: "Matin", icon: "🌅" },
        { lingala: "Kolamuka", french: "Se réveiller", icon: "⏰" },
        { lingala: "Kolamba", french: "Cuisiner", icon: "🍳" },
        { lingala: "Komela", french: "Boire", icon: "☕" },
      ],
      phrases: [
        { lingala: "Na ntongo nalamuki", french: "Ce matin je me suis réveillé" },
        { lingala: "Nameli café", french: "J'ai bu du café" },
      ],
      fillBlanks: [
        { sentence: "Na ___ nalamuki", answer: "ntongo", distractors: ["butu", "midi"] },
        { sentence: "Nameli ___", answer: "café", distractors: ["mai", "loso"] },
      ],
    },
    {
      title: "Le soir",
      words: [
        { lingala: "Butu", french: "Nuit / Soir", icon: "🌙" },
        { lingala: "Kolala", french: "Dormir", icon: "😴" },
        { lingala: "Pongi", french: "Sommeil", icon: "💤" },
        { lingala: "Ndoto", french: "Rêve", icon: "💭" },
      ],
      phrases: [
        { lingala: "Butu elamu", french: "Bonne nuit" },
        { lingala: "Nalingi kolala", french: "Je veux dormir" },
      ],
      fillBlanks: [
        { sentence: "Butu ___", answer: "elamu", distractors: ["mabe", "monene"] },
        { sentence: "Nalingi ___", answer: "kolala", distractors: ["kolia", "kosala"] },
      ],
    },
    {
      title: "Fatigue et énergie",
      words: [
        { lingala: "Bolɛmbu", french: "Fatigue", icon: "😫" },
        { lingala: "Nguya", french: "Force / Énergie", icon: "💪" },
        { lingala: "Kopema", french: "Se reposer", icon: "🧘" },
        { lingala: "Kozonga nguya", french: "Reprendre des forces", icon: "🔋" },
      ],
      phrases: [
        { lingala: "Nazali na bolɛmbu", french: "Je suis fatigué" },
        { lingala: "Nakei kopema", french: "Je vais me reposer" },
      ],
      fillBlanks: [
        { sentence: "Nazali na ___", answer: "bolɛmbu", distractors: ["nguya", "esengo"] },
        { sentence: "Nakei ___", answer: "kopema", distractors: ["kosala", "kolia"] },
      ],
    },
    {
      title: "Espoir et courage",
      words: [
        { lingala: "Elikya", french: "Espoir", icon: "🌟" },
        { lingala: "Mpiko", french: "Courage", icon: "🦁" },
        { lingala: "Kondima", french: "Croire / Foi", icon: "🙏" },
        { lingala: "Elonga", french: "Victoire", icon: "🏆" },
      ],
      phrases: [
        { lingala: "Zala na mpiko", french: "Aie du courage" },
        { lingala: "Elikya ezali", french: "Il y a de l'espoir" },
      ],
      fillBlanks: [
        { sentence: "Zala na ___", answer: "mpiko", distractors: ["elikya", "mawa"] },
        { sentence: "___ ezali", answer: "Elikya", distractors: ["Mawa", "Nkanda"] },
      ],
    },
    {
      title: "Exprimer ses besoins",
      words: [
        { lingala: "Nzala", french: "Faim", icon: "🍽️" },
        { lingala: "Mposa ya mai", french: "Soif", icon: "🥤" },
        { lingala: "Kolinga", french: "Vouloir / Aimer", icon: "💝" },
        { lingala: "Kosɛnga", french: "Demander", icon: "🙋" },
      ],
      phrases: [
        { lingala: "Nazali na nzala", french: "J'ai faim" },
        { lingala: "Nazali na mposa ya mai", french: "J'ai soif" },
      ],
      fillBlanks: [
        { sentence: "Nazali na ___", answer: "nzala", distractors: ["mposa", "esengo"] },
        { sentence: "Nazali na mposa ya ___", answer: "mai", distractors: ["loso", "mbisi"] },
      ],
    },
    {
      title: "Féliciter et encourager",
      words: [
        { lingala: "Longonya", french: "Bravo / Félicitations", icon: "👏" },
        { lingala: "Malamu mingi", french: "Très bien", icon: "⭐" },
        { lingala: "Kokoba", french: "Continuer", icon: "▶️" },
        { lingala: "Komeka", french: "Essayer", icon: "🎯" },
      ],
      phrases: [
        { lingala: "Longonya na yo!", french: "Bravo à toi !" },
        { lingala: "Kokoba! Ozali malamu", french: "Continue ! Tu fais bien" },
      ],
      fillBlanks: [
        { sentence: "___ na yo!", answer: "Longonya", distractors: ["Matondo", "Mbote"] },
        { sentence: "Kokoba! Ozali ___", answer: "malamu", distractors: ["mabe", "moke"] },
      ],
    },
    {
      title: "Révision : Les Émotions",
      words: [
        { lingala: "Esengo", french: "Joie", icon: "😊" },
        { lingala: "Bolingo", french: "Amour", icon: "❤️" },
        { lingala: "Elikya", french: "Espoir", icon: "🌟" },
        { lingala: "Mpiko", french: "Courage", icon: "🦁" },
      ],
      phrases: [
        { lingala: "Nazali na esengo na bolingo", french: "Je suis dans la joie et l'amour" },
        { lingala: "Elikya na mpiko", french: "Espoir et courage" },
      ],
      fillBlanks: [
        { sentence: "Nazali na esengo na ___", answer: "bolingo", distractors: ["nkanda", "mawa"] },
        { sentence: "Elikya na ___", answer: "mpiko", distractors: ["bobangi", "mawa"] },
      ],
    },
  ],
};

// ---- UNIT 10: Conversations Avancées ----
const unit10: UnitData = {
  title: "Masolo - Conversations",
  description: "Dialogues avancés, culture et expressions courantes",
  color: "bg-brand-blue",
  lessons: [
    {
      title: "Se présenter en détail",
      words: [
        { lingala: "Mboka", french: "Village / Pays", icon: "🌍" },
        { lingala: "Mbula", french: "Âge / Année / Pluie", icon: "🎂" },
        { lingala: "Mosala", french: "Travail / Métier", icon: "💼" },
        { lingala: "Elobela", french: "Parler de / Raconter", icon: "🗣️" },
      ],
      phrases: [
        { lingala: "Nauti na mboka ya Congo", french: "Je viens du pays du Congo" },
        { lingala: "Nazali na mbula tuku mibale na mitano", french: "J'ai vingt-cinq ans" },
      ],
      fillBlanks: [
        { sentence: "Nauti na ___ ya Congo", answer: "mboka", distractors: ["engumba", "nzela"] },
        { sentence: "Nazali na ___ tuku mibale", answer: "mbula", distractors: ["ngonga", "sanza"] },
      ],
    },
    {
      title: "Au téléphone",
      words: [
        { lingala: "Telefone", french: "Téléphone", icon: "📱" },
        { lingala: "Kobenga", french: "Appeler", icon: "📞" },
        { lingala: "Kokoma message", french: "Écrire un message", icon: "💬" },
        { lingala: "Kozongisa", french: "Rappeler / Répondre", icon: "🔁" },
      ],
      phrases: [
        { lingala: "Nalingi kobenga yo", french: "Je veux t'appeler" },
        { lingala: "Tinda ngai message", french: "Envoie-moi un message" },
      ],
      fillBlanks: [
        { sentence: "Nalingi ___ yo", answer: "kobenga", distractors: ["kokoma", "kotinda"] },
        { sentence: "Tinda ngai ___", answer: "message", distractors: ["telefone", "mbongo"] },
      ],
    },
    {
      title: "Inviter quelqu'un",
      words: [
        { lingala: "Kobenga", french: "Inviter / Appeler", icon: "💌" },
        { lingala: "Feti", french: "Fête", icon: "🎉" },
        { lingala: "Koya", french: "Venir", icon: "🚶" },
        { lingala: "Esika", french: "Endroit / Place", icon: "📍" },
      ],
      phrases: [
        { lingala: "Yaka na feti na biso", french: "Viens à notre fête" },
        { lingala: "Feti ezali na esika nini?", french: "La fête est à quel endroit ?" },
      ],
      fillBlanks: [
        { sentence: "Yaka na ___ na biso", answer: "feti", distractors: ["ndako", "mosala"] },
        { sentence: "Feti ezali na ___ nini?", answer: "esika", distractors: ["ngonga", "nzela"] },
      ],
    },
    {
      title: "La musique congolaise",
      words: [
        { lingala: "Nzembo", french: "Chanson", icon: "🎵" },
        { lingala: "Kobina", french: "Danser", icon: "💃" },
        { lingala: "Ngoma", french: "Tambour", icon: "🥁" },
        { lingala: "Maracas", french: "Instrument", icon: "🎶" },
      ],
      phrases: [
        { lingala: "Nzembo oyo ezali kitoko", french: "Cette chanson est belle" },
        { lingala: "Tokei kobina!", french: "Allons danser !" },
      ],
      fillBlanks: [
        { sentence: "Nzembo oyo ezali ___", answer: "kitoko", distractors: ["mabe", "monene"] },
        { sentence: "Tokei ___!", answer: "kobina", distractors: ["kolia", "kolala"] },
      ],
    },
    {
      title: "La culture congolaise",
      words: [
        { lingala: "Bonkoko", french: "Tradition / Culture", icon: "🏛️" },
        { lingala: "Lisapo", french: "Conte / Histoire", icon: "📖" },
        { lingala: "Nkembo", french: "Gloire / Honneur", icon: "👑" },
        { lingala: "Bwanya", french: "Sagesse", icon: "🦉" },
      ],
      phrases: [
        { lingala: "Bonkoko na biso ezali na tina", french: "Notre culture a de la valeur" },
        { lingala: "Yoka lisapo ya bankoko", french: "Écoute le conte des ancêtres" },
      ],
      fillBlanks: [
        { sentence: "Bonkoko na biso ezali na ___", answer: "tina", distractors: ["mbongo", "mabe"] },
        { sentence: "Yoka ___ ya bankoko", answer: "lisapo", distractors: ["nzembo", "masolo"] },
      ],
    },
    {
      title: "Exprimer son opinion",
      words: [
        { lingala: "Nakanisi", french: "Je pense", icon: "🤔" },
        { lingala: "Nandimi", french: "Je suis d'accord", icon: "✅" },
        { lingala: "Naboyi", french: "Je refuse", icon: "❌" },
        { lingala: "Ezali solo", french: "C'est vrai", icon: "💯" },
      ],
      phrases: [
        { lingala: "Nakanisi ete ozali na solo", french: "Je pense que tu as raison" },
        { lingala: "Naboyi likambo oyo", french: "Je refuse cette affaire" },
      ],
      fillBlanks: [
        { sentence: "___ ete ozali na solo", answer: "Nakanisi", distractors: ["Nandimi", "Naboyi"] },
        { sentence: "Naboyi ___ oyo", answer: "likambo", distractors: ["nzela", "mosala"] },
      ],
    },
    {
      title: "Proverbes lingala",
      words: [
        { lingala: "Lisese", french: "Proverbe", icon: "📜" },
        { lingala: "Mayele", french: "Intelligence", icon: "🧠" },
        { lingala: "Boyebi", french: "Savoir / Connaissance", icon: "📚" },
        { lingala: "Motema", french: "Coeur", icon: "❤️" },
      ],
      phrases: [
        { lingala: "Moto akufi na nzala te, soki azali na loboko", french: "On ne meurt pas de faim si on a des bras" },
        { lingala: "Nzete ekweya na mopɛpɛ te, soki misisa ezali makasi", french: "Un arbre ne tombe pas s'il a de fortes racines" },
      ],
      fillBlanks: [
        { sentence: "Moto akufi na ___ te", answer: "nzala", distractors: ["mposa", "mawa"] },
        { sentence: "Nzete ekweya na ___ te", answer: "mopɛpɛ", distractors: ["mvula", "moi"] },
      ],
    },
    {
      title: "Au marché : négocier",
      words: [
        { lingala: "Talo", french: "Prix", icon: "💰" },
        { lingala: "Mingi", french: "Beaucoup / Trop", icon: "📈" },
        { lingala: "Kokitisa", french: "Baisser / Réduire", icon: "📉" },
        { lingala: "Koyokana", french: "Se mettre d'accord", icon: "🤝" },
      ],
      phrases: [
        { lingala: "Talo ezali mingi, kitisa!", french: "Le prix est trop cher, baisse !" },
        { lingala: "Toyokani na talo ya sika", french: "On s'est mis d'accord sur le nouveau prix" },
      ],
      fillBlanks: [
        { sentence: "Talo ezali ___, kitisa!", answer: "mingi", distractors: ["moke", "malamu"] },
        { sentence: "Toyokani na talo ya ___", answer: "sika", distractors: ["kala", "mabe"] },
      ],
    },
    {
      title: "Parler du futur",
      words: [
        { lingala: "Lobi", french: "Demain", icon: "🌅" },
        { lingala: "Mikolo ezali koya", french: "Les jours à venir", icon: "📆" },
        { lingala: "Mokano", french: "Décision / Plan", icon: "📋" },
        { lingala: "Elikya", french: "Espoir", icon: "🌟" },
      ],
      phrases: [
        { lingala: "Lobi nakosala mosala ya sika", french: "Demain je ferai un nouveau travail" },
        { lingala: "Nazali na elikya ya malamu", french: "J'ai bon espoir" },
      ],
      fillBlanks: [
        { sentence: "Lobi nakosala mosala ya ___", answer: "sika", distractors: ["kala", "mabe"] },
        { sentence: "Nazali na ___ ya malamu", answer: "elikya", distractors: ["nkanda", "mawa"] },
      ],
    },
    {
      title: "Révision finale",
      words: [
        { lingala: "Mbote", french: "Bonjour", icon: "👋" },
        { lingala: "Matondo", french: "Merci", icon: "🙏" },
        { lingala: "Bolingo", french: "Amour", icon: "❤️" },
        { lingala: "Elikya", french: "Espoir", icon: "🌟" },
      ],
      phrases: [
        { lingala: "Matondo mingi po na koyekola Lingala na biso!", french: "Merci beaucoup d'apprendre le Lingala avec nous !" },
        { lingala: "Lingala ezali monoko ya bolingo", french: "Le Lingala est la langue de l'amour" },
      ],
      fillBlanks: [
        { sentence: "Matondo mingi po na ___ Lingala", answer: "koyekola", distractors: ["kolinga", "kosala"] },
        { sentence: "Lingala ezali ___ ya bolingo", answer: "monoko", distractors: ["nzela", "ndako"] },
      ],
    },
  ],
};

// ============================================================
// EXERCISE GENERATOR
// ============================================================

const ALL_UNITS = [unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8, unit9, unit10];

function generateExercises(lesson: LessonData): Array<{
  type: string;
  question: string;
  order: number;
  options?: any;
  correctAnswer?: string;
}> {
  const exercises: Array<{
    type: string;
    question: string;
    order: number;
    options?: any;
    correctAnswer?: string;
  }> = [];
  const words = lesson.words;
  const phrases = lesson.phrases;
  const blanks = lesson.fillBlanks;

  // Exercise 1: Multiple choice (word meaning)
  const w0 = words[0];
  const wrongWords = words.slice(1).map((w) => w.french);
  exercises.push({
    type: "multiple_choice",
    question: `Que signifie **${w0.lingala}** ?`,
    order: 1,
    options: shuffle([
      { id: "correct", label: w0.french, isCorrect: true },
      ...wrongWords.map((w, i) => ({ id: `wrong${i}`, label: w, isCorrect: false })),
    ]),
  });

  // Exercise 2: Image selection
  exercises.push({
    type: "image_selection",
    question: `Sélectionne l'image correspondant à **${words[1].lingala}**`,
    order: 2,
    options: shuffle(
      words.map((w, i) => ({
        id: `img${i}`,
        label: w.french,
        icon: w.icon || "📝",
        isCorrect: i === 1,
      }))
    ),
  });

  // Exercise 3: Translation (phrase -> french using word bank)
  const p0 = phrases[0];
  const frenchWords = p0.french.split(" ");
  const distractorPool = ["Le", "Un", "De", "Et", "Avec", "Pour", "Dans", "Sur"];
  const distractors = distractorPool
    .filter((d) => !frenchWords.map((w) => w.toLowerCase()).includes(d.toLowerCase()))
    .slice(0, 2);
  exercises.push({
    type: "translation",
    question: `Traduire : **${p0.lingala}**`,
    order: 3,
    correctAnswer: p0.french,
    options: shuffle([...frenchWords, ...distractors]),
  });

  // Exercise 4: Fill in the blank
  const b0 = blanks[0];
  exercises.push({
    type: "fill_blank",
    question: `Complète : ${b0.sentence}`,
    order: 4,
    options: shuffle([
      { id: "correct", label: b0.answer, isCorrect: true },
      ...b0.distractors.map((d, i) => ({ id: `d${i}`, label: d, isCorrect: false })),
    ]),
  });

  // Exercise 5: Matching
  exercises.push({
    type: "matching",
    question: "Associe les mots Lingala avec leur traduction",
    order: 5,
    options: words.slice(0, 3).map((w, i) => ({
      id: `m${i}`,
      left: w.lingala,
      right: w.french,
    })),
  });

  // Exercise 6: Speech
  const speechWord = words[2];
  exercises.push({
    type: "speech",
    question: `Dis à voix haute : **${speechWord.lingala}**`,
    order: 6,
    correctAnswer: speechWord.lingala.toLowerCase(),
  });

  // Exercise 7: Multiple choice reverse (french -> lingala)
  const w3 = words[3];
  const wrongLingala = words
    .filter((_, i) => i !== 3)
    .map((w) => w.lingala);
  exercises.push({
    type: "multiple_choice",
    question: `Comment dit-on **${w3.french}** en Lingala ?`,
    order: 7,
    options: shuffle([
      { id: "correct", label: w3.lingala, isCorrect: true },
      ...wrongLingala.map((w, i) => ({ id: `w${i}`, label: w, isCorrect: false })),
    ]),
  });

  return exercises;
}

function shuffle<T>(array: T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ============================================================
// MAIN SEED FUNCTION
// ============================================================

async function main() {
  console.log("Starting comprehensive Lingala seed...");
  console.log(`Will create ${ALL_UNITS.length} units, ${ALL_UNITS.length * 10} lessons, ${ALL_UNITS.length * 10 * 7} exercises`);

  // 1. Clean up existing data
  console.log("Cleaning existing data...");
  await prisma.userProgress.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.course.deleteMany();

  // 2. Create Course
  const course = await prisma.course.create({
    data: {
      title: "Lingala",
      imageSrc: "/flags/cd.svg",
    },
  });
  console.log(`Created course: ${course.title} (${course.id})`);

  // 3. Create all units, lessons and exercises
  for (let u = 0; u < ALL_UNITS.length; u++) {
    const unitData = ALL_UNITS[u];
    
    const unit = await prisma.unit.create({
      data: {
        courseId: course.id,
        title: unitData.title,
        description: unitData.description,
        order: u + 1,
        color: unitData.color,
      },
    });
    console.log(`  Unit ${u + 1}: ${unit.title}`);

    for (let l = 0; l < unitData.lessons.length; l++) {
      const lessonData = unitData.lessons[l];

      const lesson = await prisma.lesson.create({
        data: {
          unitId: unit.id,
          title: lessonData.title,
          order: l + 1,
          type: "STAR",
        },
      });

      const exercises = generateExercises(lessonData);

      for (const ex of exercises) {
        await prisma.exercise.create({
          data: {
            lessonId: lesson.id,
            type: ex.type,
            question: ex.question,
            order: ex.order,
            options: ex.options || undefined,
            correctAnswer: ex.correctAnswer || undefined,
          },
        });
      }

      console.log(`    Lesson ${l + 1}: ${lessonData.title} (${exercises.length} exercises)`);
    }
  }

  // Summary
  const totalUnits = await prisma.unit.count();
  const totalLessons = await prisma.lesson.count();
  const totalExercises = await prisma.exercise.count();

  console.log("\n=== SEED COMPLETE ===");
  console.log(`Units: ${totalUnits}`);
  console.log(`Lessons: ${totalLessons}`);
  console.log(`Exercises: ${totalExercises}`);
  console.log("====================");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
