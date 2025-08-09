# Supabase Setup Guide for RecipeAI

## 🗄️ What is Supabase?

Supabase is an open-source Firebase alternative that provides:

- **PostgreSQL Database** (with real-time subscriptions)
- **Authentication** (email, OAuth, magic links)
- **Auto-generated APIs** (REST and GraphQL)
- **Row Level Security** (built-in data protection)
- **Storage** (for files like recipe images)

## 🔧 Setup Steps

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Sign in
3. Click "New Project"
4. Choose organization (create one if needed)
5. Fill in project details:
   - **Name**: `recipe-ai`
   - **Database Password**: (save this somewhere safe!)
   - **Region**: Choose closest to you
6. Click "Create new project" (takes ~2 minutes)

### Step 2: Get Project Credentials

Once project is ready, go to **Settings > API**:

- **Project URL**: `https://your-project-id.supabase.co`
- **Anon Public Key**: `eyJhbGciOi...` (safe for client-side)
- **Service Role Key**: `eyJhbGciOi...` (secret, server-side only)

### Step 3: Environment Variables

Create `.env.local` in project root:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Google Gemini AI (for AI recipe generation)
GEMINI_API_KEY=your-gemini-api-key

# Database URL for Prisma
DATABASE_URL=postgresql://postgres:[password]@db.[project-id].supabase.co:5432/postgres
```

### Step 4: Database Schema (Using Prisma)

We'll use Prisma as our ORM to interact with Supabase PostgreSQL:

**File: `prisma/schema.prisma`**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  recipes   Recipe[]

  @@map("users")
}

model Recipe {
  id          String   @id @default(uuid())
  title       String
  description String
  imageUrl    String?
  prepTime    Int      // minutes
  cookTime    Int      // minutes
  servings    Int
  difficulty  Difficulty
  cuisine     String?
  tags        String[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  userId      String
  user        User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  ingredients Ingredient[]
  steps       RecipeStep[]

  @@map("recipes")
}

model Ingredient {
  id       String @id @default(uuid())
  name     String
  amount   Float
  unit     String

  // Relations
  recipeId String
  recipe   Recipe @relation(fields: [recipeId], references: [id], onDelete: Cascade)

  @@map("ingredients")
}

model RecipeStep {
  id            String @id @default(uuid())
  stepNumber    Int
  instruction   String
  estimatedTime Int?   // minutes

  // Relations
  recipeId      String
  recipe        Recipe @relation(fields: [recipeId], references: [id], onDelete: Cascade)

  @@map("recipe_steps")
}

enum Difficulty {
  EASY
  MEDIUM
  HARD
}
```

## 🔐 Authentication Setup

### Supabase Auth Configuration

1. In Supabase Dashboard → **Authentication > Settings**
2. Configure providers you want:
   - **Email**: Enable email/password login
   - **Google**: Add OAuth credentials (optional)
   - **GitHub**: Add OAuth credentials (optional)

### Auth Helpers for Next.js

We'll use `@supabase/ssr` for Next.js integration:

```bash
pnpm add @supabase/ssr
```

## 📁 Required Files to Create

### 1. Supabase Client (`src/lib/supabase/client.ts`)

```typescript
import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
```

### 2. Server Client (`src/lib/supabase/server.ts`)

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = () => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // Handle cookie errors
          }
        },
      },
    },
  );
};
```

### 3. Prisma Client (`src/lib/prisma.ts`)

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

## 🚀 Setup Commands

After creating Supabase project and adding environment variables:

```bash
# Install dependencies
pnpm add @supabase/ssr @prisma/client
pnpm add -D prisma

# Initialize Prisma
pnpx prisma init

# Push schema to Supabase
pnpx prisma db push

# Generate Prisma client
pnpx prisma generate
```

## 🎯 What We Get

Once set up, we can:

- **Store recipes** in PostgreSQL
- **Authenticate users** with email/password or OAuth
- **Secure data** with Row Level Security
- **Real-time updates** when recipes change
- **Type-safe database queries** with Prisma

## 📝 Next Steps for Our App

1. Create Supabase project
2. Set up environment variables
3. Create Prisma schema
4. Push schema to database
5. Build auth components
6. Connect recipe components to database

**Do you want to start with creating the Supabase project, or should we continue building components first and add the database later?**
