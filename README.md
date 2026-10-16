# Unified Midterm Practical Exam - React Hooks Portfolio & Toolkit

## Student Information
- **Name:** Kent John Solario
- **Course & Section:** IT365 — Section G11
- **Environment:** Windows Workstation, IntelliJ IDEA, Node.js, npm, Vite

---

## Project Overview
This project consolidates all six practical exam applications into a single, cohesive, and professionally styled React dashboard website. It uses a clean, neutral-toned card layout inspired by Exam 2, complete with tabbed navigation and robust state management across all required React hooks.

---

## Completed Exam Modules & Implementation Details

1. **Exam 1 — Smart Task Counter (`useState`)**
   - Implemented state tracking with dynamic target thresholds.
   - Utilized functional state updates for batch increments (e.g., adding `+2` safely without stale closures).
   - Added conditional status messages and boundary button disabling.

2. **Exam 2 — Live Search and Timer (`useEffect`)**
   - Implemented real-time search with a 300ms debounce timeout and cleanup logic.
   - Maintained a live session elapsed timer interval with unmount cleanup.
   - Synchronized document title dynamically with visible search result counts.

3. **Exam 3 — Accessible Form Toolkit (`useRef` & `useState`)**
   - Built robust form validation for name, email (regex matching), and password length.
   - Integrated `useRef` focus management to automatically focus the first invalid input field upon submission errors.
   - Tracked and displayed previously submitted email states.

4. **Exam 4 — Application Preferences (`useContext`)**
   - Created a custom `usePreferences` hook with safety checks to throw errors if called outside provider boundaries.
   - Shared theme toggling (light/dark modes) and dynamic font sizing (14px, 16px, 18px) across component trees without prop drilling.

5. **Exam 5 — Product Explorer Performance Repair (`useMemo`, `useCallback`, `React.memo`)**
   - Generated 500+ local product records with filtering and sorting controls.
   - Memoized the product list child component using `React.memo` to prevent unnecessary re-renders.
   - Added an unrelated parent counter to verify that parent state updates do not trigger redundant child calculations.

6. **Exam 6 — Issue Tracker State Engine (`useReducer`)**
   - Implemented a pure reducer handling five distinct actions (`ADD`, `TOGGLE`, `DELETE`, `SET_FILTER`).
   - Provided filtered viewing tabs (`All`, `Open`, `Done`) and immutable state transitions.

---

## Setup & Execution Instructions

1. Open your terminal (Windows CMD or IntelliJ terminal) inside the project folder:
   ```cmd
   cd Unified-Midterm-Exam