<h1 align="center">My Task Board | devChallenges</h1>

<div align="center">
   Solution for a challenge <a href="https://devchallenges.io/challenge/my-task-board-app" target="_blank">My Task Board</a> from <a href="http://devchallenges.io" target="_blank">devChallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="#">Demo</a>
    <span> | </span>
    <a href="#">Solution</a>
    <span> | </span>
    <a href="https://devchallenges.io/challenge/my-task-board-app">Challenge</a>
  </h3>
</div>

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
  - [Monorepo layout](#monorepo-layout)
  - [Frontend layers](#frontend-layers)
  - [Data flow](#data-flow)
  - [Testing pyramid](#testing-pyramid)
- [Built with](#built-with)
- [Features](#features)
- [Getting Started](#getting-started)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Overview

A full-stack task management board built with clean code architecture principles — clear separation between domain logic, application state, infrastructure, and UI.

## Architecture

The frontend follows a strict four-layer architecture inspired by Nik Sumeiko's React + TDD clean code approach. Each layer has a single responsibility and only depends on layers below it.

### Monorepo layout

```text
task-board/
├── apps/
│   ├── web/          React + Vite frontend
│   ├── api/          NestJS REST API
│   └── e2e/          Playwright end-to-end tests
└── packages/
    └── types/        Shared TypeScript contracts (Task, Board, DTOs)
```

### Frontend layers

```text
┌─────────────────────────────────────────────────────┐
│                      PAGES                          │
│         HomePage · BoardPage                        │
│   Route-level components. Wire application state    │
│   to UI. Pass callbacks down as props.              │
├─────────────────────────────────────────────────────┤
│                    COMPONENTS                       │
│  TaskBoardHeader · TaskCard · StatusButton          │
│  AddTaskCard · TaskEditPanel                        │
│  Pure JSX. Receive data + callbacks via props.      │
│  No store imports, no API calls, no logic.          │
├─────────────────────────────────────────────────────┤
│                   APPLICATION                       │
│              boardStore (Zustand)                   │
│  Orchestrates infrastructure calls and owns         │
│  shared UI state (board, loading, error).           │
├────────────────────┬────────────────────────────────┤
│     DOMAIN         │       INFRASTRUCTURE           │
│   domain/task.ts   │    infrastructure/boardApi.ts  │
│                    │                                │
│  Pure functions.   │  HTTP client. Speaks to the    │
│  No React.         │  NestJS API. No business       │
│  No side effects.  │  logic, no state.              │
│  Framework-agnostic│                                │
└────────────────────┴────────────────────────────────┘
```

**Key design decisions:**

- **Domain logic is pure TypeScript.** Status → CSS class maps, icon lists, label lookups, and input guards live in `domain/task.ts`. They have zero React dependencies and are covered by plain unit tests.
- **Components depend on abstractions.** `TaskBoardHeader` receives `onSave` as a prop instead of importing the store — dependency inversion in practice.
- **Infrastructure is isolated.** `boardApi.ts` is the only file that calls `fetch`. Mocking it in tests is a single `vi.mock('@/infrastructure/boardApi')`.
- **Application layer orchestrates.** The Zustand store calls infrastructure, updates state, and exposes actions. Pages consume the store; components never do.

### Data flow

```text
User interaction
      │
      ▼
  Component  ──(callback prop)──▶  Page
                                    │
                                    │  calls action
                                    ▼
                              boardStore          (Application)
                            ┌────────────┐
                            │ loadBoard  │──▶  boardApi.getBoard()    (Infrastructure)
                            │ addTask    │──▶  boardApi.addTask()
                            │ updateTask │──▶  boardApi.updateTask()
                            │ deleteTask │──▶  boardApi.deleteTask()
                            └────────────┘
                                    │
                                    │  updates state
                                    ▼
                              board / loading / error
                                    │
                                    │  re-renders
                                    ▼
                              Page ──(props)──▶  Components
```

**Status display lookup (domain layer, no React):**

```text
TaskStatus
   │
   ├─ 'todo'        ──▶  getTaskCardBg()  →  'bg-task-todo'
   ├─ 'in-progress' ──▶  getTaskCardBg()  →  'bg-task-in-progress'
   ├─ 'completed'   ──▶  getTaskCardBg()  →  'bg-task-completed'
   └─ 'wont-do'     ──▶  getTaskCardBg()  →  'bg-task-wont-do'

NonTodoStatus
   │
   ├─ 'in-progress' ──▶  STATUS_BUTTON_CONFIG  →  { label, icon, buttonBg }
   ├─ 'completed'   ──▶  STATUS_BUTTON_CONFIG  →  { label, icon, buttonBg }
   └─ 'wont-do'     ──▶  STATUS_BUTTON_CONFIG  →  { label, icon, buttonBg }
```

### Testing pyramid

```text
         /\
        /  \   E2E (Playwright)
       /----\  Task board renders heading
      /      \
     /--------\ Integration (Vitest + jsdom)
    /  App.tsx \  Full routing · store · API mock
   /------------\
  /   Unit tests \ Component tests · Domain tests
 /----------------\
  44 tests · 0 mocks needed for domain layer
```

| Layer       | Tool         | What's tested                                       |
| ----------- | ------------ | --------------------------------------------------- |
| Domain      | Vitest       | Pure functions — status maps, validation, icon list |
| Component   | Vitest + RTL | Rendering, user events, prop contracts              |
| Integration | Vitest + RTL | Full page with mocked API                           |
| E2E         | Playwright   | Real browser against running servers                |

**Domain tests need no mocks** because `domain/task.ts` has no external dependencies. Component tests only mock the infrastructure module — never the store — keeping tests honest about application behaviour.

### NestJS backend layers

```text
HTTP Request
     │
     ▼
Controller  (route handler, HTTP concerns only)
     │
     ▼
Service     (business rules: create defaults, cascade logic)
     │
     ▼
Entity      (TypeORM model, SQLite via better-sqlite3)
```

## Built with

- [React 18](https://reactjs.org/) + TypeScript
- [Tailwind CSS v3](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/) — application state
- [NestJS](https://nestjs.com/) + [TypeORM](https://typeorm.io/) + SQLite
- [Turborepo](https://turbo.build/) — monorepo task orchestration
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) — unit & integration tests
- [Playwright](https://playwright.dev/) — end-to-end tests

## Features

- Create, update, and delete tasks
- Categorize tasks by status: **Todo**, **In Progress**, **Completed**, **Won't Do**
- Inline board title and description editing
- Emoji icon picker per task
- Responsive layout

## Getting Started

### Prerequisites

- Node.js >= 20
- npm >= 10

### Installation

```bash
npm install
```

### Development

```bash
npm run dev          # web on :3000 · api on :4000
```

### Testing

```bash
npm test             # unit + integration tests (Vitest)
npm run test:e2e     # end-to-end tests (Playwright)
```

### Build

```bash
npm run build
```

## Contact

- GitHub [@malsaslamcraft97](https://github.com/malsaslamcraft97)

## Acknowledgements

- [devChallenges.io](https://devchallenges.io/)
- [Nik Sumeiko](https://www.youtube.com/@niksumeiko) — React clean code architecture & TDD patterns
