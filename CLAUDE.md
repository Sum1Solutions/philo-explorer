# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Philosophy & Religion Explorer is an interactive web application built with React + TypeScript + Vite that allows users to explore and compare different philosophical and religious traditions. The app focuses on five key aspects: nature of reality, self, core problem, response/solution, and ultimate aim.

## Commands

### Development
- `npm run dev` - Start development server with hot reload (uses Vite)
- `npm run build` - Create production build in `dist/` directory  
- `npm run preview` - Preview production build locally

### Deployment (Cloudflare Pages)
- `npm run cf:deploy` - Deploy to Cloudflare Pages using Wrangler
- `npm run cf:dev` - Run local development with Cloudflare Pages

## Architecture & Key Files

### Core Application Structure
- **`src/pages/Explorer.tsx`** - Main application component (1,320+ lines)
  - Contains all data models, state management, and UI logic
  - Defines the `Tradition` interface and `DATA` array with philosophical/religious traditions
  - Manages comparison views, timeline navigation, and detailed tradition views
  - Handles search filtering and tradition selection

### Data Model
The app is built around a centralized data structure in Explorer.tsx:
- `Tradition` interface defines each philosophical/religious tradition
- `DATA` array contains all tradition data with consistent structure
- Each tradition has: id, name, family, color, firstYear, overview (5 aspects), references, and optional deepDive
- Five core aspects (`RowKey`): reality, self, problem, response, aim

### UI Components
- **`src/components/ui/`** - Reusable UI primitives built with Tailwind CSS
  - Card, Button, Input, Dialog, Tabs, Tooltip, Badge components
  - Components follow shadcn/ui patterns with consistent styling

### Styling & Theming  
- **Tailwind CSS** with custom configuration in `tailwind.config.js`
- Color-coded traditions with dynamic class generation using safelist
- Custom CSS variables for theme colors in `src/index.css`
- Responsive design with mobile-first approach

### State Management
The app uses React hooks for state management:
- `selectedId` - Currently selected tradition from timeline
- `activeTradition` - Tradition shown in detailed dialog view
- `comparison` - State for comparison views and aspect filtering
- `query` - Search filter text
- `cutoffYear` - Timeline filter cutoff

### Key Features Implementation
- **Timeline Navigation**: Horizontal timeline with clickable dots for each tradition
- **Aspect Comparison**: Click any aspect to compare across all traditions  
- **Search & Filter**: Full-text search across tradition content
- **Drill-down Details**: Modal dialog with tabs for overview, key ideas, references
- **Responsive Cards**: Hover effects and interactive elements throughout

## Development Notes

### Adding New Traditions
To add a new tradition, extend the `DATA` array in Explorer.tsx with:
- Unique id, name, family classification, color theme
- firstYear for timeline positioning  
- overview object with all five required aspects
- references array with external links
- Optional deepDive with keyIdeas and notes

### Styling Conventions
- Uses dynamic Tailwind classes with color variables (e.g., `text-${tradition.color}-600`)
- Safelist configuration ensures dynamic color classes are included in build
- Consistent hover states and transitions throughout UI
- Responsive grid layouts with proper breakpoints

### Component Patterns
- Extensive use of React.memo for performance optimization
- Event handlers use useCallback to prevent unnecessary re-renders
- TypeScript interfaces ensure type safety across complex data structures
- Tooltip providers for enhanced UX with contextual help

This is a single-page application with no routing - all navigation happens through state changes and modal dialogs.