import { useEffect, useState } from 'react';

const USERS = [
  { id: 1, name: 'Ana Cruz', role: 'Developer', initials: 'AC', color: 'violet' },
  { id: 2, name: 'Ben Lim', role: 'Designer', initials: 'BL', color: 'blue' },
  { id: 3, name: 'Cara Yu', role: 'Tester', initials: 'CY', color: 'coral' },
  { id: 4, name: 'Dan Go', role: 'Developer', initials: 'DG', color: 'green' },
];

function useDebouncedValue(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the previous pending search when the input changes or unmounts.
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export default function App() {
  const [query, setQuery] = useState('');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const debouncedQuery = useDebouncedValue(query, 400);

  // Functional update avoids a stale elapsedSeconds value in the interval closure.
  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);

    // Prevent the interval from continuing after this component unmounts.
    return () => clearInterval(intervalId);
  }, []);

  const normalizedQuery = debouncedQuery.trim().toLowerCase();
  const filteredUsers = USERS.filter((user) => {
    const searchableText = `${user.name} ${user.role}`.toLowerCase();
    return searchableText.includes(normalizedQuery);
  });

  // Keep the browser tab title in sync with the current result count.
  useEffect(() => {
    document.title = `(${filteredUsers.length}) Live Search and Timer`;
    return () => {
      document.title = 'Live Search and Timer';
    };
  }, [filteredUsers.length]);

  const searchIsPending = query !== debouncedQuery;

  function clearSearch() {
    setQuery('');
  }

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <section className="app-card" aria-labelledby="page-title">
        <header className="header">
          <div className="eyebrow"><span className="eyebrow-dot" /> REACT HOOKS LAB · APP 02</div>
          <h1 id="page-title">Live Search <span>&</span> Timer</h1>
          <p className="subtitle">Find a teammate instantly while your session clock keeps running.</p>
        </header>

        <section className="timer-panel" aria-label="Session timer">
          <div className="timer-icon" aria-hidden="true">◷</div>
          <div>
            <p className="panel-label">SESSION ELAPSED</p>
            <p className="timer-value" aria-live="off">{formatTime(elapsedSeconds)}</p>
          </div>
          <div className="live-indicator"><span /> LIVE</div>
        </section>

        <section className="search-section" aria-label="Search team members">
          <label htmlFor="user-search">Search team members</label>
          <div className="search-wrap">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              id="user-search"
              type="search"
              placeholder="Try a name or role…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
            />
            {query && <button className="clear-button" type="button" onClick={clearSearch} aria-label="Clear search">×</button>}
          </div>
          <div className="search-meta">
            <span>{searchIsPending ? 'Updating results…' : `${filteredUsers.length} ${filteredUsers.length === 1 ? 'person' : 'people'} found`}</span>
            <span className="debounce-note">400 ms delayed search</span>
          </div>
        </section>

        <section className="results-section" aria-label="Search results" aria-live="polite">
          <div className="results-heading">
            <h2>Team directory</h2>
            <span className="result-count">{filteredUsers.length.toString().padStart(2, '0')}</span>
          </div>
          {filteredUsers.length > 0 ? (
            <ul className="user-list">
              {filteredUsers.map((user) => (
                <li className="user-row" key={user.id}>
                  <div className={`avatar ${user.color}`}>{user.initials}</div>
                  <div className="user-info">
                    <span className="user-name">{user.name}</span>
                    <span className="user-role">{user.role}</span>
                  </div>
                  <span className="user-status"><span /> Available</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <div className="empty-icon" aria-hidden="true">⌕</div>
              <strong>No matching teammates</strong>
              <p>Try another name or role, such as “Developer”.</p>
              <button type="button" className="reset-search" onClick={clearSearch}>Clear search</button>
            </div>
          )}
        </section>

        <footer className="footer">
          <span><span className="footer-check">✓</span> Search timeout and timer cleanup enabled</span>
          <span>useEffect · useState</span>
        </footer>
      </section>
      <p className="page-caption">A small demo of delayed effects, cleanup, and live session timing.</p>
    </main>
  );
}