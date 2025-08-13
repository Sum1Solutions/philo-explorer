/**
 * Explorer.tsx
 * 
 * Main component for the Philosophy & Religion Explorer application.
 * Provides an interactive interface to explore and compare different
 * philosophical and religious traditions.
 * 
 * Features:
 * - Browse traditions by category (Eastern, Abrahamic, Modern, etc.)
 * - Compare aspects (reality, self, problem, response, aim) across traditions
 * - View detailed information and references for each tradition
 * - Search and filter functionality
 * - Responsive design for all screen sizes
 * 
 * Data Structure:
 * - Traditions are stored in the DATA array with consistent fields
 * - Each tradition has overview texts for key philosophical aspects
 * - References include books, articles, and videos for further study
 * 
 * State Management:
 * - selectedId: Currently selected tradition ID
 * - query: Search query for filtering traditions
 * - activeTradition: Currently viewed tradition details
 * - comparison: State for comparison mode and selected aspects
 */

import React, { useMemo, useState, useCallback, useEffect } from "react";
// UI Components
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// Icons
import { 
  Search, 
  ArrowLeft, 
  BookOpen, 
  ExternalLink, 
  Info,
  X,
  Layers,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  BookMarked,
  BookText,
  Globe,
  Book,
  FileText,
  PlayCircle,
  User,
  AlertCircle,
  Lightbulb,
  Target,
  Calendar
} from "lucide-react";

// ------------------------
// Data Model
// ------------------------

type RowKey = 'reality' | 'self' | 'problem' | 'response' | 'aim';
type ViewMode = 'grid' | 'comparison';

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

interface ComparisonState {
  isComparing: boolean;
  selectedAspect: RowKey | null;
  comparedTraditions: string[];
  mode: 'overview' | 'aspect' | 'tradition';
  aspect: RowKey | null;
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
    firstYear: -800,
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
];

// UI Helpers
// ------------------------

/**
 * Highlights a section of text with a yellow background
 * @param children - The text to highlight
 */
const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">{children}</span>
);

/**
 * A component that truncates text and allows expanding/collapsing
 * @param text - The text to truncate
 * @param color - The color to use for the expand/collapse button
 * @param maxLength - The maximum length before truncating
 */
const TruncatedText = ({ text, color = "primary", maxLength = 120 }: { text: string, color?: string, maxLength?: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > maxLength;
  
  if (!shouldTruncate) return <p className="text-sm leading-relaxed text-foreground/90">{text}</p>;
  
  return (
    <div className="space-y-1">
      <p className="text-sm leading-relaxed text-foreground/90">
        {isExpanded ? text : `${text.substring(0, maxLength)}...`}
      </p>
      <Button 
        variant="ghost" 
        size="sm" 
        className={`h-6 px-2 text-xs text-${color}-600 hover:text-${color}-800 dark:text-${color}-400 dark:hover:text-${color}-300 -mt-1`}
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? (
          <>
            <ChevronUp className="h-3 w-3 mr-1" />
            <span>Show less</span>
          </>
        ) : (
          <>
            <ChevronDown className="h-3 w-3 mr-1" />
            <span>Read more</span>
          </>
        )}
      </Button>
    </div>
  );
};

/**
 * A single row in the tradition overview
 * @param label - The label for the row
 * @param text - The text for the row
 */
const Row = React.memo(({ label, text }: { label: string; text: string }) => (
  <div className="flex flex-col gap-1">
    <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
    <div className="text-sm">{text}</div>
  </div>
));

/**
 * Formats a year with BCE/CE suffix and adds a tooltip explaining the meaning
 * @param year - The year to format (negative for BCE, positive for CE)
 * @returns Formatted year string with appropriate suffix
 */
// Format year with BCE/CE suffix
const formatYear = (year: number | null | undefined): string => {
  if (year == null) return '';
  return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
};

