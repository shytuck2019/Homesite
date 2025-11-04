HomeBite — Full Extended Starter (Auth, Social Login, Image Resizing, Password Reset, Postgres)
============================================================================================

This archive now includes a complete frontend React (Vite) app in /frontend plus the backend in /backend.

Run locally:
1. Backend:
   - copy backend/.env.example to backend/.env and set DATABASE_URL and SMTP_*
   - cd backend
   - npm install
   - node migrate.js
   - node seed.js
   - node server.js

2. Frontend:
   - cd frontend
   - npm install
   - npm run dev
   - open the Vite URL (usually http://localhost:5173)

The frontend expects the backend to run at VITE_API_URL (default http://localhost:4000). You can set that env var when running the frontend.

