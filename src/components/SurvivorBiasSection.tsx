/**
 * Survivor Bias Section Component
 * Educates users about lost traditions and selection bias in history
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertCircle, 
  Skull, 
  ChevronDown, 
  ChevronUp,
  Globe,
  BookOpen,
  Users,
  MapPin,
  TrendingDown
} from 'lucide-react';
import { extinctTraditions, survivorBiasAnalysis, ExtinctTradition } from '@/data/extinctTraditions';

const SurvivorBiasSection: React.FC = () => {
  const [expandedTradition, setExpandedTradition] = useState<string | null>(null);
  const [selectedBiasType, setSelectedBiasType] = useState<string>('all');
  const [showAnalysis, setShowAnalysis] = useState(false);

  const biasTypes = [
    { value: 'all', label: 'All Types', icon: Globe },
    { value: 'political', label: 'Political Suppression', icon: TrendingDown },
    { value: 'cultural', label: 'Cultural Dominance', icon: Users },
    { value: 'linguistic', label: 'Lost Languages', icon: BookOpen },
    { value: 'geographic', label: 'Geographic Isolation', icon: MapPin }
  ];

  const filteredTraditions = selectedBiasType === 'all' 
    ? extinctTraditions 
    : extinctTraditions.filter(t => t.biasType === selectedBiasType);

  const getBiasColor = (type: string) => {
    switch(type) {
      case 'political': return 'bg-red-100 text-red-700 border-red-200';
      case 'cultural': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'linguistic': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'geographic': return 'bg-green-100 text-green-700 border-green-200';
      case 'economic': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Alert */}
      <Alert className="border-amber-200 bg-amber-50">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-900">
          <strong>Survivor Bias:</strong> We study only ~5% of humanity's religious and philosophical traditions. 
          Political power, literacy, and chance determined what survived—not necessarily truth or value.
        </AlertDescription>
      </Alert>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {biasTypes.map(({ value, label, icon: Icon }) => (
          <Button
            key={value}
            variant={selectedBiasType === value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedBiasType(value)}
            className="flex items-center gap-1"
          >
            <Icon className="h-3 w-3" />
            {label}
            {value === 'all' && (
              <Badge variant="secondary" className="ml-1">
                {extinctTraditions.length}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{extinctTraditions.length}+</div>
            <div className="text-xs text-muted-foreground">Major Traditions Lost</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-amber-600">~200M</div>
            <div className="text-xs text-muted-foreground">Peak Adherents Lost</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">95%</div>
            <div className="text-xs text-muted-foreground">Traditions Forgotten</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">6</div>
            <div className="text-xs text-muted-foreground">Continents Affected</div>
          </CardContent>
        </Card>
      </div>

      {/* Extinct Traditions Grid */}
      <div className="grid gap-3 max-h-[600px] overflow-y-auto">
        {filteredTraditions.map((tradition) => (
          <Card 
            key={tradition.name}
            className={`border-l-4 transition-all ${
              expandedTradition === tradition.name ? 'shadow-lg' : 'hover:shadow-md'
            }`}
            style={{ borderLeftColor: 'rgb(239, 68, 68)' }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Skull className="h-4 w-4 text-red-500" />
                    {tradition.name}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{tradition.period}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{tradition.geography}</span>
                    {tradition.peakAdherents && (
                      <>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs font-medium">{tradition.peakAdherents}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${getBiasColor(tradition.biasType)}`}>
                    {tradition.biasType}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedTradition(
                      expandedTradition === tradition.name ? null : tradition.name
                    )}
                    className="h-6 w-6 p-0"
                  >
                    {expandedTradition === tradition.name ? 
                      <ChevronUp className="h-3 w-3" /> : 
                      <ChevronDown className="h-3 w-3" />
                    }
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            {expandedTradition === tradition.name && (
              <CardContent className="pt-0 space-y-3">
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-1">Key Ideas</div>
                  <p className="text-sm">{tradition.keyIdeas}</p>
                </div>
                
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-1">Why It Disappeared</div>
                  <p className="text-sm text-red-700">{tradition.reasonForDecline}</p>
                </div>
                
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-1">Lasting Influence</div>
                  <p className="text-sm text-green-700">{tradition.legacy}</p>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Analysis Section */}
      <Card className="bg-slate-50 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Patterns of Extinction</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAnalysis(!showAnalysis)}
            >
              {showAnalysis ? 'Hide' : 'Show'} Analysis
            </Button>
          </CardTitle>
        </CardHeader>
        
        {showAnalysis && (
          <CardContent className="space-y-4">
            {survivorBiasAnalysis.patterns.map((pattern) => (
              <div key={pattern.type} className="space-y-2">
                <h4 className="font-medium text-sm">{pattern.type}</h4>
                <p className="text-sm text-muted-foreground">{pattern.description}</p>
                <div className="flex flex-wrap gap-2">
                  <div className="text-xs">
                    <span className="text-green-600 font-medium">Survived: </span>
                    {pattern.examples.join(', ')}
                  </div>
                  <div className="text-xs">
                    <span className="text-red-600 font-medium">Lost: </span>
                    {pattern.lost.join(', ')}
                  </div>
                </div>
              </div>
            ))}
            
            <div className="border-t pt-4">
              <h4 className="font-medium text-sm mb-2">Modern Implications</h4>
              <ul className="space-y-1">
                {survivorBiasAnalysis.modernImplications.map((implication, idx) => (
                  <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                    <span className="text-amber-500 mt-0.5">•</span>
                    {implication}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default SurvivorBiasSection;