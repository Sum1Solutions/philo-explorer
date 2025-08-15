/**
 * Complete Traditions Data from Original Explorer
 * All 15 traditions with full details, references, and deep dive content
 */

export type RowKey = 'reality' | 'self' | 'problem' | 'response' | 'aim';

export interface Reference {
  title: string;
  url: string;
  type?: 'book' | 'article' | 'video' | 'other';
  author?: string;
  year?: number | string;
  description?: string;
  notes?: string;
}

export interface Tradition {
  id: string;
  name: string;
  family: string;
  color: string;
  firstYear: number;
  overview: Record<RowKey, string>;
  deepDive?: {
    keyIdeas: string[];
    notes?: string;
  };
  references: Reference[];
}

export const ROW_LABELS: Record<RowKey, string> = {
  reality: "Nature of reality",
  self: "Self",
  problem: "Core problem",
  response: "Path to transformation",
  aim: "Vision of flourishing",
};

export const DATA: Tradition[] = [
  {
    id: "watts",
    name: "Alan Watts",
    family: "Modern",
    color: "violet",
    firstYear: 1915,
    overview: {
      reality: "Reality is a single living process where apparent opposites depend on and define each other; the world shows up as playful, interdependent patterns in one field of experience.",
      self: "Ego is a temporary mask; deeper Self as Atman = Brahman (also framed with anatta as no fixed self).",
      problem: "Treating the play as a puzzle to be solved; clinging to control.",
      response: "Let go, laugh, participate; embrace irreducible 'rascality'.",
      aim: "Joyful participation in the cosmic play.",
    },
    deepDive: {
      keyIdeas: [
        "Nonduality (not-two) across traditions.",
        "Opposites as interdependent; a playful framing of reality.",
        "The self as a social construct; the deeper Self is not the narrative ego.",
      ],
      notes: "Alan Watts (1915-1973) popularized Eastern philosophy in the West, blending insights from Zen, Taoism, and Advaita Vedanta with Western psychology and philosophy."
    },
    references: [
      { 
        title: "Alan Watts Organization", 
        url: "https://alanwatts.org/",
        type: "other",
        author: "Alan Watts Foundation",
        year: "2023",
        description: "Official website with lectures, books, and resources"
      },
      { 
        title: "The Book: On the Taboo Against Knowing Who You Are", 
        url: "https://alanwatts.org/collections/books",
        type: "book",
        author: "Alan Watts",
        year: "1966",
        description: "Explores the illusion of the separate self"
      },
      { 
        title: "Tao: The Watercourse Way", 
        url: "https://alanwatts.org/collections/books",
        type: "book",
        author: "Alan Watts",
        year: "1975",
        description: "Watts' final work on Taoist philosophy"
      },
      { 
        title: "Out of Your Mind (Audio Series)", 
        url: "https://alanwatts.org/collections/audio",
        type: "other",
        author: "Alan Watts",
        year: "1960-1973",
        description: "Essential lectures on consciousness and spirituality"
      },
    ],
  },
  {
    id: "absurdism",
    name: "Camus / Absurdism",
    family: "Modern",
    color: "slate",
    firstYear: 1942,
    overview: {
      reality: "Universe is indifferent; no inherent meaning.",
      self: "Separate conscious being without cosmic essence; identity is self-authored.",
      problem: "Tension between the hunger for meaning and the universe's silence.",
      response: "Revolt: live fully, lucidly, and create meaning.",
      aim: "No ultimate meaning — craft purpose through action.",
    },
    deepDive: {
      keyIdeas: ["The Myth of Sisyphus", "Revolt, Freedom, Passion"],
      notes: "Camus rejects nihilism by affirming life without metaphysical guarantees.",
    },
    references: [
      { title: "Stanford Encyclopedia: The Absurd", url: "https://plato.stanford.edu/entries/absurdity/" },
      { title: "Camus, The Myth of Sisyphus", url: "https://plato.stanford.edu/entries/camus/" },
      { title: "Internet Encyclopedia of Philosophy: Camus", url: "https://iep.utm.edu/camus/" },
    ],
  },
  {
    id: "buddhism",
    name: "Buddhism",
    family: "Eastern",
    color: "emerald",
    firstYear: -480,
    overview: {
      reality: "Impermanent (anicca), interdependent; no inherent self (anatta).",
      self: "No permanent self; five aggregates in flux.",
      problem: "Suffering (dukkha) from craving and ignorance.",
      response: "Eightfold Path; cultivate wisdom, ethics, meditation.",
      aim: "Awakening (nirvāṇa); end of suffering and rebirth.",
    },
    deepDive: {
      keyIdeas: ["Four Noble Truths", "Dependent Origination", "Śūnyatā (emptiness)", "Mindfulness"],
    },
    references: [
      { title: "Stanford Encyclopedia: Buddhism", url: "https://plato.stanford.edu/entries/buddhism/" },
      { title: "SuttaCentral (Pali Canon)", url: "https://suttacentral.net/" },
      { title: "Access to Insight (Theravāda)", url: "https://www.accesstoinsight.org/" },
      { title: "Britannica: Buddhism", url: "https://www.britannica.com/topic/Buddhism" },
    ],
  },
  {
    id: "judaism",
    name: "Judaism",
    family: "Abrahamic",
    color: "amber",
    firstYear: -1300,
    overview: {
      reality: "Created by God; good yet morally demanding; covenantal history.",
      self: "A soul with free will; Yetzer Tov / Yetzer Hara inclinations.",
      problem: "Misalignment with Torah and justice; inclination toward selfishness.",
      response: "Torah, mitzvot, teshuva (return), ethical life.",
      aim: "Live in covenant with God; pursue tikkun olam (repair of the world).",
    },
    references: [
      { title: "Sefaria (Hebrew Bible & Rabbinics)", url: "https://www.sefaria.org/" },
      { title: "Britannica: Judaism", url: "https://www.britannica.com/topic/Judaism" },
      { title: "Stanford Encyclopedia: Jewish Philosophy", url: "https://plato.stanford.edu/entries/jewish-philosophy/" },
    ],
  },
  {
    id: "christianity",
    name: "Christianity",
    family: "Abrahamic",
    color: "rose",
    firstYear: 30,
    overview: {
      reality: "Created by God; marred by sin; redeemed in Christ.",
      self: "An immortal soul created by God; fallen but redeemable.",
      problem: "Sin and estrangement from God.",
      response: "Faith and grace through Christ; discipleship and love.",
      aim: "Salvation and union with God.",
    },
    references: [
      { title: "New Advent Catholic Encyclopedia", url: "https://www.newadvent.org/cathen/" },
      { title: "Britannica: Christianity", url: "https://www.britannica.com/topic/Christianity" },
      { title: "Stanford Encyclopedia: Christian Mysticism", url: "https://plato.stanford.edu/entries/christian-mysticism/" },
    ],
  },
  {
    id: "islam",
    name: "Islam",
    family: "Abrahamic",
    color: "teal",
    firstYear: 610,
    overview: {
      reality: "Created by Allah; perfectly ordered; life as a test.",
      self: "An immortal soul responsible before Allah.",
      problem: "Forgetfulness of Allah; disobedience.",
      response: "Submission (islām) to Allah; Qur'an and Sunnah.",
      aim: "Peace and closeness to Allah in this life and the next.",
    },
    references: [
      { title: "Quran.com (Arabic & translations)", url: "https://quran.com/" },
      { title: "Britannica: Islam", url: "https://www.britannica.com/topic/Islam" },
      { title: "Stanford Encyclopedia: Islamic Philosophy", url: "https://plato.stanford.edu/entries/arabic-islamic-philosophy/" },
    ],
  },
  {
    id: "hinduism",
    name: "Hinduism (Advaita Vedānta)",
    family: "Eastern",
    color: "orange",
    firstYear: 800,
    overview: {
      reality: "All reality is Brahman; the world as divine play.",
      self: "True Self (Atman) is identical to Brahman.",
      problem: "Avidya (ignorance) and attachment to māyā (appearance).",
      response: "Paths of jñāna, bhakti, karma, rāja yoga to realize unity.",
      aim: "Moksha — liberation from saṃsāra.",
    },
    references: [
      { title: "Upanishads (Sanskrit Library)", url: "https://www.sanskritlibrary.org/" },
      { title: "Bhagavad Gītā (Gita Supersite)", url: "https://www.gitasupersite.iitk.ac.in/" },
      { title: "Britannica: Hinduism", url: "https://www.britannica.com/topic/Hinduism" },
    ],
  },
  {
    id: "taoism",
    name: "Taoism",
    family: "Eastern",
    color: "lime",
    firstYear: -400,
    overview: {
      reality: "Tao as the source and flow; polarity as complementarity.",
      self: "A natural expression of the Tao; no rigid essence.",
      problem: "Disharmony from forcing and resisting the flow.",
      response: "Wu wei (effortless action); simplicity, spontaneity.",
      aim: "Effortless harmony with the Tao.",
    },
    references: [
      { title: "Tao Te Ching (MIT / C. Muller)", url: "https://ctext.org/dao-de-jing" },
      { title: "Britannica: Daoism", url: "https://www.britannica.com/topic/Daoism" },
      { title: "Stanford Encyclopedia: Daoism", url: "https://plato.stanford.edu/entries/daoism/" },
    ],
  },
  {
    id: "stoicism",
    name: "Stoicism",
    family: "Classical",
    color: "cyan",
    firstYear: -300,
    overview: {
      reality: "Cosmos ordered by Logos; fate and nature interwoven.",
      self: "Rational agent capable of virtue.",
      problem: "Suffering from false judgments and resisting fate.",
      response: "Live according to nature; cultivate virtue; amor fati.",
      aim: "Eudaimonia through virtue.",
    },
    references: [
      { title: "Stanford Encyclopedia: Stoicism", url: "https://plato.stanford.edu/entries/stoicism/" },
      { title: "Epictetus – Enchiridion (Perseus)", url: "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A2008.01.0579%3Atext%3DEnch." },
      { title: "Marcus Aurelius – Meditations", url: "https://www.gutenberg.org/ebooks/2680" },
    ],
  },
  {
    id: "existentialism",
    name: "Existentialism",
    family: "Modern",
    color: "fuchsia",
    firstYear: 1940,
    overview: {
      reality: "No inherent meaning; existence precedes essence.",
      self: "Defined by choices and actions (authenticity).",
      problem: "Angst from radical freedom and groundlessness.",
      response: "Create values; live authentically and responsibly.",
      aim: "Authentic life in full awareness of freedom.",
    },
    references: [
      { title: "Stanford Encyclopedia: Existentialism", url: "https://plato.stanford.edu/entries/existentialism/" },
      { title: "Sartre – Existentialism Is a Humanism", url: "https://iep.utm.edu/sartre-existentialism/" },
      { title: "Kierkegaard resources (Kierkegaard Center)", url: "https://www.kierkegaard.org/" },
    ],
  },
  {
    id: "confucianism",
    name: "Confucianism",
    family: "Eastern",
    color: "red",
    firstYear: -551,
    overview: {
      reality: "Harmonious social order reflecting cosmic harmony; family and society as extensions of natural relationships.",
      self: "Social being defined by relationships and roles; cultivated through education and ritual.",
      problem: "Social disorder, conflict, and lack of virtue in leadership.",
      response: "Education, proper relationships, and virtuous leadership; practice of ren (humaneness).",
      aim: "Harmonious society where everyone fulfills their proper role.",
    },
    deepDive: {
      keyIdeas: [
        "Five Relationships: ruler-subject, father-son, husband-wife, elder-younger, friend-friend.",
        "Ren (humaneness): compassion, kindness, and benevolence toward others.",
        "Li (ritual propriety): proper behavior and respect for traditions.",
        "Junzi (exemplary person): the ideal of moral leadership and cultivation.",
      ],
      notes: "Confucius (551-479 BCE) created a philosophy focused on social harmony, education, and ethical leadership that became foundational to East Asian cultures."
    },
    references: [
      { 
        title: "Stanford Encyclopedia: Confucius", 
        url: "https://plato.stanford.edu/entries/confucius/",
        type: "article",
        description: "Comprehensive overview of Confucian philosophy and ethics"
      },
      { 
        title: "The Analects of Confucius", 
        url: "https://ctext.org/analects",
        type: "book",
        author: "Confucius",
        year: "~500 BCE",
        description: "Primary collection of Confucian teachings and sayings"
      },
      { 
        title: "Britannica: Confucianism", 
        url: "https://www.britannica.com/topic/Confucianism",
        type: "article",
        description: "Historical development and key concepts"
      },
    ],
  },
  {
    id: "sikhism",
    name: "Sikhism",
    family: "Modern",
    color: "yellow",
    firstYear: 1469,
    overview: {
      reality: "One divine reality (Ik Onkar) beyond religious divisions; equality of all people.",
      self: "Soul seeking union with the divine through devotion and service.",
      problem: "Ego, religious division, and social inequality.",
      response: "Devotion to one God, service to humanity, honest work; reject caste and ritual.",
      aim: "Union with God and creation of just, egalitarian society.",
    },
    deepDive: {
      keyIdeas: [
        "Ik Onkar: There is one divine creator of all existence.",
        "Three Pillars: Naam Japna (meditation), Kirat Karni (honest work), Vand Chakna (sharing with others).",
        "Equality: Rejection of caste system and gender discrimination.",
        "Sarbat da Bhala: Welfare and prosperity for all humanity.",
      ],
      notes: "Founded by Guru Nanak (1469-1539), Sikhism synthesized Hindu and Islamic elements while emphasizing social equality and direct relationship with the divine."
    },
    references: [
      { 
        title: "Stanford Encyclopedia: Sikhism", 
        url: "https://plato.stanford.edu/entries/sikhism/",
        type: "article",
        description: "Philosophy and historical development of Sikhism"
      },
      { 
        title: "Guru Granth Sahib (English)", 
        url: "https://www.sikhnet.com/gurbani",
        type: "book",
        author: "Sikh Gurus",
        year: "1469-1708",
        description: "Sacred scripture containing teachings of the Sikh Gurus"
      },
      { 
        title: "Britannica: Sikhism", 
        url: "https://www.britannica.com/topic/Sikhism",
        type: "article",
        description: "Overview of beliefs, practices, and history"
      },
    ],
  },
  {
    id: "humanism",
    name: "Secular Humanism",
    family: "Modern",
    color: "indigo",
    firstYear: 1933,
    overview: {
      reality: "Natural world understood through science and reason; no supernatural realm.",
      self: "Rational being capable of ethics, growth, and fulfillment without divine guidance.",
      problem: "Superstition, dogma, and failure to use reason and compassion.",
      response: "Critical thinking, scientific method, ethical behavior based on human welfare.",
      aim: "Human flourishing through reason, compassion, and democratic values.",
    },
    deepDive: {
      keyIdeas: [
        "Scientific naturalism: Understanding reality through evidence and reason.",
        "Ethical humanism: Morality based on human welfare, not divine command.",
        "Democratic values: Human dignity, freedom, and equality.",
        "Life affirmation: Finding meaning and joy in this life, not an afterlife.",
      ],
      notes: "Modern secular humanism emerged in the 20th century, emphasizing human potential and responsibility without religious authority."
    },
    references: [
      { 
        title: "American Humanist Association", 
        url: "https://americanhumanist.org/what-is-humanism/",
        type: "other",
        description: "Definition and principles of modern humanism"
      },
      { 
        title: "Humanist Manifesto III", 
        url: "https://americanhumanist.org/what-is-humanism/manifesto3/",
        type: "article",
        author: "American Humanist Association",
        year: "2003",
        description: "Contemporary statement of humanist principles"
      },
      { 
        title: "Stanford Encyclopedia: Humanism", 
        url: "https://plato.stanford.edu/entries/humanism/",
        type: "article",
        description: "Philosophical foundations of humanist thought"
      },
    ],
  },
  {
    id: "jainism",
    name: "Jainism",
    family: "Eastern",
    color: "green",
    firstYear: -599,
    overview: {
      reality: "Eternal souls trapped in material bodies through karma; universe without creator.",
      self: "Pure soul (jiva) capable of liberation through right action.",
      problem: "Attachment and violence that bind the soul with karma.",
      response: "Ahimsa (non-violence), truthfulness, asceticism; purify the soul.",
      aim: "Liberation (moksha) of the soul from the cycle of rebirth.",
    },
    deepDive: {
      keyIdeas: [
        "Ahimsa: Complete non-violence toward all living beings.",
        "Karma: Actions that bind or liberate the soul.",
        "Three Jewels: Right belief, right knowledge, right conduct.",
        "Anekantavada: Multiple perspectives on truth; intellectual humility.",
      ],
      notes: "Founded by Mahavira (599-527 BCE), Jainism emphasizes non-violence and liberation through ethical purification. Predates Buddhism."
    },
    references: [
      { 
        title: "Stanford Encyclopedia: Jainism", 
        url: "https://plato.stanford.edu/entries/jainism/",
        type: "article",
        description: "Philosophy and practices of Jainism"
      },
      { 
        title: "Britannica: Jainism", 
        url: "https://www.britannica.com/topic/Jainism",
        type: "article",
        description: "History, beliefs, and practices"
      },
      { 
        title: "Internet Encyclopedia: Jainism", 
        url: "https://iep.utm.edu/jainism/",
        type: "article",
        description: "Detailed overview of Jain philosophy and ethics"
      },
    ],
  },
  {
    id: "indigenous",
    name: "Indigenous Wisdom",
    family: "Traditional",
    color: "slate",
    firstYear: -10000,
    overview: {
      reality: "Living universe where all beings are interconnected; land as sacred.",
      self: "Part of the web of life; responsibility to future generations.",
      problem: "Disconnection from nature, ancestors, and community relationships.",
      response: "Ceremony, storytelling, living in reciprocity with nature and community.",
      aim: "Harmony with natural cycles and ancestral wisdom; collective wellbeing.",
    },
    deepDive: {
      keyIdeas: [
        "Seven Generations: Consider the impact of decisions on seven generations into the future.",
        "Reciprocity: Give back to the earth and community that sustains you.",
        "Oral tradition: Wisdom passed through stories, ceremonies, and lived experience.",
        "Holistic worldview: Mind, body, spirit, and environment as interconnected.",
      ],
      notes: "Indigenous traditions worldwide share common themes of connection to land, community responsibility, and sustainable living, developed over tens of thousands of years."
    },
    references: [
      { 
        title: "Indigenous Values Initiative", 
        url: "https://www.indigenousvalues.org/",
        type: "other",
        description: "Contemporary indigenous perspectives and values"
      },
      { 
        title: "Native American Philosophy (IEP)", 
        url: "https://iep.utm.edu/native-american-philosophy/",
        type: "article",
        description: "Overview of Native American philosophical traditions"
      },
      { 
        title: "Braiding Sweetgrass", 
        url: "https://milkweed.org/book/braiding-sweetgrass",
        type: "book",
        author: "Robin Wall Kimmerer",
        year: "2013",
        description: "Indigenous wisdom and scientific knowledge"
      },
    ],
  },
];

