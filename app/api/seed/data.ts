// Comprehensive Lingala course seed data
// 10 units × 10 lessons × 7 exercises = 700 exercises

export type VocabItem = { lingala: string; french: string };
export type SentenceItem = { lingala: string; french: string; words: string[] };
export type FillBlankItem = { sentence: string; blank: string; answer: string; distractors: string[] };

export type LessonSeed = {
  title: string;
  vocab: VocabItem[];
  sentences: SentenceItem[];
  fillBlanks: FillBlankItem[];
};

export type UnitSeed = {
  title: string;
  description: string;
  color: string;
  lessons: LessonSeed[];
};

export const UNITS: UnitSeed[] = [
  // ===== UNIT 1: Introduction au Lingala =====
  {
    title: "Introduction au Lingala",
    description: "Les bases : salutations, se presenter, politesse",
    color: "bg-brand-green",
    lessons: [
      {
        title: "Salutations de base",
        vocab: [
          { lingala: "Mbote", french: "Bonjour" },
          { lingala: "Malamu", french: "Bien" },
          { lingala: "Sango nini?", french: "Quoi de neuf?" },
          { lingala: "Tikala malamu", french: "Au revoir" },
        ],
        sentences: [
          { lingala: "Mbote na yo", french: "Bonjour a toi", words: ["Bonjour", "a", "toi", "merci", "bien"] },
          { lingala: "Nazali malamu", french: "Je suis bien", words: ["Je", "suis", "bien", "tu", "mal"] },
        ],
        fillBlanks: [
          { sentence: "Nazali ___", blank: "Nazali ___", answer: "malamu", distractors: ["mbote", "sango"] },
        ],
      },
      {
        title: "Comment ca va?",
        vocab: [
          { lingala: "Ozali malamu?", french: "Ca va?" },
          { lingala: "Ee", french: "Oui" },
          { lingala: "Te", french: "Non" },
          { lingala: "Mwa moke", french: "Un peu" },
        ],
        sentences: [
          { lingala: "Ozali malamu?", french: "Ca va?", words: ["Ca", "va", "?", "bien", "non"] },
          { lingala: "Ee, nazali malamu", french: "Oui, je suis bien", words: ["Oui", "je", "suis", "bien", "non", "mal"] },
        ],
        fillBlanks: [
          { sentence: "___, nazali malamu", blank: "___, nazali malamu", answer: "Ee", distractors: ["Te", "Mbote"] },
        ],
      },
      {
        title: "Se presenter",
        vocab: [
          { lingala: "Kombo na ngai", french: "Mon nom" },
          { lingala: "Nazo benga", french: "Je m'appelle" },
          { lingala: "Ozo benga nani?", french: "Comment t'appelles-tu?" },
          { lingala: "Naye", french: "Lui/Elle" },
        ],
        sentences: [
          { lingala: "Nazo benga Alex", french: "Je m'appelle Alex", words: ["Je", "m'appelle", "Alex", "Tu", "il"] },
          { lingala: "Ozo benga nani?", french: "Comment t'appelles-tu?", words: ["Comment", "t'appelles", "tu", "?", "je", "il"] },
        ],
        fillBlanks: [
          { sentence: "Nazo ___ Maria", blank: "Nazo ___ Maria", answer: "benga", distractors: ["zali", "komi"] },
        ],
      },
      {
        title: "Politesse",
        vocab: [
          { lingala: "Melesi", french: "Merci" },
          { lingala: "Bolimbisi ngai", french: "Pardonne-moi" },
          { lingala: "Nabondeli yo", french: "S'il te plait" },
          { lingala: "Eloko te", french: "De rien" },
        ],
        sentences: [
          { lingala: "Melesi mingi", french: "Merci beaucoup", words: ["Merci", "beaucoup", "pardon", "s'il", "plait"] },
          { lingala: "Bolimbisi ngai", french: "Pardonne-moi", words: ["Pardonne", "moi", "merci", "toi", "lui"] },
        ],
        fillBlanks: [
          { sentence: "Melesi ___", blank: "Melesi ___", answer: "mingi", distractors: ["ngai", "yo"] },
        ],
      },
      {
        title: "Oui et Non",
        vocab: [
          { lingala: "Ee", french: "Oui" },
          { lingala: "Te", french: "Non" },
          { lingala: "Penza", french: "Vraiment" },
          { lingala: "Mbala mosusu", french: "Peut-etre" },
        ],
        sentences: [
          { lingala: "Ee, penza", french: "Oui, vraiment", words: ["Oui", "vraiment", "non", "peut-etre", "merci"] },
          { lingala: "Te, nazali malamu te", french: "Non, je ne suis pas bien", words: ["Non", "je", "ne", "suis", "pas", "bien", "oui"] },
        ],
        fillBlanks: [
          { sentence: "___, penza", blank: "___, penza", answer: "Ee", distractors: ["Te", "Melesi"] },
        ],
      },
      {
        title: "Les pronoms personnels",
        vocab: [
          { lingala: "Ngai", french: "Moi/Je" },
          { lingala: "Yo", french: "Toi/Tu" },
          { lingala: "Ye", french: "Lui/Elle" },
          { lingala: "Biso", french: "Nous" },
        ],
        sentences: [
          { lingala: "Ngai nazali awa", french: "Moi je suis ici", words: ["Moi", "je", "suis", "ici", "toi", "lui"] },
          { lingala: "Yo ozali wapi?", french: "Toi tu es ou?", words: ["Toi", "tu", "es", "ou", "?", "moi", "ici"] },
        ],
        fillBlanks: [
          { sentence: "___ nazali awa", blank: "___ nazali awa", answer: "Ngai", distractors: ["Yo", "Ye"] },
        ],
      },
      {
        title: "Etre: kozala",
        vocab: [
          { lingala: "Nazali", french: "Je suis" },
          { lingala: "Ozali", french: "Tu es" },
          { lingala: "Azali", french: "Il/Elle est" },
          { lingala: "Tozali", french: "Nous sommes" },
        ],
        sentences: [
          { lingala: "Nazali mosali", french: "Je suis un travailleur", words: ["Je", "suis", "un", "travailleur", "tu", "il"] },
          { lingala: "Azali malamu", french: "Il est bien", words: ["Il", "est", "bien", "je", "tu", "mal"] },
        ],
        fillBlanks: [
          { sentence: "___ mosali", blank: "___ mosali", answer: "Nazali", distractors: ["Ozali", "Azali"] },
        ],
      },
      {
        title: "Ou et Ici",
        vocab: [
          { lingala: "Awa", french: "Ici" },
          { lingala: "Kuna", french: "La-bas" },
          { lingala: "Wapi?", french: "Ou?" },
          { lingala: "Penepene", french: "Pres" },
        ],
        sentences: [
          { lingala: "Ozali wapi?", french: "Tu es ou?", words: ["Tu", "es", "ou", "?", "je", "ici"] },
          { lingala: "Nazali awa", french: "Je suis ici", words: ["Je", "suis", "ici", "la-bas", "tu"] },
        ],
        fillBlanks: [
          { sentence: "Nazali ___", blank: "Nazali ___", answer: "awa", distractors: ["kuna", "wapi"] },
        ],
      },
      {
        title: "Bonsoir et Bonne nuit",
        vocab: [
          { lingala: "Mbote ya pokwa", french: "Bonsoir" },
          { lingala: "Butu elamu", french: "Bonne nuit" },
          { lingala: "Lala malamu", french: "Dors bien" },
          { lingala: "Lobi", french: "Demain" },
        ],
        sentences: [
          { lingala: "Butu elamu", french: "Bonne nuit", words: ["Bonne", "nuit", "bonjour", "soir", "merci"] },
          { lingala: "Lala malamu", french: "Dors bien", words: ["Dors", "bien", "bonne", "nuit", "mal"] },
        ],
        fillBlanks: [
          { sentence: "Butu ___", blank: "Butu ___", answer: "elamu", distractors: ["malamu", "mingi"] },
        ],
      },
      {
        title: "Revision: Introduction",
        vocab: [
          { lingala: "Mbote", french: "Bonjour" },
          { lingala: "Melesi", french: "Merci" },
          { lingala: "Tikala malamu", french: "Au revoir" },
          { lingala: "Nazali malamu", french: "Je suis bien" },
        ],
        sentences: [
          { lingala: "Mbote, nazali malamu", french: "Bonjour, je suis bien", words: ["Bonjour", "je", "suis", "bien", "merci", "au revoir"] },
          { lingala: "Melesi, tikala malamu", french: "Merci, au revoir", words: ["Merci", "au", "revoir", "bonjour", "bien", "pardon"] },
        ],
        fillBlanks: [
          { sentence: "Tikala ___", blank: "Tikala ___", answer: "malamu", distractors: ["mbote", "mingi"] },
        ],
      },
    ],
  },

  // ===== UNIT 2: La Famille =====
  {
    title: "La Famille",
    description: "Les membres de la famille et les liens familiaux",
    color: "bg-brand-blue",
    lessons: [
      {
        title: "Papa et Maman",
        vocab: [
          { lingala: "Tata", french: "Papa" },
          { lingala: "Mama", french: "Maman" },
          { lingala: "Libota", french: "Famille" },
          { lingala: "Ndako", french: "Maison" },
        ],
        sentences: [
          { lingala: "Tata azali na ndako", french: "Papa est a la maison", words: ["Papa", "est", "a", "la", "maison", "maman", "ici"] },
          { lingala: "Mama azali malamu", french: "Maman est bien", words: ["Maman", "est", "bien", "papa", "mal", "maison"] },
        ],
        fillBlanks: [
          { sentence: "___ azali na ndako", blank: "___ azali na ndako", answer: "Tata", distractors: ["Mama", "Ndako"] },
        ],
      },
      {
        title: "Freres et soeurs",
        vocab: [
          { lingala: "Ndeko mobali", french: "Frere" },
          { lingala: "Ndeko mwasi", french: "Soeur" },
          { lingala: "Ndeko", french: "Frere/Soeur" },
          { lingala: "Leki", french: "Cadet(te)" },
        ],
        sentences: [
          { lingala: "Ndeko na ngai azali awa", french: "Mon frere est ici", words: ["Mon", "frere", "est", "ici", "soeur", "la-bas"] },
          { lingala: "Leki na ngai azali moke", french: "Mon cadet est petit", words: ["Mon", "cadet", "est", "petit", "grand", "frere"] },
        ],
        fillBlanks: [
          { sentence: "Ndeko ___ azali awa", blank: "Ndeko ___ azali awa", answer: "mobali", distractors: ["mwasi", "moke"] },
        ],
      },
      {
        title: "Grands-parents",
        vocab: [
          { lingala: "Nkoko mobali", french: "Grand-pere" },
          { lingala: "Nkoko mwasi", french: "Grand-mere" },
          { lingala: "Nkoko", french: "Grand-parent" },
          { lingala: "Bokolo", french: "Ancien" },
        ],
        sentences: [
          { lingala: "Nkoko azali na bwanya", french: "Grand-parent a de la sagesse", words: ["Grand-parent", "a", "de", "la", "sagesse", "force", "maison"] },
          { lingala: "Nkoko mwasi azali na ndako", french: "Grand-mere est a la maison", words: ["Grand-mere", "est", "a", "la", "maison", "sagesse", "papa"] },
        ],
        fillBlanks: [
          { sentence: "Nkoko ___ azali na bwanya", blank: "Nkoko ___ azali na bwanya", answer: "mobali", distractors: ["mwasi", "moke"] },
        ],
      },
      {
        title: "Les enfants",
        vocab: [
          { lingala: "Mwana", french: "Enfant" },
          { lingala: "Bana", french: "Enfants" },
          { lingala: "Mwana mobali", french: "Garcon" },
          { lingala: "Mwana mwasi", french: "Fille" },
        ],
        sentences: [
          { lingala: "Bana bazali kosala", french: "Les enfants jouent", words: ["Les", "enfants", "jouent", "mangent", "dorment", "courent"] },
          { lingala: "Mwana azali na ndako", french: "L'enfant est a la maison", words: ["L'enfant", "est", "a", "la", "maison", "ecole", "parc"] },
        ],
        fillBlanks: [
          { sentence: "Mwana ___ azali na kelasi", blank: "Mwana ___ azali na kelasi", answer: "mobali", distractors: ["mwasi", "moke"] },
        ],
      },
      {
        title: "Oncles et tantes",
        vocab: [
          { lingala: "Noko", french: "Oncle maternel" },
          { lingala: "Tata moke", french: "Oncle paternel" },
          { lingala: "Tantine", french: "Tante" },
          { lingala: "Bana ya noko", french: "Cousins" },
        ],
        sentences: [
          { lingala: "Noko azali na mboka", french: "L'oncle est au village", words: ["L'oncle", "est", "au", "village", "maison", "ville", "ecole"] },
          { lingala: "Tantine azali malamu", french: "La tante est bien", words: ["La", "tante", "est", "bien", "mal", "ici", "l'oncle"] },
        ],
        fillBlanks: [
          { sentence: "___ azali na mboka", blank: "___ azali na mboka", answer: "Noko", distractors: ["Tata", "Mama"] },
        ],
      },
      {
        title: "Mon age",
        vocab: [
          { lingala: "Mibu", french: "Ans/Annees" },
          { lingala: "Nazali na mibu", french: "J'ai ... ans" },
          { lingala: "Ozali na mibu boni?", french: "Tu as quel age?" },
          { lingala: "Monene", french: "Grand/Age" },
        ],
        sentences: [
          { lingala: "Nazali na mibu zomi", french: "J'ai dix ans", words: ["J'ai", "dix", "ans", "vingt", "cinq", "tu"] },
          { lingala: "Ozali na mibu boni?", french: "Tu as quel age?", words: ["Tu", "as", "quel", "age", "?", "j'ai", "ans"] },
        ],
        fillBlanks: [
          { sentence: "Nazali na ___ zomi", blank: "Nazali na ___ zomi", answer: "mibu", distractors: ["bana", "ndako"] },
        ],
      },
      {
        title: "La maison familiale",
        vocab: [
          { lingala: "Ndako", french: "Maison" },
          { lingala: "Shambre", french: "Chambre" },
          { lingala: "Cuisine", french: "Cuisine" },
          { lingala: "Libanda", french: "Dehors/Cour" },
        ],
        sentences: [
          { lingala: "Ndako na biso ezali monene", french: "Notre maison est grande", words: ["Notre", "maison", "est", "grande", "petite", "belle", "leur"] },
          { lingala: "Bana bazali na libanda", french: "Les enfants sont dehors", words: ["Les", "enfants", "sont", "dehors", "dedans", "chambre", "cuisine"] },
        ],
        fillBlanks: [
          { sentence: "Bana bazali na ___", blank: "Bana bazali na ___", answer: "libanda", distractors: ["shambre", "cuisine"] },
        ],
      },
      {
        title: "Avoir: kozala na",
        vocab: [
          { lingala: "Nazali na", french: "J'ai" },
          { lingala: "Ozali na", french: "Tu as" },
          { lingala: "Azali na", french: "Il/Elle a" },
          { lingala: "Tozali na", french: "Nous avons" },
        ],
        sentences: [
          { lingala: "Nazali na ndeko mibale", french: "J'ai deux freres", words: ["J'ai", "deux", "freres", "trois", "soeurs", "un"] },
          { lingala: "Azali na bana misato", french: "Il a trois enfants", words: ["Il", "a", "trois", "enfants", "deux", "freres", "elle"] },
        ],
        fillBlanks: [
          { sentence: "___ na ndeko mibale", blank: "___ na ndeko mibale", answer: "Nazali", distractors: ["Ozali", "Azali"] },
        ],
      },
      {
        title: "Decrire sa famille",
        vocab: [
          { lingala: "Monene", french: "Grand(e)" },
          { lingala: "Moke", french: "Petit(e)" },
          { lingala: "Kitoko", french: "Beau/Belle" },
          { lingala: "Makasi", french: "Fort(e)" },
        ],
        sentences: [
          { lingala: "Tata azali makasi", french: "Papa est fort", words: ["Papa", "est", "fort", "grand", "petit", "beau"] },
          { lingala: "Mama azali kitoko", french: "Maman est belle", words: ["Maman", "est", "belle", "forte", "petite", "grande"] },
        ],
        fillBlanks: [
          { sentence: "Mama azali ___", blank: "Mama azali ___", answer: "kitoko", distractors: ["makasi", "moke"] },
        ],
      },
      {
        title: "Revision: La Famille",
        vocab: [
          { lingala: "Libota", french: "Famille" },
          { lingala: "Tata", french: "Papa" },
          { lingala: "Mama", french: "Maman" },
          { lingala: "Ndeko", french: "Frere/Soeur" },
        ],
        sentences: [
          { lingala: "Libota na ngai ezali monene", french: "Ma famille est grande", words: ["Ma", "famille", "est", "grande", "petite", "belle", "ta"] },
          { lingala: "Tozali na bana minei", french: "Nous avons quatre enfants", words: ["Nous", "avons", "quatre", "enfants", "trois", "deux", "ils"] },
        ],
        fillBlanks: [
          { sentence: "Libota na ___ ezali monene", blank: "Libota na ___ ezali monene", answer: "ngai", distractors: ["yo", "ye"] },
        ],
      },
    ],
  },

  // ===== UNIT 3: Les Nombres et le Temps =====
  {
    title: "Les Nombres et le Temps",
    description: "Compter, les jours de la semaine, l'heure",
    color: "bg-brand-yellow",
    lessons: [
      {
        title: "Nombres 1 a 5",
        vocab: [
          { lingala: "Moko", french: "Un" },
          { lingala: "Mibale", french: "Deux" },
          { lingala: "Misato", french: "Trois" },
          { lingala: "Minei", french: "Quatre" },
        ],
        sentences: [
          { lingala: "Nazali na bana mibale", french: "J'ai deux enfants", words: ["J'ai", "deux", "enfants", "trois", "un", "freres"] },
          { lingala: "Bana misato bazali awa", french: "Trois enfants sont ici", words: ["Trois", "enfants", "sont", "ici", "deux", "la-bas"] },
        ],
        fillBlanks: [
          { sentence: "Nazali na bana ___", blank: "Nazali na bana ___", answer: "mibale", distractors: ["misato", "minei"] },
        ],
      },
      {
        title: "Nombres 6 a 10",
        vocab: [
          { lingala: "Mitano", french: "Cinq" },
          { lingala: "Motoba", french: "Six" },
          { lingala: "Nsambo", french: "Sept" },
          { lingala: "Mwambe", french: "Huit" },
        ],
        sentences: [
          { lingala: "Nazali na mibu nsambo", french: "J'ai sept ans", words: ["J'ai", "sept", "ans", "six", "huit", "cinq"] },
          { lingala: "Bato motoba bazali awa", french: "Six personnes sont ici", words: ["Six", "personnes", "sont", "ici", "sept", "huit"] },
        ],
        fillBlanks: [
          { sentence: "Bato ___ bazali awa", blank: "Bato ___ bazali awa", answer: "motoba", distractors: ["nsambo", "mwambe"] },
        ],
      },
      {
        title: "Dizaines et centaines",
        vocab: [
          { lingala: "Zomi", french: "Dix" },
          { lingala: "Ntuku mibale", french: "Vingt" },
          { lingala: "Ntuku misato", french: "Trente" },
          { lingala: "Nkama", french: "Cent" },
        ],
        sentences: [
          { lingala: "Nazali na mibu ntuku mibale", french: "J'ai vingt ans", words: ["J'ai", "vingt", "ans", "trente", "dix", "cent"] },
          { lingala: "Bato nkama bazali na mboka", french: "Cent personnes sont au village", words: ["Cent", "personnes", "sont", "au", "village", "dix", "vingt"] },
        ],
        fillBlanks: [
          { sentence: "Nazali na mibu ___", blank: "Nazali na mibu ___", answer: "zomi", distractors: ["nkama", "ntuku"] },
        ],
      },
      {
        title: "Les jours (Lundi-Mercredi)",
        vocab: [
          { lingala: "Mokolo ya liboso", french: "Lundi" },
          { lingala: "Mokolo ya mibale", french: "Mardi" },
          { lingala: "Mokolo ya misato", french: "Mercredi" },
          { lingala: "Mokolo", french: "Jour" },
        ],
        sentences: [
          { lingala: "Lelo ezali mokolo ya liboso", french: "Aujourd'hui c'est lundi", words: ["Aujourd'hui", "c'est", "lundi", "mardi", "mercredi", "demain"] },
          { lingala: "Lobi ezali mokolo ya mibale", french: "Demain c'est mardi", words: ["Demain", "c'est", "mardi", "lundi", "mercredi", "aujourd'hui"] },
        ],
        fillBlanks: [
          { sentence: "Lelo ezali mokolo ya ___", blank: "Lelo ezali mokolo ya ___", answer: "liboso", distractors: ["mibale", "misato"] },
        ],
      },
      {
        title: "Les jours (Jeudi-Dimanche)",
        vocab: [
          { lingala: "Mokolo ya minei", french: "Jeudi" },
          { lingala: "Mokolo ya mitano", french: "Vendredi" },
          { lingala: "Mposo", french: "Samedi" },
          { lingala: "Eyenga", french: "Dimanche" },
        ],
        sentences: [
          { lingala: "Mposo nazali na ndako", french: "Samedi je suis a la maison", words: ["Samedi", "je", "suis", "a", "la", "maison", "dimanche"] },
          { lingala: "Eyenga tozali na lingomba", french: "Dimanche nous sommes a l'eglise", words: ["Dimanche", "nous", "sommes", "a", "l'eglise", "maison", "samedi"] },
        ],
        fillBlanks: [
          { sentence: "___ tozali na lingomba", blank: "___ tozali na lingomba", answer: "Eyenga", distractors: ["Mposo", "Mokolo"] },
        ],
      },
      {
        title: "L'heure",
        vocab: [
          { lingala: "Ngonga", french: "Heure" },
          { lingala: "Ngonga nini?", french: "Quelle heure?" },
          { lingala: "Ngonga moko", french: "Une heure" },
          { lingala: "Midi", french: "Midi" },
        ],
        sentences: [
          { lingala: "Ezali ngonga nini?", french: "Quelle heure est-il?", words: ["Quelle", "heure", "est-il", "?", "jour", "quand", "ou"] },
          { lingala: "Ezali ngonga motoba", french: "Il est six heures", words: ["Il", "est", "six", "heures", "sept", "cinq", "midi"] },
        ],
        fillBlanks: [
          { sentence: "Ezali ngonga ___", blank: "Ezali ngonga ___", answer: "motoba", distractors: ["moko", "midi"] },
        ],
      },
      {
        title: "Matin et Soir",
        vocab: [
          { lingala: "Ntongo", french: "Matin" },
          { lingala: "Pokwa", french: "Soir" },
          { lingala: "Butu", french: "Nuit" },
          { lingala: "Moyi", french: "Soleil/Journee" },
        ],
        sentences: [
          { lingala: "Na ntongo nazali kosala", french: "Le matin je travaille", words: ["Le", "matin", "je", "travaille", "soir", "nuit", "dors"] },
          { lingala: "Na pokwa nazali kopema", french: "Le soir je me repose", words: ["Le", "soir", "je", "me", "repose", "matin", "travaille"] },
        ],
        fillBlanks: [
          { sentence: "Na ___ nazali kosala", blank: "Na ___ nazali kosala", answer: "ntongo", distractors: ["pokwa", "butu"] },
        ],
      },
      {
        title: "Aujourd'hui et Demain",
        vocab: [
          { lingala: "Lelo", french: "Aujourd'hui" },
          { lingala: "Lobi", french: "Demain/Hier" },
          { lingala: "Kala", french: "Avant/Autrefois" },
          { lingala: "Sik'oyo", french: "Maintenant" },
        ],
        sentences: [
          { lingala: "Lelo nazali na mosala", french: "Aujourd'hui j'ai du travail", words: ["Aujourd'hui", "j'ai", "du", "travail", "demain", "hier", "repos"] },
          { lingala: "Lobi tokozala malamu", french: "Demain nous serons bien", words: ["Demain", "nous", "serons", "bien", "aujourd'hui", "mal", "ici"] },
        ],
        fillBlanks: [
          { sentence: "___ nazali na mosala", blank: "___ nazali na mosala", answer: "Lelo", distractors: ["Lobi", "Kala"] },
        ],
      },
      {
        title: "Les mois",
        vocab: [
          { lingala: "Sanza ya liboso", french: "Janvier" },
          { lingala: "Sanza ya mibale", french: "Fevrier" },
          { lingala: "Sanza", french: "Mois" },
          { lingala: "Mobu", french: "Annee" },
        ],
        sentences: [
          { lingala: "Tozali na sanza ya misato", french: "Nous sommes en mars", words: ["Nous", "sommes", "en", "mars", "janvier", "fevrier", "avril"] },
          { lingala: "Mobu oyo ezali malamu", french: "Cette annee est bonne", words: ["Cette", "annee", "est", "bonne", "mois", "mauvaise", "prochaine"] },
        ],
        fillBlanks: [
          { sentence: "Tozali na ___ ya misato", blank: "Tozali na ___ ya misato", answer: "sanza", distractors: ["mobu", "mokolo"] },
        ],
      },
      {
        title: "Revision: Nombres et Temps",
        vocab: [
          { lingala: "Moko", french: "Un" },
          { lingala: "Zomi", french: "Dix" },
          { lingala: "Lelo", french: "Aujourd'hui" },
          { lingala: "Ngonga", french: "Heure" },
        ],
        sentences: [
          { lingala: "Lelo ezali mokolo ya mitano", french: "Aujourd'hui c'est vendredi", words: ["Aujourd'hui", "c'est", "vendredi", "lundi", "samedi", "dimanche"] },
          { lingala: "Ezali ngonga zomi", french: "Il est dix heures", words: ["Il", "est", "dix", "heures", "cinq", "midi", "une"] },
        ],
        fillBlanks: [
          { sentence: "Ezali ___ zomi", blank: "Ezali ___ zomi", answer: "ngonga", distractors: ["mokolo", "sanza"] },
        ],
      },
    ],
  },

  // ===== UNIT 4: La Nourriture et les Boissons =====
  {
    title: "La Nourriture et les Boissons",
    description: "Commander, cuisine, vocabulaire alimentaire",
    color: "bg-brand-red",
    lessons: [
      {
        title: "Les aliments de base",
        vocab: [
          { lingala: "Bilei", french: "Nourriture" },
          { lingala: "Loso", french: "Riz" },
          { lingala: "Pondu", french: "Feuilles de manioc" },
          { lingala: "Lituma", french: "Banane plantain" },
        ],
        sentences: [
          { lingala: "Nalingi kolya loso", french: "Je veux manger du riz", words: ["Je", "veux", "manger", "du", "riz", "pain", "poisson"] },
          { lingala: "Pondu ezali bilei ya malamu", french: "Le pondu est un bon repas", words: ["Le", "pondu", "est", "un", "bon", "repas", "riz", "mauvais"] },
        ],
        fillBlanks: [
          { sentence: "Nalingi kolya ___", blank: "Nalingi kolya ___", answer: "loso", distractors: ["pondu", "mai"] },
        ],
      },
      {
        title: "Les fruits",
        vocab: [
          { lingala: "Mbuma", french: "Fruit" },
          { lingala: "Likemba", french: "Banane" },
          { lingala: "Manga", french: "Mangue" },
          { lingala: "Liala", french: "Orange" },
        ],
        sentences: [
          { lingala: "Nalingi kolya manga", french: "Je veux manger une mangue", words: ["Je", "veux", "manger", "une", "mangue", "banane", "orange"] },
          { lingala: "Mbuma ezali malamu", french: "Le fruit est bon", words: ["Le", "fruit", "est", "bon", "mauvais", "riz", "grand"] },
        ],
        fillBlanks: [
          { sentence: "Nalingi kolya ___", blank: "Nalingi kolya ___", answer: "manga", distractors: ["likemba", "loso"] },
        ],
      },
      {
        title: "Les boissons",
        vocab: [
          { lingala: "Mai", french: "Eau" },
          { lingala: "Masanga", french: "Boisson/Alcool" },
          { lingala: "Kafé", french: "Cafe" },
          { lingala: "Miliki", french: "Lait" },
        ],
        sentences: [
          { lingala: "Nalingi komela mai", french: "Je veux boire de l'eau", words: ["Je", "veux", "boire", "de", "l'eau", "cafe", "lait"] },
          { lingala: "Pesa ngai kafé", french: "Donne-moi du cafe", words: ["Donne", "moi", "du", "cafe", "eau", "lait", "jus"] },
        ],
        fillBlanks: [
          { sentence: "Nalingi komela ___", blank: "Nalingi komela ___", answer: "mai", distractors: ["kafé", "masanga"] },
        ],
      },
      {
        title: "Au restaurant",
        vocab: [
          { lingala: "Esika ya kolya", french: "Restaurant" },
          { lingala: "Pesa ngai", french: "Donne-moi" },
          { lingala: "Nzala", french: "Faim" },
          { lingala: "Mposa ya mai", french: "Soif" },
        ],
        sentences: [
          { lingala: "Nazali na nzala", french: "J'ai faim", words: ["J'ai", "faim", "soif", "sommeil", "froid", "chaud"] },
          { lingala: "Pesa ngai bilei", french: "Donne-moi a manger", words: ["Donne", "moi", "a", "manger", "boire", "dormir", "voir"] },
        ],
        fillBlanks: [
          { sentence: "Nazali na ___", blank: "Nazali na ___", answer: "nzala", distractors: ["mposa", "bilei"] },
        ],
      },
      {
        title: "Le poisson et la viande",
        vocab: [
          { lingala: "Mbisi", french: "Poisson" },
          { lingala: "Nyama", french: "Viande" },
          { lingala: "Nsoso", french: "Poulet" },
          { lingala: "Ngulu", french: "Porc" },
        ],
        sentences: [
          { lingala: "Nalingi kolya mbisi", french: "Je veux manger du poisson", words: ["Je", "veux", "manger", "du", "poisson", "poulet", "viande"] },
          { lingala: "Nsoso ezali na moto", french: "Le poulet est au feu", words: ["Le", "poulet", "est", "au", "feu", "poisson", "table"] },
        ],
        fillBlanks: [
          { sentence: "Nalingi kolya ___", blank: "Nalingi kolya ___", answer: "mbisi", distractors: ["nsoso", "ngulu"] },
        ],
      },
      {
        title: "Gouts et saveurs",
        vocab: [
          { lingala: "Elengi", french: "Delicieux" },
          { lingala: "Bololo", french: "Amer" },
          { lingala: "Sukali", french: "Sucre" },
          { lingala: "Mungwa", french: "Sel" },
        ],
        sentences: [
          { lingala: "Bilei ezali elengi", french: "La nourriture est delicieuse", words: ["La", "nourriture", "est", "delicieuse", "amere", "salee", "bonne"] },
          { lingala: "Tia mungwa", french: "Mets du sel", words: ["Mets", "du", "sel", "sucre", "poivre", "eau"] },
        ],
        fillBlanks: [
          { sentence: "Bilei ezali ___", blank: "Bilei ezali ___", answer: "elengi", distractors: ["bololo", "mungwa"] },
        ],
      },
      {
        title: "Les legumes",
        vocab: [
          { lingala: "Ndunda", french: "Legume" },
          { lingala: "Makemba", french: "Bananes plantain" },
          { lingala: "Mbika", french: "Graines de courge" },
          { lingala: "Tomate", french: "Tomate" },
        ],
        sentences: [
          { lingala: "Nalingi ndunda", french: "J'aime les legumes", words: ["J'aime", "les", "legumes", "fruits", "viande", "poisson"] },
          { lingala: "Tia tomate na bilei", french: "Mets la tomate dans le repas", words: ["Mets", "la", "tomate", "dans", "le", "repas", "sel", "eau"] },
        ],
        fillBlanks: [
          { sentence: "Nalingi ___", blank: "Nalingi ___", answer: "ndunda", distractors: ["mbika", "tomate"] },
        ],
      },
      {
        title: "Cuisiner",
        vocab: [
          { lingala: "Kolamba", french: "Cuisiner" },
          { lingala: "Moto", french: "Feu" },
          { lingala: "Nzungu", french: "Marmite" },
          { lingala: "Mesa", french: "Table" },
        ],
        sentences: [
          { lingala: "Mama azali kolamba", french: "Maman cuisine", words: ["Maman", "cuisine", "mange", "dort", "parle", "boit"] },
          { lingala: "Tia nzungu na moto", french: "Mets la marmite au feu", words: ["Mets", "la", "marmite", "au", "feu", "table", "eau"] },
        ],
        fillBlanks: [
          { sentence: "Mama azali ___", blank: "Mama azali ___", answer: "kolamba", distractors: ["kolya", "komela"] },
        ],
      },
      {
        title: "Commander a manger",
        vocab: [
          { lingala: "Nalingi", french: "Je veux" },
          { lingala: "Boni?", french: "Combien?" },
          { lingala: "Ntalo", french: "Prix" },
          { lingala: "Mbongo", french: "Argent" },
        ],
        sentences: [
          { lingala: "Ntalo ya loso ezali boni?", french: "Combien coute le riz?", words: ["Combien", "coute", "le", "riz", "?", "pain", "poisson"] },
          { lingala: "Nazali na mbongo te", french: "Je n'ai pas d'argent", words: ["Je", "n'ai", "pas", "d'argent", "de", "faim", "soif"] },
        ],
        fillBlanks: [
          { sentence: "___ ya loso ezali boni?", blank: "___ ya loso ezali boni?", answer: "Ntalo", distractors: ["Mbongo", "Bilei"] },
        ],
      },
      {
        title: "Revision: Nourriture",
        vocab: [
          { lingala: "Bilei", french: "Nourriture" },
          { lingala: "Mai", french: "Eau" },
          { lingala: "Nzala", french: "Faim" },
          { lingala: "Elengi", french: "Delicieux" },
        ],
        sentences: [
          { lingala: "Nazali na nzala, pesa ngai bilei", french: "J'ai faim, donne-moi a manger", words: ["J'ai", "faim", "donne", "moi", "a", "manger", "soif", "boire"] },
          { lingala: "Mai ezali malamu", french: "L'eau est bonne", words: ["L'eau", "est", "bonne", "le", "riz", "mauvaise", "froide"] },
        ],
        fillBlanks: [
          { sentence: "Nazali na ___, pesa ngai bilei", blank: "Nazali na ___, pesa ngai bilei", answer: "nzala", distractors: ["mposa", "mai"] },
        ],
      },
    ],
  },

  // ===== UNIT 5: Le Corps et la Sante =====
  {
    title: "Le Corps et la Sante",
    description: "Parties du corps, aller chez le medecin, la sante",
    color: "bg-brand-green",
    lessons: [
      {
        title: "La tete et le visage",
        vocab: [
          { lingala: "Motu", french: "Tete" },
          { lingala: "Miso", french: "Yeux" },
          { lingala: "Monoko", french: "Bouche" },
          { lingala: "Matoi", french: "Oreilles" },
        ],
        sentences: [
          { lingala: "Miso na ngai ezali malamu", french: "Mes yeux vont bien", words: ["Mes", "yeux", "vont", "bien", "mal", "oreilles", "bouche"] },
          { lingala: "Fungola monoko", french: "Ouvre la bouche", words: ["Ouvre", "la", "bouche", "ferme", "yeux", "oreilles"] },
        ],
        fillBlanks: [
          { sentence: "___ na ngai ezali malamu", blank: "___ na ngai ezali malamu", answer: "Miso", distractors: ["Monoko", "Matoi"] },
        ],
      },
      {
        title: "Le corps",
        vocab: [
          { lingala: "Nzoto", french: "Corps" },
          { lingala: "Loboko", french: "Main/Bras" },
          { lingala: "Lokolo", french: "Pied/Jambe" },
          { lingala: "Motema", french: "Coeur" },
        ],
        sentences: [
          { lingala: "Nzoto na ngai ezali malamu", french: "Mon corps va bien", words: ["Mon", "corps", "va", "bien", "mal", "main", "tete"] },
          { lingala: "Loboko na ngai ezali kopela", french: "Ma main me fait mal", words: ["Ma", "main", "me", "fait", "mal", "bien", "pied"] },
        ],
        fillBlanks: [
          { sentence: "___ na ngai ezali kopela", blank: "___ na ngai ezali kopela", answer: "Loboko", distractors: ["Lokolo", "Motema"] },
        ],
      },
      {
        title: "Etre malade",
        vocab: [
          { lingala: "Maladi", french: "Maladie" },
          { lingala: "Nazali malade", french: "Je suis malade" },
          { lingala: "Pasi", french: "Douleur" },
          { lingala: "Fievre", french: "Fievre" },
        ],
        sentences: [
          { lingala: "Nazali malade", french: "Je suis malade", words: ["Je", "suis", "malade", "bien", "fort", "fatigue"] },
          { lingala: "Nazali na pasi ya motu", french: "J'ai mal a la tete", words: ["J'ai", "mal", "a", "la", "tete", "main", "ventre"] },
        ],
        fillBlanks: [
          { sentence: "Nazali na ___ ya motu", blank: "Nazali na ___ ya motu", answer: "pasi", distractors: ["maladi", "fievre"] },
        ],
      },
      {
        title: "Chez le medecin",
        vocab: [
          { lingala: "Monganga", french: "Medecin" },
          { lingala: "Lopitalo", french: "Hopital" },
          { lingala: "Nkisi", french: "Medicament" },
          { lingala: "Kobikisa", french: "Guerir" },
        ],
        sentences: [
          { lingala: "Nazali kokende na lopitalo", french: "Je vais a l'hopital", words: ["Je", "vais", "a", "l'hopital", "maison", "ecole", "marche"] },
          { lingala: "Monganga apesi ngai nkisi", french: "Le medecin m'a donne un medicament", words: ["Le", "medecin", "m'a", "donne", "un", "medicament", "hopital", "guerison"] },
        ],
        fillBlanks: [
          { sentence: "___ apesi ngai nkisi", blank: "___ apesi ngai nkisi", answer: "Monganga", distractors: ["Lopitalo", "Maladi"] },
        ],
      },
      {
        title: "Les emotions physiques",
        vocab: [
          { lingala: "Kolela", french: "Pleurer" },
          { lingala: "Koseka", french: "Rire" },
          { lingala: "Kolala", french: "Dormir" },
          { lingala: "Kolamuka", french: "Se reveiller" },
        ],
        sentences: [
          { lingala: "Mwana azali kolela", french: "L'enfant pleure", words: ["L'enfant", "pleure", "rit", "dort", "mange", "joue"] },
          { lingala: "Nazali na mposa ya kolala", french: "J'ai envie de dormir", words: ["J'ai", "envie", "de", "dormir", "manger", "rire", "pleurer"] },
        ],
        fillBlanks: [
          { sentence: "Mwana azali ___", blank: "Mwana azali ___", answer: "kolela", distractors: ["koseka", "kolala"] },
        ],
      },
      {
        title: "L'hygiene",
        vocab: [
          { lingala: "Kosukola", french: "Se laver" },
          { lingala: "Sapone", french: "Savon" },
          { lingala: "Mai", french: "Eau" },
          { lingala: "Proprete", french: "Proprete" },
        ],
        sentences: [
          { lingala: "Nazali kosukola maboko", french: "Je me lave les mains", words: ["Je", "me", "lave", "les", "mains", "pieds", "visage"] },
          { lingala: "Pesa ngai sapone", french: "Donne-moi le savon", words: ["Donne", "moi", "le", "savon", "eau", "serviette", "brosse"] },
        ],
        fillBlanks: [
          { sentence: "Nazali ___ maboko", blank: "Nazali ___ maboko", answer: "kosukola", distractors: ["kolya", "komela"] },
        ],
      },
      {
        title: "Fatigue et repos",
        vocab: [
          { lingala: "Bolembe", french: "Fatigue" },
          { lingala: "Kopema", french: "Se reposer" },
          { lingala: "Molunge", french: "Chaleur" },
          { lingala: "Malili", french: "Froid" },
        ],
        sentences: [
          { lingala: "Nazali na bolembe", french: "Je suis fatigue", words: ["Je", "suis", "fatigue", "malade", "bien", "fort"] },
          { lingala: "Nazali kopema", french: "Je me repose", words: ["Je", "me", "repose", "travaille", "mange", "dors"] },
        ],
        fillBlanks: [
          { sentence: "Nazali na ___", blank: "Nazali na ___", answer: "bolembe", distractors: ["molunge", "malili"] },
        ],
      },
      {
        title: "Les sens",
        vocab: [
          { lingala: "Komona", french: "Voir" },
          { lingala: "Koyoka", french: "Entendre" },
          { lingala: "Kosimba", french: "Toucher" },
          { lingala: "Koyoka nsolo", french: "Sentir" },
        ],
        sentences: [
          { lingala: "Nazali komona yo", french: "Je te vois", words: ["Je", "te", "vois", "entends", "touche", "sens"] },
          { lingala: "Nazali koyoka musique", french: "J'entends de la musique", words: ["J'entends", "de", "la", "musique", "vois", "touche", "bruit"] },
        ],
        fillBlanks: [
          { sentence: "Nazali ___ yo", blank: "Nazali ___ yo", answer: "komona", distractors: ["koyoka", "kosimba"] },
        ],
      },
      {
        title: "Sport et exercice",
        vocab: [
          { lingala: "Masano", french: "Sport" },
          { lingala: "Kopota", french: "Courir" },
          { lingala: "Kobeta bale", french: "Jouer au ballon" },
          { lingala: "Makasi", french: "Force" },
        ],
        sentences: [
          { lingala: "Nazali kopota", french: "Je cours", words: ["Je", "cours", "marche", "dors", "mange", "joue"] },
          { lingala: "Masano epesaka makasi", french: "Le sport donne de la force", words: ["Le", "sport", "donne", "de", "la", "force", "fatigue", "faim"] },
        ],
        fillBlanks: [
          { sentence: "Nazali ___", blank: "Nazali ___", answer: "kopota", distractors: ["kobeta", "kolala"] },
        ],
      },
      {
        title: "Revision: Corps et Sante",
        vocab: [
          { lingala: "Nzoto", french: "Corps" },
          { lingala: "Monganga", french: "Medecin" },
          { lingala: "Maladi", french: "Maladie" },
          { lingala: "Kopema", french: "Se reposer" },
        ],
        sentences: [
          { lingala: "Nzoto na ngai ezali malamu", french: "Mon corps va bien", words: ["Mon", "corps", "va", "bien", "mal", "medecin", "malade"] },
          { lingala: "Kende na monganga", french: "Va chez le medecin", words: ["Va", "chez", "le", "medecin", "maison", "hopital", "ecole"] },
        ],
        fillBlanks: [
          { sentence: "Kende na ___", blank: "Kende na ___", answer: "monganga", distractors: ["lopitalo", "nkisi"] },
        ],
      },
    ],
  },

  // ===== UNIT 6: Les Deplacements =====
  {
    title: "Les Deplacements et Directions",
    description: "Transport, directions, se deplacer en ville",
    color: "bg-brand-blue",
    lessons: [
      {
        title: "Les moyens de transport",
        vocab: [
          { lingala: "Motuka", french: "Voiture" },
          { lingala: "Bisi", french: "Bus" },
          { lingala: "Pikipiki", french: "Moto" },
          { lingala: "Masuwa", french: "Bateau" },
        ],
        sentences: [
          { lingala: "Nazali kokende na motuka", french: "Je vais en voiture", words: ["Je", "vais", "en", "voiture", "bus", "moto", "pied"] },
          { lingala: "Bisi ezali koya", french: "Le bus arrive", words: ["Le", "bus", "arrive", "part", "voiture", "moto", "bateau"] },
        ],
        fillBlanks: [
          { sentence: "Nazali kokende na ___", blank: "Nazali kokende na ___", answer: "motuka", distractors: ["bisi", "pikipiki"] },
        ],
      },
      {
        title: "Les directions",
        vocab: [
          { lingala: "Loboko ya mobali", french: "A droite" },
          { lingala: "Loboko ya mwasi", french: "A gauche" },
          { lingala: "Liboso", french: "Devant" },
          { lingala: "Nsima", french: "Derriere" },
        ],
        sentences: [
          { lingala: "Baluka na loboko ya mobali", french: "Tourne a droite", words: ["Tourne", "a", "droite", "gauche", "devant", "derriere"] },
          { lingala: "Kende liboso", french: "Va devant", words: ["Va", "devant", "derriere", "droite", "gauche", "ici"] },
        ],
        fillBlanks: [
          { sentence: "Baluka na loboko ya ___", blank: "Baluka na loboko ya ___", answer: "mobali", distractors: ["mwasi", "liboso"] },
        ],
      },
      {
        title: "En ville",
        vocab: [
          { lingala: "Engumba", french: "Ville" },
          { lingala: "Nzela", french: "Route/Chemin" },
          { lingala: "Zando", french: "Marche" },
          { lingala: "Lingomba", french: "Eglise" },
        ],
        sentences: [
          { lingala: "Nazali kokende na zando", french: "Je vais au marche", words: ["Je", "vais", "au", "marche", "ville", "eglise", "maison"] },
          { lingala: "Nzela ezali mosika", french: "La route est longue", words: ["La", "route", "est", "longue", "courte", "belle", "ville"] },
        ],
        fillBlanks: [
          { sentence: "Nazali kokende na ___", blank: "Nazali kokende na ___", answer: "zando", distractors: ["lingomba", "engumba"] },
        ],
      },
      {
        title: "Demander son chemin",
        vocab: [
          { lingala: "Wapi?", french: "Ou?" },
          { lingala: "Ndenge nini?", french: "Comment?" },
          { lingala: "Mosika", french: "Loin" },
          { lingala: "Penepene", french: "Pres" },
        ],
        sentences: [
          { lingala: "Zando ezali wapi?", french: "Ou est le marche?", words: ["Ou", "est", "le", "marche", "?", "ville", "comment"] },
          { lingala: "Ezali mosika te", french: "Ce n'est pas loin", words: ["Ce", "n'est", "pas", "loin", "pres", "ici", "la-bas"] },
        ],
        fillBlanks: [
          { sentence: "Zando ezali ___?", blank: "Zando ezali ___?", answer: "wapi", distractors: ["mosika", "penepene"] },
        ],
      },
      {
        title: "Aller et Venir",
        vocab: [
          { lingala: "Kokende", french: "Aller" },
          { lingala: "Koya", french: "Venir" },
          { lingala: "Kozonga", french: "Revenir" },
          { lingala: "Kotambola", french: "Marcher" },
        ],
        sentences: [
          { lingala: "Nazali kokende na ndako", french: "Je vais a la maison", words: ["Je", "vais", "a", "la", "maison", "ecole", "marche"] },
          { lingala: "Yaka awa", french: "Viens ici", words: ["Viens", "ici", "la-bas", "va", "reviens", "marche"] },
        ],
        fillBlanks: [
          { sentence: "Nazali ___ na ndako", blank: "Nazali ___ na ndako", answer: "kokende", distractors: ["koya", "kozonga"] },
        ],
      },
      {
        title: "Le village",
        vocab: [
          { lingala: "Mboka", french: "Village/Pays" },
          { lingala: "Elanga", french: "Champ" },
          { lingala: "Ebale", french: "Riviere" },
          { lingala: "Zamba", french: "Foret" },
        ],
        sentences: [
          { lingala: "Mboka na ngai ezali kitoko", french: "Mon village est beau", words: ["Mon", "village", "est", "beau", "grand", "petit", "loin"] },
          { lingala: "Ebale ezali penepene", french: "La riviere est pres", words: ["La", "riviere", "est", "pres", "loin", "grande", "belle"] },
        ],
        fillBlanks: [
          { sentence: "___ na ngai ezali kitoko", blank: "___ na ngai ezali kitoko", answer: "Mboka", distractors: ["Elanga", "Ebale"] },
        ],
      },
      {
        title: "Voyager",
        vocab: [
          { lingala: "Mobembo", french: "Voyage" },
          { lingala: "Mpika", french: "Valise" },
          { lingala: "Likaya", french: "Billet" },
          { lingala: "Gare", french: "Gare" },
        ],
        sentences: [
          { lingala: "Nazali na mobembo", french: "Je suis en voyage", words: ["Je", "suis", "en", "voyage", "maison", "vacances", "travail"] },
          { lingala: "Bomba mpika na yo", french: "Garde ta valise", words: ["Garde", "ta", "valise", "billet", "maison", "argent"] },
        ],
        fillBlanks: [
          { sentence: "Nazali na ___", blank: "Nazali na ___", answer: "mobembo", distractors: ["mpika", "likaya"] },
        ],
      },
      {
        title: "Au marche",
        vocab: [
          { lingala: "Kosomba", french: "Acheter" },
          { lingala: "Koteka", french: "Vendre" },
          { lingala: "Mbongo", french: "Argent" },
          { lingala: "Ntalo", french: "Prix" },
        ],
        sentences: [
          { lingala: "Nalingi kosomba mbisi", french: "Je veux acheter du poisson", words: ["Je", "veux", "acheter", "du", "poisson", "vendre", "viande"] },
          { lingala: "Ntalo ezali boni?", french: "Quel est le prix?", words: ["Quel", "est", "le", "prix", "?", "argent", "combien"] },
        ],
        fillBlanks: [
          { sentence: "Nalingi ___ mbisi", blank: "Nalingi ___ mbisi", answer: "kosomba", distractors: ["koteka", "kolya"] },
        ],
      },
      {
        title: "L'ecole",
        vocab: [
          { lingala: "Kelasi", french: "Ecole" },
          { lingala: "Molakisi", french: "Enseignant" },
          { lingala: "Koyekola", french: "Apprendre" },
          { lingala: "Buku", french: "Livre" },
        ],
        sentences: [
          { lingala: "Nazali kokende na kelasi", french: "Je vais a l'ecole", words: ["Je", "vais", "a", "l'ecole", "maison", "marche", "travail"] },
          { lingala: "Molakisi azali kolakisa", french: "L'enseignant enseigne", words: ["L'enseignant", "enseigne", "apprend", "mange", "dort", "parle"] },
        ],
        fillBlanks: [
          { sentence: "Nazali kokende na ___", blank: "Nazali kokende na ___", answer: "kelasi", distractors: ["zando", "ndako"] },
        ],
      },
      {
        title: "Revision: Deplacements",
        vocab: [
          { lingala: "Motuka", french: "Voiture" },
          { lingala: "Nzela", french: "Route" },
          { lingala: "Kokende", french: "Aller" },
          { lingala: "Wapi?", french: "Ou?" },
        ],
        sentences: [
          { lingala: "Ozali kokende wapi?", french: "Ou vas-tu?", words: ["Ou", "vas", "tu", "?", "je", "il", "nous"] },
          { lingala: "Nazali kokende na motuka", french: "Je vais en voiture", words: ["Je", "vais", "en", "voiture", "bus", "pied", "moto"] },
        ],
        fillBlanks: [
          { sentence: "Ozali kokende ___?", blank: "Ozali kokende ___?", answer: "wapi", distractors: ["nzela", "motuka"] },
        ],
      },
    ],
  },

  // ===== UNIT 7: Les Animaux et la Nature =====
  {
    title: "Les Animaux et la Nature",
    description: "Faune, flore, environnement naturel",
    color: "bg-brand-yellow",
    lessons: [
      {
        title: "Animaux domestiques",
        vocab: [
          { lingala: "Mbwa", french: "Chien" },
          { lingala: "Nyau", french: "Chat" },
          { lingala: "Nsoso", french: "Poule" },
          { lingala: "Ntaba", french: "Chevre" },
        ],
        sentences: [
          { lingala: "Mbwa azali na ndako", french: "Le chien est a la maison", words: ["Le", "chien", "est", "a", "la", "maison", "chat", "dehors"] },
          { lingala: "Nyau azali kolya", french: "Le chat mange", words: ["Le", "chat", "mange", "dort", "chien", "joue", "court"] },
        ],
        fillBlanks: [
          { sentence: "___ azali na ndako", blank: "___ azali na ndako", answer: "Mbwa", distractors: ["Nyau", "Nsoso"] },
        ],
      },
      {
        title: "Animaux sauvages",
        vocab: [
          { lingala: "Nzoko", french: "Elephant" },
          { lingala: "Nkoi", french: "Leopard" },
          { lingala: "Nyoka", french: "Serpent" },
          { lingala: "Ngando", french: "Crocodile" },
        ],
        sentences: [
          { lingala: "Nzoko azali monene", french: "L'elephant est grand", words: ["L'elephant", "est", "grand", "petit", "rapide", "le", "leopard"] },
          { lingala: "Nkoi azali na zamba", french: "Le leopard est dans la foret", words: ["Le", "leopard", "est", "dans", "la", "foret", "elephant", "riviere"] },
        ],
        fillBlanks: [
          { sentence: "___ azali monene", blank: "___ azali monene", answer: "Nzoko", distractors: ["Nkoi", "Nyoka"] },
        ],
      },
      {
        title: "Les oiseaux",
        vocab: [
          { lingala: "Ndeke", french: "Oiseau" },
          { lingala: "Nkoko", french: "Perroquet" },
          { lingala: "Kanga", french: "Pintade" },
          { lingala: "Kopumbwa", french: "Voler" },
        ],
        sentences: [
          { lingala: "Ndeke azali kopumbwa", french: "L'oiseau vole", words: ["L'oiseau", "vole", "mange", "dort", "chante", "nage"] },
          { lingala: "Nkoko azali koloba", french: "Le perroquet parle", words: ["Le", "perroquet", "parle", "vole", "oiseau", "chante"] },
        ],
        fillBlanks: [
          { sentence: "Ndeke azali ___", blank: "Ndeke azali ___", answer: "kopumbwa", distractors: ["koloba", "kolya"] },
        ],
      },
      {
        title: "Les insectes",
        vocab: [
          { lingala: "Nzinzi", french: "Mouche" },
          { lingala: "Ngungi", french: "Moustique" },
          { lingala: "Mfuki", french: "Abeille" },
          { lingala: "Nkusu", french: "Fourmi" },
        ],
        sentences: [
          { lingala: "Ngungi ezali koluka ngai", french: "Le moustique me cherche", words: ["Le", "moustique", "me", "cherche", "pique", "mouche", "abeille"] },
          { lingala: "Nkusu ezali mosala mingi", french: "La fourmi travaille beaucoup", words: ["La", "fourmi", "travaille", "beaucoup", "peu", "moustique", "dort"] },
        ],
        fillBlanks: [
          { sentence: "___ ezali koluka ngai", blank: "___ ezali koluka ngai", answer: "Ngungi", distractors: ["Nzinzi", "Mfuki"] },
        ],
      },
      {
        title: "Les arbres et plantes",
        vocab: [
          { lingala: "Nzete", french: "Arbre" },
          { lingala: "Fololo", french: "Fleur" },
          { lingala: "Nkasa", french: "Feuille" },
          { lingala: "Mosisa", french: "Racine" },
        ],
        sentences: [
          { lingala: "Nzete ezali monene", french: "L'arbre est grand", words: ["L'arbre", "est", "grand", "petit", "beau", "la", "fleur"] },
          { lingala: "Fololo ezali kitoko", french: "La fleur est belle", words: ["La", "fleur", "est", "belle", "grande", "l'arbre", "verte"] },
        ],
        fillBlanks: [
          { sentence: "___ ezali monene", blank: "___ ezali monene", answer: "Nzete", distractors: ["Fololo", "Nkasa"] },
        ],
      },
      {
        title: "La meteo",
        vocab: [
          { lingala: "Mbula", french: "Pluie" },
          { lingala: "Moyi", french: "Soleil" },
          { lingala: "Mipepe", french: "Vent" },
          { lingala: "Mapata", french: "Nuages" },
        ],
        sentences: [
          { lingala: "Mbula ezali konoka", french: "Il pleut", words: ["Il", "pleut", "fait", "beau", "chaud", "froid", "du vent"] },
          { lingala: "Moyi ezali makasi", french: "Le soleil est fort", words: ["Le", "soleil", "est", "fort", "la", "pluie", "faible"] },
        ],
        fillBlanks: [
          { sentence: "___ ezali konoka", blank: "___ ezali konoka", answer: "Mbula", distractors: ["Moyi", "Mipepe"] },
        ],
      },
      {
        title: "L'eau et la riviere",
        vocab: [
          { lingala: "Ebale", french: "Riviere/Fleuve" },
          { lingala: "Mai", french: "Eau" },
          { lingala: "Mbisi", french: "Poisson" },
          { lingala: "Koloba", french: "Nager" },
        ],
        sentences: [
          { lingala: "Ebale ezali monene", french: "La riviere est grande", words: ["La", "riviere", "est", "grande", "petite", "belle", "mer"] },
          { lingala: "Mbisi ezali na ebale", french: "Le poisson est dans la riviere", words: ["Le", "poisson", "est", "dans", "la", "riviere", "mer", "lac"] },
        ],
        fillBlanks: [
          { sentence: "Mbisi ezali na ___", blank: "Mbisi ezali na ___", answer: "ebale", distractors: ["zamba", "elanga"] },
        ],
      },
      {
        title: "La foret",
        vocab: [
          { lingala: "Zamba", french: "Foret" },
          { lingala: "Nyama", french: "Animal" },
          { lingala: "Molili", french: "Obscurite" },
          { lingala: "Mwinda", french: "Lumiere" },
        ],
        sentences: [
          { lingala: "Zamba ezali monene", french: "La foret est grande", words: ["La", "foret", "est", "grande", "petite", "belle", "sombre"] },
          { lingala: "Nyama ezali na zamba", french: "Les animaux sont dans la foret", words: ["Les", "animaux", "sont", "dans", "la", "foret", "ville", "maison"] },
        ],
        fillBlanks: [
          { sentence: "Nyama ezali na ___", blank: "Nyama ezali na ___", answer: "zamba", distractors: ["ebale", "engumba"] },
        ],
      },
      {
        title: "Proteger la nature",
        vocab: [
          { lingala: "Kobatela", french: "Proteger" },
          { lingala: "Bosoto", french: "Salete" },
          { lingala: "Peto", french: "Propre" },
          { lingala: "Mabele", french: "Terre" },
        ],
        sentences: [
          { lingala: "Tobatela zamba", french: "Protegeons la foret", words: ["Protegeons", "la", "foret", "riviere", "detruisons", "coupons"] },
          { lingala: "Mabele ezali ya biso", french: "La terre est a nous", words: ["La", "terre", "est", "a", "nous", "eux", "lui", "foret"] },
        ],
        fillBlanks: [
          { sentence: "To___ zamba", blank: "To___ zamba", answer: "batela", distractors: ["kende", "lamba"] },
        ],
      },
      {
        title: "Revision: Nature",
        vocab: [
          { lingala: "Nyama", french: "Animal" },
          { lingala: "Nzete", french: "Arbre" },
          { lingala: "Mbula", french: "Pluie" },
          { lingala: "Ebale", french: "Riviere" },
        ],
        sentences: [
          { lingala: "Mbula ezali konoka na zamba", french: "Il pleut dans la foret", words: ["Il", "pleut", "dans", "la", "foret", "ville", "riviere"] },
          { lingala: "Nyama mingi ezali na zamba", french: "Beaucoup d'animaux sont dans la foret", words: ["Beaucoup", "d'animaux", "sont", "dans", "la", "foret", "peu", "ville"] },
        ],
        fillBlanks: [
          { sentence: "___ ezali konoka na zamba", blank: "___ ezali konoka na zamba", answer: "Mbula", distractors: ["Moyi", "Mipepe"] },
        ],
      },
    ],
  },

  // ===== UNIT 8: Le Travail et les Metiers =====
  {
    title: "Le Travail et les Metiers",
    description: "Professions, bureau, vie professionnelle",
    color: "bg-brand-red",
    lessons: [
      {
        title: "Les metiers courants",
        vocab: [
          { lingala: "Mosali", french: "Travailleur" },
          { lingala: "Molakisi", french: "Enseignant" },
          { lingala: "Monganga", french: "Medecin" },
          { lingala: "Mopesi bilanga", french: "Cultivateur" },
        ],
        sentences: [
          { lingala: "Ngai nazali molakisi", french: "Je suis enseignant", words: ["Je", "suis", "enseignant", "medecin", "cultivateur", "travailleur"] },
          { lingala: "Monganga azali na lopitalo", french: "Le medecin est a l'hopital", words: ["Le", "medecin", "est", "a", "l'hopital", "l'ecole", "maison"] },
        ],
        fillBlanks: [
          { sentence: "Ngai nazali ___", blank: "Ngai nazali ___", answer: "molakisi", distractors: ["monganga", "mosali"] },
        ],
      },
      {
        title: "Au bureau",
        vocab: [
          { lingala: "Biro", french: "Bureau" },
          { lingala: "Mosala", french: "Travail" },
          { lingala: "Patrõ", french: "Patron" },
          { lingala: "Lifuti", french: "Salaire" },
        ],
        sentences: [
          { lingala: "Nazali na biro", french: "Je suis au bureau", words: ["Je", "suis", "au", "bureau", "maison", "marche", "ecole"] },
          { lingala: "Mosala ezali makasi", french: "Le travail est dur", words: ["Le", "travail", "est", "dur", "facile", "bon", "bureau"] },
        ],
        fillBlanks: [
          { sentence: "Nazali na ___", blank: "Nazali na ___", answer: "biro", distractors: ["ndako", "kelasi"] },
        ],
      },
      {
        title: "Les commercants",
        vocab: [
          { lingala: "Moteki", french: "Vendeur" },
          { lingala: "Mosombi", french: "Acheteur" },
          { lingala: "Zando", french: "Marche" },
          { lingala: "Biloko", french: "Marchandises" },
        ],
        sentences: [
          { lingala: "Moteki azali na zando", french: "Le vendeur est au marche", words: ["Le", "vendeur", "est", "au", "marche", "l'acheteur", "bureau"] },
          { lingala: "Biloko ezali ntalo", french: "Les marchandises sont cheres", words: ["Les", "marchandises", "sont", "cheres", "pas", "belles", "vendeur"] },
        ],
        fillBlanks: [
          { sentence: "___ azali na zando", blank: "___ azali na zando", answer: "Moteki", distractors: ["Mosombi", "Mosali"] },
        ],
      },
      {
        title: "Les artisans",
        vocab: [
          { lingala: "Shapo", french: "Menuisier" },
          { lingala: "Forjo", french: "Forgeron" },
          { lingala: "Motongisi", french: "Constructeur" },
          { lingala: "Kosala", french: "Travailler" },
        ],
        sentences: [
          { lingala: "Shapo azali kosala mesa", french: "Le menuisier fabrique une table", words: ["Le", "menuisier", "fabrique", "une", "table", "chaise", "forgeron"] },
          { lingala: "Motongisi azali kotonga ndako", french: "Le constructeur batit une maison", words: ["Le", "constructeur", "batit", "une", "maison", "ecole", "menuisier"] },
        ],
        fillBlanks: [
          { sentence: "___ azali kosala mesa", blank: "___ azali kosala mesa", answer: "Shapo", distractors: ["Forjo", "Motongisi"] },
        ],
      },
      {
        title: "Chercher du travail",
        vocab: [
          { lingala: "Koluka mosala", french: "Chercher du travail" },
          { lingala: "Mokanda", french: "Lettre/Document" },
          { lingala: "Kozwa mosala", french: "Obtenir un travail" },
          { lingala: "Baboti", french: "Employes" },
        ],
        sentences: [
          { lingala: "Nazali koluka mosala", french: "Je cherche du travail", words: ["Je", "cherche", "du", "travail", "repos", "argent", "maison"] },
          { lingala: "Nazwi mosala ya sika", french: "J'ai obtenu un nouveau travail", words: ["J'ai", "obtenu", "un", "nouveau", "travail", "perdu", "ancien"] },
        ],
        fillBlanks: [
          { sentence: "Nazali ___ mosala", blank: "Nazali ___ mosala", answer: "koluka", distractors: ["kozwa", "kosala"] },
        ],
      },
      {
        title: "Le telephone et la technologie",
        vocab: [
          { lingala: "Telefone", french: "Telephone" },
          { lingala: "Ordinatere", french: "Ordinateur" },
          { lingala: "Kobengana", french: "Appeler" },
          { lingala: "Kokoma", french: "Ecrire" },
        ],
        sentences: [
          { lingala: "Pesa ngai telefone", french: "Donne-moi le telephone", words: ["Donne", "moi", "le", "telephone", "ordinateur", "livre", "argent"] },
          { lingala: "Nazali kokoma mokanda", french: "J'ecris une lettre", words: ["J'ecris", "une", "lettre", "je lis", "livre", "message"] },
        ],
        fillBlanks: [
          { sentence: "Pesa ngai ___", blank: "Pesa ngai ___", answer: "telefone", distractors: ["ordinatere", "mokanda"] },
        ],
      },
      {
        title: "L'argent",
        vocab: [
          { lingala: "Mbongo", french: "Argent" },
          { lingala: "Kobomba", french: "Economiser" },
          { lingala: "Kofuta", french: "Payer" },
          { lingala: "Niongo", french: "Dette" },
        ],
        sentences: [
          { lingala: "Nazali na mbongo te", french: "Je n'ai pas d'argent", words: ["Je", "n'ai", "pas", "d'argent", "de", "travail", "faim"] },
          { lingala: "Esengeli kofuta niongo", french: "Il faut payer la dette", words: ["Il", "faut", "payer", "la", "dette", "argent", "acheter"] },
        ],
        fillBlanks: [
          { sentence: "Nazali na ___ te", blank: "Nazali na ___ te", answer: "mbongo", distractors: ["niongo", "mosala"] },
        ],
      },
      {
        title: "Les horaires",
        vocab: [
          { lingala: "Ntango", french: "Temps" },
          { lingala: "Kozwa nzela", french: "Etre en retard" },
          { lingala: "Na ntango", french: "A l'heure" },
          { lingala: "Mbala moko", french: "Immediatement" },
        ],
        sentences: [
          { lingala: "Nazali kozwa nzela", french: "Je suis en retard", words: ["Je", "suis", "en", "retard", "avance", "l'heure", "temps"] },
          { lingala: "Yaka mbala moko", french: "Viens immediatement", words: ["Viens", "immediatement", "demain", "bientot", "va", "plus tard"] },
        ],
        fillBlanks: [
          { sentence: "Nazali ___ nzela", blank: "Nazali ___ nzela", answer: "kozwa", distractors: ["na", "kokende"] },
        ],
      },
      {
        title: "La reunion",
        vocab: [
          { lingala: "Likita", french: "Reunion" },
          { lingala: "Kosolola", french: "Discuter" },
          { lingala: "Mokano", french: "Decision" },
          { lingala: "Boyokani", french: "Accord" },
        ],
        sentences: [
          { lingala: "Tozali na likita", french: "Nous sommes en reunion", words: ["Nous", "sommes", "en", "reunion", "discussion", "vacances", "travail"] },
          { lingala: "Tozwi mokano", french: "Nous avons pris une decision", words: ["Nous", "avons", "pris", "une", "decision", "reunion", "accord"] },
        ],
        fillBlanks: [
          { sentence: "Tozali na ___", blank: "Tozali na ___", answer: "likita", distractors: ["mokano", "boyokani"] },
        ],
      },
      {
        title: "Revision: Travail",
        vocab: [
          { lingala: "Mosala", french: "Travail" },
          { lingala: "Mbongo", french: "Argent" },
          { lingala: "Biro", french: "Bureau" },
          { lingala: "Lifuti", french: "Salaire" },
        ],
        sentences: [
          { lingala: "Mosala epesaka lifuti", french: "Le travail donne un salaire", words: ["Le", "travail", "donne", "un", "salaire", "bureau", "argent"] },
          { lingala: "Nazali kosala na biro", french: "Je travaille au bureau", words: ["Je", "travaille", "au", "bureau", "maison", "marche", "ecole"] },
        ],
        fillBlanks: [
          { sentence: "Mosala epesaka ___", blank: "Mosala epesaka ___", answer: "lifuti", distractors: ["mbongo", "biro"] },
        ],
      },
    ],
  },

  // ===== UNIT 9: Les Emotions et la Vie Quotidienne =====
  {
    title: "Les Emotions et la Vie Quotidienne",
    description: "Sentiments, routine quotidienne, expressions",
    color: "bg-brand-green",
    lessons: [
      {
        title: "Les emotions positives",
        vocab: [
          { lingala: "Esengo", french: "Joie/Bonheur" },
          { lingala: "Bolingo", french: "Amour" },
          { lingala: "Kimya", french: "Paix" },
          { lingala: "Elikya", french: "Espoir" },
        ],
        sentences: [
          { lingala: "Nazali na esengo", french: "Je suis heureux", words: ["Je", "suis", "heureux", "triste", "fache", "fatigue"] },
          { lingala: "Bolingo ezali makasi", french: "L'amour est fort", words: ["L'amour", "est", "fort", "faible", "la", "paix", "joie"] },
        ],
        fillBlanks: [
          { sentence: "Nazali na ___", blank: "Nazali na ___", answer: "esengo", distractors: ["bolingo", "kimya"] },
        ],
      },
      {
        title: "Les emotions negatives",
        vocab: [
          { lingala: "Mawa", french: "Tristesse" },
          { lingala: "Nkanda", french: "Colere" },
          { lingala: "Kobanga", french: "Peur" },
          { lingala: "Nsoni", french: "Honte" },
        ],
        sentences: [
          { lingala: "Nazali na mawa", french: "Je suis triste", words: ["Je", "suis", "triste", "heureux", "fache", "calme"] },
          { lingala: "Azali na nkanda", french: "Il est en colere", words: ["Il", "est", "en", "colere", "joie", "paix", "peur"] },
        ],
        fillBlanks: [
          { sentence: "Nazali na ___", blank: "Nazali na ___", answer: "mawa", distractors: ["nkanda", "nsoni"] },
        ],
      },
      {
        title: "Le matin",
        vocab: [
          { lingala: "Kolamuka", french: "Se reveiller" },
          { lingala: "Kosukola", french: "Se laver" },
          { lingala: "Kolya", french: "Manger" },
          { lingala: "Kolata", french: "S'habiller" },
        ],
        sentences: [
          { lingala: "Nalamuki na ntongo", french: "Je me suis reveille le matin", words: ["Je", "me", "suis", "reveille", "le", "matin", "soir", "couche"] },
          { lingala: "Nazali kolya mesi", french: "Je mange le petit-dejeuner", words: ["Je", "mange", "le", "petit-dejeuner", "dejeuner", "diner", "bois"] },
        ],
        fillBlanks: [
          { sentence: "Na___ na ntongo", blank: "Na___ na ntongo", answer: "lamuki", distractors: ["lali", "lyaki"] },
        ],
      },
      {
        title: "Le soir",
        vocab: [
          { lingala: "Kolala", french: "Dormir" },
          { lingala: "Kopema", french: "Se reposer" },
          { lingala: "Butu", french: "Nuit" },
          { lingala: "Ndoto", french: "Reve" },
        ],
        sentences: [
          { lingala: "Nazali kolala", french: "Je vais dormir", words: ["Je", "vais", "dormir", "manger", "travailler", "jouer"] },
          { lingala: "Naloti ndoto malamu", french: "J'ai fait un bon reve", words: ["J'ai", "fait", "un", "bon", "reve", "mauvais", "cauchemar"] },
        ],
        fillBlanks: [
          { sentence: "Nazali ___", blank: "Nazali ___", answer: "kolala", distractors: ["kopema", "kolya"] },
        ],
      },
      {
        title: "Les loisirs",
        vocab: [
          { lingala: "Masano", french: "Jeu/Sport" },
          { lingala: "Minzemba", french: "Danse" },
          { lingala: "Nzembo", french: "Chanson" },
          { lingala: "Koyemba", french: "Chanter" },
        ],
        sentences: [
          { lingala: "Nalingaka koyemba", french: "J'aime chanter", words: ["J'aime", "chanter", "danser", "jouer", "dormir", "manger"] },
          { lingala: "Tozali kobina", french: "Nous dansons", words: ["Nous", "dansons", "chantons", "jouons", "mangeons", "dormons"] },
        ],
        fillBlanks: [
          { sentence: "Nalingaka ___", blank: "Nalingaka ___", answer: "koyemba", distractors: ["kobina", "masano"] },
        ],
      },
      {
        title: "Les couleurs",
        vocab: [
          { lingala: "Motane", french: "Rouge" },
          { lingala: "Moindo", french: "Noir" },
          { lingala: "Mpembe", french: "Blanc" },
          { lingala: "Ya langi", french: "Colore" },
        ],
        sentences: [
          { lingala: "Elamba na ngai ezali motane", french: "Mon vetement est rouge", words: ["Mon", "vetement", "est", "rouge", "noir", "blanc", "bleu"] },
          { lingala: "Likolo ezali ya langi", french: "Le ciel est colore", words: ["Le", "ciel", "est", "colore", "noir", "blanc", "rouge"] },
        ],
        fillBlanks: [
          { sentence: "Elamba na ngai ezali ___", blank: "Elamba na ngai ezali ___", answer: "motane", distractors: ["moindo", "mpembe"] },
        ],
      },
      {
        title: "Aimer et detester",
        vocab: [
          { lingala: "Kolinga", french: "Aimer" },
          { lingala: "Koyina", french: "Detester" },
          { lingala: "Kosepela", french: "Se rejouir" },
          { lingala: "Koboya", french: "Refuser" },
        ],
        sentences: [
          { lingala: "Nalingaka bilei ya pondu", french: "J'aime le pondu", words: ["J'aime", "le", "pondu", "je", "deteste", "riz", "poisson"] },
          { lingala: "Naboyaka mbula", french: "Je n'aime pas la pluie", words: ["Je", "n'aime", "pas", "la", "pluie", "soleil", "j'aime"] },
        ],
        fillBlanks: [
          { sentence: "Na___aka bilei ya pondu", blank: "Na___aka bilei ya pondu", answer: "ling", distractors: ["yin", "boy"] },
        ],
      },
      {
        title: "Les vetements",
        vocab: [
          { lingala: "Elamba", french: "Vetement" },
          { lingala: "Sapato", french: "Chaussure" },
          { lingala: "Shapeau", french: "Chapeau" },
          { lingala: "Kolata", french: "Porter" },
        ],
        sentences: [
          { lingala: "Nazali kolata elamba", french: "Je porte un vetement", words: ["Je", "porte", "un", "vetement", "chapeau", "chaussure", "sac"] },
          { lingala: "Sapato na ngai ezali sika", french: "Mes chaussures sont neuves", words: ["Mes", "chaussures", "sont", "neuves", "vieilles", "vetement", "belles"] },
        ],
        fillBlanks: [
          { sentence: "Nazali kolata ___", blank: "Nazali kolata ___", answer: "elamba", distractors: ["sapato", "shapeau"] },
        ],
      },
      {
        title: "Expressions courantes",
        vocab: [
          { lingala: "Likambo te", french: "Pas de probleme" },
          { lingala: "Keba!", french: "Attention!" },
          { lingala: "Tika!", french: "Arrete!" },
          { lingala: "Yaka!", french: "Viens!" },
        ],
        sentences: [
          { lingala: "Likambo te, nazali awa", french: "Pas de probleme, je suis la", words: ["Pas", "de", "probleme", "je", "suis", "la", "bien", "ici"] },
          { lingala: "Keba na motuka!", french: "Attention a la voiture!", words: ["Attention", "a", "la", "voiture", "!", "route", "moto"] },
        ],
        fillBlanks: [
          { sentence: "___ te, nazali awa", blank: "___ te, nazali awa", answer: "Likambo", distractors: ["Keba", "Tika"] },
        ],
      },
      {
        title: "Revision: Vie Quotidienne",
        vocab: [
          { lingala: "Esengo", french: "Joie" },
          { lingala: "Kolala", french: "Dormir" },
          { lingala: "Kolinga", french: "Aimer" },
          { lingala: "Elamba", french: "Vetement" },
        ],
        sentences: [
          { lingala: "Nazali na esengo ya kolinga", french: "J'ai la joie d'aimer", words: ["J'ai", "la", "joie", "d'aimer", "tristesse", "peur", "honte"] },
          { lingala: "Nazali kolala na kimya", french: "Je dors en paix", words: ["Je", "dors", "en", "paix", "mange", "colere", "joie"] },
        ],
        fillBlanks: [
          { sentence: "Nazali na ___ ya kolinga", blank: "Nazali na ___ ya kolinga", answer: "esengo", distractors: ["mawa", "nkanda"] },
        ],
      },
    ],
  },

  // ===== UNIT 10: Conversations Avancees =====
  {
    title: "Conversations Avancees",
    description: "Dialogues, culture congolaise, conversations fluides",
    color: "bg-brand-blue",
    lessons: [
      {
        title: "Faire connaissance",
        vocab: [
          { lingala: "Oyebi", french: "Tu sais/connais" },
          { lingala: "Nayebi te", french: "Je ne sais pas" },
          { lingala: "Koyeba", french: "Savoir/Connaitre" },
          { lingala: "Moninga", french: "Ami" },
        ],
        sentences: [
          { lingala: "Ozali moninga na ngai", french: "Tu es mon ami", words: ["Tu", "es", "mon", "ami", "frere", "voisin", "je"] },
          { lingala: "Nayebi kombo na yo te", french: "Je ne connais pas ton nom", words: ["Je", "ne", "connais", "pas", "ton", "nom", "age", "maison"] },
        ],
        fillBlanks: [
          { sentence: "Ozali ___ na ngai", blank: "Ozali ___ na ngai", answer: "moninga", distractors: ["ndeko", "tata"] },
        ],
      },
      {
        title: "Au telephone",
        vocab: [
          { lingala: "Allo", french: "Allo" },
          { lingala: "Nalingi kosolola", french: "Je veux parler" },
          { lingala: "Kanga telefone", french: "Raccrocher" },
          { lingala: "Tinda mesaje", french: "Envoyer un message" },
        ],
        sentences: [
          { lingala: "Allo, ozali wapi?", french: "Allo, tu es ou?", words: ["Allo", "tu", "es", "ou", "?", "je", "bien", "ici"] },
          { lingala: "Nakotinda mesaje", french: "Je vais envoyer un message", words: ["Je", "vais", "envoyer", "un", "message", "appeler", "raccrocher"] },
        ],
        fillBlanks: [
          { sentence: "Nako___ mesaje", blank: "Nako___ mesaje", answer: "tinda", distractors: ["benga", "koma"] },
        ],
      },
      {
        title: "Raconter une histoire",
        vocab: [
          { lingala: "Lisapo", french: "Histoire/Conte" },
          { lingala: "Kala kala", french: "Il etait une fois" },
          { lingala: "Suka", french: "Fin" },
          { lingala: "Koyebisa", french: "Raconter" },
        ],
        sentences: [
          { lingala: "Kala kala, ezalaki mwana moko", french: "Il etait une fois un enfant", words: ["Il", "etait", "une", "fois", "un", "enfant", "homme", "animal"] },
          { lingala: "Lisapo esili", french: "L'histoire est finie", words: ["L'histoire", "est", "finie", "longue", "le", "conte", "belle"] },
        ],
        fillBlanks: [
          { sentence: "___ kala, ezalaki mwana moko", blank: "___ kala, ezalaki mwana moko", answer: "Kala", distractors: ["Lisapo", "Suka"] },
        ],
      },
      {
        title: "Donner son opinion",
        vocab: [
          { lingala: "Nakanisi", french: "Je pense" },
          { lingala: "Nandimi", french: "Je suis d'accord" },
          { lingala: "Naboya", french: "Je refuse" },
          { lingala: "Mbala mosusu", french: "Peut-etre" },
        ],
        sentences: [
          { lingala: "Nakanisi ezali malamu", french: "Je pense que c'est bien", words: ["Je", "pense", "que", "c'est", "bien", "mal", "vrai"] },
          { lingala: "Nandimi na yo", french: "Je suis d'accord avec toi", words: ["Je", "suis", "d'accord", "avec", "toi", "lui", "pas"] },
        ],
        fillBlanks: [
          { sentence: "___ ezali malamu", blank: "___ ezali malamu", answer: "Nakanisi", distractors: ["Nandimi", "Naboya"] },
        ],
      },
      {
        title: "Faire des projets",
        vocab: [
          { lingala: "Mokano", french: "Plan/Projet" },
          { lingala: "Lobi", french: "Demain" },
          { lingala: "Poso oyo", french: "Cette semaine" },
          { lingala: "Sanza oyo", french: "Ce mois" },
        ],
        sentences: [
          { lingala: "Lobi nakokende na zando", french: "Demain j'irai au marche", words: ["Demain", "j'irai", "au", "marche", "aujourd'hui", "ecole", "maison"] },
          { lingala: "Poso oyo tozali na likita", french: "Cette semaine nous avons une reunion", words: ["Cette", "semaine", "nous", "avons", "une", "reunion", "fete", "mois"] },
        ],
        fillBlanks: [
          { sentence: "___ nakokende na zando", blank: "___ nakokende na zando", answer: "Lobi", distractors: ["Lelo", "Kala"] },
        ],
      },
      {
        title: "La musique congolaise",
        vocab: [
          { lingala: "Nzembo", french: "Chanson" },
          { lingala: "Moyembi", french: "Chanteur" },
          { lingala: "Engoma", french: "Tambour" },
          { lingala: "Sebene", french: "Solo de guitare" },
        ],
        sentences: [
          { lingala: "Nzembo oyo ezali kitoko", french: "Cette chanson est belle", words: ["Cette", "chanson", "est", "belle", "longue", "triste", "le"] },
          { lingala: "Moyembi azali koyemba", french: "Le chanteur chante", words: ["Le", "chanteur", "chante", "danse", "joue", "la", "chanteuse"] },
        ],
        fillBlanks: [
          { sentence: "Nzembo oyo ezali ___", blank: "Nzembo oyo ezali ___", answer: "kitoko", distractors: ["makasi", "monene"] },
        ],
      },
      {
        title: "La culture",
        vocab: [
          { lingala: "Bonkoko", french: "Tradition" },
          { lingala: "Feti", french: "Fete" },
          { lingala: "Bokilo", french: "Beau-famille" },
          { lingala: "Libala", french: "Mariage" },
        ],
        sentences: [
          { lingala: "Feti ezali lelo", french: "La fete est aujourd'hui", words: ["La", "fete", "est", "aujourd'hui", "demain", "hier", "le", "mariage"] },
          { lingala: "Libala ezali mokolo ya esengo", french: "Le mariage est un jour de joie", words: ["Le", "mariage", "est", "un", "jour", "de", "joie", "fete", "tristesse"] },
        ],
        fillBlanks: [
          { sentence: "___ ezali lelo", blank: "___ ezali lelo", answer: "Feti", distractors: ["Libala", "Bonkoko"] },
        ],
      },
      {
        title: "Parler du futur",
        vocab: [
          { lingala: "Nakosala", french: "Je ferai" },
          { lingala: "Okosala", french: "Tu feras" },
          { lingala: "Tokosala", french: "Nous ferons" },
          { lingala: "Mikolo ezali koya", french: "Les jours arrivent" },
        ],
        sentences: [
          { lingala: "Nakosala mosala lobi", french: "Je travaillerai demain", words: ["Je", "travaillerai", "demain", "aujourd'hui", "mangerai", "hier"] },
          { lingala: "Tokokende na mboka", french: "Nous irons au village", words: ["Nous", "irons", "au", "village", "ville", "ils", "marche"] },
        ],
        fillBlanks: [
          { sentence: "Nako___ mosala lobi", blank: "Nako___ mosala lobi", answer: "sala", distractors: ["kende", "lya"] },
        ],
      },
      {
        title: "Proverbes en Lingala",
        vocab: [
          { lingala: "Lisese", french: "Proverbe" },
          { lingala: "Bwanya", french: "Sagesse" },
          { lingala: "Makambo", french: "Problemes/Affaires" },
          { lingala: "Motema", french: "Coeur" },
        ],
        sentences: [
          { lingala: "Moto na moto na makambo na ye", french: "Chacun a ses problemes", words: ["Chacun", "a", "ses", "problemes", "joies", "amis", "chaque"] },
          { lingala: "Bwanya eleki mbongo", french: "La sagesse vaut plus que l'argent", words: ["La", "sagesse", "vaut", "plus", "que", "l'argent", "force", "moins"] },
        ],
        fillBlanks: [
          { sentence: "___ eleki mbongo", blank: "___ eleki mbongo", answer: "Bwanya", distractors: ["Makambo", "Motema"] },
        ],
      },
      {
        title: "Revision Finale",
        vocab: [
          { lingala: "Mbote", french: "Bonjour" },
          { lingala: "Bolingo", french: "Amour" },
          { lingala: "Esengo", french: "Joie" },
          { lingala: "Lingala", french: "Lingala" },
        ],
        sentences: [
          { lingala: "Nazali koyekola lingala", french: "J'apprends le lingala", words: ["J'apprends", "le", "lingala", "francais", "anglais", "je", "parle"] },
          { lingala: "Lingala ezali monoko ya kitoko", french: "Le lingala est une belle langue", words: ["Le", "lingala", "est", "une", "belle", "langue", "difficile", "facile"] },
        ],
        fillBlanks: [
          { sentence: "Nazali koyekola ___", blank: "Nazali koyekola ___", answer: "lingala", distractors: ["francais", "anglais"] },
        ],
      },
    ],
  },
];
