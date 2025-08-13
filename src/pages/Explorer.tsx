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

import React, { useMemo, useState, useCallback } from "react";
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
  ChevronLeft
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
  response: "Response / solution",
  aim: "Ultimate aim / message",
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
    color: "brown",
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
  
  // Timeline zoom and pan state
  const [timelineZoom, setTimelineZoom] = useState(1); // 1 = 100%, 2 = 200%, etc.
  const [timelinePan, setTimelinePan] = useState(0); // Horizontal offset in pixels
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, pan: 0 });

  // Get tradition data by ID
  const getTraditionById = useCallback((id: string | null): Tradition | null => {
    if (!id) return null;
    return DATA.find(t => t.id === id) || null;
  }, []);

  // Handle tradition selection
  const handleTraditionSelect = useCallback((tradition: Tradition) => {
    setSelectedTradition(tradition);
    setSelectedId(tradition.id);
    // Clear aspect selection when switching traditions
    setSelectedAspect(null);
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
  }, []);

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

  // Filter traditions based on search query and cutoff year
  const filtered = useMemo(() => {
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
    
    if (!q) return base;
    
    return base.filter((t) =>
      [
        t.name,
        t.family,
        ...Object.values(t.overview),
        t.deepDive?.notes ?? "",
        ...(t.deepDive?.keyIdeas ?? []),
      ]
        .join("\n")
        .toLowerCase()
        .includes(q)
    );
  }, [query, cutoffYear, selectedId]);

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
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Layers className="w-6 h-6" />
              <h1 className="text-2xl md:text-3xl font-semibold">Philosophy & Religion Explorer</h1>
            </div>
            <p className="text-muted-foreground max-w-4xl">
              📚 <strong>Welcome, student explorers!</strong> This tool helps you discover how different cultures and thinkers throughout history have answered life's biggest questions.
              Start by clicking any tradition on the left, then explore their ideas and compare them with others.
            </p>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search concepts, e.g., anatta, Logos, moksha, revolt..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              {(selectedTradition || selectedAspect) && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleClearSelection}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline - Full Width */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-visible">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <Card className="p-4 pb-32 relative z-10 overflow-visible min-h-[200px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium">Timeline</div>
                <div className="flex items-center gap-1 border rounded-md">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={() => setTimelineZoom(Math.max(0.5, timelineZoom - 0.25))}
                    disabled={timelineZoom <= 0.5}
                  >
                    <ZoomOut className="h-3.5 w-3.5" />
                  </Button>
                  <span className="text-xs px-2 min-w-[3rem] text-center">
                    {Math.round(timelineZoom * 100)}%
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={() => setTimelineZoom(Math.min(3, timelineZoom + 0.25))}
                    disabled={timelineZoom >= 3}
                  >
                    <ZoomIn className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={() => {
                      setTimelineZoom(1);
                      setTimelinePan(0);
                    }}
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                {timelineZoom > 1 && (
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0"
                      onClick={() => setTimelinePan(Math.min(0, timelinePan + 200))}
                      disabled={timelinePan >= 0}
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0"
                      onClick={() => setTimelinePan(Math.max(-800 * (timelineZoom - 1), timelinePan - 200))}
                      disabled={timelinePan <= -800 * (timelineZoom - 1)}
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1">
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
              </div>
            </div>
            <div 
              className="relative cursor-move select-none overflow-visible"
              onWheel={(e) => {
                e.preventDefault();
                if (e.ctrlKey || e.metaKey) {
                  // Zoom with Ctrl/Cmd + wheel
                  const delta = e.deltaY > 0 ? -0.1 : 0.1;
                  setTimelineZoom(Math.max(0.5, Math.min(3, timelineZoom + delta)));
                } else {
                  // Pan with regular wheel
                  const delta = e.deltaX || e.deltaY;
                  setTimelinePan(Math.max(-800 * (timelineZoom - 1), Math.min(0, timelinePan - delta)));
                }
              }}
              onMouseDown={(e) => {
                if (timelineZoom > 1) {
                  setIsDragging(true);
                  setDragStart({ x: e.clientX, pan: timelinePan });
                  e.preventDefault();
                }
              }}
              onMouseMove={(e) => {
                if (isDragging && timelineZoom > 1) {
                  const delta = e.clientX - dragStart.x;
                  const newPan = dragStart.pan + delta;
                  setTimelinePan(Math.max(-800 * (timelineZoom - 1), Math.min(0, newPan)));
                }
              }}
              onMouseUp={() => {
                setIsDragging(false);
              }}
              onMouseLeave={() => {
                setIsDragging(false);
              }}
              // Touch support for tablets
              onTouchStart={(e) => {
                if (timelineZoom > 1 && e.touches.length === 1) {
                  setIsDragging(true);
                  setDragStart({ x: e.touches[0].clientX, pan: timelinePan });
                }
              }}
              onTouchMove={(e) => {
                if (isDragging && timelineZoom > 1 && e.touches.length === 1) {
                  const delta = e.touches[0].clientX - dragStart.x;
                  const newPan = dragStart.pan + delta;
                  setTimelinePan(Math.max(-800 * (timelineZoom - 1), Math.min(0, newPan)));
                }
              }}
              onTouchEnd={() => {
                setIsDragging(false);
              }}
            >
              <div 
                className="transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(${timelinePan}px) scaleX(${timelineZoom})`,
                  transformOrigin: 'left center'
                }}
              >
                <div className="relative min-w-[800px] h-32 pb-16">
                  {/* Timeline line */}
                  <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-200 via-blue-300 to-indigo-400"></div>
                  
                  {/* Year markers - show more detail when zoomed */}
                  <div className="absolute top-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
                    {timelineZoom >= 2 ? (
                      // Detailed markers when zoomed in
                      <>
                        <span>3000 BCE</span>
                        <span>2500 BCE</span>
                        <span>2000 BCE</span>
                        <span>1500 BCE</span>
                        <span>1000 BCE</span>
                        <span>500 BCE</span>
                        <span>1 CE</span>
                        <span>500 CE</span>
                        <span>1000 CE</span>
                        <span>1500 CE</span>
                        <span>2000 CE</span>
                      </>
                    ) : timelineZoom <= 0.75 ? (
                      // Simplified markers when zoomed out
                      <>
                        <span>Ancient</span>
                        <span>Classical</span>
                        <span>Medieval</span>
                        <span>Modern</span>
                      </>
                    ) : (
                      // Default markers
                      <>
                        <span>3000 BCE</span>
                        <span>2000 BCE</span>
                        <span>1000 BCE</span>
                        <span>1 CE</span>
                        <span>1000 CE</span>
                        <span>2000 CE</span>
                      </>
                    )}
                  </div>
                  
                  {/* Tradition dots positioned by year */}
                  {timeline.map((t) => {
                    // Calculate position (3000 BCE = -3000, 2000 CE = 2000)
                    const totalRange = 5000; // 3000 BCE to 2000 CE
                    const yearFromStart = t.firstYear + 3000; // Convert to 0-5000 range
                    const position = Math.max(0, Math.min(100, (yearFromStart / totalRange) * 100));
                    
                    return (
                      <div
                        key={t.id}
                        className="group absolute transform -translate-x-1/2"
                        style={{ left: `${position}%`, top: '24px' }}
                      >
                        <button
                          onClick={() => handleTraditionSelect(t)}
                          className="relative"
                        >
                          <div className={`h-4 w-4 rounded-full border-2 transition-all duration-200 ${
                            selectedTradition?.id === t.id 
                              ? `border-${t.color}-600 bg-${t.color}-400 scale-125 shadow-lg` 
                              : `border-${t.color}-400 bg-${t.color}-200 hover:scale-110 hover:shadow-md`
                          }`} />
                          {/* Connecting line to timeline */}
                          <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-2 ${
                            selectedTradition?.id === t.id 
                              ? `bg-${t.color}-600` 
                              : `bg-${t.color}-400`
                          }`} />
                        </button>
                        {/* Simple hover tooltip - positioned below the dot with more space */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" style={{ zIndex: 999999, position: 'absolute' }}>
                          {/* Arrow pointing up to the dot */}
                          <div className="absolute left-1/2 transform -translate-x-1/2 -top-[6px]">
                            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white dark:border-b-gray-800 drop-shadow-sm"></div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl p-3 min-w-[200px]">
                            <p className={`font-semibold text-sm text-${t.color}-700 dark:text-${t.color}-400`}>{t.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">{formatYear(t.firstYear)}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                              {t.overview.reality.substring(0, 100)}...
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Three-Pane Layout */}
      <div className="flex-1 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 py-6 h-full">
          <div className="grid grid-cols-12 gap-6 h-full">
            {/* Left Pane - Tradition Cards */}
            <div className="col-span-12 md:col-span-4 lg:col-span-3">
              <div className="space-y-4 overflow-y-auto h-full">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Traditions</h2>
                  <Badge variant="outline">{filtered.length}</Badge>
                </div>

                {/* Tradition List */}
                <div className="space-y-2">
                  {filtered.map((t) => (
                    <Card 
                      key={t.id} 
                      className={`cursor-pointer transition-all border-l-4 border-l-${t.color}-500 ${
                        selectedTradition?.id === t.id 
                          ? `ring-2 ring-${t.color}-500/50 shadow-md bg-${t.color}-50/50` 
                          : 'hover:shadow-md hover:scale-[1.02]'
                      }`}
                      onClick={() => handleTraditionSelect(t)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`font-semibold text-sm text-${t.color}-700`}>{t.name}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="relative group/badge">
                                <Badge 
                                  className={`text-xs bg-${t.color}-100 text-${t.color}-700 border-${t.color}-200 cursor-help`}
                                  variant="outline"
                                >
                                  {t.family}
                                </Badge>
                                {/* Family tooltip on hover - positioned to the right */}
                                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-200 pointer-events-none z-[9999] whitespace-nowrap">
                                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-2 max-w-xs">
                                    <p className="text-xs text-gray-700 dark:text-gray-300 whitespace-normal">{getFamilyExplanation(t.family)}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="relative group/year">
                                <span className="text-xs text-muted-foreground cursor-help">
                                  {formatYear(t.firstYear)}
                                </span>
                                {/* Year tooltip on hover - positioned to the right */}
                                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover/year:opacity-100 transition-opacity duration-200 pointer-events-none z-[9999] whitespace-nowrap">
                                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-2 max-w-xs">
                                    <p className="text-xs text-gray-700 dark:text-gray-300 whitespace-normal">{getYearExplanation(t.firstYear)}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {selectedTradition?.id === t.id && (
                            <ChevronRight className="h-4 w-4 text-primary" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Center Pane - Tradition Details */}
            <div className={`col-span-12 md:col-span-5 lg:col-span-5 ${
              !selectedTradition ? 'hidden md:flex' : ''
            }`}>
              {selectedTradition ? (
                <div className="space-y-4 overflow-y-auto h-full w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative group/family">
                        <Badge 
                          className={`bg-${selectedTradition.color}-500 text-white cursor-help`}
                        >
                          {selectedTradition.family}
                        </Badge>
                        {/* Family tooltip - positioned below */}
                        <div className="absolute left-0 top-full mt-2 opacity-0 group-hover/family:opacity-100 transition-opacity duration-200 pointer-events-none z-[9999]">
                          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-2 max-w-sm">
                            <p className="text-xs text-gray-700 dark:text-gray-300">{getFamilyExplanation(selectedTradition.family)}</p>
                          </div>
                        </div>
                      </div>
                      <h2 className={`text-xl font-bold text-${selectedTradition.color}-700`}>
                        {selectedTradition.name}
                      </h2>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <div className="relative group/date">
                        <span className="cursor-help">
                          Est. {formatYear(selectedTradition.firstYear)}
                        </span>
                        {/* Date tooltip - positioned below */}
                        <div className="absolute right-0 top-full mt-2 opacity-0 group-hover/date:opacity-100 transition-opacity duration-200 pointer-events-none z-[9999]">
                          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-2 max-w-xs">
                            <p className="text-xs text-gray-700 dark:text-gray-300">{getYearExplanation(selectedTradition.firstYear)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedTradition.deepDive?.notes && (
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">
                          {selectedTradition.deepDive.notes}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="ideas">Key Ideas</TabsTrigger>
                      <TabsTrigger value="references">References</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="mt-4 space-y-3">
                      {Object.entries(selectedTradition.overview).map(([key, content]) => {
                        const aspectKey = key as RowKey;
                        const iconMap: Record<RowKey, JSX.Element> = {
                          reality: <Globe className="h-4 w-4 text-blue-500" />,
                          self: <User className="h-4 w-4 text-green-500" />,
                          problem: <AlertCircle className="h-4 w-4 text-amber-500" />,
                          response: <Lightbulb className="h-4 w-4 text-purple-500" />,
                          aim: <Target className="h-4 w-4 text-rose-500" />
                        };
                        const icon = iconMap[aspectKey];
                        
                        return (
                          <Card 
                            key={key}
                            className={`cursor-pointer transition-all ${
                              selectedAspect === aspectKey 
                                ? 'ring-2 ring-primary/50 shadow-md' 
                                : 'hover:shadow-md'
                            }`}
                            onClick={() => handleAspectSelect(aspectKey)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="p-1.5 rounded-md bg-opacity-10 bg-current">
                                    {icon}
                                  </div>
                                  <h3 className="font-medium">
                                    {ROW_LABELS[aspectKey]}
                                  </h3>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-xs"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAspectSelect(aspectKey);
                                  }}
                                >
                                  Compare →
                                </Button>
                              </div>
                              <p className="text-sm leading-relaxed text-muted-foreground">
                                {content}
                              </p>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </TabsContent>
                    
                    <TabsContent value="ideas" className="mt-4">
                      {selectedTradition.deepDive?.keyIdeas && selectedTradition.deepDive.keyIdeas.length > 0 ? (
                        <div className="space-y-3">
                          {selectedTradition.deepDive.keyIdeas.map((idea, i) => (
                            <Card key={i}>
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 mt-0.5 p-1.5 rounded-md bg-primary/10 text-primary">
                                    <Lightbulb className="h-4 w-4" />
                                  </div>
                                  <p className="text-sm leading-relaxed text-muted-foreground">
                                    {idea}
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Lightbulb className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>Key ideas coming soon</p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="references" className="mt-4">
                      {selectedTradition.references.length > 0 ? (
                        <div className="space-y-3">
                          {selectedTradition.references.map((ref, i) => (
                            <Card key={i}>
                              <CardContent className="p-4">
                                <a 
                                  href={ref.url} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="block group"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                                        {ref.title}
                                      </h4>
                                      {(ref.author || ref.year) && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                          {ref.author && <span>{ref.author}</span>}
                                          {ref.author && ref.year && <span className="mx-1">•</span>}
                                          {ref.year && <span>{ref.year}</span>}
                                        </p>
                                      )}
                                      {ref.description && (
                                        <p className="mt-2 text-xs text-muted-foreground">
                                          {ref.description}
                                        </p>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {ref.type === 'book' && <Book className="h-4 w-4 text-amber-500" />}
                                      {ref.type === 'article' && <FileText className="h-4 w-4 text-blue-500" />}
                                      {ref.type === 'video' && <PlayCircle className="h-4 w-4 text-red-500" />}
                                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                  </div>
                                </a>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>No references available</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-center p-6">
                  <div className="space-y-6 max-w-md">
                    <div className="space-y-3">
                      <Layers className="h-16 w-16 mx-auto text-primary/60" />
                      <h3 className="font-bold text-xl text-foreground">How to Explore Philosophy & Religion</h3>
                    </div>
                    
                    <div className="space-y-4 text-left">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                        <div>
                          <p className="font-medium text-sm">Pick a Tradition</p>
                          <p className="text-xs text-muted-foreground">Click any tradition on the left (like Buddhism or Christianity) to learn about their beliefs</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                        <div>
                          <p className="font-medium text-sm">Explore Their Ideas</p>
                          <p className="text-xs text-muted-foreground">Read about their views on reality, self, problems, and solutions</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                        <div>
                          <p className="font-medium text-sm">Compare & Contrast</p>
                          <p className="text-xs text-muted-foreground">Click "Compare →" next to any topic to see how all traditions approach it</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground italic">
                        💡 Try clicking "Buddhism" or "Stoicism" to get started!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Pane - Aspect Comparison */}
            <div className={`col-span-12 md:col-span-3 lg:col-span-4 ${
              !selectedAspect ? 'hidden lg:flex' : ''
            }`}>
              {selectedAspect ? (
                <div className="space-y-4 overflow-y-auto h-full w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        {selectedAspect === 'reality' && <Globe className="h-5 w-5 text-primary" />}
                        {selectedAspect === 'self' && <User className="h-5 w-5 text-primary" />}
                        {selectedAspect === 'problem' && <AlertCircle className="h-5 w-5 text-primary" />}
                        {selectedAspect === 'response' && <Lightbulb className="h-5 w-5 text-primary" />}
                        {selectedAspect === 'aim' && <Target className="h-5 w-5 text-primary" />}
                      </div>
                      <div>
                        <h2 className="text-lg font-bold">{ROW_LABELS[selectedAspect]}</h2>
                        <p className="text-sm text-muted-foreground">Across all traditions</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedAspect(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {getTraditionsForAspect(selectedAspect).map((tradition) => (
                      <Card 
                        key={tradition.id}
                        className={`cursor-pointer transition-all border-l-4 border-l-${tradition.color}-500 ${
                          selectedTradition?.id === tradition.id 
                            ? `ring-2 ring-${tradition.color}-500/50 shadow-md` 
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
                            <h3 className={`font-semibold text-${tradition.color}-700`}>
                              {tradition.name}
                            </h3>
                            <span className="text-xs text-muted-foreground ml-auto">
                              {formatYear(tradition.firstYear)}
                            </span>
                          </div>
                          <div className={`p-3 rounded-md bg-${tradition.color}-50/50 border border-${tradition.color}-100`}>
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
                      <p className="text-sm text-muted-foreground max-w-sm">
                        Select an aspect from the center pane to see how all traditions approach that topic.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
  );
}