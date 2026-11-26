# Philosophy explorers and web-network follow-up — 2026-11-26

Jon requested a deeper pass and explicitly chose: “Include both; distinguish their roles.”

## Observed source identity and scope

- `Sum1Solutions/philosophical-explorer`: TempleAnyone.com / Cloudflare Pages `philosophical-explorer`, production branch `main`. Production d6423b1 and archived build JS main.a661c376.js match byte-for-byte. Recovered source at `_archive/2025-12-24/philo-explorer-2/philo-explorer`; active isolated worktree `/Users/jb/coding/philosophical-explorer`.
- `Sum1Solutions/philo-explorer`: separate Vite prototype at 60c0ef0. Its README's main.philo-explorer.pages.dev did not resolve; the current Cloudflare account contains no philo-explorer Pages project. This does not prove there is no deployment in any other account. Archived source remains at `_archive/2025-12-24/philo-explorer`; active isolated worktree `/Users/jb/coding/philo-explorer`. Existing untracked geo-feature.zip is preserved.
- Company and QA were clean apart from the company .claude/settings.local.json change. Existential Math has an ongoing separate workstream and was not edited here.

## Findings and implemented changes

1. **Two names concealed two different products.** Company registry now includes both, with TempleAnyone as an available educational experiment and Philo as source-only work in progress. `/work/philosophy` explains purposes, limits, and direct next steps. HAAPL links to that page. Neither explorer is presented as proof of Existential Math.
2. **TempleAnyone's “AI Debate” was a simulation.** Source used canned replies, mock citations, randomized percentages, and a heuristic labelled as response validation. Public flow now offers reading questions drawn from the existing text catalog. Legacy code remains in source for provenance, excluded from the active imports/bundle.
3. **Confidence was presented as calibrated quality.** Removed percentage badges and quality-score explanation from cards, comparisons, and detail views. Removed the nonfunctional perspective/threshold controls from the browse flow. Legacy values remain in data without a public accuracy claim.
4. **Comparisons were lost on reload and unavailable by link.** Validated hash URLs carry view and known, unique tradition IDs; back/forward hash navigation updates the view. Invalid IDs do not reach comparison components. Tabs have labelled panels and keyboard arrow/Home/End handling. Real components mount in the integration test.
5. **Date sorting misread “6th century BCE” as year -6.** Browse sorting now uses the same existing numeric catalog placement already used by the timeline. This fixes sorting consistency, not the historical accuracy of those catalog dates.
6. **Source lookup returned the first partial match.** Empty and ambiguous names now return no link; exact and unique normalized matches remain available. Test includes ambiguous “Bible” versus distinct catalog entries. The 29 tradition entries have 99 primary-text references, 75 without an exact source-key match in the 71-key catalog; this count is a mapping-review lead, not 75 proven broken links. Fuzzy matching and embedded references require separate review.
7. **Philo exposed internal development UI and speculative headline metrics.** Default entry now opens the normal dashboard. Removed the public version switcher and internal feature wishlist from its entry flow, removed unsupported headline population/time-span figures, marked historical material as draft, and added distinguishable native action buttons and links to the live project/source. Detailed historical claims still need review.
8. **QA lacked source ownership and positive philosophy checks.** Registry now records both repositories and their different maturity. Added required wording for TempleAnyone and actual outbound links on the company philosophy page. Prototype is not counted as a live uptime target. Page-request cap is 36 before redirects, smoke is 24 in a separate run.

## Verification

Company: build/typecheck, lint and six tests. Ten routes prerendered.
TempleAnyone: seven tests (URL validation, app navigation, keyboard focus, storage independence, real browse/compare/reading components, source ambiguity) and production build. Build retains pre-existing warnings in legacy/unmodified components. Installation needed `npm ci --ignore-scripts --legacy-peer-deps` because React 19 and older MUI peer constraints conflict. The failing new scrollable-MUI-tabs test exposed a null-ref measurement failure; native keyboard tabs replaced it and the tests passed. No new dependencies or lockfile changes.
Philo: baseline and updated TypeScript checks plus production build. No public deployment created.
QA: monitor and schedule-isolation tests.
HAAPL: JavaScript unchanged; local assets and new route link checked.

## Unverified and next work

The browser access host is unavailable. No visual/mobile, screen-reader, print, or unfamiliar-user review was performed. DOM tests do not establish visual accessibility or educational benefit.
Dependency install audits still report legacy findings (Temple 60 total including 4 critical; Philo 20 total including 17 high, mixing tooling and runtime dependencies). No clean-security claim. Migration/triage remains necessary; no blanket force-upgrade was applied.
A source-by-source scholarly review is still needed: dates and movements, intra-tradition diversity, broad categories, source mappings, translations, and claims about historical disappearance/influence. The corpus was not rewritten wholesale. Next product evidence should come from a reader completing a comparison and checking its source, with the stumbling points recorded.

Deployment receipts and live verification are appended after publication.

## Observed release receipts

- TempleAnyone: source 12cd301, production main, https://4c850fe9.philosophical-explorer.pages.dev. Served HTML, JS and CSS SHA-256 hashes match the reviewed local build. Mock debate/validation/quality-score strings are absent from the live bundle.
- Company: source ba6c3c9, production main, https://b9a4e4d1.sum1solutions-com.pages.dev. Philosophy page and directory HTML match the build; both project identities and links match the public registry.
- HAAPL: source f528fc4, production master, https://fe9eb8c8.haapl-com.pages.dev. All three public assets match source.
- Philo prototype: source fdac1b8 pushed to existing main; no deployment created.
- All eight live verification groups passed, including the actual monitor rules for TempleAnyone, HAAPL and both company pages. Only GET requests; no manual monitor run, chat, form, or notification.

GitHub pushes also reported legacy dependency alerts. Those backlog totals differ from the installation audit; neither constitutes a completed triage.

QA source 07abb4e deployed as Worker 38abf0c4-6946-4b49-8145-027d99ecc51e, with existing bindings and all five schedules retained.
