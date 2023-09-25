// // routes/api/users.ts

// import { db } from '~/libs/prisma/db.server';
// import { json, LoaderFunction } from '@remix-run/node';

// export let loader: LoaderFunction = async () => {
//   const users = await db.user.findMany(); // Fetch all users from your database

//   return json({ users }); // Return the users as JSON
// };
