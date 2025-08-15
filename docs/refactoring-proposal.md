# Philosophy & Religion Explorer Refactoring Proposal

## Current Issues with Timeline

### 1. Dynamic CSS Classes Bug
**Problem**: Using template literals for Tailwind classes (`bg-${t.color}-500`) doesn't work with JIT compilation.
**Impact**: Colors may not render correctly for tradition dots and cards.
**Solution**: Use a color mapping object with predefined classes or CSS variables.

### 2. Complex Dual-Mode Positioning
**Problem**: Two different positioning systems (percentage vs pixel) for overview/detailed views.
**Impact**: Hard to maintain, prone to calculation errors, janky transitions.
**Solution**: Use a single, consistent positioning system with smooth zoom/pan.

### 3. Transform and Scale Conflicts
**Problem**: Using both `minWidth` and `transform: scaleX()` causes layout issues.
**Impact**: Tooltip positioning breaks, click targets misalign.
**Solution**: Use a proper pan/zoom library or implement clean transform-based scaling.

### 4. Collision Detection Issues
**Problem**: Simple linear collision detection doesn't handle clusters well.
**Impact**: Overlapping labels and dots in crowded periods.
**Solution**: Implement force-directed layout or better clustering algorithm.

## Proposed Architecture Refactoring

### 1. Data Model Enhancement

```typescript
interface Tradition {
  id: string;
  name: string;
  family: string;
  
  // Temporal data
  periods: {
    founded: number;
    peak?: { start: number; end: number };
    decline?: number;
    branches?: Array<{
      name: string;
      year: number;
      location?: GeoLocation;
    }>;
  };
  
  // Geographic data
  origins: GeoLocation;
  spread: Array<{
    location: GeoLocation;
    year: number;
    influence: 'primary' | 'secondary' | 'tertiary';
  }>;
  
  // Relationships
  influences: Array<{
    traditionId: string;
    type: 'derived' | 'inspired' | 'reaction' | 'synthesis';
    strength: number; // 0-1
  }>;
  
  // Evolution tracking
  evolution: Array<{
    year: number;
    aspect: RowKey;
    description: string;
    references?: Reference[];
  }>;
  
  // Content (existing)
  overview: Record<RowKey, string>;
  deepDive?: DeepDive;
  references: Reference[];
  
  // Metadata
  status: 'active' | 'historical' | 'extinct';
  adherents?: number; // current estimate
}

interface GeoLocation {
  lat: number;
  lng: number;
  name: string;
  region: string;
}
```

### 2. Component Architecture

```
src/
├── components/
│   ├── timeline/
│   │   ├── Timeline.tsx           # Main timeline component
│   │   ├── TimelineControls.tsx   # Zoom, pan, filters
│   │   ├── TimelineCanvas.tsx     # D3/Canvas rendering
│   │   ├── TimelineTradition.tsx  # Individual tradition marker
│   │   └── hooks/
│   │       ├── useTimelineZoom.ts
│   │       └── useTimelineData.ts
│   │
│   ├── map/
│   │   ├── GeographicMap.tsx      # Interactive world map
│   │   ├── MapControls.tsx        # Time slider, filters
│   │   ├── MapOverlay.tsx         # Tradition spread visualization
│   │   └── hooks/
│   │       └── useMapAnimation.ts
│   │
│   ├── network/
│   │   ├── InfluenceNetwork.tsx   # Force-directed graph
│   │   ├── NetworkNode.tsx        # Individual tradition node
│   │   ├── NetworkEdge.tsx        # Influence connection
│   │   └── hooks/
│   │       └── useForceSimulation.ts
│   │
│   ├── evolution/
│   │   ├── EvolutionChart.tsx     # Aspect evolution over time
│   │   ├── EvolutionStream.tsx    # Stream graph visualization
│   │   └── EvolutionLegend.tsx
│   │
│   └── survivor-bias/
│       ├── SurvivorBias.tsx       # Main survivor bias section
│       ├── ExtinctTraditions.tsx  # List of lost traditions
│       └── BiasExplanation.tsx    # Educational content
│
├── data/
│   ├── traditions/
│   │   ├── index.ts               # Main data export
│   │   ├── eastern.ts             # Eastern traditions
│   │   ├── abrahamic.ts           # Abrahamic traditions
│   │   ├── classical.ts           # Classical traditions
│   │   ├── modern.ts              # Modern traditions
│   │   ├── indigenous.ts          # Indigenous traditions
│   │   └── extinct.ts             # Lost/extinct traditions
│   │
│   └── relationships/
│       ├── influences.ts          # Influence mappings
│       └── geographic.ts          # Geographic data
│
├── lib/
│   ├── timeline/
│   │   ├── scaleManager.ts        # Handle zoom/pan logic
│   │   ├── collisionDetection.ts  # Prevent overlaps
│   │   └── periodCalculator.ts    # Era boundaries
│   │
│   ├── visualization/
│   │   ├── d3Utils.ts            # D3 helper functions
│   │   ├── colorScheme.ts        # Consistent color system
│   │   └── animations.ts         # Transition helpers
│   │
│   └── data/
│       ├── filters.ts            # Data filtering logic
│       ├── search.ts             # Search implementation
│       └── comparisons.ts        # Aspect comparison logic
│
└── pages/
    ├── Explorer.tsx               # Main explorer page (simplified)
    ├── Timeline.tsx               # Dedicated timeline view
    ├── Geographic.tsx             # Map-based exploration
    ├── Network.tsx                # Relationship network view
    └── Evolution.tsx              # Evolution tracking view
```