// Format year with BCE/CE suffix
export const formatYear = (year: number | null | undefined): string => {
  if (year == null) return '';
  return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
};

// Get student-friendly explanation for year abbreviations
export const getYearExplanation = (year: number): string => {
  if (year < 0) {
    return `${Math.abs(year)} BCE means "Before Common Era" - this is ${Math.abs(year)} years before the year we now call 1 CE. It's the same as saying "BC" (Before Christ).`;
  } else {
    return `${year} CE means "Common Era" - this counts years after what we now call year 1. It's the same as saying "AD" (Anno Domini).`;
  }
};

// Get student-friendly explanations for tradition families
export const getFamilyExplanation = (family: string): string => {
  const explanations: Record<string, string> = {
    "Eastern": "Eastern traditions come from Asia (like India, China, Japan) and often focus on inner peace, meditation, and the connection between all things.",
    "Abrahamic": "Abrahamic religions share the story of Abraham and believe in one God. This includes Judaism, Christianity, and Islam.",
    "Classical": "Classical traditions come from ancient Greece and Rome. They used logic and reason to figure out how to live a good life.",
    "Modern": "Modern philosophies developed in the last few centuries as people began questioning old ideas and thinking in new ways about life and meaning.",
    "Traditional": "Traditional wisdom comes from indigenous cultures worldwide who developed sustainable ways of living in harmony with nature and community over thousands of years."
  };
  return explanations[family] || `${family} represents a group of related philosophical and religious traditions.`;
};