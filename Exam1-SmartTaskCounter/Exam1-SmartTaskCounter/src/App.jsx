import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(5);

  const status =
    count === 0
      ? 'Not started'
      : count >= target
        ? 'Target reached'
        : 'In progress';

  const increment = () => {
    setCount((currentCount) => Math.min(currentCount + 1, target));
  };

  const decrement = () => {
    setCount((currentCount) => Math.max(currentCount - 1, 0));
  };

  const reset = () => setCount(0);

  // Two queued functional updates correctly use the latest queued state.
  const addTwo = () => {
    setCount((currentCount) => Math.min(currentCount + 1, target));
    setCount((currentCount) => Math.min(currentCount + 1, target));
  };

  const handleTargetChange = (event) => {
    const nextTarget = Number(event.target.value);
    if (Number.isFinite(nextTarget) && nextTarget >= 1) {
      setTarget(nextTarget);
      setCount((currentCount) => Math.min(currentCount, nextTarget));
    }
  };

  const targetReached = count >= target;

  return (
    <main className="page-shell">
      <section className="counter-card" aria-labelledby="page-title">
        <div className="eyebrow">STUDY SESSION TOOL</div>
        <h1 id="page-title">Smart Task Counter</h1>
        <p className="intro">
          Track your progress one task at a time. Keep going—you've got this.
        </p>

        <div className="target-row">
          <label htmlFor="target">Task target</label>
          <input
            id="target"
            type="number"
            min="1"
            max="999"
            value={target}
            onChange={handleTargetChange}
          />
        </div>

        <div className="progress-area">
          <div className="count" aria-live="polite">{count}</div>
          <div className="count-caption">of {target} tasks completed</div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Tasks completed"
            aria-valuemin={0}
            aria-valuemax={target}
            aria-valuenow={count}
          >
            <div
              className="progress-fill"
              style={{ width: `${Math.min((count / target) * 100, 100)}%` }}
            />
          </div>
          <div className={`status ${targetReached ? 'status-done' : ''}`}>
            <span className="status-dot" />
            {status}
          </div>
        </div>

        <div className="controls" aria-label="Task counter controls">
          <button className="button button-primary" onClick={increment} disabled={targetReached}>
            Increment +1
          </button>
          <button className="button button-secondary" onClick={addTwo} disabled={targetReached}>
            Add two +2
          </button>
          <button className="button button-quiet" onClick={decrement} disabled={count === 0}>
            Decrement −1
          </button>
          <button className="button button-reset" onClick={reset}>
            Reset
          </button>
        </div>

        {targetReached && (
          <p className="completion-message" role="status">
            Target reached! Great work on completing your tasks.
          </p>
        )}

        <p className="hint">
          Tip: change the target above to test different boundary conditions.
        </p>
      </section>
      <footer>React Hooks Practical Exam · Exam 1</footer>
    </main>
  );
}
