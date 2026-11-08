# Skills Vault

Skills Vault is a personal library for saving and organizing reusable AI instructions. Create skills for workflows that work, find them later, and refine them as your needs change.

## Features

- Sign up and sign in with Supabase Auth
- Create, edit, view, and delete personal skills
- Search your library by skill title and description
- Keep each user's skills private to their account
- Responsive interface with light and dark themes

## Tech stack

- [Next.js](https://nextjs.org/) App Router and React
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) Auth
- [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/)

## Getting started

### Prerequisites

- Node.js 20.9 or later
- npm
- A Supabase project with email authentication enabled
- A PostgreSQL database

### Install

```bash
git clone https://github.com/HtetAungLw1n/skills-vault.git
cd skills-vault
npm install
```

### Configure environment variables

Copy `.env.example` to `.env.local` and fill in the values from your Supabase project and PostgreSQL provider:

```bash
cp .env.example .env.local
```

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
DATABASE_URL=
DIRECT_URL=
```

`DATABASE_URL` is used by the app to connect to PostgreSQL. `DIRECT_URL` is used by Prisma for database migrations. When using a hosted database with connection poolers, use the transaction pooler URL for `DATABASE_URL` and the direct or session pooler URL for `DIRECT_URL`.

In your Supabase project's authentication URL settings, add `http://localhost:3000/auth/confirm` as an allowed redirect URL for local development.

### Set up the database

Apply the Prisma migrations to your configured database:

```bash
npx prisma migrate dev
```

### Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Create an account and follow the email confirmation link to start using your vault.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project structure

```text
src/
  app/          Next.js routes and layouts
  components/   Shared UI components
  features/
    auth/       Authentication schemas
    skills/     Skill forms, actions, and data access
  lib/          Supabase, Prisma, and shared utilities
prisma/
  schema.prisma Database schema
```

## Contributing

Issues and pull requests are welcome. For changes, please run `npm run lint` and `npm run build` before submitting a pull request.

## License

No license has been specified yet.
