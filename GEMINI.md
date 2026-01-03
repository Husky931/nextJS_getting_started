# Project Context: [Project Name]

## 1. Project Overview & Role
You are an expert developer specializing in [e.g., Next.js and Python FastAPI].
- **Project Goal:** [Brief description of what the app does].
- **Audience:** [e.g., Internal developers / Public end-users].

## 2. Tech Stack & Versions
- **Frontend:** Next.js 15 (App Router), Tailwind CSS, Shadcn UI.
- **Backend:** Python 3.12, FastAPI, SQLAlchemy.
- **Database:** PostgreSQL.
- **State Management:** TanStack Query (React Query).

## 3. Coding Standards & Conventions
- **Naming:** Use PascalCase for React components and camelCase for variables/functions.
- **Typing:** Strict TypeScript usage; avoid `any`. Use Python type hints for all functions.
- **Structure:** - Components go in `src/components/`.
  - API routes go in `src/app/api/`.
  - Logic should be extracted into hooks or utility files.
- **Styling:** Use Tailwind CSS utility classes; avoid inline styles or CSS modules.

## 4. Operational Commands (Tool Use)
When you need to verify your work, use these commands:
- **Linting:** `npm run lint` or `ruff check .`
- **Testing:** `npm test` or `pytest`
- **Build:** `npm run build`
- **Type Check:** `npx tsc --noEmit`

## 5. Rules & Boundaries
- ✅ **Always:** Explain your reasoning briefly before making large changes.
- ✅ **Always:** Run the relevant test command after modifying a file.
- ⚠️ **Ask First:** Before installing new npm or pip packages.
- ⚠️ **Ask First:** Before modifying global config files (like `tailwind.config.ts`).
- 🚫 **Never:** Remove existing comments or documentation.
- 🚫 **Never:** Use `force push` if you are asked to handle Git operations.

## 6. Project Structure Map
- `/src/components`: UI components.
- `/src/hooks`: Custom React hooks.
- `/backend`: FastAPI source code.
- `/docs`: Project documentation and API specs.