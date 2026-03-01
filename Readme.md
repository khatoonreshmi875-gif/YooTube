📺 YouTube + Twitter Hybrid Platform
A full‑stack social media platform combining video sharing (like YouTube) and microblogging (like Twitter), with modern UX/UI, AI‑powered search, and production‑grade backend + frontend optimizations.

✨ Features
🔐 Authentication & Authorization

- JWT login/logout, Google OAuth, password reset/change.
- Role‑based access control (Admin, Moderator, User).
  📹 Video System
- Upload videos with Cloudinary integration, metadata, dynamic tags.
- Video detail page with large player, metadata, and views logic (max 4 views per user/day, counted only after full playback).
- Similar video recommendations based on NLP title matching, tags, and category.
- Download system: save videos offline, manage downloads.
- Playlist management: create, edit, delete playlists.
- Channel page CRUD system with toast feedback.
- Watch history: auto‑tracking, delete entries, clear all history.
  🐦 Tweet System
- CRUD tweets with nested comments, likes/dislikes.
- Dedicated tweet detail page.
- Homepage feed logic:
- Show subscribed channels’ tweets first.
- Append general tweets (other channels).
- Fallback: if no subscriptions or no tweets, show all tweets sorted by newest.
  👥 Subscription & Channel Profiles
- Subscribe/unsubscribe channels.
- Channel profile: channel name, username, total videos, subscriber count.
- Subscriber analytics dashboard:
- Daily growth graph.
- Total subscribers, comments, likes.
- Detailed subscriber activity (comments, likes, tweets).
- Top 3 subscribers ranked by engagement.
  🔎 Search System (NLP‑Based)
- Search channels by title → show channel + its videos.
- Search videos by title → show exact match + similar videos (tags/category/title).
- Semantic NLP ensures flexible queries (partial matches, natural language).
  💬 Comments & Engagement
- Nested comment system with likes/dislikes and threaded replies.
- Optimistic UI updates: likes, dislikes, subscriptions, and comments update instantly, then sync with backend.
- Optimistic deletion: items disappear instantly, toast confirms success.

🎨 UI/UX Enhancements

- Reusable components: buttons, form fields, video menu, hover video, shared layout.
- Consistent design system: equal padding, font sizes, modern colors (blue for primary, red for destructive, slate for neutral).
- Loading states:
- Spinner for initial page load.
- Skeleton loaders during API calls (homepage, video page, comments, history).
- Empty state messages with action buttons (e.g., “No videos yet → Upload now”).

⚡ Backend Optimizations

- Lean Select: optimized DB queries by fetching only required fields.
- Redis caching: accelerated API calls, cached homepage feed, search results, and analytics.
- Node Cron: automated analytics updates.
- WebSockets: real‑time alerts and updates.
- AbortController: cancel API calls to prevent wasted requests and improve responsiveness.

⚡ Frontend Optimizations

- Code splitting: modularized code for readability and reusability.
- Most files capped at ~100–130 lines, some reaching ~200 lines for complex logic.
- Lazy loading: applied to heavy packages like Graph libraries and Video.js.
- Reduces initial bundle size.
- Improves performance by loading only when needed.
- React hooks optimization:
- Used useMemo and useCallback selectively for dynamic data.
- Prevented unnecessary re‑renders of parent and child components.
- Build analysis: used npm run build to identify heavy packages and optimize loading strategy.

🛠️ Tech Stack

- Frontend: React, TailwindCSS, Reusable Components, Skeleton Loaders, Toast Notifications, Code Splitting, Lazy Loading, useMemo/useCallback.
- Backend: Node.js, Express, MongoDB (Lean Select), Redis, JWT, OAuth, AbortController.
- Cloud: Cloudinary (video storage).
- Other: WebSockets, Node Cron, Optimistic UI.

📊 Highlights

- End‑to‑end platform: authentication → content creation → discovery → analytics → engagement.
- AI‑powered search + recommendation system.
- Optimistic UI for instant feedback.
- Production‑grade backend optimizations (Redis, Lean Select, AbortController).
- Frontend performance engineering (Code Splitting, Lazy Loading, useMemo/useCallback).
- Modern UX/UI with reusable components, skeletons, spinners, and empty states.
  Getting Started
- Clone the repository
  git clone https://github.com/khatoonreshmi875-gif/yoo-tube.git
- Install dependencies
  npm install
- Set up environment variables (.env)
  You’ll need to configure the following for the backend and frontend:
- Backend:
- MongoDB URI
- Redis connection
- Cloudinary credentials
- JWT secrets & expiry times
- OAuth keys (Google)
- Email credentials (for password reset)
- Admin credentials
- Session secret
- API key
- Frontend:
- VITE_BACKEND_URL
- VITE_FRONTEND_URL
- VITE_CLOUDINARY_CLOUD_NAME
- VITE_CLOUDINARY_UPLOAD_PRESET
- Run the development server
  npm run dev
