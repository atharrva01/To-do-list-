# 📝 Advanced Todo List (Vanilla JS)

A fully-functional, **state-safe Todo application** built using **Vanilla JavaScript**, focusing on **correct data modeling, stable identity, and clean DOM rendering** — not just UI hacks.

This project was built to go beyond a “basic todo app” and deliberately avoids common beginner mistakes like string-based identity and destructive UI logic.

---

## ✨ Features

- **Add, edit, delete tasks**
- **Mark tasks as complete / incomplete**
- **Persistent storage** using `localStorage`  
- **Per-user task separation** - **Real-time search** (non-destructive)  
- **Task sorting** by creation time  
- **Input validation** with clear feedback  
- **Glassmorphic UI** (modern, minimal)

---

 ## ✨ Working

https://github.com/user-attachments/assets/1f14208c-5ecf-4d96-b674-f16572e7ad1f


## 🧠 Key Engineering Decisions

### ✅ Stable Identity with IDs
Each task uses a unique `id` instead of relying on task text. This ensures:
- Safe editing without affecting similar tasks.
- Duplicate task names are allowed.
- Future scalability (sorting, filtering, analytics).

js
{
  id: 1704892800000,
  task: "Learn JavaScript",
  completion: false,
  createdAt: 1704892800000
}

# Project Principles & Tech Stack

### ✅ Non-Destructive Search
Search only filters the rendered view, never mutates stored data.  
**This guarantees:**
* **Restoration:** Clearing search restores all tasks.
* **Data Integrity:** No accidental data loss.
* **Consistency:** Predictable behavior across all interactions.

### ✅ Defensive DOM Handling
* **Isolation:** Static UI elements are separated from dynamic containers.
* **Safety Checks:** No `.style` access on missing elements to prevent runtime errors.
* **Management:** Re-rendering is centralized and strictly controlled.

### ✅ Persistent & Backward-Safe Storage
The app gracefully handles:
* **Legacy Support:** Older stored data formats.
* **Robustness:** Missing fields (e.g., `createdAt`) or schema changes.
* **Reliability:** Corrupted or empty states are automatically repaired or defaulted.

---

## 🛠 Tech Stack
* **HTML5**
* **CSS3** (Glassmorphism UI)
* **Vanilla JavaScript** (ES6+)
* **LocalStorage API**

> **Note:** No frameworks. No libraries. Pure fundamentals.

