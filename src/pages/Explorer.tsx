/**
 * Explorer.tsx
 * 
 * Main component for the Philosophy & Religion Explorer application.
 * Provides an interactive three-pane interface to explore and compare different
 * philosophical and religious traditions.
 * 
 * Features:
 * - Three-pane dashboard: tradition browser, details, aspect comparison
 * - Browse traditions by category (Eastern, Abrahamic, Classical, Modern, Traditional)
 * - Compare aspects (reality, self, problem, response, aim) across traditions
 * - Student-friendly tooltips and explanations
 * - Timeline navigation and search functionality
 * - Academic references for deeper study
 * 
 * Data Structure:
 * - Traditions are stored in the DATA array with consistent fields
 * - Each tradition has overview texts for key philosophical aspects
 * - References include books, articles, and videos for further study
 * 
 * State Management:
 * - selectedId: Currently selected tradition ID
 * - query: Search query for filtering traditions
 * - selectedTradition: Currently selected tradition for detailed view
 * - selectedAspect: Currently selected aspect for comparison
 */

import React, { useMemo, useState, useCallback, useRef, useEffect } from "react";
// UI Components
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Icons
import { 
  Search, 
  BookOpen, 
  ExternalLink, 
  Info,
  X,
  Layers,
  ChevronRight,
  Globe,
  Book,
  FileText,
  PlayCircle,
  User,
  AlertCircle,
  Lightbulb,
  Target,
  Calendar,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  Clock
} from "lucide-react";

// ------------------------
// Data Model
// ------------------------

type RowKey = 'reality' | 'self' | 'problem' | 'response' | 'aim';

interface Reference {
  title: string;
  url: string;
  type?: 'book' | 'article' | 'video' | 'other';
  author?: string;
  year?: number | string;
  description?: string;
  notes?: string;
}

