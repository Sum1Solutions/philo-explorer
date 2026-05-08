# Philosophy & Religion Explorer – Next Steps Roadmap

Last updated: 2026-05-08

## Product direction

The app is moving toward an educational comparison platform rather than a static encyclopedia. The highest-value goal is to help students and instructors answer three questions:

1. **What does each tradition say?** Clear summaries of reality, self, suffering/problem, transformation/practice, and flourishing.
2. **How do traditions compare?** Fast side-by-side comparison across traditions, families, periods, and concepts.
3. **Why did these traditions survive, change, or disappear?** Timeline, lost-tradition, and evolution views that make history and survivor bias visible.

## Recommended implementation order

### Phase 1 – Make the current explorer more useful

**Goal:** Turn the existing content into a practical study and classroom tool before adding heavy visualization work.

#### 1. Pin-and-compare workflow

Add a comparison tray where users can pin 2–4 traditions and compare them across the five core aspects.

**Why now:** The app already has the data structure and comparison intent; this would immediately make the explorer more functional.

**Acceptance criteria:**

- Users can pin and unpin traditions from cards and detail views.
- A comparison panel/table displays pinned traditions by aspect.
- Users can clear all pinned traditions.
- The table works on mobile with horizontal scrolling or stacked cards.

#### 2. Guided learning paths

Add a small set of guided paths for students and instructors.

Suggested paths:

- **Intro to World Wisdom:** Buddhism, Judaism, Christianity, Islam, Hinduism, Taoism.
- **The Problem of Suffering:** Buddhism, Christianity, Stoicism, Absurdism, Secular Humanism.
- **Self and Identity:** Hinduism, Buddhism, Taoism, Existentialism, Alan Watts.
- **Lost Alternatives:** Manichaeism, Catharism, Druidism, and other extinct traditions.

**Acceptance criteria:**

- A guided path includes an ordered list of traditions, learning objective, reflection prompts, and completion state.
- Users can jump from a path item into the relevant tradition detail view.
- At least one path has a teacher-facing activity prompt.

#### 3. Glossary and concept cards

Add a glossary for recurring terms such as BCE/CE, dharma, karma, anatta, nonduality, covenant, salvation, logos, existentialism, nihilism, and survivor bias.

**Acceptance criteria:**

- Terms can be reused from a single glossary data file.
- Glossary entries can appear in tooltips and in a searchable glossary panel.
- Entries use student-friendly definitions and optional “learn more” references.

### Phase 2 – Improve trust and academic usefulness

**Goal:** Make the project more credible and maintainable as an educational resource.

#### 4. Source quality metadata

Enhance references with type, author, year, difficulty, and source quality.

Suggested metadata:

- `type`: book, encyclopedia, primary text, article, lecture, other.
- `difficulty`: introductory, intermediate, advanced.
- `sourceQuality`: primary, academic, reference, popular, community.
- `notes`: caveats for contested dates, simplified claims, or interpretive disagreements.

**Acceptance criteria:**

- Tradition detail pages can filter or group references by source type.
- Contested dates or interpretive caveats are visible near affected claims.
- References have consistent metadata across living and extinct traditions.

#### 5. Data validation and tests

Add schema validation and smoke tests so future content changes do not break the explorer.

**Acceptance criteria:**

- Every tradition has all five overview aspects.
- Every tradition has a unique id.
- Every reference has a title and URL when applicable.
- `npm run typecheck` and `npm run test` are available scripts.
- CI runs typecheck, build, and tests.

### Phase 3 – Add richer historical and conceptual exploration

**Goal:** Build the unique parts of the product: influence, evolution, geography, and survivor bias.

#### 6. Influence network

Add a relationship model that connects traditions through influence, reaction, synthesis, shared roots, and suppression.

**Acceptance criteria:**

- Each relationship has source id, target id, relationship type, strength, and explanation.
- Users can view “influenced by” and “influenced” relationships from a tradition detail view.
- A first network view can start as a simple list before becoming a graph visualization.

#### 7. Timeline upgrades

Make the timeline a tool for analysis, not just navigation.

**Acceptance criteria:**

- Users can filter by family, status, geography, and date range.
- Dense periods avoid label overlap.
- Extinct traditions can be optionally overlaid with living traditions.
- Timeline items show uncertainty for approximate or disputed dates.

#### 8. Extinct-to-living bridge

Connect lost traditions to surviving or later movements when there is a meaningful historical relationship.

**Acceptance criteria:**

- Lost tradition cards show causes of decline and possible descendants/influences.
- Survivor-bias analysis includes concrete examples, not only general explanation.
- Users can compare lost and living traditions using the same five-aspect framework when data allows.

## Suggested first sprint

If you want the fastest functional improvement, implement these in order:

1. **Pin-and-compare tray** – implemented as the first functional follow-up; next iteration should add export/share options.
2. **Glossary data file and tooltip integration** – implemented with searchable concept chips; next iteration should auto-link terms inside tradition text.
3. **Reference metadata normalization** – improves trust and prepares for research workflows.
4. **Schema checks for tradition data** – prevents regressions while content grows.

## Open product questions

Before building larger features, decide:

- Is the primary audience high school, college intro courses, independent learners, or educators?
- Should the app prioritize neutral comparison, guided interpretation, or argument/critical thinking?
- Should “traditions” include individual modern interpreters like Alan Watts alongside religions and schools, or should those be modeled as figures/commentators?
- Should extinct traditions use the same five-aspect model even when evidence is fragmentary?
- Should the app eventually support saved work, class assignments, or exportable worksheets?

## Definition of done for the next feature

A next feature should be considered complete only when it has:

- A small data model that can grow without rewriting UI.
- Mobile-responsive UI.
- Keyboard-accessible controls where relevant.
- At least one automated check or test.
- Clear student-facing copy.
- A short note in docs explaining how to extend it.
