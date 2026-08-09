# WeatherPro - Multi-Page Weather Application

WeatherPro is a premium, responsive multi-page weather dashboard built in React using Vite. It integrates client-side routing, parallel asynchronous fetching from OpenWeatherMap REST APIs, dynamic canvas and CSS sky backdrops, interactive map components, and local storage state persistence.

## Key Features

1. **Multi-Page Routing Architecture**:
   - `/`: Weather dashboard with location search, controlled dropdown list, hourly forecasts, air quality indices, and Leaflet location map.
   - `/about`: Details the stack components (React, React Router, OpenWeatherMap, Leaflet, Axios).
   - `/contact`: Full-featured accessible form with explicitly paired labels and inputs, form validation, and user feedback toast.

2. **Live Weather & Controlled Selection**:
   - Controlled `<select>` dropdown featuring 7 major global cities (London, New York, Tokyo, Paris, Sydney, Mumbai, Cairo).
   - Immediate weather data fetching for a default city (London) on initial render.
   - Fallback protection: fetches are wrapped in safe promise catchers so the dashboard loads even if sub-services (like air pollution) encounter errors.

3. **Persistent User Settings**:
   - Persistent **Theme Toggle** (Light vs. Dark Mode) synced with Local Storage.
   - Persistent **Temperature Unit** (Celsius `°C` vs. Fahrenheit `°F`) synced with Local Storage. Changing unit automatically triggers new API fetches.

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation & Run

1. Clone the repository and navigate to the project directory:
   ```bash
   cd Weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite local development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Configuration & Environment Variables

The project uses the OpenWeatherMap API.

The application reads the API key from environment variables. Get a free key from [OpenWeatherMap](https://home.openweathermap.org/users/sign_up), then create a `.env` file in the root directory:

```env
VITE_API_KEY=your_openweathermap_api_key
```

`.env` is gitignored and must never be committed. If `VITE_API_KEY` is missing, the app logs an error and weather fetches will fail.
# Weather-App-
