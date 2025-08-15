/**
 * Development Version Switcher
 * Access all different versions for development and comparison
 * Navigate to /dev-versions to access this
 */

import React, { useState } from "react";
import Explorer from "./Explorer";
import ExplorerEnhanced from "./ExplorerEnhanced";
import ExplorerWithEnhancements from "./ExplorerWithEnhancements";
import MainDashboard from "./MainDashboard";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const DevVersions: React.FC = () => {
  const [currentView, setCurrentView] = useState<'main' | 'original' | 'enhanced' | 'integrated'>('main');

  const views = [
    { 
      key: 'main' as const, 
      label: 'Main Dashboard', 
      description: 'New three-tile interface (production version)',
      component: <MainDashboard />
    },
    { 
      key: 'integrated' as const, 
      label: 'Enhanced Original', 
      description: 'Original with Survivor Bias & Evolution',
      component: <ExplorerWithEnhancements />
    },
    { 
      key: 'enhanced' as const, 
      label: 'Full Demo', 
      description: 'Complete refactored version',
      component: <ExplorerEnhanced />
    },
    { 
      key: 'original' as const, 
      label: 'Original (Buggy)', 
      description: 'Your original version with timeline bugs',
      component: <Explorer />
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Version Switcher */}
      <div className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Development Version Switcher</h2>
              <p className="text-xs text-muted-foreground">
                {views.find(v => v.key === currentView)?.description}
              </p>
            </div>
            <div className="flex gap-2">
              {views.map(view => (
                <Button
                  key={view.key}
                  variant={currentView === view.key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentView(view.key)}
                  className="flex flex-col items-center h-auto py-2 px-3"
                >
                  <span className="text-xs">{view.label}</span>
                  {view.key === 'main' && <Badge variant="default" className="mt-1">Production</Badge>}
                  {view.key === 'integrated' && <Badge variant="secondary" className="mt-1">Enhanced</Badge>}
                  {view.key === 'original' && <Badge variant="destructive" className="mt-1">Has Bugs</Badge>}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Current View */}
      {views.find(v => v.key === currentView)?.component}
    </div>
  );
};

export default DevVersions;