/**
 * Enhanced Explorer with Survivor Bias and Evolution sections
 * Integrates new components into the original Explorer layout
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
  Skull,
  TrendingUp
} from "lucide-react";

// New Components
import SurvivorBiasSection from "@/components/SurvivorBiasSection";
import EvolutionSection from "@/components/EvolutionSection";
import GlossaryPanel from "@/components/GlossaryPanel";
import { getTraditionColors } from "@/lib/colorScheme";

// Import complete data from the original Explorer
import {
  DATA,
  ROW_LABELS,
  formatYear,
  getFamilyExplanation,
  type Tradition,
  type RowKey,
  type Reference
} from '@/data/fullTraditionsData';

const MAX_PINNED_TRADITIONS = 4;
const COMPARISON_KEYS: RowKey[] = ['reality', 'self', 'problem', 'response', 'aim'];

const ExplorerWithEnhancements: React.FC = () => {
  // State management
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTradition, setActiveTradition] = useState<Tradition | null>(null);
  const [query, setQuery] = useState("");
  const [currentView, setCurrentView] = useState<'main' | 'survivor' | 'evolution'>('main');
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [selectedAspect, setSelectedAspect] = useState<RowKey | null>(null);
  const [pinnedTraditionIds, setPinnedTraditionIds] = useState<string[]>([]);

  // Refs for auto-scrolling
  const traditionsListRef = React.useRef<HTMLDivElement>(null);
  const timelineRef = React.useRef<HTMLDivElement>(null);

  // Get all families for filtering
  const families = useMemo(() => {
    const uniqueFamilies = [...new Set(DATA.map(t => t.family))].sort();
    return [{ value: 'all', label: 'All Traditions', count: DATA.length },
            ...uniqueFamilies.map(f => ({
              value: f,
              label: f,
              count: DATA.filter(t => t.family === f).length
            }))];
  }, []);

  // Enhanced search with deep content matching
  const filteredData = useMemo(() => {
    let filtered = DATA;

    // Apply family filter
    if (selectedFamily !== 'all') {
      filtered = filtered.filter(t => t.family === selectedFamily);
    }

    // Apply search filter
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(tradition =>
        tradition.name.toLowerCase().includes(lowerQuery) ||
        tradition.family.toLowerCase().includes(lowerQuery) ||
        Object.values(tradition.overview).some(text =>
          text.toLowerCase().includes(lowerQuery)
        ) ||
        tradition.deepDive?.keyIdeas.some(idea =>
          idea.toLowerCase().includes(lowerQuery)
        ) ||
        tradition.deepDive?.notes?.toLowerCase().includes(lowerQuery) ||
        tradition.references.some(ref =>
          ref.title.toLowerCase().includes(lowerQuery) ||
          ref.description?.toLowerCase().includes(lowerQuery)
        )
      );
    }

    return filtered;
  }, [query, selectedFamily]);

  // Timeline data
  const timeline = useMemo(() =>
    [...filteredData].sort((a, b) => a.firstYear - b.firstYear),
    [filteredData]
  );

  const selectedTradition = useMemo(() =>
    DATA.find(t => t.id === selectedId) || null,
    [selectedId]
  );

  const pinnedTraditions = useMemo(() =>
    pinnedTraditionIds
      .map(id => DATA.find(tradition => tradition.id === id))
      .filter((tradition): tradition is Tradition => Boolean(tradition)),
    [pinnedTraditionIds]
  );

  const isTraditionPinned = useCallback(
    (traditionId: string) => pinnedTraditionIds.includes(traditionId),
    [pinnedTraditionIds]
  );

  const togglePinnedTradition = useCallback((tradition: Tradition) => {
    setPinnedTraditionIds(currentIds => {
      if (currentIds.includes(tradition.id)) {
        return currentIds.filter(id => id !== tradition.id);
      }

      if (currentIds.length >= MAX_PINNED_TRADITIONS) {
        return currentIds;
      }

      return [...currentIds, tradition.id];
    });
  }, []);

  const clearPinnedTraditions = useCallback(() => {
    setPinnedTraditionIds([]);
  }, []);

  const handleTraditionSelect = useCallback((tradition: Tradition) => {
    setSelectedId(tradition.id);
    setActiveTradition(tradition);

    // Auto-scroll the traditions list to move the selected tradition to the top
    setTimeout(() => {
      if (traditionsListRef.current) {
        const selectedElement = traditionsListRef.current.querySelector(`[data-tradition-id="${tradition.id}"]`);
        if (selectedElement) {
          const container = traditionsListRef.current;
          const elementTop = (selectedElement as HTMLElement).offsetTop;

          // Scroll to bring the selected element to the top with a small offset
          container.scrollTo({
            top: Math.max(0, elementTop - 20),
            behavior: 'smooth'
          });
        }
      }

      // Auto-scroll the timeline to show the selected tradition
      if (timelineRef.current) {
        const selectedElement = timelineRef.current.querySelector(`[data-timeline-id="${tradition.id}"]`);
        if (selectedElement) {
          const container = timelineRef.current;
          const elementLeft = (selectedElement as HTMLElement).offsetLeft;
          const elementWidth = (selectedElement as HTMLElement).offsetWidth;
          const containerWidth = container.offsetWidth;
          const scrollPosition = elementLeft - (containerWidth / 2) + (elementWidth / 2);

          container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
          });
        }
      }
    }, 100);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setActiveTradition(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">Philosophy & Religion Explorer</h1>
          <p className="text-muted-foreground">
            Explore philosophical and religious traditions with enhanced survivor bias and evolution insights
          </p>
        </div>

        {/* NEW: Two-column layout above search */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Survivor Bias Card */}
          <Card className="border-red-200 bg-red-50/30">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Skull className="h-4 w-4 text-red-600" />
                Lost Traditions
                <Badge variant="outline" className="ml-auto">20+ Examples</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Explore major philosophical and religious traditions that have been lost to history,
                demonstrating survivor bias in our understanding of human wisdom.
              </p>
              <div className="flex items-center gap-2">
                <div className="text-xs">
                  <span className="font-medium">Examples:</span> Manichaeism, Catharism, Celtic Druidism
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 w-full"
                onClick={() => setCurrentView('survivor')}
              >
                <Skull className="h-3 w-3 mr-1" />
                Explore Lost Traditions
              </Button>
            </CardContent>
          </Card>

          {/* Evolution Card */}
          <Card className="border-blue-200 bg-blue-50/30">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                Evolution of Ideas
                <Badge variant="outline" className="ml-auto">100k+ Years</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Track how core philosophical concepts like reality, self, and meaning
                have evolved across 100,000 years of human thought.
              </p>
              <div className="flex items-center gap-2">
                <div className="text-xs">
                  <span className="font-medium">Trace:</span> Animism → Monotheism → Scientific materialism
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 w-full"
                onClick={() => setCurrentView('evolution')}
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                Track Evolution
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        {currentView !== 'main' && (
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView('main')}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Main Explorer
            </Button>
          </div>
        )}

        {/* Conditional Content */}
        {currentView === 'survivor' && (
          <SurvivorBiasSection />
        )}

        {currentView === 'evolution' && (
          <EvolutionSection />
        )}

        {currentView === 'main' && (
          <>
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 max-w-lg">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search traditions, concepts, or ideas..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Family Filter */}
                <div className="flex flex-wrap gap-2">
                  {families.map(family => (
                    <Button
                      key={family.value}
                      variant={selectedFamily === family.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedFamily(family.value)}
                      className="flex items-center gap-1"
                    >
                      {family.label}
                      <Badge variant="secondary" className="ml-1">
                        {family.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>

              {(query || selectedFamily !== 'all') && (
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground">
                    {filteredData.length} tradition{filteredData.length !== 1 ? 's' : ''}
                    {query && ` matching "${query}"`}
                    {selectedFamily !== 'all' && ` in ${selectedFamily}`}
                  </p>
                  {(query || selectedFamily !== 'all') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setQuery('');
                        setSelectedFamily('all');
                      }}
                      className="h-6 px-2"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
              )}
            </div>

            <GlossaryPanel />

            {/* Horizontal Timeline */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Historical Timeline
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-500"></div> Traditional</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-purple-500"></div> Eastern</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Abrahamic</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-green-500"></div> Classical</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-500"></div> Modern</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <button
                  onClick={() => {
                    const timeline = document.getElementById('timeline-scroll');
                    if (timeline) timeline.scrollBy({ left: -200, behavior: 'smooth' });
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-md"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    const timeline = document.getElementById('timeline-scroll');
                    if (timeline) timeline.scrollBy({ left: 200, behavior: 'smooth' });
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-md"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div id="timeline-scroll" className="flex gap-3 overflow-x-auto pb-3 px-12 scroll-smooth"
                     style={{
                       scrollbarWidth: 'thin',
                       scrollbarColor: '#cbd5e1 #f1f5f9'
                     }}>
                  {timeline.map((tradition) => {
                    const familyColors = {
                      'Traditional': 'bg-amber-500 border-amber-300 hover:bg-amber-50',
                      'Eastern': 'bg-purple-500 border-purple-300 hover:bg-purple-50',
                      'Abrahamic': 'bg-blue-500 border-blue-300 hover:bg-blue-50',
                      'Classical': 'bg-green-500 border-green-300 hover:bg-green-50',
                      'Modern': 'bg-red-500 border-red-300 hover:bg-red-50'
                    };
                    const colors = familyColors[tradition.family as keyof typeof familyColors] || 'bg-gray-500 border-gray-300 hover:bg-gray-50';
                    const [bgColor, borderColor, hoverColor] = colors.split(' ');

                    return (
                      <button
                        key={tradition.id}
                        data-timeline-id={tradition.id}
                        className={`flex-shrink-0 p-3 rounded-lg border-2 transition-all min-w-[140px] ${
                          selectedId === tradition.id
                            ? `${bgColor.replace('500', '100')} ${borderColor} shadow-lg scale-105 ring-2 ring-offset-2`
                            : `${hoverColor} border-gray-200 hover:border-gray-300`
                        }`}
                        onClick={() => handleTraditionSelect(tradition)}
                      >
                        <div className="text-center">
                          <div className={`w-2 h-2 rounded-full ${bgColor} mx-auto mb-2`}></div>
                          <div className="text-xs font-bold text-muted-foreground mb-1">
                            {tradition.firstYear > 0 ? `${tradition.firstYear} CE` : `${Math.abs(tradition.firstYear)} BCE`}
                          </div>
                          <div className="font-medium text-sm">{tradition.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">{tradition.family}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

              </CardContent>
            </Card>

            {/* Three-column layout */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Panel: Traditions */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      Traditions ({filteredData.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent ref={traditionsListRef} className="space-y-3 max-h-[600px] overflow-y-auto">
                    {filteredData.sort((a, b) => a.firstYear - b.firstYear).map((tradition) => {
                      const colors = getTraditionColors(tradition.id);
                      return (
                        <Card
                          key={tradition.id}
                          data-tradition-id={tradition.id}
                          className={`cursor-pointer transition-all hover:shadow-md border-l-4 ${
                            selectedId === tradition.id ? 'ring-2 shadow-lg transform scale-[1.02] bg-blue-50' : ''
                          }`}
                          style={{
                            borderLeftColor: colors.primary,
                            ...(selectedId === tradition.id ? {
                              '--tw-ring-color': colors.primary,
                              backgroundColor: colors.bgLight
                            } : {})
                          }}
                          onClick={() => handleTraditionSelect(tradition)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: colors.primary }}
                                />
                                <h3 className="font-semibold text-sm">{tradition.name}</h3>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <Badge
                                  variant="outline"
                                  className="text-xs"
                                  style={{
                                    borderColor: colors.border,
                                    backgroundColor: colors.bg,
                                    color: colors.accent
                                  }}
                                >
                                  {tradition.family}
                                </Badge>
                                <Button
                                  variant={isTraditionPinned(tradition.id) ? 'default' : 'outline'}
                                  size="sm"
                                  disabled={!isTraditionPinned(tradition.id) && pinnedTraditions.length >= MAX_PINNED_TRADITIONS}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    togglePinnedTradition(tradition);
                                  }}
                                  className="h-7 px-2 text-xs"
                                >
                                  {isTraditionPinned(tradition.id) ? 'Pinned' : 'Pin'}
                                </Button>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              Founded: {formatYear(tradition.firstYear)}
                            </p>
                            <p className="text-xs line-clamp-2 mb-2">
                              {tradition.overview.reality}
                            </p>
                            {tradition.deepDive?.keyIdeas && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {tradition.deepDive.keyIdeas.slice(0, 2).map((idea, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="secondary"
                                    className="text-[10px] px-1 py-0"
                                  >
                                    {idea.length > 20 ? `${idea.substring(0, 20)}...` : idea}
                                  </Badge>
                                ))}
                                {tradition.deepDive.keyIdeas.length > 2 && (
                                  <Badge variant="outline" className="text-[10px] px-1 py-0">
                                    +{tradition.deepDive.keyIdeas.length - 2}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>

              {/* Middle Panel: Details */}
              <div className="lg:col-span-1">
                {selectedTradition ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between gap-3">
                        <span className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: getTraditionColors(selectedTradition.id).primary }}
                          />
                          {selectedTradition.name}
                        </span>
                        <Button
                          variant={isTraditionPinned(selectedTradition.id) ? 'default' : 'outline'}
                          size="sm"
                          disabled={!isTraditionPinned(selectedTradition.id) && pinnedTraditions.length >= MAX_PINNED_TRADITIONS}
                          onClick={() => togglePinnedTradition(selectedTradition)}
                          className="h-7 px-2 text-xs"
                        >
                          {isTraditionPinned(selectedTradition.id) ? 'Pinned' : 'Pin to compare'}
                        </Button>
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm">
                        <Badge
                          variant="outline"
                          style={{
                            borderColor: getTraditionColors(selectedTradition.id).border,
                            backgroundColor: getTraditionColors(selectedTradition.id).bg,
                            color: getTraditionColors(selectedTradition.id).accent
                          }}
                        >
                          {selectedTradition.family}
                        </Badge>
                        <span className="text-muted-foreground">
                          {formatYear(selectedTradition.firstYear)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="deep">Deep Dive</TabsTrigger>
                          <TabsTrigger value="references">References</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4">
                          {Object.entries(ROW_LABELS).map(([key, label]) => (
                            <div key={key} className="space-y-2">
                              <h4 className="font-medium text-sm flex items-center gap-1">
                                {key === 'reality' && <Globe className="h-3 w-3" />}
                                {key === 'self' && <User className="h-3 w-3" />}
                                {key === 'problem' && <AlertCircle className="h-3 w-3" />}
                                {key === 'response' && <Lightbulb className="h-3 w-3" />}
                                {key === 'aim' && <Target className="h-3 w-3" />}
                                {label}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {selectedTradition.overview[key as RowKey]}
                              </p>
                            </div>
                          ))}
                        </TabsContent>

                        <TabsContent value="deep" className="space-y-4">
                          {selectedTradition.deepDive ? (
                            <>
                              {selectedTradition.deepDive.keyIdeas && (
                                <div>
                                  <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                                    <Lightbulb className="h-3 w-3" />
                                    Key Ideas
                                  </h4>
                                  <ul className="space-y-2">
                                    {selectedTradition.deepDive.keyIdeas.map((idea, idx) => (
                                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        {idea}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {selectedTradition.deepDive.notes && (
                                <div>
                                  <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                                    <BookOpen className="h-3 w-3" />
                                    Background Notes
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedTradition.deepDive.notes}
                                  </p>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="text-center py-8">
                              <BookOpen className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">
                                No deep dive content available for this tradition.
                              </p>
                            </div>
                          )}
                        </TabsContent>

                        <TabsContent value="references" className="space-y-3">
                          {selectedTradition.references.map((ref, idx) => {
                            const getIcon = (type?: string) => {
                              switch(type) {
                                case 'book': return <Book className="h-3 w-3" />;
                                case 'article': return <FileText className="h-3 w-3" />;
                                case 'video': return <PlayCircle className="h-3 w-3" />;
                                default: return <Globe className="h-3 w-3" />;
                              }
                            };

                            return (
                              <div key={idx} className="p-3 rounded border">
                                <div className="flex items-start gap-2">
                                  {getIcon(ref.type)}
                                  <div className="flex-1">
                                    <a
                                      href={ref.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm font-medium hover:underline flex items-center gap-1"
                                    >
                                      {ref.title}
                                      <ExternalLink className="h-3 w-3" />
                                    </a>
                                    {ref.author && (
                                      <p className="text-xs text-muted-foreground mt-1">
                                        {ref.author} {ref.year && `(${ref.year})`}
                                      </p>
                                    )}
                                    {ref.description && (
                                      <p className="text-xs text-muted-foreground mt-1">
                                        {ref.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="h-full flex items-center justify-center">
                    <CardContent className="text-center p-8">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-medium mb-2">Select a Tradition</h3>
                      <p className="text-sm text-muted-foreground">
                        Click on a tradition from the timeline or traditions list to explore its core teachings and references.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Panel: Pin-and-Compare */}
              <div className="lg:col-span-1">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2">
                        <Layers className="h-4 w-4" />
                        Compare ({pinnedTraditions.length}/{MAX_PINNED_TRADITIONS})
                      </span>
                      {pinnedTraditions.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearPinnedTraditions}
                          className="h-7 px-2 text-xs"
                        >
                          Clear
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {pinnedTraditions.length === 0 ? (
                      <div className="flex min-h-[500px] items-center justify-center text-center">
                        <div className="text-muted-foreground">
                          <Layers className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p className="text-sm font-medium text-foreground">Pin traditions to compare them.</p>
                          <p className="mt-2 text-xs">
                            Use the Pin buttons on tradition cards or the detail panel to compare up to four traditions across the five core aspects.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-wrap gap-2">
                          {pinnedTraditions.map((tradition) => {
                            const colors = getTraditionColors(tradition.id);
                            return (
                              <Badge
                                key={tradition.id}
                                variant="outline"
                                className="flex items-center gap-1 pr-1"
                                style={{
                                  borderColor: colors.border,
                                  backgroundColor: colors.bg,
                                  color: colors.accent
                                }}
                              >
                                {tradition.name}
                                <button
                                  type="button"
                                  aria-label={`Remove ${tradition.name} from comparison`}
                                  onClick={() => togglePinnedTradition(tradition)}
                                  className="rounded-sm p-0.5 hover:bg-black/10"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            );
                          })}
                        </div>

                        <div className="max-h-[560px] overflow-auto rounded-lg border">
                          <table className="min-w-full divide-y text-left text-sm">
                            <thead className="sticky top-0 bg-white">
                              <tr>
                                <th className="w-28 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                  Aspect
                                </th>
                                {pinnedTraditions.map((tradition) => (
                                  <th key={tradition.id} className="min-w-[180px] px-3 py-2 text-xs font-semibold">
                                    {tradition.name}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              {COMPARISON_KEYS.map((key) => (
                                <tr key={key} className="align-top">
                                  <th className="bg-slate-50 px-3 py-3 text-xs font-semibold text-slate-700">
                                    {ROW_LABELS[key]}
                                  </th>
                                  {pinnedTraditions.map((tradition) => (
                                    <td key={`${tradition.id}-${key}`} className="px-3 py-3 text-xs leading-relaxed text-muted-foreground">
                                      {tradition.overview[key]}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExplorerWithEnhancements;