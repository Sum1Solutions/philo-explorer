import React, { useMemo, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Info, Search, ExternalLink, ChevronRight, BookOpen, Layers, X, ArrowLeft } from "lucide-react";

// ------------------------
// Data Model
// ------------------------

type RowKey = "reality" | "self" | "problem" | "response" | "aim";

type ViewMode = 'grid' | 'comparison';

interface ComparisonState {
  mode: ViewMode;
  aspect: RowKey | null;
}

type Tradition = {
  id: string;
  name: string;
  family: "Watts" | "Philosophy" | "Eastern" | "Abrahamic" | "Classical" | "Modern";
  color: string; // tailwind color token (used as a class suffix)
  firstYear: number; // BCE negative, CE positive (e.g., -1200 = 1200 BCE)
  overview: Record<RowKey, string>;
  deepDive?: {
    keyIdeas?: string[];
    notes?: string;
  };
  references: { title: string; url: string }[];
};

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
    family: "Watts",
    color: "violet",
    firstYear: 1957,
    overview: {
      reality: "Reality is a single living process where apparent opposites depend on and define each other; the world shows up as playful, interdependent patterns in one field of experience.",
      self: "Ego is a temporary mask; deeper Self as Atman = Brahman (also framed with anatta as no fixed self).",
      problem: "Treating the play as a puzzle to be solved; clinging to control.",
      response: "Let go, laugh, participate; embrace irreducible ‘rascality’.",
      aim: "Relax into the flow: you are the universe in disguise.",
    },
    deepDive: {
      keyIdeas: [
        "Nonduality (not-two) across traditions.",
        "Opposites as interdependent; a playful framing of reality.",
        "The self as a social construct; the deeper Self is not the narrative ego.",
      ],
      notes: "Popularizer synthesizing Hinduism, Buddhism, Taoism for Western audiences.",
    },
    references: [
      { title: "Alan Watts Organization", url: "https://alanwatts.org/" },
      { title: "Alan Watts YouTube", url: "https://www.youtube.com/c/AlanWattsOrg" },
      { title: "The Book: On the Taboo Against Knowing Who You Are", url: "https://alanwatts.org/collections/books" },
      { title: "Tao: The Watercourse Way", url: "https://alanwatts.org/collections/books" },
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
      problem: "Tension between the hunger for meaning and the universe’s silence.",
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
    firstYear: -1200,
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
      response: "Submission (islām) to Allah; Qur’an and Sunnah.",
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
    firstYear: -500,
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
    firstYear: 1850,
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

// ------------------------
// UI Helpers
// ------------------------

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
      {children}
    </span>
  );
}

function Row({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-sm leading-relaxed">{text}</div>
    </div>
  );
}

// ------------------------
// Main Component
// ------------------------

