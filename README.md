# AppTrack — Frontend

A personal job search management tool. Track applications on a Kanban board, view stats on your search activity, and keep research notes on target companies.

**Live:** https://application-tracker-client.onrender.com  
**Backend repo:** https://github.com/quynhtruong1303/application-tracker-api

---

## Tech Stack

- **React 19** + **Vite**
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin)
- **Inter** font (Google Fonts)
- View switching via `useState`
- Native HTML5 drag-and-drop API

---

## Features

- **Kanban board** — drag-and-drop on desktop, collapsible drawer layout on mobile/tablet
- **Search** — filter applications by company or role
- **Year filter** — filter applications and stats by year
- **Stats dashboard** — count by status with a visual breakdown bar
- **Company notes** — store background, interview tips, contacts, and general notes per company
- **JWT authentication** — register and login, data scoped per user
- **Responsive design** — automatic layout switch at 1024px

---

## Project Structure

```
src/
├── main.jsx                          # Entry point
├── App.jsx                           # Auth gate + AppShell with navbar
├── index.css                         # Tailwind import + Inter font + body reset
│
├── api/
│   ├── client.js                     # Fetch wrapper — base URL + auth header
│   └── companyNotes.js               # CRUD helpers for /company-notes
│
├── context/
│   └── AuthContext.jsx               # Token + user state via React context
│
├── hooks/
│   └── useMediaQuery.js              # Returns true/false for a CSS media query
│
├── pages/
│   ├── AuthPage.jsx                  # Login + register forms
│   ├── KanbanPage.jsx                # Renders KanbanBoard
│   ├── StatsPage.jsx                 # Stats dashboard
│   └── CompanyNotesPage.jsx          # Company notes grid
│
└── components/
    ├── kanban/
    │   ├── KanbanBoard.jsx           # Fetches apps, manages state, search + year filter
    │   ├── KanbanColumn.jsx          # Single column with drop zone
    │   ├── ApplicationCard.jsx       # Draggable card (desktop) + quick-move (mobile)
    │   └── MobileBoard.jsx           # Mobile vertical drawer layout
    ├── modals/
    │   ├── AddApplicationModal.jsx   # Create new application
    │   └── EditApplicationModal.jsx  # Edit + delete with confirmation
    ├── notes/
    │   ├── CompanyNoteCard.jsx       # Card with section previews
    │   ├── AddCompanyNoteModal.jsx   # Create new company note
    │   └── EditCompanyNoteModal.jsx  # Edit + delete with confirmation
    └── stats/
        └── StatsCard.jsx             # Single stat tile
```

---

## Version

Current version: `0.1.0`
