# Welcome to Lakoe boilerplate 🛒

Lakoe.store is #1 e-commerce that could generate money while you sleep!

## Please wash your hands first! (install requirement) 👋

- [EditorConfig VSCode extension](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) : Code formatter configuration
- [SonarLint VSCode extension](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode) : Make your code great -> It's a demon watcher that watches over your code. If you have the time, fulfill this demon's needs.

## Run your money making machine! 🤑

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
npm install
```

Copy `.env` from `.env.example` :

```sh
cp .env.example .env
```

Then, configure your `.env` with your postgresql credentials :

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

Push schema to your database (migrating schema to your database) :

```sh
npx prisma migrate dev
```

Afterwards, start the Remix development server like so:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

## "Us" tools 🔨

- [Trello](https://trello.com/invite/lakoe/ATTI52566ceb8c2448e8496c00ab3cf6b26c017FFA28) : See your ticketing here
- [Figma Design](https://www.figma.com/file/V6ao7aamP8Nwph2KoHRR3X/Bakulan-Store?type=design&node-id=346%3A25727&mode=design&t=UFaZM6PCFbKUsF52-1) : See the project design here
- [Database Schema](https://drive.google.com/file/d/1zU6LPC0zrnuYIHocus10BB2jbE5XuBxV/view) : See the project database schema here
- [Prisma Builder](https://www.prismabuilder.io/) : Make prisma database schema easily
- [Task Distribution](https://docs.google.com/spreadsheets/d/13ysbxGGYTZyGAqPBGwyTDPn95F_0iHl4u2WRIMd0WfU/edit?usp=sharing) : See your task distribution here


Schema Team :
Adidiawan
Chandra Rizaldy
Erwin
Fraya
Rahmat Rizky Rifai


Auth Team : 
Rahmat Rizky Rifai 
Erwin 
Aderino Arya Nanda
Bagas Satria 