interface Tradition {
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

const ROW_LABELS: Record<RowKey, string> = {
  reality: "Nature of reality",
  self: "Self",
  problem: "Core problem",
  response: "Path to transformation",
  aim: "Vision of flourishing",
};

const DATA: Tradition[] = [
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
const formatYear = (year: number | null | undefined): string => {
  if (year == null) return '';
  return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
};

// Get student-friendly explanation for year abbreviations
const getYearExplanation = (year: number): string => {
  if (year < 0) {
    return `${Math.abs(year)} BCE means "Before Common Era" - this is ${Math.abs(year)} years before the year we now call 1 CE. It's the same as saying "BC" (Before Christ).`;
  } else {
    return `${year} CE means "Common Era" - this counts years after what we now call year 1. It's the same as saying "AD" (Anno Domini).`;
  }
};

// Get student-friendly explanations for tradition families
const getFamilyExplanation = (family: string): string => {
  const explanations: Record<string, string> = {
    "Eastern": "Eastern traditions come from Asia (like India, China, Japan) and often focus on inner peace, meditation, and the connection between all things.",
    "Abrahamic": "Abrahamic religions share the story of Abraham and believe in one God. This includes Judaism, Christianity, and Islam.",
    "Classical": "Classical traditions come from ancient Greece and Rome. They used logic and reason to figure out how to live a good life.",
    "Modern": "Modern philosophies developed in the last few centuries as people began questioning old ideas and thinking in new ways about life and meaning.",
    "Traditional": "Traditional wisdom comes from indigenous cultures worldwide who developed sustainable ways of living in harmony with nature and community over thousands of years."
  };
  return explanations[family] || `${family} represents a group of related philosophical and religious traditions.`;
};

export default function Explorer() {
  // State management
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [cutoffYear, setCutoffYear] = useState<number | null>(null);
  const [selectedTradition, setSelectedTradition] = useState<Tradition | null>(null);
  const [selectedAspect, setSelectedAspect] = useState<RowKey | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  // Timeline state (simplified for scrollable interface)
  const [timelineScale, setTimelineScale] = useState(1); // Scale factor for zooming
  const [timelineView, setTimelineView] = useState<'overview' | 'detailed'>('overview'); // View mode
  const [timelineFocusYear, setTimelineFocusYear] = useState<number | null>(null); // Year to focus on when zooming
  const [hoveredTradition, setHoveredTradition] = useState<Tradition | null>(null); // Hovered tradition for info panel
  const timelineRef = useRef<HTMLDivElement>(null);

  // Get tradition data by ID
  const getTraditionById = useCallback((id: string | null): Tradition | null => {
    if (!id) return null;
    return DATA.find(t => t.id === id) || null;
  }, []);

  // Handle tradition selection
  const handleTraditionSelect = useCallback((tradition: Tradition, focusYear?: number) => {
    setSelectedTradition(tradition);
    setSelectedId(tradition.id);
    // Clear aspect selection when switching traditions
    setSelectedAspect(null);
    // Switch to detailed timeline view and set focus year
    setTimelineView('detailed');
    setTimelineFocusYear(focusYear || tradition.firstYear);
  }, []);

  // Handle aspect selection for comparison
  const handleAspectSelect = useCallback((aspect: RowKey) => {
    setSelectedAspect(aspect);
  }, []);

  // Clear all selections
  const handleClearSelection = useCallback(() => {
    setSelectedId(null);
    setSelectedTradition(null);
    setSelectedAspect(null);
    // Reset to overview mode
    setTimelineView('overview');
    setTimelineFocusYear(null);
  }, []);

  // Toggle timeline view
  const handleTimelineViewToggle = useCallback(() => {
    if (timelineView === 'overview') {
      setTimelineView('detailed');
      setTimelineFocusYear(0); // Default to around 0 CE
    } else {
      setTimelineView('overview');
      setTimelineFocusYear(null);
    }
  }, [timelineView]);

  // Handle timeline area click for zooming to specific periods
  const handleTimelineAreaClick = useCallback((clickX: number, containerWidth: number) => {
    if (timelineView === 'overview') {
      // Calculate which year was clicked based on position
      const totalRange = 14000; // 12000 BCE to 2000 CE
      const clickPercentage = clickX / containerWidth;
      const clickedYear = -12000 + (clickPercentage * totalRange);
      
      setTimelineView('detailed');
      setTimelineFocusYear(Math.round(clickedYear));
    }
  }, [timelineView]);

  // Get traditions for aspect comparison
  const getTraditionsForAspect = useCallback((aspect: RowKey) => {
    return DATA
      .filter(t => t.overview[aspect])
      .sort((a, b) => a.firstYear - b.firstYear);
  }, []);

  // Timeline data sorted by first introduction
  const timeline = useMemo(() => {
    return [...DATA].sort((a, b) => a.firstYear - b.firstYear);
  }, []);

  // Enhanced search with match location tracking
  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    let base = DATA;
    
    // If a timeline selection is active, show only that tradition
    if (selectedId) {
      base = base.filter((t) => t.id === selectedId);
    } else if (cutoffYear != null) {
      base = base.filter((t) => t.firstYear <= cutoffYear);
    }
    
    // Order by first introduction year ascending
    base = [...base].sort((a, b) => a.firstYear - b.firstYear);
    
    if (!q) return { traditions: base, matches: [] };
    
    const matches: Array<{
      tradition: Tradition;
      location: string;
      field: string;
      aspect?: RowKey;
      text: string;
      matchIndex: number;
    }> = [];
    
    const matchingTraditions = base.filter((t) => {
      let hasMatch = false;
      
      // Check name
      if (t.name.toLowerCase().includes(q)) {
        matches.push({
          tradition: t,
          location: 'name',
          field: 'Name',
          text: t.name,
          matchIndex: t.name.toLowerCase().indexOf(q)
        });
        hasMatch = true;
      }
      
      // Check family
      if (t.family.toLowerCase().includes(q)) {
        matches.push({
          tradition: t,
          location: 'family',
          field: 'Family',
          text: t.family,
          matchIndex: t.family.toLowerCase().indexOf(q)
        });
        hasMatch = true;
      }
      
      // Check overview aspects
      Object.entries(t.overview).forEach(([key, value]) => {
        if (value.toLowerCase().includes(q)) {
          matches.push({
            tradition: t,
            location: 'overview',
            field: 'Overview',
            aspect: key as RowKey,
            text: value,
            matchIndex: value.toLowerCase().indexOf(q)
          });
          hasMatch = true;
        }
      });
      
      // Check deep dive notes
      if (t.deepDive?.notes && t.deepDive.notes.toLowerCase().includes(q)) {
        matches.push({
          tradition: t,
          location: 'notes',
          field: 'Background Notes',
          text: t.deepDive.notes,
          matchIndex: t.deepDive.notes.toLowerCase().indexOf(q)
        });
        hasMatch = true;
      }
      
      // Check key ideas
      t.deepDive?.keyIdeas?.forEach((idea, index) => {
        if (idea.toLowerCase().includes(q)) {
          matches.push({
            tradition: t,
            location: 'keyIdeas',
            field: `Key Idea ${index + 1}`,
            text: idea,
            matchIndex: idea.toLowerCase().indexOf(q)
          });
          hasMatch = true;
        }
      });
      
      return hasMatch;
    });
    
    return { traditions: matchingTraditions, matches };
  }, [query, cutoffYear, selectedId]);