export default function Explorer() {
  // State management
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [cutoffYear, setCutoffYear] = useState<number | null>(null);
  const [activeTradition, setActiveTradition] = useState<Tradition | null>(null);
  const [activeAspect, setActiveAspect] = useState<RowKey | null>(null);
  const [comparison, setComparison] = useState<ComparisonState>({
    isComparing: false,
    selectedAspect: null,
    comparedTraditions: [],
    mode: 'overview',
    aspect: null
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Get active tradition data
  const getActiveTradition = useCallback((id: string | null): Tradition | null => {
    if (!id) return null;
    return DATA.find(t => t.id === id) || null;
  }, []);

  // Update active tradition when selectedId changes
  useEffect(() => {
    if (selectedId) {
      const tradition = getActiveTradition(selectedId);
      setActiveTradition(tradition);
    } else {
      setActiveTradition(null);
    }
  }, [selectedId, getActiveTradition]);
  
  // Handle back navigation
  const handleBack = useCallback(() => {
    setSelectedId(null);
    setActiveTradition(null);
  }, []);
  
  // Handle tradition selection
  const handleTraditionSelect = useCallback((tradition: Tradition, aspect: RowKey | null = null) => {
    setSelectedId(tradition.id);
    setActiveTradition(tradition);
    setActiveAspect(aspect);
  }, []);

  /**
   * Formats a year with BCE/CE suffix and adds a tooltip explaining the meaning
   * @param year - The year to format (negative for BCE, positive for CE)
   * @returns Formatted year string with appropriate suffix
   */
  const formatYearCallback = useCallback((year: number | null | undefined): string => {
    if (year == null) return '';
    return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
  }, []);
  
  // Toggle comparison mode for a tradition
  const toggleComparison = useCallback((traditionId: string) => {
    setComparison(prev => {
      const isAlreadyInComparison = prev.comparedTraditions.includes(traditionId);
      
      if (isAlreadyInComparison) {
        // Remove from comparison
        return {
          ...prev,
          comparedTraditions: prev.comparedTraditions.filter(id => id !== traditionId),
          isComparing: prev.comparedTraditions.length > 1
        };
      } else if (prev.comparedTraditions.length < 3) {
        // Add to comparison (max 3)
        const newComparedTraditions = [...prev.comparedTraditions, traditionId];
        return {
          ...prev,
          comparedTraditions: newComparedTraditions,
          isComparing: newComparedTraditions.length > 1
        };
      }
      return prev;
    });
  }, []);

  // Check if a tradition is selected for comparison
  const isSelectedForComparison = useCallback((traditionId: string) => {
    return comparison.comparedTraditions.includes(traditionId);
  }, [comparison.comparedTraditions]);
  
  // Close comparison view
  const closeComparison = useCallback(() => {
    setComparison(prev => ({
      ...prev,
      isComparing: false,
      comparedTraditions: [],
      selectedAspect: null,
      mode: 'overview',
      aspect: null
    }));
  }, []);
  
  // Open aspect comparison view
  const openAspectComparison = useCallback((aspect: RowKey) => {
    setComparison(prev => ({
      ...prev,
      aspect
    }));
  }, []);
  
  // Get traditions for comparison
  const getTraditionsForComparison = useCallback((aspect: RowKey) => {
    return DATA
      .filter(t => t.overview[aspect])
      .sort((a, b) => a.name.localeCompare(b.name));
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
  
  // Define a type that extends Tradition with safe defaults
  type SafeTradition = Omit<Tradition, 'deepDive'> & {
    deepDive: {
      keyIdeas: string[];
      notes: string;
    };
  };

  // Get active tradition data with safe defaults
  const getSafeTradition = useCallback((tradition: Tradition | null): SafeTradition => {
    if (!tradition) {
      return {
        id: '',
        name: 'Select a tradition',
        family: '',
        color: 'gray',
        firstYear: 0,
        overview: {
          reality: '',
          self: '',
          problem: '',
          response: '',
          aim: ''
        },
        deepDive: {
          keyIdeas: [],
          notes: ''
        },
        references: []
      };
    }
    
    return {
      ...tradition,
      deepDive: {
        keyIdeas: tradition.deepDive?.keyIdeas || [],
        notes: tradition.deepDive?.notes || ''
      }
    };
  }, []);

  const safeActiveTradition = getSafeTradition(activeTradition);

  // Comparison view component
  const ComparisonView = ({ aspect, onBack }: { aspect: RowKey, onBack: () => void }) => {
    const traditions = useMemo(() => {
      const ids = comparison.comparedTraditions;
      return ids.length
        ? DATA.filter(t => ids.includes(t.id))
        : getTraditionsForComparison(aspect);
    }, [comparison.comparedTraditions, aspect, getTraditionsForComparison]);

    // Define icon mapping for each aspect
    const aspectIcon = useMemo(() => {
      const iconMap: Record<string, JSX.Element> = {
        reality: <Globe className="h-5 w-5 text-primary" />,
        self: <User className="h-5 w-5 text-primary" />,
        problem: <AlertCircle className="h-5 w-5 text-primary" />,
        response: <Lightbulb className="h-5 w-5 text-primary" />,
        aim: <Target className="h-5 w-5 text-primary" />
      };
      return iconMap[aspect] || <Layers className="h-5 w-5 text-primary" />;
    }, [aspect]);

    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-primary/5 to-transparent border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Button
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onBack();
                }}
                className="flex items-center gap-2 hover:bg-primary/10"
                aria-label="Back to all traditions"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all traditions
              </Button>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {traditions.length} traditions
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-semibold flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-primary/10">
                {aspectIcon}
              </div>
              <span>Comparing: {ROW_LABELS[aspect]}</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Explore how different traditions approach the concept of {ROW_LABELS[aspect].toLowerCase()}. 
              Click on any card to view the full tradition details.
            </p>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {traditions.map((tradition) => (
            <Card 
              key={tradition.id} 
              className={`hover:shadow-lg transition-all border-l-4 border-l-${tradition.color}-500 hover:border-${tradition.color}-600 group/card overflow-hidden relative cursor-pointer hover:scale-[1.02] hover:-translate-y-0.5 bg-gradient-to-br from-white to-${tradition.color}-50/30 dark:from-gray-950 dark:to-${tradition.color}-950/20`}
              onClick={() => setActiveTradition(tradition)}
            >
              <div className={`absolute inset-0 bg-${tradition.color}-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none`}></div>
              <CardHeader className="pb-2 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge 
                      className={`rounded-full px-2 py-1 text-xs bg-${tradition.color}-500 text-white shadow-sm`}
                    >
                      {tradition.family}
                    </Badge>
                    <CardTitle className={`text-lg font-semibold flex items-center gap-3`}>
                      <span className={`text-${tradition.color}-700 dark:text-${tradition.color}-400`}>{tradition.name}</span>
                    </CardTitle>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="cursor-help">
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Est. {formatYear(tradition.firstYear)}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p className="text-xs">This date may represent founding year, birth year of founder, or first historical mention</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                <div className={`p-4 rounded-md bg-${tradition.color}-50/50 dark:bg-${tradition.color}-900/10 border border-${tradition.color}-100 dark:border-${tradition.color}-900/30 group-hover/card:border-${tradition.color}-200 dark:group-hover/card:border-${tradition.color}-800/50 transition-colors`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-md bg-${tradition.color}-100 dark:bg-${tradition.color}-900/30`}>
                      {aspectIcon}
                    </div>
                    <div className={`text-sm font-medium text-${tradition.color}-700 dark:text-${tradition.color}-400`}>{ROW_LABELS[aspect]}</div>
                  </div>
                  <TruncatedText text={tradition.overview[aspect]} color={tradition.color} />
                </div>
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`text-${tradition.color}-600 hover:text-${tradition.color}-800 hover:bg-${tradition.color}-100 dark:hover:bg-${tradition.color}-900/30 ring-offset-1 hover:ring-1 hover:ring-${tradition.color}-400 transition-all`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTradition(tradition);
                    }}
                  >
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>View full details</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  // Helper function to truncate text with expand/collapse functionality
  const TruncatedText = ({ text, color }: { text: string; color: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isLongText = text.length > 150;
    const displayText = isLongText && !isExpanded ? `${text.substring(0, 150)}...` : text;

    return (
      <div className="relative">
        <p className="text-sm leading-snug">{displayText}</p>
        {isLongText && (
          <Button
            variant="ghost"
            size="sm"
            className={`h-6 px-1 text-xs text-${color}-600 hover:text-${color}-800 absolute bottom-0 right-0`}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </Button>
        )}
      </div>
    );
  };


  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-background to-muted/30 p-6 md:p-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6" />
            <h1 className="text-2xl md:text-3xl font-semibold">Interactive Philosophy & Religion Explorer</h1>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            Start with quick overviews, then drill down into key ideas and primary/secondary references from sources like the
            <Highlight>Stanford Encyclopedia</Highlight>, <Highlight>Britannica</Highlight>, and canonical texts.
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
          </div>
        </div>

        {/* Timeline */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium">Timeline of first introduction</div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  const startIdx = currentStepIndex === -1 ? 0 : currentStepIndex + 1;
                  const nextIdx = Math.min(startIdx, timeline.length - 1);
                  setSelectedId(timeline[nextIdx].id);
                  setCutoffYear(null);
                }}
              >
                Next
              </Button>
              <Button size="sm" variant="ghost" onClick={() => { setSelectedId(null); setCutoffYear(null); }}>
                Reset
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="h-1 w-full rounded bg-foreground/10" />
            <div className="mt-2 overflow-x-auto">
              <div className="min-w-full flex items-center gap-6 pr-4">
                {timeline.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setSelectedId(t.id); setCutoffYear(null); }}
                    className="group flex flex-col items-center gap-1"
                    title={`${t.name} • ${formatYear(t.firstYear)}`}
                  >
                    <div className={`h-4 w-4 rounded-full border-2 transition-transform border-${t.color}-900 bg-${t.color}-100 group-hover:scale-110`} />
                    <div className="text-xs font-medium">{t.name}</div>
                    <div className="text-[10px] text-muted-foreground">{formatYear(t.firstYear)}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          {selectedId && (
            <div className="mt-3 text-xs text-muted-foreground">
              Showing: {timeline.find((t) => t.id === selectedId)?.name} ({formatYear(timeline.find((t) => t.id === selectedId)!.firstYear)})
            </div>
          )}
          {!selectedId && cutoffYear != null && (
            <div className="mt-3 text-xs text-muted-foreground">Showing traditions up to {formatYear(cutoffYear)}</div>
          )}
        </Card>

        {/* Main Content */}
        {comparison.aspect ? (
          <ComparisonView aspect={comparison.aspect} onBack={closeComparison} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((t) => (
              <Card 
                key={t.id} 
                className={`hover:shadow-lg transition-all border-l-4 border-l-${t.color}-500 hover:border-${t.color}-600 group/card overflow-hidden relative cursor-pointer hover:scale-[1.02] hover:-translate-y-0.5 bg-gradient-to-br from-white to-${t.color}-50/30 dark:from-gray-950 dark:to-${t.color}-950/20`}
                onClick={() => setActiveTradition(t)}
              >
                <div className={`absolute inset-0 bg-${t.color}-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none`}></div>
                <CardHeader className="pb-2 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge 
                        className={`rounded-full px-2 py-1 text-xs bg-${t.color}-500 text-white shadow-sm`}
                      >
                        {t.family}
                      </Badge>
                      <CardTitle className="text-lg font-semibold flex items-center gap-3">
                        <span className={`text-${t.color}-700 dark:text-${t.color}-400`}>{t.name}</span>
                      </CardTitle>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Est. {formatYear(t.firstYear)}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p className="text-xs">This date may represent founding year, birth year of founder, or first historical mention</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-2">
                  {Object.entries(ROW_LABELS).map(([key, label]) => {
                    // Define icon mapping for each aspect
                    const iconMap: Record<string, JSX.Element> = {
                      reality: <Globe className={`h-4 w-4 text-${t.color}-500`} />,
                      self: <User className={`h-4 w-4 text-${t.color}-500`} />,
                      problem: <AlertCircle className={`h-4 w-4 text-${t.color}-500`} />,
                      response: <Lightbulb className={`h-4 w-4 text-${t.color}-500`} />,
                      aim: <Target className={`h-4 w-4 text-${t.color}-500`} />
                    };
                    
                    return (
                      <div 
                        key={key}
                        className={`p-3 rounded-md hover:bg-${t.color}-50 dark:hover:bg-${t.color}-900/20 cursor-pointer transition-all group/aspect relative border border-transparent hover:border-${t.color}-200 hover:shadow-md`}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Direct drill-down to specific aspect
                          handleTraditionSelect(t, key as RowKey);
                        }}
                        onMouseEnter={(e) => {
                          // Add visual feedback on hover
                          const target = e.currentTarget;
                          target.style.backgroundColor = `rgba(var(--${t.color}-500), 0.1)`;
                          target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          // Reset on mouse leave
                          const target = e.currentTarget;
                          target.style.backgroundColor = '';
                          target.style.transform = '';
                        }}
                      >
                        <div className={`absolute inset-0 bg-${t.color}-500/5 opacity-0 group-hover/aspect:opacity-100 transition-opacity rounded pointer-events-none`}></div>
                        <div className={`absolute inset-0 border-2 border-${t.color}-500/0 group-hover/aspect:border-${t.color}-500/30 transition-all rounded pointer-events-none`}></div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-md bg-${t.color}-100 dark:bg-${t.color}-900/30`}>
                              {iconMap[key] || <Info className={`h-4 w-4 text-${t.color}-500`} />}
                            </div>
                            <div className={`text-sm font-medium text-${t.color}-700 dark:text-${t.color}-400`}>{label}</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`h-6 w-6 text-${t.color}-500 hover:text-${t.color}-700 hover:bg-${t.color}-100 dark:hover:bg-${t.color}-900/30 ring-offset-1 hover:ring-1 hover:ring-${t.color}-400 transition-all opacity-0 group-hover/aspect:opacity-100`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openAspectComparison(key as RowKey);
                                    }}
                                  >
                                    <Layers className="h-3.5 w-3.5" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  <p>Compare {label.toLowerCase()} across all traditions</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`h-6 w-6 text-${t.color}-500 hover:text-${t.color}-700 hover:bg-${t.color}-100 dark:hover:bg-${t.color}-900/30 ring-offset-1 hover:ring-1 hover:ring-${t.color}-400 transition-all opacity-0 group-hover/aspect:opacity-100`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleTraditionSelect(t, key as RowKey);
                                    }}
                                  >
                                    <ChevronRight className="h-3.5 w-3.5" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  <p>View details about {label.toLowerCase()}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        <TruncatedText text={t.overview[key as RowKey]} color={t.color} />
                        {key !== 'aim' && <div className="h-px w-full bg-border mt-3 opacity-50" />}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-6">
        <Info className="w-4 h-4" />
        References are external links to respected sources. I can add or swap any source list you prefer (SEP, IEP, Oxford, Cambridge, Yale, etc.).
      </p>

      {/* Drilldown Dialog */}
      <Dialog 
        open={!!activeTradition} 
        onOpenChange={(open) => {
          if (!open) {
            setActiveTradition(null);
            setActiveAspect(null);
          }
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
          {activeTradition && (
            <div className="flex flex-col h-full">
              <DialogHeader className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="outline" 
                      className={`rounded-full px-2 py-1 text-xs border-${safeActiveTradition.color}-200 bg-${safeActiveTradition.color}-500/10 text-${safeActiveTradition.color}-700 dark:text-${safeActiveTradition.color}-300`}
                    >
                      {safeActiveTradition.family}
                    </Badge>
                    <DialogTitle className={`text-2xl font-bold text-${safeActiveTradition.color}-700 dark:text-${safeActiveTradition.color}-400`}>
                      {safeActiveTradition.name}
                    </DialogTitle>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">
                          Est. {formatYear(safeActiveTradition.firstYear)}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This date may represent founding year, birth year of founder, or first historical mention</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <DialogDescription className="pt-2">
                  {safeActiveTradition.deepDive.notes || "Deeper context, key ideas, and curated references."}
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue={activeAspect ? "overview" : "overview"} className="flex-1 flex flex-col mt-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Overview</span>
                  </TabsTrigger>
                  <TabsTrigger value="ideas" className="flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    <span>Key Ideas</span>
                  </TabsTrigger>
                  <TabsTrigger value="references" className="flex items-center gap-2">
                    <BookText className="h-4 w-4" />
                    <span>References</span>
                  </TabsTrigger>
                  <TabsTrigger value="compare" className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    <span>Compare</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="flex-1 overflow-auto py-2">
                  {activeAspect && (
                    <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-md bg-primary/10">
                            {activeAspect === 'reality' && <Globe className="h-4 w-4 text-primary" />}
                            {activeAspect === 'self' && <User className="h-4 w-4 text-primary" />}
                            {activeAspect === 'problem' && <AlertCircle className="h-4 w-4 text-primary" />}
                            {activeAspect === 'response' && <Lightbulb className="h-4 w-4 text-primary" />}
                            {activeAspect === 'aim' && <Target className="h-4 w-4 text-primary" />}
                          </div>
                          <h3 className="text-sm font-medium">Viewing {ROW_LABELS[activeAspect]}</h3>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs" 
                          onClick={() => setActiveAspect(null)}
                        >
                          <X className="h-3.5 w-3.5 mr-1" />
                          <span>Clear focus</span>
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(safeActiveTradition.overview).map(([key, content]) => {
                      const iconMap: Record<RowKey, JSX.Element> = {
                        reality: <Globe className="h-4 w-4 text-blue-500" />,
                        self: <User className="h-4 w-4 text-green-500" />,
                        problem: <AlertCircle className="h-4 w-4 text-amber-500" />,
                        response: <Lightbulb className="h-4 w-4 text-purple-500" />,
                        aim: <Target className="h-4 w-4 text-rose-500" />
                      };
                      const icon = iconMap[key as RowKey];
                      
                      const isWide = key === 'aim';
                      
                      return (
                        <Card 
                          key={key}
                          className={`group hover:shadow-md transition-shadow ${isWide ? 'md:col-span-2' : ''} ${activeAspect === key ? 'ring-2 ring-primary/50 shadow-md' : ''}`}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-md bg-opacity-10 bg-current">
                                {icon}
                              </div>
                              <div className="flex items-center justify-between w-full">
                                <CardTitle className="text-sm font-medium">
                                  {ROW_LABELS[key as keyof typeof ROW_LABELS]}
                                </CardTitle>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 px-2 text-xs text-muted-foreground"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openAspectComparison(key as RowKey);
                                  }}
                                >
                                  Compare All
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {content as string}
                            </p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
                <TabsContent value="ideas" className="flex-1 overflow-auto py-2">
                  <div className="space-y-4">
                    {safeActiveTradition.deepDive.keyIdeas.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {safeActiveTradition.deepDive.keyIdeas.map((idea: string, i: number) => (
                          <div 
                            key={i} 
                            className="group relative p-4 rounded-lg border bg-card hover:bg-accent/30 transition-colors"
                          >
                            <div className="absolute -left-1 top-4 w-1 h-6 bg-primary rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-0.5 p-1.5 rounded-md bg-primary/10 text-primary">
                                <Lightbulb className="h-4 w-4" />
                              </div>
                              <p className="text-sm leading-relaxed text-muted-foreground">
                                {idea}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-40 flex items-center justify-center rounded-lg border border-dashed">
                        <p className="text-sm text-muted-foreground">Key ideas forthcoming.</p>
                      </div>
                    )}
                    {safeActiveTradition.deepDive.notes && (
                      <div className="mt-6 p-4 rounded-lg bg-muted/30 border">
                        <div className="flex items-center gap-2 mb-2">
                          <Info className="h-4 w-4 text-muted-foreground" />
                          <h2 className="text-xl font-semibold">Notes</h2>
                        </div>
                        <p className="text-sm text-muted-foreground pl-6">
                          {safeActiveTradition.deepDive.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="references" className="flex-1 overflow-auto py-2">
                  <div className="space-y-3">
                    {safeActiveTradition.references.length > 0 ? (
                      <div className="grid grid-cols-1 gap-3">
                        {safeActiveTradition.references.map((r: any, i: number) => (
                          <a 
                            key={i} 
                            href={r.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="group block"
                          >
                            <div className="p-4 rounded-lg border hover:border-primary/30 hover:bg-accent/20 transition-colors">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h4 className="text-sm font-medium text-foreground group-hover:underline truncate">
                                      {r.title}
                                    </h4>
                                    {r.type && (
                                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground uppercase tracking-wider">
                                        {r.type}
                                      </span>
                                    )}
                                  </div>
                                  
                                  {(r.author || r.year) && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {r.author && <span>{r.author}</span>}
                                      {r.author && r.year && <span className="mx-1">•</span>}
                                      {r.year && <span>{r.year}</span>}
                                    </p>
                                  )}
                                  
                                  {r.description && (
                                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                                      {r.description}
                                    </p>
                                  )}
                                </div>
                                <div className="flex-shrink-0 flex items-center gap-2">
                                  {r.type === 'book' && <Book className="h-4 w-4 text-amber-500" />}
                                  {r.type === 'article' && <FileText className="h-4 w-4 text-blue-500" />}
                                  {r.type === 'video' && <PlayCircle className="h-4 w-4 text-red-500" />}
                                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </div>
                              {r.author && (
                                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                                  <span>by {r.author}</span>
                                  {r.year && <span className="mx-1.5">•</span>}
                                  {r.year && <span>{r.year}</span>}
                                </div>
                              )}
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="h-40 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed">
                        <BookOpen className="h-6 w-6 text-muted-foreground/50" />
                        <p className="text-sm text-muted-foreground">No references available</p>
                      </div>
                    )}
                    
                    <div className="mt-6 p-4 rounded-lg bg-muted/30 border">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <h4 className="text-sm font-medium">Suggest a Resource</h4>
                      </div>
                      <p className="text-sm text-muted-foreground pl-6">
                        Have a great resource to add? We're always looking to improve our collection. 
                        Please share your suggestions with us.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="compare" className="flex-1 overflow-auto py-2">
                  <div className="space-y-6">
                    <div className="bg-muted/30 p-4 rounded-lg border">
                      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                        <Layers className={`h-5 w-5 text-${safeActiveTradition.color}-500`} />
                        <span>Compare with other traditions</span>
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">Select aspects of {safeActiveTradition.name} to compare with other philosophical and religious traditions.</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {Object.entries(ROW_LABELS).map(([key, label]) => (
                          <Button 
                            key={key}
                            variant="secondary"
                            className={`justify-start gap-2 hover:bg-${safeActiveTradition.color}-50 hover:border-${safeActiveTradition.color}-200 dark:hover:bg-${safeActiveTradition.color}-900/10 group`}
                            onClick={() => {
                              setActiveTradition(null);
                              openAspectComparison(key as RowKey);
                            }}
                          >
                            <div className={`p-1 rounded-full bg-${safeActiveTradition.color}-100 dark:bg-${safeActiveTradition.color}-900/30`}>
                              <Layers className={`h-3.5 w-3.5 text-${safeActiveTradition.color}-600 dark:text-${safeActiveTradition.color}-400`} />
                            </div>
                            <span>Compare {label.toLowerCase()}</span>
                            <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg border">
                      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                        <BookOpen className={`h-5 w-5 text-${safeActiveTradition.color}-500`} />
                        <span>Similar traditions</span>
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">Explore traditions with similar philosophical approaches.</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {DATA.filter(t => 
                          t.id !== safeActiveTradition.id && 
                          (t.family === safeActiveTradition.family || 
                           Math.abs(t.firstYear - safeActiveTradition.firstYear) < 500)
                        ).slice(0, 4).map(t => (
                          <Button 
                            key={t.id}
                            variant="secondary"
                            className={`justify-start gap-2 border-l-4 border-l-${t.color}-500 group`}
                            onClick={() => setActiveTradition(t)}
                          >
                            <div className={`p-1 rounded-full bg-${t.color}-100 dark:bg-${t.color}-900/30`}>
                              <BookOpen className={`h-3.5 w-3.5 text-${t.color}-600 dark:text-${t.color}-400`} />
                            </div>
                            <span>{t.name}</span>
                            <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