### 3. Timeline Implementation Fix

```typescript
// Use D3 for proper zoom/pan behavior
import { zoom, select, scaleLinear } from 'd3';

const TimelineCanvas: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  
  useEffect(() => {
    const svg = select(svgRef.current);
    
    const zoomBehavior = zoom()
      .scaleExtent([0.5, 5])
      .on('zoom', (event) => {
        setTransform(event.transform);
      });
    
    svg.call(zoomBehavior);
  }, []);
  
  // Use proper scales for positioning
  const xScale = scaleLinear()
    .domain([-12000, 2024])
    .range([0, 3000]);
  
  // Render with consistent positioning
  return (
    <svg ref={svgRef}>
      <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
        {/* Timeline content */}
      </g>
    </svg>
  );
};
```

### 4. Color System Fix

```typescript
// colorScheme.ts
export const TRADITION_COLORS = {
  watts: {
    primary: '#8b5cf6',    // violet-500
    secondary: '#a78bfa',  // violet-400
    accent: '#7c3aed',     // violet-600
    bg: '#f3e8ff',        // violet-50
  },
  buddhism: {
    primary: '#10b981',    // emerald-500
    secondary: '#34d399',  // emerald-400
    accent: '#059669',     // emerald-600
    bg: '#d1fae5',        // emerald-50
  },
  // ... etc
} as const;

// Use in components
<div 
  className="rounded-full border-2"
  style={{ 
    backgroundColor: TRADITION_COLORS[tradition.id].primary,
    borderColor: TRADITION_COLORS[tradition.id].accent
  }}
/>
```

### 5. Geographic Visualization

```typescript
// Using react-simple-maps or mapbox
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const GeographicMap: React.FC = ({ year, traditions }) => {
  const activeTraditions = useMemo(() => 
    traditions.filter(t => t.periods.founded <= year),
    [year, traditions]
  );
  
  return (
    <ComposableMap>
      <Geographies geography="/world-110m.json">
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      
      {activeTraditions.map(tradition => (
        <Marker key={tradition.id} coordinates={[
          tradition.origins.lng,
          tradition.origins.lat
        ]}>
          <circle r={8} fill={TRADITION_COLORS[tradition.id].primary} />
        </Marker>
      ))}
    </ComposableMap>
  );
};
```

### 6. Survivor Bias Section

```typescript
const SurvivorBias: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Understanding Survivor Bias</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            The traditions shown represent only those that survived to the present day. 
            Many influential philosophies and religions have been lost to history.
          </AlertDescription>
        </Alert>
        
        <div className="grid gap-4 mt-4">
          <ExtinctTraditionCard
            name="Manichaeism"
            period="3rd-14th century CE"
            description="Once spread from Rome to China, synthesizing Zoroastrian, Buddhist, and Christian elements"
            reasonForDecline="Persecution by both Christian and Islamic authorities"
          />
          
          <ExtinctTraditionCard
            name="Mithraism"
            period="1st-4th century CE"
            description="Mystery religion popular among Roman soldiers"
            reasonForDecline="Competition with Christianity, lack of written texts"
          />
          
          <ExtinctTraditionCard
            name="Catharism"
            period="12th-14th century CE"
            description="Dualist Christian movement in southern France"
            reasonForDecline="Albigensian Crusade and Inquisition"
          />
        </div>
      </CardContent>
    </Card>
  );
};
```

## Implementation Phases

### Phase 1: Fix Timeline Bugs (Week 1)
- Replace dynamic Tailwind classes with color system
- Implement D3-based zoom/pan
- Fix collision detection
- Add proper event handling

### Phase 2: Enhance Data Model (Week 2)
- Add temporal evolution tracking
- Add geographic data
- Add influence relationships
- Separate data into modules

### Phase 3: Geographic View (Week 3)
- Implement world map component
- Add time slider
- Show tradition spread animations
- Add heat map for influence

### Phase 4: Network Visualization (Week 4)
- Create force-directed graph
- Show influence relationships
- Add filtering by tradition family
- Implement interactive exploration

### Phase 5: Evolution Tracking (Week 5)
- Build stream graph for aspects
- Add drill-down for specific changes
- Link to historical events
- Add comparison tools

### Phase 6: Survivor Bias & Polish (Week 6)
- Add extinct traditions section
- Create educational content
- Performance optimization
- User testing and refinement

## Benefits of Refactoring

1. **Scalability**: Modular architecture supports adding unlimited traditions
2. **Maintainability**: Separated concerns, clear component boundaries
3. **Performance**: Proper virtualization and optimization techniques
4. **Features**: Geographic, network, and evolution visualizations
5. **Education**: Survivor bias section adds critical thinking element
6. **User Experience**: Smooth interactions, no bugs, intuitive navigation

## Technologies to Add

- **D3.js**: For advanced visualizations and zoom/pan
- **React Simple Maps** or **Mapbox**: For geographic visualization
- **Framer Motion**: For smooth animations
- **Zustand** or **Jotai**: For better state management
- **React Query**: For data fetching if adding backend
- **Vitest**: For testing components

## Migration Strategy

1. Create new component structure alongside existing
2. Migrate data to new format with backwards compatibility
3. Replace timeline component first (biggest pain point)
4. Add new views incrementally
5. Deprecate old Explorer.tsx once all features migrated