  // Extract traditions for backward compatibility
  const filtered = searchResults.traditions;

  // Auto-select first matching tradition when searching
  useEffect(() => {
    if (query.trim() && searchResults.traditions.length === 1) {
      // Auto-select if only one tradition matches
      const tradition = searchResults.traditions[0];
      setSelectedTradition(tradition);
      setSelectedId(tradition.id);
      setTimelineView('detailed');
      setTimelineFocusYear(tradition.firstYear);
      setSelectedAspect(null); // Let user explore tabs to find the word
    }
  }, [query, searchResults.traditions]);

  // Auto-scroll to focused year when switching to detailed view
  useEffect(() => {
    if (timelineView === 'detailed' && timelineFocusYear !== null && timelineRef.current) {
      // Calculate scroll position to center the focused year
      const totalRange = 14000; // 12000 BCE to 2000 CE
      const yearFromStart = timelineFocusYear + 12000; // Convert to 0-14000 range
      const containerWidth = 2400 - 96; // Total width minus padding
      const targetPosition = 48 + (yearFromStart / totalRange) * containerWidth;
      
      // Center the position in the viewport
      const viewportWidth = timelineRef.current.clientWidth;
      const scrollLeft = Math.max(0, targetPosition - viewportWidth / 2);
      
      setTimeout(() => {
        if (timelineRef.current) {
          timelineRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
      }, 100); // Small delay to allow for transition
    }
  }, [timelineView, timelineFocusYear]);

  // Get current step index for timeline
  const currentStepIndexValue = useMemo(() => {
    if (selectedId == null) return -1;
    return timeline.findIndex((t) => t.id === selectedId);
  }, [selectedId, timeline]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-2">
              <Layers className="w-6 h-6" />
              <h1 className="text-2xl md:text-3xl font-semibold">Philosophy & Religion Explorer</h1>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 items-start">
              {/* Left Column - Instructions */}
              <div className="text-muted-foreground space-y-2">
                <p className="text-sm">
                  🔍 <strong>How to explore:</strong> Browse the timeline, click on any tradition to dive deep, or compare how different cultures approach fundamental questions.
                </p>
                <p className="text-sm">
                  🌍 <strong>Journey through wisdom:</strong> From ancient Indigenous knowledge to modern philosophy, discover the rich tapestry of human thought.
                </p>
              </div>
              
              {/* Middle Column - Search */}
              <div className="flex flex-col space-y-3">
                <div className="relative w-full">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search concepts, e.g., anatta, Logos, moksha, revolt..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-9"
                  />
                  
                  {/* Simple Search Results Indicator */}
                  {query.trim() && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm z-50 px-3 py-2">
                      {searchResults.traditions.length > 0 ? (
                        <div className="text-sm text-muted-foreground">
                          Found in {searchResults.traditions.length} tradition{searchResults.traditions.length !== 1 ? 's' : ''}
                          {searchResults.traditions.length === 1 && ' - opening now...'}
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          No matches found for "{query}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Right Column - Controls */}
              <div className="flex flex-col space-y-3">
                {(selectedTradition || selectedAspect) && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleClearSelection}
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Clear Selection
                  </Button>
                )}
                <div className="text-xs text-muted-foreground">
                  <p>💡 <strong>Tip:</strong> Click timeline areas to zoom into specific periods</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline - Scrollable Window */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <Card className="p-4 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium">Historical Timeline</div>
                <div className="text-xs text-muted-foreground">
                  📜 Scroll horizontally to explore • Hover for details • Click to select
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const startIdx = currentStepIndexValue === -1 ? 0 : currentStepIndexValue + 1;
                    const nextIdx = Math.min(startIdx, timeline.length - 1);
                    const tradition = timeline[nextIdx];
                    handleTraditionSelect(tradition);
                    setCutoffYear(null);
                  }}
                >
                  Next
                </Button>
                <Button size="sm" variant="ghost" onClick={handleClearSelection}>
                  Reset
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleTimelineViewToggle}
                  className="flex items-center gap-1"
                >
                  {timelineView === 'overview' ? (
                    <>
                      <ZoomIn className="h-3 w-3" />
                      Zoom In
                    </>
                  ) : (
                    <>
                      <ZoomOut className="h-3 w-3" />
                      Overview
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {/* Scrollable Timeline Container */}
            <div 
              ref={timelineRef}
              className="relative overflow-x-auto overflow-y-visible pt-8 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
              style={{ scrollBehavior: 'smooth' }}
              onWheel={(e) => {
                if (e.ctrlKey || e.metaKey) {
                  e.preventDefault();
                  const delta = e.deltaY > 0 ? -0.1 : 0.1;
                  const newScale = Math.max(0.5, Math.min(2, timelineScale + delta));
                  setTimelineScale(newScale);
                } else {
                  // Allow horizontal scroll only
                  e.stopPropagation();
                }
              }}
            >
              <div 
                className="relative h-16 transition-all duration-500 origin-left cursor-pointer"
                style={{ 
                  minWidth: timelineView === 'overview' ? '100%' : `${2400 * timelineScale}px`,
                  transform: timelineView === 'overview' ? 'scaleX(1)' : `scaleX(${timelineScale})`,
                  transformOrigin: 'left center'
                }}
                onClick={(e) => {
                  if (timelineView === 'overview') {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    handleTimelineAreaClick(clickX, rect.width);
                  }
                }}
              >
                {/* Timeline line */}
                <div className="absolute top-6 left-12 right-12 h-0.5 bg-gradient-to-r from-amber-200 via-blue-300 to-indigo-400"></div>
                
                {/* Period markers and labels - positioned higher to avoid dots */}
                <div className="absolute -top-4 left-0 right-0 h-full">
                  {timelineView === 'overview' ? (
                    // Use percentage positioning for overview mode to match the flexible container
                    <>
                      {/* Ancient Period */}
                      <div className="absolute left-12" style={{ width: '30%' }}>
                        <div className="text-xs text-muted-foreground font-medium">Ancient Period</div>
                      </div>
                      
                      {/* Classical Period */}
                      <div className="absolute left-[42%]" style={{ width: '25%' }}>
                        <div className="text-xs text-muted-foreground font-medium">Classical Period</div>
                      </div>
                      
                      {/* Medieval Period */}
                      <div className="absolute left-[67%]" style={{ width: '15%' }}>
                        <div className="text-xs text-muted-foreground font-medium">Medieval Period</div>
                      </div>
                      
                      {/* Modern Period */}
                      <div className="absolute left-[82%]" style={{ width: 'calc(18% - 48px)' }}>
                        <div className="text-xs text-muted-foreground font-medium">Modern Period</div>
                      </div>
                    </>
                  ) : (
                    // Use pixel positioning for detailed mode
                    <>
                      {(() => {
                        const totalRange = 14000; // 12000 BCE to 2000 CE
                        const containerWidth = 2400 - 96; // Fixed width in detailed
                        
                        const ancientStart = 48;
                        const classicalStart = 48 + ((9000 / totalRange) * containerWidth);
                        const medievalStart = 48 + ((12500 / totalRange) * containerWidth);
                        const modernStart = 48 + ((13500 / totalRange) * containerWidth);
                        const endPosition = 48 + containerWidth;
                        
                        return (
                          <>
                            {/* Ancient Period */}
                            <div className="absolute" style={{ 
                              left: `${ancientStart}px`, 
                              width: `${classicalStart - ancientStart}px` 
                            }}>
                              <div className="text-xs text-muted-foreground font-medium">Ancient Period</div>
                            </div>
                            
                            {/* Classical Period */}
                            <div className="absolute" style={{ 
                              left: `${classicalStart}px`, 
                              width: `${medievalStart - classicalStart}px` 
                            }}>
                              <div className="text-xs text-muted-foreground font-medium">Classical Period</div>
                            </div>
                            
                            {/* Medieval Period */}
                            <div className="absolute" style={{ 
                              left: `${medievalStart}px`, 
                              width: `${modernStart - medievalStart}px` 
                            }}>
                              <div className="text-xs text-muted-foreground font-medium">Medieval Period</div>
                            </div>
                            
                            {/* Modern Period */}
                            <div className="absolute" style={{ 
                              left: `${modernStart}px`, 
                              width: `${endPosition - modernStart}px` 
                            }}>
                              <div className="text-xs text-muted-foreground font-medium">Modern Period</div>
                            </div>
                          </>
                        );
                      })()}
                    </>
                  )}
                </div>
                
                {/* Year markers */}
                <div className="absolute top-4 left-12 right-12 text-[10px] text-muted-foreground">
                  <span className="absolute left-0">12000 BCE</span>
                  <span className="absolute left-[285px]">8000 BCE</span>
                  <span className="absolute left-[570px]">4000 BCE</span>
                  <span className="absolute left-[857px]">1 CE</span>
                  <span className="absolute left-[1140px]">1000 CE</span>
                  <span className="absolute left-[1360px]">1500 CE</span>
                  <span className="absolute left-[1600px]">2000 CE</span>
                </div>
                
                {/* Tradition dots positioned by year with collision detection */}
                {(() => {
                  // Calculate initial positions
                  const totalRange = 14000; // 12000 BCE to 2000 CE to include Indigenous traditions
                  const minSpacing = timelineView === 'overview' ? 30 : 25; // More spacing in overview
                  
                  const traditionsWithPositions = timeline.map((t) => {
                    const yearFromStart = t.firstYear + 12000; // Convert to 0-14000 range
                    
                    if (timelineView === 'overview') {
                      // Use percentage positioning for overview mode
                      const percentage = (yearFromStart / totalRange) * 100;
                      // Add padding equivalent to left-12 (48px) as percentage
                      const leftPadding = 4; // Approximate percentage for 48px padding
                      const rightPadding = 4;
                      const position = leftPadding + (percentage * (100 - leftPadding - rightPadding) / 100);
                      return { ...t, originalPosition: position, adjustedPosition: position, isPercentage: true };
                    } else {
                      // Use pixel positioning for detailed mode
                      const containerWidth = 2400 - 96; // Fixed width in detailed
                      const position = 48 + (yearFromStart / totalRange) * containerWidth;
                      return { ...t, originalPosition: position, adjustedPosition: position, isPercentage: false };
                    }
                  });
                  
                  // Sort by position for collision detection
                  traditionsWithPositions.sort((a, b) => a.originalPosition - b.originalPosition);
                  
                  // Adjust positions to prevent overlaps
                  for (let i = 1; i < traditionsWithPositions.length; i++) {
                    const current = traditionsWithPositions[i];
                    const previous = traditionsWithPositions[i - 1];
                    
                    if (current.adjustedPosition - previous.adjustedPosition < minSpacing) {
                      current.adjustedPosition = previous.adjustedPosition + minSpacing;
                    }
                  }
                  
                  return traditionsWithPositions;
                })().map((t) => {
                  
                  return (
                    <div
                      key={t.id}
                      className="group absolute transform -translate-x-1/2"
                      style={{ left: `${t.adjustedPosition}${t.isPercentage ? '%' : 'px'}`, top: '16px' }}
                      onMouseEnter={() => setHoveredTradition(t)}
                      onMouseLeave={() => setHoveredTradition(null)}
                    >
                      <button
                        onClick={() => {
                          handleTraditionSelect(t, t.firstYear);
                        }}
                        className="relative"
                      >
                        <div className={`h-5 w-5 rounded-full border-2 transition-all duration-200 ${
                          selectedTradition?.id === t.id 
                            ? `border-${t.color}-600 bg-${t.color}-500 scale-125 shadow-lg` 
                            : `border-${t.color}-500 bg-${t.color}-400 hover:scale-110 hover:shadow-md`
                        }`} />
                        {/* Connecting line to timeline */}
                        <div className={`absolute top-5 left-1/2 transform -translate-x-1/2 w-0.5 h-3 ${
                          selectedTradition?.id === t.id 
                            ? `bg-${t.color}-600`
                            : `bg-${t.color}-400`
                        }`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Fixed Tradition Info Panel (appears on hover) */}
      {hoveredTradition && (
        <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container max-w-7xl mx-auto px-4 py-3">
            <Card className={`border-l-4 border-l-${hoveredTradition.color}-500 bg-${hoveredTradition.color}-50/30`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`h-4 w-4 rounded-full bg-${hoveredTradition.color}-400`}></div>
                    <h3 className={`font-semibold text-lg text-${hoveredTradition.color}-700`}>
                      {hoveredTradition.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      className={`text-xs bg-${hoveredTradition.color}-100 text-${hoveredTradition.color}-700 border-${hoveredTradition.color}-200`}
                      variant="outline"
                    >
                      {hoveredTradition.family}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {formatYear(hoveredTradition.firstYear)}
                    </span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm mb-1">What is Reality?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {hoveredTradition.overview.reality}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">Core Problem</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {hoveredTradition.overview.problem}
                    </p>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className={`text-${hoveredTradition.color}-700 border-${hoveredTradition.color}-300 hover:bg-${hoveredTradition.color}-100`}
                    onClick={() => handleTraditionSelect(hoveredTradition)}
                  >
                    Explore {hoveredTradition.name} →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Conditional Layout: Horizontal Grid or Three-Pane */}
      <div className="flex-1 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 py-6 h-full">
          {selectedTradition || selectedAspect ? (
            // Three-Pane Layout (when tradition or aspect is selected)
            <div className="grid grid-cols-12 gap-6 h-full">
              {/* Left Pane - Tradition Details with Tabs */}
              <div className="col-span-12 md:col-span-4 lg:col-span-3">
                {selectedTradition ? (
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge 
                            className={`mb-2 bg-${selectedTradition.color}-100 text-${selectedTradition.color}-700 border-${selectedTradition.color}-200`}
                            variant="outline"
                          >
                            {selectedTradition.family}
                          </Badge>
                          <CardTitle className={`text-${selectedTradition.color}-700`}>
                            {selectedTradition.name}
                          </CardTitle>
                          <span className="text-sm text-muted-foreground">
                            {formatYear(selectedTradition.firstYear)}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedTradition(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="overflow-y-auto h-full">
                      <Tabs defaultValue="overview" className="h-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="ideas">Key Ideas</TabsTrigger>
                          <TabsTrigger value="references">References</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="overview" className="space-y-4 mt-4">
                          <div className="space-y-4">
                            {Object.entries(ROW_LABELS).map(([key, label]) => {
                              const aspectKey = key as RowKey;
                              
                              return (
                                <div key={key} className="space-y-2">
                                  <h4 className="font-medium text-sm">{label}</h4>
                                  <div 
                                    className={`cursor-pointer p-3 rounded-md border transition-all hover:shadow-sm ${
                                      selectedAspect === aspectKey
                                        ? `bg-${selectedTradition.color}-100 border-${selectedTradition.color}-300`
                                        : `bg-${selectedTradition.color}-50/50 border border-${selectedTradition.color}-100 hover:bg-${selectedTradition.color}-100/70`
                                    }`}
                                    onClick={() => setSelectedAspect(aspectKey)}
                                  >
                                    <p className="text-xs leading-relaxed">
                                      {selectedTradition.overview[aspectKey]}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="ideas" className="mt-4">
                          {selectedTradition.deepDive ? (
                            <div className="space-y-4">
                              <div>
                                <h3 className="font-semibold mb-3">Key Ideas</h3>
                                <ul className="space-y-2">
                                  {selectedTradition.deepDive.keyIdeas.map((idea, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-sm">{idea}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              {selectedTradition.deepDive.notes && (
                                <div>
                                  <h3 className="font-semibold mb-3">Background</h3>
                                  <div className="p-4 bg-muted/50 rounded-lg">
                                    <p className="text-sm leading-relaxed">{selectedTradition.deepDive.notes}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-full text-center">
                              <div className="space-y-3">
                                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50" />
                                <div>
                                  <h3 className="font-semibold text-lg mb-1">Deep Dive Coming Soon</h3>
                                  <p className="text-sm text-muted-foreground max-w-sm">
                                    Detailed key ideas and analysis for this tradition are being prepared.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </TabsContent>
                        
                        <TabsContent value="references" className="mt-4">
                          <div className="space-y-4">
                            <h3 className="font-semibold">Further Reading</h3>
                            <div className="space-y-3">
                              {selectedTradition.references.map((ref, index) => {
                                const getIcon = (type?: string) => {
                                  switch (type) {
                                    case 'book': return Book;
                                    case 'article': return FileText;
                                    case 'video': return PlayCircle;
                                    default: return ExternalLink;
                                  }
                                };
                                const IconComponent = getIcon(ref.type);
                                
                                return (
                                  <Card key={index} className="hover:shadow-sm transition-shadow">
                                    <CardContent className="p-3">
                                      <div className="flex items-start gap-3">
                                        <IconComponent className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                        <div className="flex-1">
                                          <a 
                                            href={ref.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="font-medium text-primary hover:underline block mb-1 text-sm"
                                          >
                                            {ref.title}
                                          </a>
                                          {ref.author && (
                                            <p className="text-xs text-muted-foreground mb-1">
                                              By {ref.author} {ref.year && `(${ref.year})`}
                                            </p>
                                          )}
                                          {ref.description && (
                                            <p className="text-xs text-muted-foreground">{ref.description}</p>
                                          )}
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                );
                              })}
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="h-full flex items-center justify-center text-center">
                    <div className="space-y-3">
                      <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50" />
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Select a Tradition</h3>
                        <p className="text-sm text-muted-foreground max-w-sm">
                          Click any tradition on the timeline to see its details and key questions.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Middle Pane - Aspect Comparison */}
              <div className="col-span-12 md:col-span-8 lg:col-span-9">
                {selectedAspect ? (
                  <div className="space-y-4 h-full overflow-y-auto">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-semibold">{ROW_LABELS[selectedAspect]}</h2>
                        <p className="text-sm text-muted-foreground">How all traditions approach this question</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedAspect(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {getTraditionsForAspect(selectedAspect).map((tradition) => (
                        <Card 
                          key={tradition.id}
                          className={`transition-all border-l-4 border-l-${tradition.color}-500 ${
                            selectedTradition?.id === tradition.id 
                              ? `ring-2 ring-${tradition.color}-500/50 shadow-md bg-${tradition.color}-50/50` 
                              : 'hover:shadow-md'
                          }`}
                          onClick={() => handleTraditionSelect(tradition)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge 
                                className={`bg-${tradition.color}-100 text-${tradition.color}-700 border-${tradition.color}-200`}
                                variant="outline"
                              >
                                {tradition.family}
                              </Badge>
                              <h3 className={`font-semibold text-lg text-${tradition.color}-700`}>
                                {tradition.name}
                              </h3>
                              <span className="text-xs text-muted-foreground ml-auto">
                                {formatYear(tradition.firstYear)}
                              </span>
                            </div>
                            <div className={`p-4 rounded-lg bg-${tradition.color}-50/50 border border-${tradition.color}-100`}>
                              <p className="text-sm leading-relaxed">
                                {tradition.overview[selectedAspect]}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-center">
                    <div className="space-y-3">
                      <Target className="h-12 w-12 mx-auto text-muted-foreground/50" />
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Compare Aspects</h3>
                        <p className="text-sm text-muted-foreground max-w-md">
                          Click on any aspect (Reality, Self, Problem, Response, Aim) in the tradition cards to see how all traditions approach that fundamental question.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          ) : (
            // Three-tile Dashboard Layout (initial view)
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
              {/* Left Tile - Historic Timeline */}
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Historic Timeline
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Journey through 14,000 years of human wisdom
                  </p>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                  <div className="space-y-2">
                    {timeline.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleTraditionSelect(t)}
                        className={`w-full text-left p-3 rounded-lg transition-all hover:bg-${t.color}-50 hover:border-${t.color}-200 border border-transparent`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full bg-${t.color}-400`}></div>
                            <span className="text-sm font-medium">{t.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {formatYear(t.firstYear)}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Middle Tile - Browse Traditions */}
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5" />
                    Browse Traditions
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {filtered.length} philosophical and religious traditions
                  </p>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                  <div className="grid grid-cols-1 gap-3">
                    {filtered.map((t) => (
                      <Card 
                        key={t.id} 
                        className={`cursor-pointer transition-all border-l-4 border-l-${t.color}-500 hover:shadow-md hover:scale-[1.02]`}
                        onClick={() => handleTraditionSelect(t)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`h-2 w-2 rounded-full bg-${t.color}-400`}></div>
                            <div className={`font-semibold text-sm text-${t.color}-700`}>{t.name}</div>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              className={`text-xs bg-${t.color}-100 text-${t.color}-700 border-${t.color}-200`}
                              variant="outline"
                            >
                              {t.family}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatYear(t.firstYear)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
                            {t.overview.reality}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Right Tile - Tradition Details */}
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Tradition Details
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Click a tradition to explore its philosophy
                  </p>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <Info className="h-12 w-12 mx-auto text-muted-foreground/50" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">No Selection</h3>
                      <p className="text-sm text-muted-foreground max-w-sm">
                        Select a tradition from the timeline or browse list to see detailed information about its beliefs and practices.
                      </p>
                    </div>
                    <div className="pt-4 space-y-2 text-xs text-muted-foreground">
                      <p>💡 <strong>Tip:</strong> Use the search bar above to find specific concepts</p>
                      <p>🎯 <strong>Tip:</strong> Click on any tradition to dive deep into its worldview</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Footer */}
          <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container max-w-7xl mx-auto px-4 py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Info className="w-4 h-4" />
                  References link to respected sources like Stanford Encyclopedia, Britannica, and canonical texts.
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/Sum1Solutions/philo-explorer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    <BookOpen className="w-4 h-4" />
                    Documentation
                  </a>
                  <a
                    href="https://buymeacoffee.com/jon7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-amber-600 transition-colors flex items-center gap-1"
                    title="Support this project"
                  >
                    <Book className="w-4 h-4" />
                    Buy me a book
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
