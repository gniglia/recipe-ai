# RecipeAI - Project Plan

## 🎯 Project Overview

A smart recipe manager with AI integration built with Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Supabase, and Google Gemini AI.

**Learning Goal**: Hands-on experience with Cursor and real-world AI integration.

---

## 🏗️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase + PostgreSQL + Prisma ORM
- **AI**: Google Gemini AI (free tier)
- **Forms**: React Hook Form + Zod validation
- **Auth**: Supabase Auth
- **State Management**: Zustand (global state)
- **Data Fetching**: TanStack Query (React Query)
- **Package Manager**: pnpm

---

## 📋 MVP Features (Small Scope)

### Phase 1: Basic Recipe App Foundation

- [x] Project setup with Next.js 15 + TypeScript
- [x] shadcn/ui components installed
- [x] Basic TypeScript interfaces for recipes
- [x] Sample recipe data
- [ ] Recipe display components (RecipeCard, RecipeList)
- [ ] Recipe detail view
- [ ] Basic navigation/layout
- [ ] Add/edit recipe forms
- [ ] Simple search and filtering

### Phase 2: First AI Feature - Recipe Generator 🤖

**Core Feature**: Generate recipes from available ingredients

#### User Flow:

1. User inputs ingredients: `"chicken breast, broccoli, garlic, soy sauce"`
2. Click "Generate Recipe" button
3. AI creates: `"Honey Garlic Chicken Stir-fry"` with full recipe
4. User can save generated recipe to their collection

#### Technical Implementation:

- [x] Google Gemini AI integration
- [ ] Recipe generator component with input form
- [ ] AI service with proper error handling
- [ ] Loading states for async operations
- [ ] Prompt engineering for recipe generation
- [ ] Save generated recipes to database

### Phase 3: Polish & Extend

- [ ] User authentication (Supabase Auth)
- [ ] Personal recipe collections
- [ ] Recipe categories/tags
- [ ] Improved UI/UX and styling
- [ ] Recipe sharing functionality

---

## 🤖 AI Integration Details

### Primary AI Feature: Ingredient-Based Recipe Generation

**Input**: List of available ingredients
**Output**: Complete recipe with title, description, ingredients, steps, cooking time

**Google Gemini AI Prompt Strategy**:

```
Given these ingredients: [user input]
Generate a complete recipe including:
- Recipe title
- Brief description
- Full ingredient list with quantities
- Step-by-step cooking instructions
- Prep time and cook time
- Difficulty level
- Cuisine type
Return as structured JSON
```

**Benefits for Learning**:

- Clear input/output flow
- Immediate user value
- Practice with prompt engineering
- Error handling for AI services
- Async state management

---

## 🗂️ File Structure

```
src/
├── app/                 # Next.js 15 app directory
│   ├── (auth)/         # Auth route group
│   ├── (dashboard)/    # Main app routes
│   ├── api/            # API routes
│   └── globals.css
├── components/         # Reusable components
│   ├── ui/            # shadcn/ui base components
│   ├── recipe/        # Recipe-specific components
│   ├── forms/         # Form components
│   └── layout/        # Layout components
├── lib/               # Utilities and configs
│   ├── ai.ts          # Gemini AI service
│   ├── db.ts          # Database config
│   └── utils.ts       # Helper functions
├── types/             # TypeScript definitions
├── constants/         # App constants & sample data
└── hooks/             # Custom React hooks
```

---

## 🎯 Current Status

### ✅ Completed

- Next.js 15 project setup
- TypeScript configuration
- Tailwind CSS + shadcn/ui setup (Badge, Button, Card, Input, Label, Textarea)
- Basic component structure
- Recipe TypeScript interfaces
- Sample recipe data
- RecipeCard component with proper styling
- **Zustand store** for recipe state management with filtering
- **TanStack Query** setup for data fetching and caching
- RecipeList component with search and filtering functionality
- Custom hooks for recipe data (useRecipes, useCreateRecipe, useGenerateRecipe, etc.)
- QueryProvider with React Query DevTools

### 🔄 In Progress

- Building core recipe components

### ⏳ Next Steps

1. Complete RecipeCard component
2. Build RecipeList component
3. Create main app layout
4. Replace default homepage
5. Add recipe detail view
6. Build AI recipe generator

---

## 🏗️ Architecture Decisions

### State Management Strategy

- **Zustand**: Global app state (recipes, filters, user preferences)
- **TanStack Query**: Server state (API data, caching, background refetching)
- **React useState**: Local component state (form inputs, UI toggles)

### Data Flow

1. **UI Components** trigger actions
2. **Zustand Store** manages global state and filtering logic
3. **TanStack Query Hooks** handle server communication and caching
4. **API Layer** (future: Supabase + Prisma) provides data persistence

### Benefits of This Stack

- **Zustand**: Simple, lightweight, no boilerplate
- **TanStack Query**: Automatic caching, background updates, optimistic updates
- **TypeScript**: Full type safety across the entire stack
- **Separation of Concerns**: Clear boundaries between client/server state

---

## 🎓 Learning Objectives

Through this project, you'll learn:

- **Cursor Workflow**: Efficient AI-assisted development
- **Next.js 15**: App Router, Server Components, Server Actions
- **TypeScript**: Strict typing for React apps
- **AI Integration**: Google Gemini AI, prompt engineering, async handling
- **Modern React**: Hooks, forms, state management
- **Zustand**: Lightweight state management for global app state
- **TanStack Query**: Advanced data fetching, caching, and synchronization
- **Database**: Supabase + Prisma setup and queries
- **UI Development**: shadcn/ui components and Tailwind CSS

---

## 🚀 Getting Started

1. Continue building basic components
2. Set up main app layout
3. Create recipe generator form
4. Integrate Google Gemini AI
5. Add database persistence

**Focus**: Keep it simple, functional, and learn by building! ✨
