# CLAUDE.md - AI Assistant Guide for Goal Mind Map

## Project Overview

This repository contains **design specifications** for a Goal Mind Map application - a goal tracking and visualization tool that combines mind mapping with task management. The project consists of HTML/CSS mockups that need to be converted into functional React/Next.js components.

**Application Purpose**: Help users organize goals hierarchically, visualize progress through mind maps, and manage daily tasks derived from their goal charts.

## Repository Structure

```
mind-map/
├── setup.md                           # Project initialization instructions
├── tailwind-imports-best-practice.md  # Tailwind CSS configuration guide
├── 1-charts-list.md                   # Charts dashboard page specification
├── 2-mind-map-canvas.md               # Mind map editor page specification
├── 3-node-editor-dialog.md            # Node editor modal specification
├── 4-daily-to-do-list.md              # Daily todo sidebar specification
├── 5-authentication.md                # Auth page specification
└── komposo-*.zip                      # Original design export archive
```

## Technology Stack

- **Framework**: Next.js (App Router with `src/` directory)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome (fa-solid icons)
- **Build Tool**: Turbopack

## Development Workflow

### 1. Project Initialization
Follow `setup.md` to initialize a new Next.js project:
```bash
npx create-next-app@latest . --typescript --eslint --tailwind --app --src-dir --import-alias "@/*" --turbopack --yes
```

### 2. Processing Specification Files
Process markdown files **sequentially by number prefix** (1, 2, 3, 4, 5):
- Each file contains HTML/CSS that must be converted to React components
- Complete one file fully before moving to the next
- Follow the component structure defined in each specification

### 3. File Processing Order
1. `1-charts-list.md` - Main dashboard with chart cards
2. `2-mind-map-canvas.md` - Interactive canvas with nodes
3. `3-node-editor-dialog.md` - Modal dialog for editing nodes
4. `4-daily-to-do-list.md` - Todo list sidebar/drawer
5. `5-authentication.md` - Login/signup page

## Key Application Features

### Charts List (Dashboard)
- Display user's goal charts with progress indicators
- Create new chart functionality
- Rename/delete chart actions
- Bottom navigation bar

### Mind Map Canvas
- Draggable nodes with parent-child relationships
- SVG-based connections between nodes
- Zoom controls and mini-map
- Right sidebar with node details and stats
- Deadline filtering

### Node Editor
- Edit node label, type, deadline, status, description
- Node types: Goal, Step, Action, Task, Subtask, Microtask
- Status options: Not Started, In Progress, Completed, Blocked
- Slide-up modal animation

### Daily To-Do List
- Drag tasks from mind map to todo list
- Desktop sidebar and mobile drawer variants
- Priority-based color coding
- Checkbox completion tracking

### Authentication
- Google OAuth sign-in
- Email-based authentication
- Email confirmation modal
- Loading states

## Code Conventions

### Component Organization
```
src/
├── app/
│   ├── layout.tsx          # Root layout (import globals.css here ONLY)
│   ├── page.tsx            # Home/Charts list page
│   ├── auth/page.tsx       # Authentication page
│   └── mindmap/page.tsx    # Mind map canvas page
├── components/
│   ├── layout/             # Shared layout components (Header, Footer, Nav)
│   └── ui/                 # Reusable UI components
└── globals.css             # Global styles
```

### React Component Guidelines
- Use `'use client'` directive for interactive components
- Create reusable layout components in `src/components/layout/`
- Import layout components in root layout, not individual pages
- Pages should only contain main content area

### Tailwind CSS Configuration
**Critical**: Use the new import syntax in `globals.css`:
```css
@import "tailwindcss";
```

**DO NOT use the legacy directives**:
```css
/* WRONG - causes styling issues */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Styling Best Practices
- Use `min-h-screen` and `w-full` for full viewport layouts
- Avoid curly quotes in code - use escaped apostrophes (`\'`) or double quotes
- Maintain readable contrast (no light gray on white backgrounds)
- Use gradient classes for branded elements: `from-blue-500 to-purple-600`

### Element ID Conventions
The specifications use consistent ID patterns:
- `header-mobile` - Header component
- `main-content` - Main content area
- `tab-bar` - Bottom navigation
- `card-*` - Card components (e.g., `card-create`, `card-fitness`)
- `section-*` - Page sections
- `panel-*` - Sidebar panels
- `form-*` - Form sections

## Color Palette

| Purpose | Gradient/Color |
|---------|----------------|
| Primary Brand | `from-blue-500 to-purple-600` |
| Fitness/Health | `from-orange-400 to-red-500` |
| Career/Work | `from-blue-400 to-cyan-500` |
| Personal | `from-purple-400 to-pink-500` |
| Background | `from-blue-50 via-white to-purple-50` |

## Common Patterns

### Mobile-First Responsive Design
```tsx
// Desktop sidebar, hidden on mobile
<div className="hidden lg:flex lg:w-96 ...">

// Mobile drawer, hidden on desktop
<div className="lg:hidden fixed inset-0 ...">
```

### Interactive States
```tsx
// Hover effects
className="hover:shadow-lg transition-shadow"
className="hover:bg-gray-50 transition-colors"

// Active/selected states
className="border-2 border-blue-500 bg-blue-50"
```

### Modal/Drawer Animation
```css
@keyframes slide-up {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

## Important Notes for AI Assistants

1. **Sequential Processing**: Always process specification files in order (1-5)
2. **No Code Duplication**: Global components (Header, Nav) should be created once and reused
3. **Client Components**: Use `'use client'` for any component with interactivity
4. **Font Awesome**: Icons use Font Awesome classes like `fa-solid fa-chart-line`
5. **Tailwind v4**: Use `@import "tailwindcss"` syntax, not legacy `@tailwind` directives
6. **Mobile-First**: Design specifications include both mobile and desktop variants

## Testing Checklist

After implementing each component:
- [ ] Verify responsive design (mobile and desktop views)
- [ ] Test interactive elements (buttons, inputs, modals)
- [ ] Check gradient colors match specifications
- [ ] Ensure proper hover/focus states
- [ ] Validate accessibility (contrast, focus indicators)
