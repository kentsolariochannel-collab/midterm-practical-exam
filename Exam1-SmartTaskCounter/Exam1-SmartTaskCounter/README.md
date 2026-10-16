# Exam 1 — Smart Task Counter

A React + Vite implementation of the Smart Task Counter practical exam.

## Requirements covered

- `useState` stores the completed task count and target.
- Increment, decrement, and reset controls.
- The Add two button uses two queued functional state updates.
- Status is derived from the current count and target: Not started, In progress, or Target reached.
- Increment and Add two are disabled when the target is reached.
- Decrement is disabled at zero, and the count cannot become negative.
- Target can be changed to support boundary testing.
- Accessible labels and a progress indicator are included.

## Run locally

Requires a supported Node.js installation and npm access to the configured package registry.

```bat
npm install
npm run dev
```

Open the local URL printed by Vite in the terminal.

## Build check

```bat
npm run build
```

## Manual test steps

1. Start with target 5 and count 0. Status should be **Not started**.
2. Click Decrement at 0. The count must remain 0.
3. Click Increment once. Count should be 1 and status **In progress**.
4. Click Add two. Count should increase by 2.
5. Set target to 5 and reach 4, then click Add two. Count should stop at 5.
6. At target 5, Increment and Add two should be disabled.
7. Click Reset. Count should return to 0 and status to **Not started**.
8. Change the target and repeat boundary checks.

## Debugging explanation: add two

Incorrect code:

```jsx
setCount(count + 1);
setCount(count + 1);
```

Both calls use the same `count` value captured by the current render, so they request the same next value. Functional updates fix this:

```jsx
setCount(currentCount => currentCount + 1);
setCount(currentCount => currentCount + 1);
```

React queues the updater functions and applies them in order, so the second updater receives the result of the first. This project caps each update at the target to ensure the count does not exceed it.

## Known limitations

- The count and target reset when the page is refreshed; persistence is not required by this exam.
- This is a local single-user demonstration and does not store session history.

## Demonstration note

Before submission, run the tests above and be prepared to explain the queued functional updates and one bug you personally encountered and fixed.
