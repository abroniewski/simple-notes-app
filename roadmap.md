# 🧠 Context and Project Idea

### **Project: "Simple Notes App"**

- **Background:** Build a tiny app where users can create, view, and delete notes.
- **Evolution goal:**  
  - Start with **static HTML/CSS** (like a paper notebook)  
  - Then **add JavaScript interactivity** (add/remove notes dynamically)  
  - Then **upgrade a single page** to **Next.js** (server-rendered and connected to a real DB like Supabase).

---
  
# 🛤️ **Step-by-Step Roadmap**

## **Stage 1: Static HTML + Tailwind CSS**

**Goal:**  
- Basic "Notes" web page.
- No interactivity.  
- "Add Note" button does nothing yet.

**Files:**
```
/public
  - index.html
/src
  - /styles/main.css (Tailwind imported)
```

**Tasks:**
- Create a static page layout: Header, Input box, "Add Note" button, and an empty Notes list.
- Tailwind classes for nice styling.

**User flow:**  
They type a note... but can't actually add it yet.

---

## **Stage 2: Vanilla JavaScript Interactivity**

**Goal:**  
- Frontend-only note adding and deleting.  
- No backend.

**Files added:**
```
/src/assets/scripts/main.ts
```

**Tasks:**
- Connect "Add Note" button → append a new note to the Notes list.
- Add a little "Delete" button next to each note.
- Save notes *temporarily* in localStorage (bonus).

**User flow:**  
They type a note → click Add → see it appear immediately.

---

## **Stage 3: Next.js API Route for Notes)**

**Goal:**  
- Introduce a real backend using a serverless API function.
- Save notes to Supabase instead of localStorage.

**Changes:**
- Install Next.js (`npx create-next-app` inside your project or parallel repo).
- Create a `POST /api/notes` and `GET /api/notes` API route.
- In your vanilla JS, change the "add note" function:
  - Instead of adding notes directly, **send a POST request** to `/api/notes`.
  - On page load, **fetch notes** from `/api/notes` and render them.

**User flow:**  
They type a note → it goes to your server → saved in Supabase → retrieved on reload.

---

## **Stage 4: Convert Frontend to Next.js Pages (Day 4–5)**

**Goal:**  
- Migrate frontend from `index.html` to full SSR/SSG (Next.js pages).

**Changes:**
- Move HTML inside `pages/index.tsx`.
- Replace vanilla DOM manipulation with React state/hooks:
  - Notes stored in React `useState`.
  - "Add Note" updates state and calls backend.

**User flow:**  
They use a full modern web app — server-rendered pages, React frontend, Supabase backend.

---

# 🎯 Tiny Notes App Feature List (Scope)

- Create a note (input field + button)
- Display all notes (list)
- Delete a note (trash button)
- Persist notes to server
- Notes appear after page reload
- Responsive styling (Tailwind)