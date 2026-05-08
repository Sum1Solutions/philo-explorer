/**
 * Main Dashboard - Three-Tile Interface
 * The primary entry point for the Philosophy & Religion Explorer
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Skull, 
  TrendingUp,
  ArrowRight,
  ChevronLeft,
  Lightbulb,
  History,
  Library,
  Compass,
  Mountain
} from 'lucide-react';

// Import our components
import ExplorerWithEnhancements from './ExplorerWithEnhancements';
import SurvivorBiasSection from '@/components/SurvivorBiasSection';
import EvolutionSection from '@/components/EvolutionSection';
import { DATA } from '@/data/fullTraditionsData';
import { extinctTraditions } from '@/data/extinctTraditions';
import { evolutionPeriods } from '@/data/evolutionData';

type ViewType = 'dashboard' | 'wisdom' | 'survivor' | 'evolution';

const MainDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  // Tile configurations - ordered by prominence (largest number first)
  const tiles = [
    {
      key: 'wisdom' as ViewType,
      title: 'Wisdom Explorer',
      subtitle: 'Explore Living Traditions',
      description: 'Discover and compare major philosophical and religious traditions from around the world. From ancient Buddhism to modern Existentialism.',
      icon: Library,
      color: 'blue',
      stats: [
        { label: 'Traditions', value: DATA.length },
        { label: 'Families', value: [...new Set(DATA.map(t => t.family))].length },
        { label: 'Years Span', value: '12,000+' },
      ],
      highlights: ['Interactive timeline', 'Deep dive content', 'Academic references'],
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      accentColor: 'text-blue-600',
      iconBg: 'bg-blue-100'
    },
    {
      key: 'survivor' as ViewType,
      title: 'Lost Traditions',
      subtitle: 'Understanding Survivor Bias',
      description: 'Explore 20+ major philosophical and religious traditions that have been lost to history. Learn why certain ideas survive while others disappear.',
      icon: Mountain,
      color: 'red',
      stats: [
        { label: 'Lost Traditions', value: `${extinctTraditions.length}+` },
        { label: 'Peak Adherents', value: '200M+' },
        { label: 'Continents', value: 6 },
      ],
      highlights: ['Political suppression', 'Cultural dominance', 'Critical analysis'],
      gradientFrom: 'from-red-500',
      gradientTo: 'to-pink-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      accentColor: 'text-red-600',
      iconBg: 'bg-red-100'
    },
    {
      key: 'evolution' as ViewType,
      title: 'Evolution of Ideas',
      subtitle: 'Ideas Through Time',
      description: 'Track how core philosophical concepts like reality, self, and meaning have evolved across 100,000 years of human thought.',
      icon: TrendingUp,
      color: 'purple',
      stats: [
        { label: 'Years Tracked', value: '100k+' },
        { label: 'Time Periods', value: evolutionPeriods.length },
        { label: 'Core Aspects', value: 5 },
      ],
      highlights: ['Conceptual evolution', 'Historical trends', 'Pattern analysis'],
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-indigo-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      accentColor: 'text-purple-600',
      iconBg: 'bg-purple-100'
    }
  ];


  const productDirection = [
    {
      icon: Compass,
      title: 'Concept map, not just a catalog',
      description: 'The strongest thread is a guided map of how traditions answer recurring human questions about reality, selfhood, suffering, practice, and flourishing.'
    },
    {
      icon: Skull,
      title: 'Survivor-bias lens',
      description: 'The lost-traditions area reframes the project from “greatest hits” history into a critical tool about power, preservation, and forgotten alternatives.'
    },
    {
      icon: History,
      title: 'Historical development engine',
      description: 'The evolution view points toward showing influence, divergence, and recurring patterns across time instead of isolated summaries.'
    }
  ];

  const enhancementAreas = [
    'Add guided learning paths for students and teachers with prompts, checkpoints, and short classroom activities.',
    'Add side-by-side compare mode where users can pin 2–4 traditions and export a comparison table.',
    'Add source-quality metadata, citation filters, and notes on contested dates or scholarly uncertainty.',
    'Add visual influence links between traditions, extinct movements, and modern descendants.',
    'Add glossary and accessibility refinements for terms such as BCE, nonduality, dharma, covenant, and anatta.',
    'Add persistence for saved traditions, recently viewed cards, and shareable deep links.'
  ];

  const currentTile = tiles.find(t => t.key === currentView);

  const renderContent = () => {
    switch(currentView) {
      case 'wisdom':
        return <ExplorerWithEnhancements />;
      case 'survivor':
        return (
          <div className="container max-w-7xl mx-auto p-6">
            <SurvivorBiasSection />
          </div>
        );
      case 'evolution':
        return (
          <div className="container max-w-7xl mx-auto p-6">
            <EvolutionSection />
          </div>
        );
      default:
        return null;
    }
  };

  if (currentView !== 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header with back navigation */}
        <div className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
          <div className="container max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setCurrentView('dashboard')}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
                <div className="h-6 w-px bg-border" />
                <div className="flex items-center gap-2">
                  {currentTile && (
                    <>
                      <currentTile.icon className="h-5 w-5" style={{ color: currentTile.gradientFrom.replace('from-', '').replace('-500', '') === 'blue' ? '#3b82f6' : currentTile.gradientFrom.replace('from-', '').replace('-500', '') === 'red' ? '#ef4444' : '#8b5cf6' }} />
                      <h1 className="text-xl font-semibold">{currentTile.title}</h1>
                      <Badge variant="secondary">{currentTile.subtitle}</Badge>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container max-w-7xl mx-auto px-6 py-12">
          <div className="text-center space-y-6">
            <BookOpen className="w-12 h-12 mx-auto text-gray-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Philosophy & Religion Explorer
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore philosophical and religious traditions from around the world.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto px-6 py-16">
        {/* Three Main Tiles */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {tiles.map((tile) => {
            const IconComponent = tile.icon;
            return (
              <Card 
                key={tile.key}
                className="group cursor-pointer transition-all hover:shadow-lg border hover:border-gray-300"
                onClick={() => setCurrentView(tile.key)}
              >
                <CardHeader className="pb-4">
                  {/* Visual header with larger icon */}
                  <div className={`w-full h-20 ${tile.iconBg} rounded-lg mb-4 flex items-center justify-center`}>
                    <IconComponent className={`h-10 w-10 ${tile.accentColor}`} />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <CardTitle className="text-xl">{tile.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    {tile.key === 'wisdom' ? `Compare ${DATA.length} philosophical and religious traditions` :
                     tile.key === 'survivor' ? 'Explore traditions lost to history' :
                     'Track how ideas evolved over time'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {tile.stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className={`text-lg font-semibold ${idx === 0 ? tile.accentColor : 'text-gray-900'}`}>
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-500">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Action Button */}
                  <Button 
                    variant="outline"
                    className="w-full group-hover:bg-gray-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentView(tile.key);
                    }}
                  >
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Product Evaluation */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                Where this is going
              </CardTitle>
              <CardDescription>
                The app is becoming an educational thinking tool: part explorer, part timeline, part critical-history companion.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {productDirection.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex gap-3">
                  <div className="mt-1 rounded-full bg-blue-50 p-2">
                    <Icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{title}</h3>
                    <p className="text-sm text-gray-600">{description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-amber-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Compass className="h-5 w-5 text-amber-600" />
                Highest-value enhancements
              </CardTitle>
              <CardDescription>
                These additions would make the project more functional for learning, research, and classroom use.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {enhancementAreas.map((area) => (
                  <li key={area} className="flex items-start gap-2 text-sm text-gray-700">
                    <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Simple Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Explore philosophical and religious traditions from around the world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;