# Exam 2 — Live Search and Timer

A React + Vite app demonstrating `useState` and `useEffect`.

## Requirements implemented
- [x] Fixed directory of four users: Ana Cruz (Developer), Ben Lim (Designer), Cara Yu (Tester), and Dan Go (Developer).
- [x] Controlled search field searches both name and role.
- [x] Search is delayed by 400 ms to avoid filtering on every keystroke.
- [x] Pending search timeout is cancelled when the query changes and when the hook unmounts.
- [x] Session timer increments every second.
- [x] Interval cleanup prevents a timer from continuing after unmount.
- [x] Timer uses a functional state update to avoid a stale closure.
- [x] Browser tab title updates with the current result count.
- [x] Empty-result state and clear-search controls.
- [x] Responsive layout and accessible labels.

## Run locally
1. Open this folder in IntelliJ IDEA (or another editor).
2. Open the terminal in this folder, where `package.json` is located.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL Vite prints (usually `http://localhost:5173/`).

## Test checklist
1. On first load, verify all four users appear and the timer starts at `00:00`.
2. Type `Developer`; after a short delay, Ana Cruz and Dan Go should remain.
3. Type `Cara`; Cara Yu should remain after the delay.
4. Type a phrase that matches no user; the empty state should appear.
5. Click Clear search; all four users should return.
6. Watch the timer for several seconds; it should increase once per second.
7. Check the browser tab title; it should show the number of results.
8. Change the query quickly several times; only the latest query should be displayed after its delay.

## Bug fixed / explanation
A common timer bug occurs when an interval captures the initial `elapsedSeconds` value and calls `setElapsedSeconds(elapsedSeconds + 1)`. That closure can repeatedly write the same value instead of counting up. This app uses `setElapsedSeconds(seconds => seconds + 1)`, so each update receives the latest state. The delayed search timeout is also cleared in its effect cleanup, and the timer interval is cleared on unmount.

## Limitations
- User records are fixed sample data and are not loaded from a server.
- The timer is a session elapsed-time demo; it is not persisted after refresh.
- Search matches the displayed name and role only.
