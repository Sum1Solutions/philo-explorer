/**
 * Enhanced Explorer Demo
 * Shows how the refactored architecture could work with new features
 */

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Network, 
  TrendingUp, 
  AlertCircle,
  Map,
  Calendar,
  GitBranch,
  Skull
} from 'lucide-react';
import TimelineFixed from '@/components/timeline/TimelineFixed';
import { getTraditionColors } from '@/lib/colorScheme';

// Sample data for demonstration
const sampleTraditions = [
  { id: 'indigenous', name: 'Indigenous Traditions', family: 'Traditional', firstYear: -12000 },
  { id: 'hinduism', name: 'Hinduism', family: 'Eastern', firstYear: -3000 },
  { id: 'judaism', name: 'Judaism', family: 'Abrahamic', firstYear: -2000 },
  { id: 'buddhism', name: 'Buddhism', family: 'Eastern', firstYear: -480 },
  { id: 'plato', name: 'Platonism', family: 'Classical', firstYear: -380 },
  { id: 'confucianism', name: 'Confucianism', family: 'Eastern', firstYear: -500 },
  { id: 'christianity', name: 'Christianity', family: 'Abrahamic', firstYear: 30 },
  { id: 'islam', name: 'Islam', family: 'Abrahamic', firstYear: 622 },
  { id: 'advaita', name: 'Advaita Vedanta', family: 'Eastern', firstYear: 800 },
  { id: 'existentialism', name: 'Existentialism', family: 'Modern', firstYear: 1840 },
];

const extinctTraditions = [
  {
    name: 'Manichaeism',
    period: '3rd-14th century',
    peakAdherents: '~10 million',
    geography: 'Rome to China',
    reasonForDecline: 'Systematic persecution by Christian and Islamic empires',
    keyIdeas: 'Dualistic cosmology, synthesis of Zoroastrian, Buddhist, and Christian elements',
    legacy: 'Influenced Augustine, Gnostic thought, Buddhist cosmology'
  },
  {
    name: 'Mithraism',
    period: '1st-4th century',
    peakAdherents: '~5 million',
    geography: 'Roman Empire',
    reasonForDecline: 'Competition with Christianity, exclusive male membership',
    keyIdeas: 'Mystery religion, salvation through trials, cosmic dualism',
    legacy: 'Influenced Christian symbolism, December 25th celebration'
  },
  {
    name: 'Catharism',
    period: '12th-14th century',
    peakAdherents: '~4 million',
    geography: 'Southern France, Northern Italy',
    reasonForDecline: 'Albigensian Crusade, Inquisition',
    keyIdeas: 'Dualist theology, rejection of material world, apostolic poverty',
    legacy: 'Challenged Catholic authority, influenced Protestant reformation ideas'
  }
];

