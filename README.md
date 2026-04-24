# St. Peter's Basketball Frontend

A Vite + React frontend configured for deployment on Vercel with Supabase as the managed backend services layer.

## Tech Stack

- [Vite](https://vitejs.dev/) + TypeScript for fast local development
- [React 19](https://react.dev/) with TanStack Router & Query
- [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/supabase-client) for authentication and data access
- Automated deployment through [Vercel](https://vercel.com/)

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Create local environment variables**

   Copy the example file and provide your Supabase project credentials.

   ```bash
   cp .env.example .env.local
   ```

   Fill in:

   ```dotenv
   VITE_SUPABASE_URL=<your-project-url>
   VITE_SUPABASE_ANON_KEY=<your-anon-key>
   ```

   > These values are available in the Supabase dashboard under **Project Settings → API**.

3. **Run the dev server**

   ```bash
   npm run dev
   ```

   The app will be available at the URL printed in the terminal (typically `http://localhost:5173`).

## Supabase Client Usage

The project exposes a pre-configured browser client at `src/lib/supabase/client.ts` that validates the required environment variables and enables session persistence out of the box:

```ts
import { supabase } from "@/lib/supabase/client";

const { data, error } = await supabase.from("players").select();
```

Use `supabase.auth` helpers for user authentication flows and `supabase.from` for data queries/mutations.

## Deployment on Vercel

1. **Connect the repository** to Vercel and select the project.
2. Vercel will detect the Vite setup and use the configuration defined in `vercel.json`:
   - `npm run build`
   - Serves static assets from the `dist` directory
3. **Configure environment variables** in the Vercel dashboard under **Settings → Environment Variables** using the same keys:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Trigger a deployment—Vercel will inject the variables into the build and host the generated assets.

For production secrets management, consider adding the Supabase credentials as Vercel secrets and referencing them in `vercel.json` (the file currently expects secret names `supabase-url` and `supabase-anon-key`).

## Additional Notes

- The project stores Supabase session data in the browser (`persistSession: true`). Adjust the auth configuration in `client.ts` if you prefer stateless patterns.
- Any future backend logic can rely on Supabase Edge Functions or external services without changing the frontend deployment pipeline.
- A lightweight admin dashboard lives at `/admin`. Protect it before going live (Supabase Auth, Vercel password, etc.)

## Supabase Tables

The home page highlights strip now pulls from Supabase so you can update copy without redeploying code. Create the table and policy using the SQL editor or CLI:

```sql
create table if not exists academy_highlights (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  display_order int not null default 1,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_academy_highlights_updated_at
  before update on academy_highlights
  for each row execute procedure trigger_set_timestamp();

-- Allow anonymous reads for active highlights shown on the marketing site
create policy "Public read access to active highlights"
  on academy_highlights for select
  using (is_active = true);

-- Temporary admin policy (replace with Supabase Auth or Edge Function soon)
create policy "Anon manage highlights (temporary)"
  on academy_highlights for all
  using (auth.role() = 'anon')
  with check (auth.role() = 'anon');

alter table academy_highlights enable row level security;

create table if not exists academy_sessions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  level text not null,
  session_date date not null,
  start_time time not null,
  end_time time not null,
  location text not null,
  display_order int not null default 1,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_academy_sessions_updated_at
  before update on academy_sessions
  for each row execute procedure trigger_set_timestamp();

create policy "Public read access to active sessions"
  on academy_sessions for select
  using (is_active = true);

create policy "Anon manage sessions (temporary)"
  on academy_sessions for all
  using (auth.role() = 'anon')
  with check (auth.role() = 'anon');

alter table academy_sessions enable row level security;

create table if not exists site_sections (
  id uuid primary key default gen_random_uuid(),
  section_key text not null unique,
  label text,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_site_sections_updated_at
  before update on site_sections
  for each row execute procedure trigger_set_timestamp();

create policy "Public read access to active sections"
  on site_sections for select
  using (is_active = true);

create policy "Anon manage site sections (temporary)"
  on site_sections for all
  using (auth.role() = 'anon')
  with check (auth.role() = 'anon');

alter table site_sections enable row level security;
--end

```

> Ensure your Supabase project has the `pgcrypto` extension enabled (Project Settings → Database → Extensions) so `gen_random_uuid()` is available.

Once the tables are seeded, visit `/admin` to add, re-order, or hide highlight tiles. The public home page automatically refreshes from Supabase on load and falls back to starter copy if a table is empty.
The same admin view now manages academy sessions and site section visibility; add your schedule data in Supabase, toggle the sections you want visible, and use the collapsible panels on `/admin` to make updates. Replace the temporary `anon manage` policies with proper secure auth before production.
