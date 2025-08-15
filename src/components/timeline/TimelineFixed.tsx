/**
 * Fixed Timeline Component
 * Addresses the bugs in the original timeline implementation:
 * - Uses static color scheme instead of dynamic Tailwind classes
 * - Implements proper D3-based zoom/pan
 * - Fixes collision detection
 * - Simplifies positioning logic
 */

import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { getTraditionColors, getTraditionCSSVars } from '@/lib/colorScheme';

interface TimelineTradition {
  id: string;
  name: string;
  family: string;
  firstYear: number;
  overview?: any;
}

interface TimelineFixedProps {
  traditions: TimelineTradition[];
  selectedTradition: TimelineTradition | null;
  onSelectTradition: (tradition: TimelineTradition) => void;
  hoveredTradition: TimelineTradition | null;
  onHoverTradition: (tradition: TimelineTradition | null) => void;
}

const TimelineFixed: React.FC<TimelineFixedProps> = ({
  traditions,
  selectedTradition,
  onSelectTradition,
  hoveredTradition,
  onHoverTradition,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 120 });
  const [currentZoom, setCurrentZoom] = useState(1);
  
  // Timeline configuration
  const timelinePadding = { left: 60, right: 60, top: 40, bottom: 40 };
  const minYear = -12000;
  const maxYear = 2024;
  
  // Create scales
  const xScale = useMemo(
    () => d3.scaleLinear()
      .domain([minYear, maxYear])
      .range([timelinePadding.left, dimensions.width - timelinePadding.right]),
    [dimensions.width, minYear, maxYear]
  );
  
  // Period definitions
  const periods = [
    { name: 'Ancient', start: -12000, end: -3000, color: 'rgba(251, 191, 36, 0.1)' },
    { name: 'Classical', start: -3000, end: 500, color: 'rgba(147, 197, 253, 0.1)' },
    { name: 'Medieval', start: 500, end: 1500, color: 'rgba(167, 243, 208, 0.1)' },
    { name: 'Modern', start: 1500, end: 2024, color: 'rgba(233, 213, 255, 0.1)' },
  ];
  
  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height: 120 });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Setup D3 zoom behavior
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    const g = svg.select('.timeline-content');
    
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 5])
      .translateExtent([[0, 0], [dimensions.width, dimensions.height]])
      .on('zoom', (event) => {
        g.attr('transform', event.transform.toString());
        setCurrentZoom(event.transform.k);
      });
    
    svg.call(zoom);
    
    // Add zoom controls
    const zoomIn = () => {
      svg.transition().duration(300).call(zoom.scaleBy, 1.3);
    };
    
    const zoomOut = () => {
      svg.transition().duration(300).call(zoom.scaleBy, 0.7);
    };
    
    const resetZoom = () => {
      svg.transition().duration(300).call(zoom.transform, d3.zoomIdentity);
    };
    
    // Store control functions for button handlers
    (svg.node() as any).__zoomIn = zoomIn;
    (svg.node() as any).__zoomOut = zoomOut;
    (svg.node() as any).__resetZoom = resetZoom;
    
  }, [dimensions]);
  
  // Collision detection for tradition markers
  const positionedTraditions = useMemo(() => {
    const sorted = [...traditions].sort((a, b) => a.firstYear - b.firstYear);
    const positioned: Array<TimelineTradition & { x: number; y: number }> = [];
    const minSpacing = 25;
    
    sorted.forEach((tradition) => {
      let x = xScale(tradition.firstYear);
      let y = 60;
      
      // Check for collisions and adjust position
      let collision = true;
      let attempts = 0;
      while (collision && attempts < 10) {
        collision = false;
        for (const other of positioned) {
          const distance = Math.sqrt(Math.pow(x - other.x, 2) + Math.pow(y - other.y, 2));
          if (distance < minSpacing) {
            collision = true;
            // Try different y positions
            y = y === 60 ? 40 : y === 40 ? 80 : 60;
            if (y === 60 && attempts > 5) {
              // If still colliding, shift x slightly
              x += minSpacing / 2;
            }
            break;
          }
        }
        attempts++;
      }
      
      positioned.push({ ...tradition, x, y });
    });
    
    return positioned;
  }, [traditions, xScale]);
  
  // Control handlers
  const handleZoomIn = () => {
    const svg = svgRef.current as any;
    if (svg && svg.__zoomIn) svg.__zoomIn();
  };
  
  const handleZoomOut = () => {
    const svg = svgRef.current as any;
    if (svg && svg.__zoomOut) svg.__zoomOut();
  };
  
  const handleReset = () => {
    const svg = svgRef.current as any;
    if (svg && svg.__resetZoom) svg.__resetZoom();
  };
  
  const handlePrevious = () => {
    if (!selectedTradition) {
      if (positionedTraditions.length > 0) {
        onSelectTradition(positionedTraditions[0]);
      }
    } else {
      const currentIndex = positionedTraditions.findIndex(t => t.id === selectedTradition.id);
      if (currentIndex > 0) {
        onSelectTradition(positionedTraditions[currentIndex - 1]);
      }
    }
  };
  
  const handleNext = () => {
    if (!selectedTradition) {
      if (positionedTraditions.length > 0) {
        onSelectTradition(positionedTraditions[0]);
      }
    } else {
      const currentIndex = positionedTraditions.findIndex(t => t.id === selectedTradition.id);
      if (currentIndex < positionedTraditions.length - 1) {
        onSelectTradition(positionedTraditions[currentIndex + 1]);
      }
    }
  };
  
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        {/* Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Historical Timeline</span>
            {selectedTradition && (
              <Badge variant="outline" className="ml-2">
                {selectedTradition.name} ({selectedTradition.firstYear > 0 ? selectedTradition.firstYear : `${Math.abs(selectedTradition.firstYear)} BCE`})
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={handlePrevious}
              disabled={!positionedTraditions.length}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={handleNext}
              disabled={!positionedTraditions.length}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <div className="h-4 w-px bg-border mx-1" />
            
            <Button
              size="sm"
              variant="ghost"
              onClick={handleZoomIn}
              className="h-8 w-8 p-0"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={handleZoomOut}
              className="h-8 w-8 p-0"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={handleReset}
              className="h-8 w-8 p-0"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            <div className="h-4 w-px bg-border mx-1" />
            
            <span className="text-xs text-muted-foreground">
              {Math.round(currentZoom * 100)}%
            </span>
          </div>
        </div>
        
        {/* Timeline SVG */}
        <div ref={containerRef} className="w-full overflow-hidden rounded-md border bg-muted/10">
          <svg
            ref={svgRef}
            width={dimensions.width}
            height={dimensions.height}
            className="cursor-move"
          >
            <defs>
              {/* Define gradients for periods */}
              <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(251, 191, 36)" stopOpacity="0.3" />
                <stop offset="30%" stopColor="rgb(147, 197, 253)" stopOpacity="0.3" />
                <stop offset="60%" stopColor="rgb(167, 243, 208)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(233, 213, 255)" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            
            <g className="timeline-content">
              {/* Period backgrounds */}
              {periods.map((period) => (
                <rect
                  key={period.name}
                  x={xScale(period.start)}
                  y={0}
                  width={xScale(period.end) - xScale(period.start)}
                  height={dimensions.height}
                  fill={period.color}
                  className="pointer-events-none"
                />
              ))}
              
              {/* Period labels */}
              {periods.map((period) => (
                <text
                  key={`${period.name}-label`}
                  x={(xScale(period.start) + xScale(period.end)) / 2}
                  y={20}
                  textAnchor="middle"
                  className="text-xs fill-muted-foreground font-medium pointer-events-none"
                >
                  {period.name}
                </text>
              ))}
              
              {/* Main timeline line */}
              <line
                x1={timelinePadding.left}
                y1={60}
                x2={dimensions.width - timelinePadding.right}
                y2={60}
                stroke="url(#timeline-gradient)"
                strokeWidth="2"
                className="pointer-events-none"
              />
              
              {/* Year markers */}
              {[-10000, -5000, 0, 1000, 2000].map((year) => (
                <g key={year} className="pointer-events-none">
                  <line
                    x1={xScale(year)}
                    y1={55}
                    x2={xScale(year)}
                    y2={65}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-muted-foreground"
                  />
                  <text
                    x={xScale(year)}
                    y={75}
                    textAnchor="middle"
                    className="text-[10px] fill-muted-foreground"
                  >
                    {year === 0 ? '1 CE' : year > 0 ? `${year} CE` : `${Math.abs(year)} BCE`}
                  </text>
                </g>
              ))}
              
              {/* Tradition markers */}
              {positionedTraditions.map((tradition) => {
                const colors = getTraditionColors(tradition.id);
                const isSelected = selectedTradition?.id === tradition.id;
                const isHovered = hoveredTradition?.id === tradition.id;
                
                return (
                  <g
                    key={tradition.id}
                    transform={`translate(${tradition.x}, ${tradition.y})`}
                    className="cursor-pointer"
                    onMouseEnter={() => onHoverTradition(tradition)}
                    onMouseLeave={() => onHoverTradition(null)}
                    onClick={() => onSelectTradition(tradition)}
                  >
                    {/* Connection line */}
                    <line
                      x1={0}
                      y1={0}
                      x2={0}
                      y2={60 - tradition.y}
                      stroke={colors.secondary}
                      strokeWidth="1"
                      strokeDasharray="2,2"
                      opacity="0.5"
                    />
                    
                    {/* Marker circle */}
                    <circle
                      r={isSelected ? 8 : isHovered ? 7 : 6}
                      fill={colors.primary}
                      stroke={colors.accent}
                      strokeWidth="2"
                      className="transition-all duration-200"
                    />
                    
                    {/* Label on hover */}
                    {(isHovered || isSelected) && (
                      <g>
                        <rect
                          x={-40}
                          y={-25}
                          width={80}
                          height={20}
                          fill="white"
                          stroke={colors.border}
                          strokeWidth="1"
                          rx="3"
                        />
                        <text
                          y={-10}
                          textAnchor="middle"
                          className="text-[11px] font-medium"
                          fill={colors.accent}
                        >
                          {tradition.name}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
        
        {/* Zoom hint */}
        <div className="mt-2 text-xs text-muted-foreground text-center">
          Use mouse wheel to pan, Ctrl+wheel to zoom, or use the controls above
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineFixed;