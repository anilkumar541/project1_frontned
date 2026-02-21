# project1 — React Frontend

Auth UI built with Vite, React, and Tailwind CSS v4. Connects to the [FastAPI backend](https://github.com/anilkumar541/project1_fastapi_backend).

## Tech Stack

- **Vite 7** — build tool & dev server
- **React 19** — UI library
- **Tailwind CSS v4** — utility-first styling
- **React Router v7** — client-side routing
- **Axios** — HTTP client with request interceptors

## Pages

| Route | Description |
|-------|-------------|
| `/login` | Sign in with email & password |
| `/register` | Create a new account |
| `/forgot-password` | Request a password reset email |
| `/reset-password?token=` | Set a new password via reset token |
| `/profile` | View account info, change password *(protected)* |

Unauthenticated users are redirected to `/login` when accessing protected routes.

## Setup

### 1. Prerequisites

- Node.js 18+
- FastAPI backend running at `http://127.0.0.1:8000`

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

App runs at `http://localhost:5173`. API requests to `/auth/*` and `/users/*` are proxied to the backend automatically — no CORS issues in development.

### 4. Build for production

```bash
npm run build
```

Output is in `dist/`. Point your web server at that directory and ensure `/auth` and `/users` proxy to the backend.

## Project Structure

```
frontend/
├── index.html
├── vite.config.js         # Tailwind plugin + dev proxy
└── src/
    ├── main.jsx            # Entry point, wraps app in <AuthProvider>
    ├── App.jsx             # React Router routes
    ├── index.css           # @import "tailwindcss"
    ├── api/
    │   └── auth.js         # Axios instance + all API call functions
    ├── context/
    │   └── AuthContext.jsx # Token/user state, login & logout helpers
    ├── components/
    │   ├── Navbar.jsx      # Top nav with logout button
    │   └── PrivateRoute.jsx # Redirects to /login if not authenticated
    └── pages/
        ├── Login.jsx
        ├── Register.jsx
        ├── ForgotPassword.jsx
        ├── ResetPassword.jsx
        └── Profile.jsx
```

## Environment

No `.env` file is needed for development. The Vite proxy handles routing API calls to the backend:

```js
// vite.config.js
proxy: {
  '/auth': 'http://127.0.0.1:8000',
  '/users': 'http://127.0.0.1:8000',
}
```

For production, update these proxy targets or configure your reverse proxy (nginx, etc.) accordingly.
