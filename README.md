# Personal website frontend

This project contains the website frontend for my personal website. The code is built using **[Astro 5.0](https://astro.build/) + [Tailwind CSS](https://tailwindcss.com/)**. The website is hosted on an S3 bucket and distributed via CloudFront. Pushes to the repository are automatically deployed via Github Actions. The website briefly interacts with a [serverless backend](https://github.com/TiDeane/Personal-website-backend) that simply keeps track of the number of visits to the website, per country.

### Commands

All commands are run from the root of the project, from a terminal:

| Command             | Action                                             |
| :------------------ | :------------------------------------------------- |
| `npm install`       | Installs dependencies                              |
| `npm run dev`       | Starts local dev server at `localhost:4321`        |
| `npm run build`     | Build your production site to `./dist/`            |
| `npm run preview`   | Preview your build locally, before deploying       |
| `npm run check`     | Check your project for errors                      |
| `npm run fix`       | Run Eslint and format codes with Prettier          |
| `npm run astro ...` | Run CLI commands like `astro add`, `astro preview` |
