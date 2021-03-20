# Next.js Prisma Tailwind Starter

This is a Next.js application using Prisma for an ORM and Tailwind for a css framework. It is setup how I like, so I use this as a starter for projects that I want to work on.

### To get this running on your machine:

1. `npm i`
2. Setup a mysql db and replace values in .env.example and remove example from file name.
3. `npx prisma migrate dev --preview-feature` to build db and generate client types.
4. `npm run dev`
5. `npx prisma studio` to see your db.

### Other features:

-   Authentication is handled by [NextAuth.js](https://next-auth.js.org/) passwordless login.
-   [React Toastify](https://fkhadra.github.io/react-toastify/introduction) creates the popup notifications.
-   [Tailwind CSS](https://tailwindcss.com/docs) builds on save and reduces into styles/index.css and PostCSS purges the unused css on build.
-   [React-Hook-Form](https://react-hook-form.com/) handles form logic
-   [SWR](https://swr.vercel.app/) handles fetching data and cache management on the client for snappy load times and optimistic ui updates.

### Other notes so I don't forget:

-   No verification email is actually sent, the verification link appears in the node console for you to click.
-   To propogate a schema change to the db, run `npx prisma migrate dev --preview-feature` again.
-   The .next folder will not clean itself if the Prisma VS Code extension is enabled which will cause issues. Delete .next folder manually if this is the case.
-   Setup @ relative imports in the tsconfig.json folder

### To-Do

-   Better utilize the user provider so that authenticated pages do not need to be SSR
-   Add SEO package
-   Figure out .env.example file instead of env.local
-   A bunch of other stuff.
