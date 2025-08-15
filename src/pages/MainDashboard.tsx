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
  Users,
  Globe,
  Calendar,
  ArrowRight,
  ChevronLeft,
  Lightbulb,
  History
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

  // Tile configurations
  const tiles = [
    {
      key: 'wisdom' as ViewType,
      title: 'Wisdom Explorer',
      subtitle: 'Explore Living Traditions',
      description: 'Discover and compare 15 major philosophical and religious traditions from around the world. From ancient Buddhism to modern Existentialism.',
      icon: BookOpen,
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
      borderColor: 'border-blue-200'
    },
    {
      key: 'survivor' as ViewType,
      title: 'Lost Traditions',
      subtitle: 'Understanding Survivor Bias',
      description: 'Explore 20+ major philosophical and religious traditions that have been lost to history. Learn why certain ideas survive while others disappear.',
      icon: Skull,
      color: 'red',
      stats: [
        { label: 'Lost Traditions', value: extinctTraditions.length },
        { label: 'Peak Adherents', value: '200M+' },
        { label: 'Continents', value: 6 },
      ],
      highlights: ['Political suppression', 'Cultural dominance', 'Critical analysis'],
      gradientFrom: 'from-red-500',
      gradientTo: 'to-pink-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      key: 'evolution' as ViewType,
      title: 'Evolution of Ideas',
      subtitle: 'Ideas Through Time',
      description: 'Track how core philosophical concepts like reality, self, and meaning have evolved across 100,000 years of human thought.',
      icon: TrendingUp,
      color: 'purple',
      stats: [
        { label: 'Time Periods', value: evolutionPeriods.length },
        { label: 'Years Tracked', value: '100k+' },
        { label: 'Core Aspects', value: 5 },
      ],
      highlights: ['Conceptual evolution', 'Historical trends', 'Pattern analysis'],
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-indigo-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur">
        <div className="container max-w-7xl mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-2">
                <Globe className="w-8 h-8 text-blue-600" />
                <Lightbulb className="w-8 h-8 text-purple-600" />
                <History className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
              Philosophy & Religion Explorer
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore the full spectrum of human wisdom—from living traditions to lost knowledge, 
              and the evolution of ideas across 100,000 years of human thought.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-6 py-12">
        {/* Three Main Tiles */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {tiles.map((tile) => {
            const IconComponent = tile.icon;
            return (
              <Card 
                key={tile.key}
                className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${tile.bgColor} ${tile.borderColor} border-2`}
                onClick={() => setCurrentView(tile.key)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${tile.gradientFrom} ${tile.gradientTo} shadow-lg`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </div>
                  <CardTitle className="text-2xl">{tile.title}</CardTitle>
                  <CardDescription className="text-base">{tile.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tile.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {tile.stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-2xl font-bold text-foreground">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Highlights */}
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Key Features
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {tile.highlights.map((highlight, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <Button 
                    className={`w-full bg-gradient-to-r ${tile.gradientFrom} ${tile.gradientTo} hover:opacity-90 text-white`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentView(tile.key);
                    }}
                  >
                    Explore {tile.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Overview Stats */}
        <Card className="bg-white/60 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle>Knowledge at a Glance</CardTitle>
            <CardDescription>
              The scope of human wisdom explored in this application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600">{DATA.length}</div>
                <div className="text-sm text-muted-foreground">Living Traditions</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-red-600">{extinctTraditions.length}+</div>
                <div className="text-sm text-muted-foreground">Lost Traditions</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600">100k+</div>
                <div className="text-sm text-muted-foreground">Years of History</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600">6</div>
                <div className="text-sm text-muted-foreground">Continents Covered</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Built to understand the full spectrum of human wisdom—both what survived and what was lost.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;