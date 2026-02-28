# amankumar.us

Personal portfolio + blog site.

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript 5
- **Backend:** Convex (serverless database + functions)
- **Auth:** WorkOS AuthKit (SSO — Google/Microsoft OAuth)
- **Deploy:** Vercel (auto-deploys on merge to main)
- **CI:** GitHub Actions (lint + typecheck on PRs), CodeRabbit (AI code review)

## Key Commands

- `npm run dev` — start Next.js + Convex dev servers in parallel
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript check (tsc --noEmit)
- `npx convex dev` — Convex dev server (auto-syncs schema changes)

## Project Structure

```
app/                          # Next.js App Router pages
├── page.tsx                  # Home (recent posts + featured projects)
├── about/page.tsx            # About page
├── blog/page.tsx             # Blog listing
├── blog/[slug]/page.tsx      # Blog post detail
├── projects/page.tsx         # Portfolio listing
├── projects/[slug]/page.tsx  # Project detail
├── callback/route.ts         # WorkOS OAuth callback
├── api/auth/signin/route.ts  # Sign-in redirect
├── api/auth/signout/route.ts # Sign-out
├── admin/                    # Protected admin pages
│   ├── layout.tsx            # Auth + isAdmin guard
│   ├── page.tsx              # Dashboard
│   ├── posts/                # CRUD for blog posts
│   └── projects/             # CRUD for portfolio projects
convex/                       # Convex backend
├── schema.ts                 # Database schema (users, posts, projects)
├── users.ts                  # User store + currentUser query
├── posts.ts                  # Blog CRUD (admin-protected mutations)
├── projects.ts               # Portfolio CRUD (admin-protected mutations)
├── auth.config.ts            # WorkOS JWT provider config
├── lib/auth.ts               # requireAdmin() helper
├── _generated/               # Auto-generated (committed to git)
components/
├── ConvexClientProvider.tsx   # Auth + Convex provider wrapper
├── layout/Header.tsx          # Nav bar with auth state
├── layout/Footer.tsx          # Footer
├── blog/PostCard.tsx          # Blog card component
├── projects/ProjectCard.tsx   # Project card component
├── admin/PostForm.tsx         # Blog post form
├── admin/ProjectForm.tsx      # Project form
proxy.ts                       # Next.js 16 auth middleware (replaces middleware.ts)
```

## Architecture Conventions

- **Auth flow:** WorkOS SSO -> JWT -> Convex `auth.config.ts` validates -> `users.store` mutation syncs user to DB
- **Admin protection:** Convex mutations use `requireAdmin(ctx)` from `convex/lib/auth.ts`
- **Client components:** Must have `"use client"` directive. Use `useQuery`/`useMutation` from `convex/react`
- **Convex validators:** Always use `v` validators for mutation/query args
- **Slugs:** Auto-generated from title in form components. Used for public URLs
- **User identity:** `username` field (derived from email prefix), not real name

## Workflow for Changes

1. Create a feature branch from `main` (e.g., `feat/add-dark-mode`)
2. Make changes — ensure `npm run lint` and `npm run typecheck` pass
3. Commit with descriptive message
4. Push branch and open a PR to `main`
5. CI runs automatically, CodeRabbit reviews the PR
6. After review, merge -> Vercel auto-deploys with Convex migrations

## Important Notes

- `convex/_generated/` is committed to git (needed for CI lint/typecheck)
- Vercel build command: `npx convex deploy --cmd 'npm run build'`
- Environment variables are set in Vercel dashboard (not in code)
- `proxy.ts` is used instead of `middleware.ts` (Next.js 16 convention)
- ESLint ignores `convex/_generated/**`
