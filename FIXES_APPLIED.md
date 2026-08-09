# Fixes Applied to WeatherPro

## 1. Exposed API key (security)
- `.env` was committed to the old public repo with a live API key — that key is burned.
- `.env` is now in `.gitignore` and excluded from this package (see `.env.example`).
- Removed the hardcoded fallback key from `src/services/weatherService.js`. If `VITE_API_KEY`
  is missing, the app logs a clear console error instead of silently using a bundled key.

## 2. Theme/unit not persisting
- `src/hooks/useLocalStorage.js` existed but was never used.
- `src/App.jsx` now uses it for both `theme` and `unit` state, so toggling either one
  survives a page reload.
- `useLocalStorage.js` was hardened with try/catch around `JSON.parse` /
  `localStorage.setItem`, so a corrupted or non-JSON value in storage won't throw and
  break the whole app.

## 3. Wrong GitHub Pages base path
- `vite.config.js` had `base: '/Weather-App-/'` from the old repo name, which would 404
  every asset on a differently-named repo. Set to match your actual repo name.
  **Check this matches your repo name exactly before deploying.**

## 4. "Use my location" + draggable map pin
- Added a 📍 "My Location" button (`src/pages/Home.jsx`) that uses the browser
  Geolocation API and fetches weather for wherever the user is.
- The map marker (`src/components/WeatherMap.jsx`) is now draggable — dropping it
  anywhere fetches weather for that exact spot.
- Added `getWeatherByCoords` / `getForecastByCoords` to `src/services/weatherService.js`
  to support fetching by lat/lon instead of only by city name.
- Map transitions now use Leaflet's `flyTo` with a 1.5s eased animation instead of an
  instant `setView` jump.

## 5. Air Quality card had fake duplicate UV data
- `src/components/AirQuality.jsx` was showing a second, randomly-generated "UV Index"
  number that duplicated the real UV Index card. Replaced it with a real pollutant
  breakdown (PM2.5, PM10, O₃, CO, NO₂, SO₂) from data already being fetched.

## 6. Sun Cycle card was mostly empty
- `src/components/SunCycle.jsx` only showed a moving dot with a lot of blank space.
  Now shows sunrise time, sunset time, day length, and a cleaner track.

## Known remaining limitation
- The dedicated **UV Index card** (`src/components/UVIndex.jsx`) still receives a
  `Math.random()`-based placeholder value from `Home.jsx` (search `setUV`). A real UV
  index requires OpenWeatherMap's One Call API, which is paid — the free `/weather`
  endpoint this app uses doesn't include it. Left as-is pending a decision on a real
  UV data source.

## Setup
1. Copy `.env.example` to `.env`.
2. Get a free API key from https://home.openweathermap.org/users/sign_up
   (new keys can take up to ~2 hours to activate).
3. Put it in `.env` as `VITE_API_KEY=your_key`.
4. Confirm `vite.config.js`'s `base` matches your GitHub repo name exactly.
5. `npm install`
6. `npm run dev` to test locally, `npm run build` to build for production.

## Deploying
This project is served via GitHub Pages from a `gh-pages` branch (no GitHub Actions
workflow set up). After `npm run build`:
```
npm install --save-dev gh-pages   # one-time
# add "deploy": "gh-pages -d dist" to package.json "scripts"
npm run deploy
```
Then in your repo's GitHub Settings → Pages, set Source to "Deploy from a branch",
branch `gh-pages` / `(root)`.
