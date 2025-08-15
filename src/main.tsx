import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Explorer from "./pages/Explorer";
import ExplorerEnhanced from "./pages/ExplorerEnhanced";
import ExplorerWithEnhancements from "./pages/ExplorerWithEnhancements";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'original' | 'enhanced' | 'integrated'>('integrated');

  const views = [
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
      description: 'Your current version with timeline bugs',
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
              <h2 className="font-semibold">Philosophy Explorer Versions</h2>
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
                  {view.key === 'integrated' && <Badge variant="secondary" className="mt-1">Recommended</Badge>}
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

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