const ExplorerEnhanced: React.FC = () => {
  const [selectedTradition, setSelectedTradition] = useState<any>(null);
  const [hoveredTradition, setHoveredTradition] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('timeline');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Philosophy & Religion Explorer</h1>
          <p className="text-muted-foreground">
            Enhanced with geographic, network, and evolution visualizations
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="timeline" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="geographic" className="flex items-center gap-1">
              <Map className="h-4 w-4" />
              Geographic
            </TabsTrigger>
            <TabsTrigger value="network" className="flex items-center gap-1">
              <Network className="h-4 w-4" />
              Network
            </TabsTrigger>
            <TabsTrigger value="evolution" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Evolution
            </TabsTrigger>
            <TabsTrigger value="survivor" className="flex items-center gap-1">
              <Skull className="h-4 w-4" />
              Lost
            </TabsTrigger>
          </TabsList>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <TimelineFixed
              traditions={sampleTraditions}
              selectedTradition={selectedTradition}
              onSelectTradition={setSelectedTradition}
              hoveredTradition={hoveredTradition}
              onHoverTradition={setHoveredTradition}
            />
            
            {selectedTradition && (
              <Card>
                <CardHeader>
                  <CardTitle 
                    className="flex items-center gap-2"
                    style={{ color: getTraditionColors(selectedTradition.id).accent }}
                  >
                    <div 
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: getTraditionColors(selectedTradition.id).primary }}
                    />
                    {selectedTradition.name}
                  </CardTitle>
                  <CardDescription>
                    {selectedTradition.family} tradition • Founded {
                      selectedTradition.firstYear > 0 
                        ? `${selectedTradition.firstYear} CE`
                        : `${Math.abs(selectedTradition.firstYear)} BCE`
                    }
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </TabsContent>

          {/* Geographic Tab */}
          <TabsContent value="geographic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Geographic Spread Over Time
                </CardTitle>
                <CardDescription>
                  Visualize how traditions spread across the world
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Map className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Interactive world map would go here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Using react-simple-maps or mapbox-gl
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">6</div>
                    <div className="text-xs text-muted-foreground">Continents Covered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">195</div>
                    <div className="text-xs text-muted-foreground">Countries Influenced</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">4.5B</div>
                    <div className="text-xs text-muted-foreground">Current Adherents</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Network Tab */}
          <TabsContent value="network" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  Influence Network
                </CardTitle>
                <CardDescription>
                  See how traditions influenced and inspired each other
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Network className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Force-directed graph would go here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Using D3.js force simulation
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                    <span className="text-sm">Buddhism → Zen Buddhism</span>
                    <Badge variant="outline">Direct Lineage</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                    <span className="text-sm">Platonism → Christianity</span>
                    <Badge variant="outline">Philosophical Influence</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                    <span className="text-sm">Existentialism ← Buddhism</span>
                    <Badge variant="outline">Conceptual Inspiration</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Evolution Tab */}
          <TabsContent value="evolution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Evolution of Ideas
                </CardTitle>
                <CardDescription>
                  Track how core concepts evolved over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Nature of Reality</h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-20 text-xs text-muted-foreground">Ancient</div>
                        <div className="flex-1 h-2 bg-gradient-to-r from-amber-200 to-amber-400 rounded" />
                        <span className="text-xs">Animistic, Mythological</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 text-xs text-muted-foreground">Classical</div>
                        <div className="flex-1 h-2 bg-gradient-to-r from-blue-200 to-blue-400 rounded" />
                        <span className="text-xs">Forms, Logos, Dharma</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 text-xs text-muted-foreground">Medieval</div>
                        <div className="flex-1 h-2 bg-gradient-to-r from-green-200 to-green-400 rounded" />
                        <span className="text-xs">Divine Order, Scholasticism</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 text-xs text-muted-foreground">Modern</div>
                        <div className="flex-1 h-2 bg-gradient-to-r from-purple-200 to-purple-400 rounded" />
                        <span className="text-xs">Material, Existential, Quantum</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Concept of Self</h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-20 text-xs text-muted-foreground">Ancient</div>
                        <div className="flex-1 h-2 bg-gradient-to-r from-amber-200 to-amber-400 rounded" />
                        <span className="text-xs">Tribal, Ancestral</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 text-xs text-muted-foreground">Classical</div>
                        <div className="flex-1 h-2 bg-gradient-to-r from-blue-200 to-blue-400 rounded" />
                        <span className="text-xs">Soul, Atman, Psyche</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 text-xs text-muted-foreground">Medieval</div>
                        <div className="flex-1 h-2 bg-gradient-to-r from-green-200 to-green-400 rounded" />
                        <span className="text-xs">Immortal Soul, Divine Spark</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 text-xs text-muted-foreground">Modern</div>
                        <div className="flex-1 h-2 bg-gradient-to-r from-purple-200 to-purple-400 rounded" />
                        <span className="text-xs">Constructed, Neurological, No-self</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Survivor Bias Tab */}
          <TabsContent value="survivor" className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Survivor Bias Warning:</strong> The traditions we study today represent 
                only those that survived historical pressures. Many influential philosophies and 
                religions have been lost, often due to persecution, war, or cultural dominance.
              </AlertDescription>
            </Alert>

            <div className="grid gap-4">
              {extinctTraditions.map((tradition) => (
                <Card key={tradition.name} className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Skull className="h-5 w-5 text-red-500" />
                      {tradition.name}
                    </CardTitle>
                    <CardDescription>{tradition.period} • {tradition.geography}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-sm font-medium mb-1">Peak Influence</div>
                      <p className="text-sm text-muted-foreground">
                        {tradition.peakAdherents} adherents across {tradition.geography}
                      </p>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Key Ideas</div>
                      <p className="text-sm text-muted-foreground">{tradition.keyIdeas}</p>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Why It Disappeared</div>
                      <p className="text-sm text-muted-foreground">{tradition.reasonForDecline}</p>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Lasting Influence</div>
                      <p className="text-sm text-muted-foreground">{tradition.legacy}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-amber-50 border-amber-200">
              <CardHeader>
                <CardTitle>What We Can Learn</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  • <strong>Power shapes survival:</strong> Political and military force often determined which ideas persisted
                </p>
                <p className="text-sm">
                  • <strong>Written records matter:</strong> Traditions with extensive texts were more likely to survive
                </p>
                <p className="text-sm">
                  • <strong>Inclusivity aids persistence:</strong> Exclusive membership often led to decline
                </p>
                <p className="text-sm">
                  • <strong>Ideas transcend institutions:</strong> Many "extinct" concepts live on in other traditions
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ExplorerEnhanced;