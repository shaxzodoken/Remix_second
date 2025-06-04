# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Installation

This project requires **Node.js 20** or higher. After cloning the repository install dependencies with:

```bash
npm install
```

### Environment variables

Create a `.env` file in the project root with connection strings for your PostgreSQL database:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/database"
SHADOW_DATABASE_URL="postgresql://user:password@localhost:5432/database_shadow"
```

### Initialize the database

Run the Prisma migrations to set up the schema and generate the client:

```bash
npx prisma migrate dev --name init
```

## Development

Start the development server with hot reloading:

```bash
npm run dev
```

## Deployment

First, build your app for production:

```bash
npm run build
```

Then run the app in production mode:

```bash
NODE_ENV=production npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