export default function Explorer() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Tradition | null>(null);
  const [cutoffYear, setCutoffYear] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [comparison, setComparison] = useState<ComparisonState>({
    mode: 'grid',
    aspect: null
  });

  // Timeline data sorted by first introduction
  const timeline = useMemo(() => {
    return [...DATA].sort((a, b) => a.firstYear - b.firstYear);
  }, []);

  const currentStepIndex = useMemo(() => {
    if (selectedId == null) return -1;
    return timeline.findIndex((t) => t.id === selectedId);
  }, [selectedId, timeline]);

  function formatYear(y: number) {
    return y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`;
  }

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

  // Toggle between grid and comparison views
  const toggleComparison = (aspect: RowKey) => {
    if (comparison.mode === 'comparison' && comparison.aspect === aspect) {
      setComparison({ mode: 'grid', aspect: null });
    } else {
      setComparison({ mode: 'comparison', aspect });
    }
  };

  // Define a type that extends Tradition with safe defaults
  type SafeTradition = Omit<Tradition, 'deepDive' | 'references'> & {
    deepDive: {
      keyIdeas: string[];
      notes: string;
    };
    references: Array<{ title: string; url: string }>;
  }

  const getActiveTradition = (): SafeTradition | null => {
    if (!active) return null;
    
    return {
      ...active,
      deepDive: {
        keyIdeas: active.deepDive?.keyIdeas || [],
        notes: active.deepDive?.notes || ''
      },
      references: active.references || []
    };
  };

  const activeTradition = getActiveTradition();

  // Close comparison view
  const closeComparison = () => {
    setComparison({ mode: 'grid', aspect: null });
  };

  // Comparison view component
  const ComparisonView = ({ aspect }: { aspect: RowKey }) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={closeComparison}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all aspects
        </Button>
        <h2 className="text-2xl font-semibold text-center">
          {ROW_LABELS[aspect]} Across Traditions
        </h2>
        <div className="w-24"></div> {/* Spacer for alignment */}
      </div>
      
      <div className="space-y-6">
        {filtered.map((tradition) => (
          <Card key={tradition.id} className="relative overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${tradition.color}-500`} />
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{tradition.name}</CardTitle>
                <div className={`px-2 py-0.5 rounded-full text-xs font-medium bg-${tradition.color}-100 text-${tradition.color}-900 border border-${tradition.color}-200`}>
                  {tradition.family}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground/90">{tradition.overview[aspect]}</p>
              </div>
              <div className="mt-4 flex items-center text-xs text-muted-foreground">
                <span>First appeared: {formatYear(tradition.firstYear)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Row component with click handler for comparison
  const Row = ({ label, text, aspect }: { label: string; text: string; aspect: RowKey }) => (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
          onClick={(e) => {
            e.stopPropagation();
            toggleComparison(aspect);
          }}
        >
          Compare all
        </Button>
      </div>
      <p className="text-sm leading-snug">{text}</p>
    </div>
  );

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
      {comparison.mode === 'comparison' ? (
        <ComparisonView aspect={comparison.aspect!} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <Card key={t.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-3">
                  <Badge className={`rounded-full px-2 py-1 text-xs bg-${t.color}-100 text-${t.color}-900`}>{t.family}</Badge>
                  <span>{t.name}</span>
                </CardTitle>
                <Button size="sm" variant="ghost" onClick={() => setActive(t)}>
                  Drill down <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(ROW_LABELS).map(([key, label]) => (
                  <div key={key}>
                    <Row 
                      label={label} 
                      text={t.overview[key as RowKey]} 
                      aspect={key as RowKey} 
                    />
                    {key !== 'aim' && <Separator />}
                  </div>
                ))}
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
      <Dialog open={!!activeTradition} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-3xl">
          {activeTradition && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Badge className={`rounded-full px-2 py-1 text-xs bg-${activeTradition.color}-100 text-${activeTradition.color}-900`}>
                    {activeTradition.family}
                  </Badge>
                  {activeTradition.name}
                </DialogTitle>
                <DialogDescription>
                  Deeper context, key ideas, and curated references.
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="ideas">Key Ideas</TabsTrigger>
                  <TabsTrigger value="refs">References</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">{ROW_LABELS.reality}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm leading-relaxed">{activeTradition.overview.reality}</CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">{ROW_LABELS.self}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm leading-relaxed">{activeTradition.overview.self}</CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">{ROW_LABELS.problem}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm leading-relaxed">{activeTradition.overview.problem}</CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">{ROW_LABELS.response}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm leading-relaxed">{activeTradition.overview.response}</CardContent>
                    </Card>
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle className="text-sm">{ROW_LABELS.aim}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm leading-relaxed">{activeTradition.overview.aim}</CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="ideas">
                  <ScrollArea className="h-72 mt-4 pr-4">
                    <div className="space-y-3">
                      {activeTradition.deepDive.keyIdeas.length > 0 ? (
                        activeTradition.deepDive.keyIdeas.map((idea: string, i: number) => (
                          <div key={i} className="flex items-start gap-3">
                            <BookOpen className="w-4 h-4 mt-1" />
                            <p className="text-sm leading-relaxed">{idea}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">Key ideas forthcoming.</p>
                      )}
                      {activeTradition.deepDive.notes && (
                        <>
                          <Separator className="my-2" />
                          <p className="text-sm text-muted-foreground">{activeTradition.deepDive.notes}</p>
                        </>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="refs">
                  <ScrollArea className="h-72 mt-4 pr-4">
                    <div className="space-y-2">
                      {activeTradition.references.length > 0 ? (
                        activeTradition.references.map((r, i) => (
                          <a 
                            key={i} 
                            href={r.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="group flex items-center justify-between border rounded-xl p-3 hover:bg-muted transition-colors"
                          >
                            <div className="text-sm font-medium group-hover:underline">
                              {r.title}
                            </div>
                            <ExternalLink className="w-4 h-4 opacity-70" />
                          </a>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No references available.</p>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
