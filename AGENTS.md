# AGENTS.md — Dash

Jules reads this file automatically on every task in this repo. Keep it current — it's the single source of truth for stack, conventions, and non-negotiables.

## What Dash is
Dash is an AI-powered dashboard builder. A user uploads tabular data (CSV/XLSX), asks a question in plain English, and gets back a live chart backed by a real SQL query — running entirely in the browser. No raw data leaves the client unless the user explicitly saves a dashboard.

## Locked stack — do not swap without explicit human approval
| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, TypeScript, strict mode) |
| Styling / UI | Tailwind CSS + shadcn/ui |
| Charts | Recharts |
| Client-side query engine | DuckDB-WASM |
| AI | Anthropic API (Claude) — NL → SQL + chart spec |
| State | Zustand |
| Auth / persistence | Supabase (Postgres + Auth + Storage) |
| Deployment | Vercel |

If a task seems to require a different library, stop and flag it in the plan instead of substituting silently.

## Non-negotiables
- **Data never leaves the browser during analysis.** All querying happens client-side via DuckDB-WASM. Uploaded files are parsed into an in-memory DuckDB table and never uploaded to a server unless the user explicitly clicks "Save dashboard."
- **Claude never touches raw data.** The Anthropic API call receives only the table schema (column names + inferred types) plus the user's question — never row-level data. It returns `{ sql, chartType, chartConfig }` as structured JSON. The client validates and executes the SQL locally.
- **Every AI-generated query is shown to the user.** No hidden SQL. Transparency is a product requirement, not a nice-to-have.
- **TypeScript strict mode.** No `any` without a `// justified:` comment explaining why.
- **Saved dashboards persist config only** (chart specs, saved queries, layout) — not the underlying dataset — unless the user explicitly opts into cloud data storage.

## Architecture (target layout) & Data Flow
### Data flow (canonical)
1. User uploads CSV/XLSX → parsed and loaded into DuckDB-WASM as a table, entirely client-side.
2. Client extracts schema (column names, inferred types, row count) — no row data.
3. User types a question → schema + question sent to `/api/ai-query` → Anthropic API → returns validated `{ sql, chartType, chartConfig }`.
4. Client runs SQL against the in-browser DuckDB instance.
5. Result set renders via the matching Recharts component per `chartType`.
6. On "Save," the chart spec + query (not the data) persists to Supabase, scoped to the authenticated user.

## Conventions
- **Commits**: Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`).
- **Components**: PascalCase, one component per file, colocate small subcomponents only if they're not reused.
- **Server code**: Server code that touches secrets (Anthropic key, Supabase service role) lives only in `app/api/**/route.ts` — never in client components.
- **Validation**: Validate every AI response against a Zod schema before it touches state or the DuckDB connection; treat the model's output as untrusted input.

## Definition of done for any task
- `npm run typecheck`, `npm run lint`, and `npm run build` all pass.
- The feature works end-to-end against a real sample CSV (not just a mocked state).
- No console errors or unhandled promise rejections in the browser.
- PR description states what changed, why, and any deviations from this file.

---

# Dash — Jules Task Playbook

How to use: create a new repo, commit `AGENTS.md` to the root, connect it in Jules, then paste Phase 1 into the Jules task box. Review its plan before approving, review the PR, merge, then paste Phase 2 against the updated main branch. Repeat. Don't paste all phases at once — Jules does best with small, verifiable, self-contained briefs (this is an async agent, not a live chat; it rewards planning over back-and-forth).

## Phase Overview
- **Phase 1** — Scaffold
- **Phase 2** — Client-side data ingestion (DuckDB-WASM)
- **Phase 3** — Natural language → chart (Anthropic API)
- **Phase 4** — Dashboard canvas, save/load, auth
- **Phase 5** — Deploy

## Notes on running this in Jules
- Jules shows a plan before touching code — read it. If it misreads a phase (e.g., tries to implement Supabase in Phase 2), reject and clarify rather than letting it run.
- Each phase should land as its own PR against main. Merge and let CI/build pass before starting the next phase — later phases assume earlier ones are actually merged, not just planned.
- If Jules proposes swapping a locked-stack item (e.g. suggesting Chart.js instead of Recharts), that's `AGENTS.md` not being read correctly for this task — restate the constraint explicitly in the prompt.
