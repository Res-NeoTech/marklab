# MarkLab

MarkLab is a web application for writing, previewing, storing, and exporting Markdown documents. Users can create an account, manage a private collection of documents, and work in a split editor with a live preview.

## Features

- Account registration, login, logout, and protected routes
- Private Markdown document workspace
- Create, list, edit, and delete documents
- Live Markdown preview and adjustable editor/preview layout
- Automatic saving after a short pause, plus `Ctrl/Cmd + S` manual saving
- Export of the current document as `.md` or `.txt`
- Persistent display preference and light/dark colour mode

## Technology

- **Framework:** Nuxt 4 and Vue 3 with TypeScript
- **UI:** Nuxt UI and Tailwind CSS
- **Database:** PostgreSQL, accessed with Drizzle ORM and `postgres.js`
- **Authentication:** JWT (`jose`) stored in an HTTP-only cookie; passwords hashed with Argon2
- **Validation and state:** Zod and Pinia
- **Markdown:** Nuxt MDC
- **Platform integration:** NuxtHub

The French technical documentation, prepared for a TPI-style school project and ready to be published with MkDocs, is available in [`docs/`](docs/index.md).

## Requirements

- Node.js 20 or newer
- A PostgreSQL database

## Installation

Install the dependencies:

```bash
npm install
```

Create a `.env` file at the project root:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE
JWT_SECRET=replace-with-a-long-random-secret
```

Apply the SQL migrations from `server/db/migrations/postgresql/` to the target database before starting the application. The project currently does not expose a migration script in `package.json`.

Start the development server:

```bash
npm run dev
```

The application is then available at `http://localhost:3000`.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create a production build. |
| `npm run preview` | Preview the production build locally. |
| `npm run generate` | Generate a static version of the application. |

## Project structure

```text
app/                  Vue pages, middleware, stores, composables, and UI assets
server/               API endpoints, business services, repositories, and database schema
server/db/migrations/ PostgreSQL migration history
docs/                 French technical documentation for MkDocs
```

## Security notes

Never commit `.env`. It contains the database connection URL and the secret used to sign JWTs. The `.gitignore` file already excludes local environment files.
