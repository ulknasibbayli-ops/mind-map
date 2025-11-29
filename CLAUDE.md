# CLAUDE.md - Goal Mind Map Design Specifications

## Project Overview

This repository contains **design specifications and HTML/CSS mockups** for the "Goal Mind Map" application - a goal tracking and visualization tool. The mockups are meant to be converted into React components for a Next.js application.

**Important:** This is NOT a functional codebase. It contains design specifications (HTML/CSS) that serve as blueprints for building the actual React application.

## Repository Structure

```
mind-map/
├── setup.md                        # Next.js project initialization guide
├── 1-charts-list.md                # Charts List page mockup (home/dashboard)
├── 2-mind-map-canvas.md            # Mind Map Canvas mockup (main visualization)
├── 3-node-editor-dialog.md         # Node Editor Dialog mockup (edit nodes)
├── 4-daily-to-do-list.md           # Daily To-Do List feature mockup
├── 5-authentication.md             # Authentication pages mockup
├── tailwind-imports-best-practice.md  # Tailwind CSS import guide
└── komposo-2025-11-28T19-22-05-419Z.zip  # Source export file
```

## File Processing Order

**CRITICAL:** Process the numbered markdown files in sequential order:

1. **setup.md** - Initialize the Next.js project first
2. **1-charts-list.md** - Charts List page (home page showing user's goal charts)
3. **2-mind-map-canvas.md** - Mind Map Canvas (interactive node visualization)
4. **3-node-editor-dialog.md** - Node Editor Dialog (modal for editing nodes)
5. **4-daily-to-do-list.md** - Daily To-Do List (sidebar/drawer feature)
6. **5-authentication.md** - Authentication flow (login/signup pages)

## Application Features

### 1. Charts List (Dashboard)
- Display list of user's goal charts with progress indicators
- Create new chart functionality
- Chart cards with gradient headers, progress bars
- Rename and delete options per chart
- Bottom navigation bar (Charts, Tasks, Analytics, Settings)
- Empty state when no charts exist

### 2. Mind Map Canvas
- Interactive node-based visualization
- Central goal node with child nodes
- SVG-based connection lines between nodes
- Zoom controls (+, -, fit-to-screen)
- Mini-map for navigation
- Right sidebar with:
  - Add Goal button
  - Auto Layout / Export buttons
  - Deadline filter dropdown
  - Chart selector dropdown
  - Selected node details panel
  - Stats (total nodes, completed)
- Mobile bottom sheet for node details

### 3. Node Editor Dialog
- Modal dialog for editing node properties
- Fields:
  - Node Label (text input)
  - Node Type (Goal, Step, Action, Task, Subtask, Microtask)
  - Deadline (date picker with clear option)
  - Status (Not Started, In Progress, Completed, Blocked)
  - Description (optional textarea)
- Action buttons: Cancel, Save Node, Delete Node
- Slide-up animation on mobile

### 4. Daily To-Do List
- Desktop: Right sidebar panel
- Mobile: Floating action button + bottom sheet drawer
- Drag-and-drop tasks from mind map
- Checkbox-based task completion
- Priority indicators with color coding
- Add Task button

### 5. Authentication
- Google OAuth sign-in button
- Email-based sign-in with magic link
- Email confirmation modal
- Loading overlay during authentication
- Create account link

## Technology Stack (Target)

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Font Awesome (fa-solid icons)
- **Routing:** Next.js App Router (`src/app/` directory)

## Development Setup Commands

```bash
# Initialize Next.js in current directory
mkdir temp; cd temp; npx create-next-app@latest . --typescript --eslint --tailwind --app --src-dir --import-alias "@/*" --turbopack --yes

# Move files (Linux/Mac)
cd .. && mv temp/* temp/.* . 2>/dev/null || true && rm -rf temp

# Move files (Windows PowerShell)
cd ..; Move-Item -Path "temp*" -Destination . -Force; Remove-Item -Path "temp" -Recurse -Force
```

## Key Conventions

### Component Organization
- Use `'use client'` directive for interactive components
- Place layout components in `src/components/layout/`
- Import layout components in root layout (`src/app/layout.tsx`)
- Each page should only contain its main content area

### Tailwind CSS Configuration
```css
/* app/globals.css - CORRECT format for newer Next.js */
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

* {
  color-scheme: light;
}
```

**DO NOT USE** the older format:
```css
/* WRONG - causes styling issues */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Styling Guidelines
- Use gradient backgrounds: `bg-gradient-to-br from-blue-50 via-white to-purple-50`
- Rounded corners: `rounded-xl`, `rounded-2xl`, `rounded-3xl`
- Shadow levels: `shadow-sm`, `shadow-md`, `shadow-lg`
- Color palette: Blue, Purple, Pink gradients for primary elements
- Mobile-first responsive design with `lg:` breakpoint for desktop
- Avoid curly quotes - use escaped apostrophes (`\'`) or double quotes
- Maintain readable contrast (avoid light gray on white)

### Element IDs (Important for Testing/Reference)
- `header-mobile` - Main header component
- `main-content` - Main content area
- `tab-bar` - Bottom navigation
- `card-create` - Create new chart card
- `section-charts` - Charts grid container
- `section-empty` - Empty state container
- `canvas-connections` - SVG canvas for node connections
- `nodes-container` - Container for mind map nodes
- `panel-node-details` - Selected node details panel
- `node-editor-modal` - Node editor dialog
- `mobile-todo-drawer` - Mobile to-do drawer
- `card-auth` - Authentication card
- `google-signin-btn` - Google sign-in button
- `email-signin-btn` - Email sign-in button

### Node Types
| Type | Icon | Purpose |
|------|------|---------|
| Goal | Target emoji | Main objectives |
| Step | Pin emoji | Major milestones |
| Action | Lightning emoji | Specific actions |
| Task | Checkmark | Individual tasks |
| Subtask | Diamond | Sub-components of tasks |
| Microtask | Bullet | Smallest units of work |

### Status Types
| Status | Icon | Color |
|--------|------|-------|
| Not Started | Empty circle | Gray |
| In Progress | Half circle | Blue |
| Completed | Checkmark | Green |
| Blocked | Crossed circle | Red |

## Common Patterns

### Card Component Pattern
```tsx
<div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
  {/* Card content */}
</div>
```

### Gradient Button Pattern
```tsx
<button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
  Button Text
</button>
```

### Mobile Bottom Sheet Pattern
```tsx
<div className="fixed inset-0 bg-black/50 z-50">
  <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh]">
    {/* Sheet content */}
  </div>
</div>
```

## Notes for AI Assistants

1. **Convert HTML to React:** Each numbered markdown file contains HTML/CSS that needs conversion to React/TypeScript components
2. **Preserve Design:** Maintain exact styling, spacing, and visual appearance from mockups
3. **Add Interactivity:** The HTML mockups have placeholder onClick handlers - implement proper React state management
4. **Responsive Design:** All components should work on mobile (375px+) and desktop (1024px+)
5. **Accessibility:** Add proper ARIA labels, keyboard navigation, and semantic HTML
6. **Font Awesome:** Icons use Font Awesome classes (`fa-solid fa-*`) - install `@fortawesome/react-fontawesome` or use an alternative icon library
