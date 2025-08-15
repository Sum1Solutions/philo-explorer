/**
 * Evolution Section Component
 * Shows how philosophical and religious concepts evolved over time
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  ChevronDown, 
  ChevronUp,
  Clock,
  Users,
  Lightbulb,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { 
  evolutionPeriods, 
  conceptEvolutions, 
  evolutionTrends, 
  ConceptEvolution 
} from '@/data/evolutionData';

type AspectKey = 'reality' | 'self' | 'problem' | 'response' | 'aim';

const EvolutionSection: React.FC = () => {
  const [selectedAspect, setSelectedAspect] = useState<AspectKey>('reality');
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [showTrends, setShowTrends] = useState(false);

  const aspects = [
    { key: 'reality' as AspectKey, label: 'Nature of Reality', icon: '🌌', color: 'blue' },
    { key: 'self' as AspectKey, label: 'Concept of Self', icon: '👤', color: 'purple' },
    { key: 'problem' as AspectKey, label: 'Core Problem', icon: '⚠️', color: 'red' },
    { key: 'response' as AspectKey, label: 'Path/Response', icon: '🛤️', color: 'green' },
    { key: 'aim' as AspectKey, label: 'Vision of Flourishing', icon: '🎯', color: 'amber' }
  ];

  const selectedEvolution = conceptEvolutions.find(c => c.aspect === selectedAspect);

  const getAspectColor = (color: string) => {
    switch(color) {
      case 'blue': return 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200';
      case 'purple': return 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200';
      case 'red': return 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200';
      case 'green': return 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200';
      case 'amber': return 'bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Evolution of Ideas</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Trace how core concepts evolved across 100,000 years of human thought
        </p>
      </div>

      {/* Aspect Selection */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {aspects.map(aspect => (
          <Button
            key={aspect.key}
            variant={selectedAspect === aspect.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedAspect(aspect.key)}
            className={`h-auto p-3 flex flex-col items-center gap-1 ${
              selectedAspect === aspect.key ? '' : getAspectColor(aspect.color)
            }`}
          >
            <span className="text-lg">{aspect.icon}</span>
            <span className="text-xs text-center leading-tight">{aspect.label}</span>
          </Button>
        ))}
      </div>

      {/* Timeline Visualization */}
      {selectedEvolution && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4" />
              Evolution of: {aspects.find(a => a.key === selectedAspect)?.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Period Timeline */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-200 via-blue-300 to-cyan-400"></div>
              
              <div className="space-y-3">
                {selectedEvolution.periods.map((period, idx) => {
                  const periodInfo = evolutionPeriods.find(p => p.name === period.period);
                  const isExpanded = selectedPeriod === period.period;
                  
                  return (
                    <div key={period.period} className="relative pl-8">
                      {/* Timeline Dot */}
                      <div 
                        className="absolute left-2 w-4 h-4 rounded-full border-2 border-white shadow-sm transform -translate-x-1/2"
                        style={{ backgroundColor: periodInfo?.color || '#gray' }}
                      />
                      
                      {/* Period Card */}
                      <Card className={`transition-all ${isExpanded ? 'shadow-lg' : 'hover:shadow-md'}`}>
                        <CardHeader 
                          className="pb-2 cursor-pointer"
                          onClick={() => setSelectedPeriod(isExpanded ? null : period.period)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-sm font-medium">
                                {period.period}
                              </CardTitle>
                              <p className="text-xs text-muted-foreground">
                                {periodInfo?.timeRange} • {periodInfo?.description}
                              </p>
                            </div>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              {isExpanded ? 
                                <ChevronUp className="h-3 w-3" /> : 
                                <ChevronDown className="h-3 w-3" />
                              }
                            </Button>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0">
                          {/* Always show dominant ideas */}
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-1">
                              {period.dominantIdeas.slice(0, 3).map((idea, ideaIdx) => (
                                <Badge key={ideaIdx} variant="secondary" className="text-xs">
                                  {idea}
                                </Badge>
                              ))}
                              {period.dominantIdeas.length > 3 && !isExpanded && (
                                <Badge variant="outline" className="text-xs">
                                  +{period.dominantIdeas.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {/* Expanded details */}
                          {isExpanded && (
                            <div className="mt-3 space-y-3">
                              {period.dominantIdeas.length > 3 && (
                                <div className="flex flex-wrap gap-1">
                                  {period.dominantIdeas.slice(3).map((idea, ideaIdx) => (
                                    <Badge key={ideaIdx} variant="secondary" className="text-xs">
                                      {idea}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              
                              <div>
                                <div className="text-xs font-medium text-muted-foreground mb-1">
                                  Key Thinkers
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {period.keyThinkers.join(', ')}
                                </p>
                              </div>
                              
                              <div>
                                <div className="text-xs font-medium text-muted-foreground mb-1">
                                  Examples
                                </div>
                                <ul className="text-xs text-muted-foreground space-y-1">
                                  {period.examples.map((example, exIdx) => (
                                    <li key={exIdx} className="flex items-start gap-1">
                                      <span className="text-blue-500 mt-0.5">•</span>
                                      {example}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              {period.innovations.length > 0 && (
                                <div>
                                  <div className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                                    <Lightbulb className="h-3 w-3" />
                                    Innovations
                                  </div>
                                  <ul className="text-xs text-green-700 space-y-1">
                                    {period.innovations.map((innovation, innIdx) => (
                                      <li key={innIdx} className="flex items-start gap-1">
                                        <span className="text-green-500 mt-0.5">•</span>
                                        {innovation}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Evolution Trends */}
      <Card className="bg-slate-50 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              Major Evolutionary Trends
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTrends(!showTrends)}
            >
              {showTrends ? 'Hide' : 'Show'} Patterns
            </Button>
          </CardTitle>
        </CardHeader>
        
        {showTrends && (
          <CardContent className="space-y-4">
            {evolutionTrends.map((trend, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-medium text-sm flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-blue-500" />
                  {trend.title}
                </h4>
                <p className="text-sm text-muted-foreground">{trend.description}</p>
                <div className="text-xs">
                  <span className="text-blue-600 font-medium">Examples: </span>
                  {trend.examples.join(' → ')}
                </div>
              </div>
            ))}
            
            <div className="border-t pt-4">
              <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                What This Teaches Us
              </h4>
              <ul className="space-y-1">
                <li className="text-xs text-muted-foreground flex items-start gap-1">
                  <span className="text-blue-500 mt-0.5">•</span>
                  Ideas evolve gradually through cultural contact and social change
                </li>
                <li className="text-xs text-muted-foreground flex items-start gap-1">
                  <span className="text-blue-500 mt-0.5">•</span>
                  Major breakthroughs often synthesize multiple existing traditions
                </li>
                <li className="text-xs text-muted-foreground flex items-start gap-1">
                  <span className="text-blue-500 mt-0.5">•</span>
                  Social and technological changes drive philosophical innovation
                </li>
                <li className="text-xs text-muted-foreground flex items-start gap-1">
                  <span className="text-blue-500 mt-0.5">•</span>
                  Today's "common sense" was yesterday's revolutionary insight
                </li>
              </ul>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{evolutionPeriods.length}</div>
            <div className="text-xs text-muted-foreground">Major Periods</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">100k+</div>
            <div className="text-xs text-muted-foreground">Years Tracked</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{evolutionTrends.length}</div>
            <div className="text-xs text-muted-foreground">Major Trends</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-amber-600">5</div>
            <div className="text-xs text-muted-foreground">Core Aspects</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EvolutionSection;