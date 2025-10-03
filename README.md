# RxJS vs Signals — Two Approaches (Starter)

This repository contains two **starter mini-apps** to demonstrate the practical differences between **Angular Signals** and **RxJS Observables**.

- **Approach A (Signals):** Local Kanban — focuses on synchronous UI state & derived values.
- **Approach B (Observables):** Search & Live Feed — focuses on async streams, debounce, cancellation, combination, and polling.

These starters are deliberately **minimal and not fully implemented**. Each file includes `TODO` comments where you will add logic.

---

## Why two apps?
- **Signals** shine for _state you read and write locally_ and for _derived values_ with `computed()`.
- **RxJS** shines for _events and async flows over time_ with operators like `debounceTime`, `switchMap`, `combineLatest`, and `retry`.

---

## Quickstart (recommended path)
> Requires Node 18+ and Angular CLI 18+.

1. **Create an Angular workspace** (empty starter):
   ```bash
   npm i -g @angular/cli
   ng new rxjs-vs-signals-demo --standalone --routing --style=css --skip-tests
   cd rxjs-vs-signals-demo
   ```

2. **Copy the `/src` folder from this repo** into your project, replacing the existing `src`:
   ```bash
   # From the root of this downloaded repo:
   # (Adjust the path to your workspace)
   cp -r src "<path-to>/rxjs-vs-signals-demo/"
   ```

3. **Install dependencies** (HttpClient is included by default in Angular projects):
   ```bash
   npm install
   ng serve -o
   ```

4. Open:
   - `http://localhost:4200/kanban` — Signals starter
   - `http://localhost:4200/search` — Observables starter

---

## Project Structure (this repo)
```
src/
  app/
    app.component.ts
    app.component.html
    app.config.ts
    app.routes.ts

    kanban/
      task.model.ts
      kanban.store.ts
      kanban-board.component.ts
      kanban-board.component.html
      kanban-board.component.css

    search/
      search.service.ts
      search-page.component.ts
      search-page.component.html
      search-page.component.css

  main.ts
```

---

## What you will implement

### A) Local Kanban (Signals)
- `kanban.store.ts`:
  - `add(title)`, `move(id, state)`, `setPriority(id, p)`
  - `progress` computed value (e.g., done/total * 100)
  - Optional: `effect()` to autosave `tasks()` to `localStorage`
- `kanban-board.component.*`:
  - Inputs/Buttons for adding, moving, prioritizing
  - Render `todo()`, `doing()`, `done()`

### B) Search & Live Feed (Observables)
- `search-page.component.ts`:
  - Build `q$`, `lang$`, `page$`
  - `combineLatest([q$, lang$, page$])` → `switchMap(api.searchRepos$)`
  - `loading$` that toggles with the request lifecycle
- `search.service.ts`:
  - Implement `searchRepos$(q, lang, page)` (e.g., GitHub API)
  - Optional: add `liveEvents$` using `timer(0, 30000)` + `switchMap` + `retry`

---

## Pushing to GitHub

1. Create a new repo on GitHub (e.g., `rxjs-vs-signals-starters`).
2. Initialize and push:
   ```bash
   git init
   git add .
   git commit -m "chore: add rxjs vs signals starter apps"
   git branch -M main
   git remote add origin https://github.com/<your-username>/rxjs-vs-signals-starters.git
   git push -u origin main
   ```

---

## Notes
- These starters are framework-agnostic within Angular 17/18+ standalone style.
- You can integrate a UI library (Material, shadcn/ui, etc.) if desired.
- Keep **Signals for local state** and **RxJS for async streams**; bridge with `toSignal()` / `toObservable()` as needed.

Happy building!
