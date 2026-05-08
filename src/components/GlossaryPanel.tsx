import React, { useMemo, useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { glossaryTerms } from '@/data/glossary';

const GlossaryPanel: React.FC = () => {
  const [query, setQuery] = useState('');

  const filteredTerms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return glossaryTerms;
    }

    return glossaryTerms.filter((entry) => {
      const searchableText = [
        entry.term,
        entry.shortDefinition,
        entry.studentDefinition,
        entry.pronunciation,
        ...(entry.relatedTerms ?? [])
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [query]);

  return (
    <Card className="mb-6 border-sky-100 bg-sky-50/40">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-sky-700" />
            Core Concepts Glossary
          </span>
          <Badge variant="secondary">{filteredTerms.length} terms</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search terms like dharma, karma, or survivor bias..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="bg-white pl-10"
          />
        </div>

        <TooltipProvider>
          <div className="flex flex-wrap gap-2">
            {filteredTerms.map((entry) => (
              <Tooltip key={entry.id}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="rounded-full border border-sky-200 bg-white px-3 py-1 text-left text-xs font-medium text-sky-900 transition-colors hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    {entry.term}
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-white text-slate-900">
                  <div className="space-y-1">
                    <p className="font-semibold">
                      {entry.term}
                      {entry.pronunciation && (
                        <span className="ml-1 font-normal text-muted-foreground">
                          ({entry.pronunciation})
                        </span>
                      )}
                    </p>
                    <p>{entry.studentDefinition}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>

        {filteredTerms.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No glossary terms match “{query}”. Try a broader concept or clear the glossary search.
          </p>
        )}

        <p className="text-xs text-muted-foreground">
          Hover or focus a term for a student-friendly explanation. These shared definitions support the timeline, comparison table, and tradition detail views.
        </p>
      </CardContent>
    </Card>
  );
};

export default GlossaryPanel;
