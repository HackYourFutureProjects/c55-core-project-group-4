
# Cookbook (A Recipe Web App)

**Cookbook** is a simple yet delightful recipe web app that brings together two worlds of cooking inspiration:

- **Global Recipes** — Explore thousands of authentic recipes from around the world using *TheMealDB* public API.  
- **Cohort Favorites** — Discover a curated collection of favorite dishes shared by **c55 cohort members**, featuring personal stories, photos, ingredients, and step-by-step instructions stored in our own database.

With Cookbook, users can easily search, browse, and save recipes they love — all in one place.

***

### Application Overview

The app is a **single-page application** with three main sections:

- **Recipes:** Browse and search recipes from *TheMealDB API*. Filter by category (e.g., chicken, dessert, vegetarian) and view detailed recipes with full ingredients and instructions.  
- **Cohort Dishes:** A hand-picked list of favorite dishes from c55 members, each showing a photo, country of origin, and complete recipe. These entries are stored in an **SQLite database**.  
- **Saved:** A personal list where users can save recipes (from both TheMealDB and cohort dishes) by clicking the ⭐ Save button. Saved recipes are also stored locally in the database.

***

### Getting Started

1. Clone the repository  
2. Run `npm install` to install dependencies  
3. Run `npm start` to start the app  

Explore the starter project here:  
[https://hub.hackyourfuture.nl/core-program-week-14](https://hub.hackyourfuture.nl/core-program-week-14)

***

### Code Quality

- Run `npm run lint` to check for linting issues  
- Run `npm run format` to format code using **Prettier**

***

### Testing

Run all tests with:  
```
npm test
```

***

### CI Pipeline

Every pull request to `main` automatically runs two checks via GitHub Actions:

1. **Lint** — `npm run lint` (ESLint)
2. **Tests** — `npm test` (Vitest)

Both must pass before a PR can be merged. The workflow is defined in [`.github/workflows/ci.yaml`](.github/workflows/ci.yaml).

***

### CD / Deployment

The app is deployed on Render:
[https://c55-core-project-group-4.onrender.com](https://c55-core-project-group-4.onrender.com)

Because this project uses the **Render Free Tier**, the service can go to sleep when idle. On the first request after inactivity, it may take around **30-60 seconds** to wake up.

To reduce this delay, an external cron job is configured to periodically ping the app and help keep the service awake.

***

