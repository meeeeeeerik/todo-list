# ToDoList

A task management web application built with vanilla JavaScript, Supabase, and Tailwind CSS. Users authenticate via Google OAuth and can create, edit, prioritize, and archive their tasks.

**Live demo:** [todo-list-project-landing.netlify.app](https://todo-list-project-landing.netlify.app/)

---

## Features

- Google OAuth authentication (via Supabase Auth)
- Create, edit, and delete tasks
- Three priority levels: High, Medium, Low
- Active and archived task lists
- Animated modals and loading states
- Auto-dismissing error notifications
- Responsive layout with Tailwind CSS

---

## Tech Stack

| Layer          | Technology                            |
| -------------- | ------------------------------------- |
| Build tool     | Vite 5                                |
| Language       | Vanilla JavaScript (ES modules)       |
| Styling        | Tailwind CSS 3, PostCSS, Autoprefixer |
| Backend / Auth | Supabase (PostgreSQL + Google OAuth)  |
| Deployment     | Netlify                               |

---

## Project Structure

```
toDoList/
├── api/
│   ├── config.js               # Supabase client initialization
│   ├── task.js                 # Task CRUD operations
│   └── user.js                 # Authentication (Google OAuth, logout, getUser)
├── utils/
│   ├── constants.js            # Enums: priorities, statuses, task modes
│   ├── errorHandler.js         # Toast error notifications
│   ├── htmlTemplates.js        # DOM template generators
│   ├── logoutHandler.js        # Logout confirmation flow
│   ├── renders.js              # Task list and user info rendering
│   ├── taskModalHandlers.js    # Create / edit modal logic
│   ├── tasksContainerHandlers.js # Event delegation for task actions
│   └── utils.js                # Animation utilities
├── index.html                  # Main app page (task dashboard)
├── login.html                  # Login page
├── main.js                     # App entry — auth guard, data fetch, event setup
├── login.js                    # Login page entry — Google OAuth flow
├── style.css                   # Global styles (Tailwind directives)
├── vite.config.js
├── tailwind.config.js
└── postcss.config.cjs
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project with Google OAuth configured

### 1. Clone the repository

```bash
git clone <repo-url>
cd toDoList
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Scripts

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start dev server with hot reload          |
| `npm run build`   | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally      |

---

## Authentication Flow

1. User visits the app and is redirected to `/login.html` if not authenticated.
2. Clicking **Sign in with Google** triggers Supabase OAuth.
3. After successful login, Supabase redirects back to the app with a session token stored in `localStorage`.
4. `main.js` reads the session on load; if absent, redirects to `/login.html`.
5. Logout clears the session via `supabase.auth.signOut()` and redirects to the login page.

---

## Database Schema

The app expects a `tasks` table in Supabase with the following columns:

| Column        | Type        | Notes                             |
| ------------- | ----------- | --------------------------------- |
| `id`          | uuid        | Primary key                       |
| `title`       | text        | Task title                        |
| `description` | text        | Optional details                  |
| `priority`    | text        | `high`, `medium`, `low`, or empty |
| `status`      | text        | `active` or `archive`             |
| `user_id`     | uuid        | References `auth.users`           |
| `created_at`  | timestamptz | Auto-generated                    |

Enable Row Level Security and add a policy so users can only access their own rows.

---

## Deployment

The project is deployed on Netlify. To deploy your own instance:

1. Push the repository to GitHub.
2. Connect it to a new Netlify site.
3. Set the build command to `npm run build` and the publish directory to `dist`.
4. Add the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables in the Netlify dashboard.
5. Update the allowed redirect URLs in your Supabase project settings to match your Netlify domain.
