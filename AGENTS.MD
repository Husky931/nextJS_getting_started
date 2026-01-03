# AGENTS.md

## Project Overview

This is a Next.js (App Router) web application.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Code Style & Conventions

- Use TypeScript everywhere
- no variables used in css
- use flex over grid
- make tailwind.config.js where we set the primary (branding) colors and main design system rules
- Prefer server components unless client components are required
- Keep components small and composable
- Use Tailwind utility classes (no inline styles)
- Do not introduce new libraries without clear justification

## File & Folder Rules

- Do not rename or delete existing routes without explicit instruction
- Keep `/app` routing structure intact
- Shared UI components live in `/components`
- Business logic should not be embedded directly in UI components

## Data & Integrations

- Do not hardcode API keys or secrets
- Use environment variables for all external services
- Shopify and Stripe logic must be isolated and reusable

## What NOT To Do

- Do not refactor unrelated files
- Do not change dependencies or config files unless asked
- Do not optimize prematurely (ask before you do)
- Do not assume business rules—ask if unclear

## How to Help Best

- Prefer minimal, targeted changes
- Explain reasoning when making structural decisions
- If unsure, ask before acting
