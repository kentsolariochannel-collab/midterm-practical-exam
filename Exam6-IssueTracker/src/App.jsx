import React, { useReducer, useEffect, useState } from 'react';
import './App.css';

// 1. Initial State Shape
const initialState = {
  issues: [],
  filter: 'all', // 'all', 'open', 'done'
  nextId: 1,
};

// 2. Pure Reducer Implementation
function issueReducer(state, action) {
  switch (action.type) {
    case 'ADD_ISSUE':
      return {
        ...state,
        issues: [
          ...state.issues,
          { id: state.nextId, title: action.payload.title, done: false },
        ],
        nextId: state.nextId + 1,
      };
    case 'TOGGLE_ISSUE':
      return {
        ...state,
        issues: state.issues.map((issue) =>
          issue.id === action.payload.id ? { ...issue, done: !issue.done } : issue
        ),
      };
    case 'DELETE_ISSUE':
      return {
        ...state,
        issues: state.issues.filter((issue) => issue.id !== action.payload.id),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload.filter,
      };
    case 'CLEAR_DONE':
      return {
        ...state,
        issues: state.issues.filter((issue) => !issue.done),
      };
    default:
      // Preserve state for unknown actions (Safe default branch)
      return state;
  }
}

// 3. Custom Persistent Reducer Hook using localStorage
function usePersistentReducer(reducer, initializerState, key) {
  const [state, dispatch] = useReducer(reducer, initializerState, (initial) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initial;
    } catch (e) {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }, [state, key]);

  return [state, dispatch];
}

function App() {
  const [state, dispatch] = usePersistentReducer(issueReducer, initialState, 'issue_tracker_state');
  const [titleInput, setTitleInput] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!titleInput.trim()) return;
    dispatch({ type: 'ADD_ISSUE', payload: { title: titleInput } });
    setTitleInput('');
  };

  // Filtered issues based on current filter state
  const filteredIssues = state.issues.filter((issue) => {
    if (state.filter === 'open') return !issue.done;
    if (state.filter === 'done') return issue.done;
    return true; // 'all'
  });

  const openCount = state.issues.filter((i) => !i.done).length;
  const doneCount = state.issues.filter((i) => i.done).length;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Issue Tracker State Engine</h2>

      {/* Add Issue Form */}
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Enter new issue..."
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          style={{ padding: '8px', flex: '1' }}
        />
        <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>Add Issue</button>
      </form>

      {/* Filter Buttons & Counts */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          {['all', 'open', 'done'].map((f) => (
            <button
              key={f}
              onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: f } })}
              style={{
                marginRight: '5px',
                padding: '6px 12px',
                fontWeight: state.filter === f ? 'bold' : 'normal',
                background: state.filter === f ? '#007bff' : '#f0f0f0',
                color: state.filter === f ? '#fff' : '#333',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {f} ({f === 'all' ? state.issues.length : f === 'open' ? openCount : doneCount})
            </button>
          ))}
        </div>

        <button
          onClick={() => dispatch({ type: 'CLEAR_DONE' })}
          style={{ padding: '6px 10px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Clear Done
        </button>
      </div>

      {/* Issue List */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {filteredIssues.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>No issues found.</p>
        ) : (
          filteredIssues.map((issue) => (
            <li
              key={issue.id}
              style={{
                padding: '10px',
                marginBottom: '8px',
                background: '#f9f9f9',
                border: '1px solid #ddd',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                onClick={() => dispatch({ type: 'TOGGLE_ISSUE', payload: { id: issue.id } })}
                style={{
                  textDecoration: issue.done ? 'line-through' : 'none',
                  color: issue.done ? '#888' : '#000',
                  cursor: 'pointer',
                  flex: '1',
                }}
              >
                {issue.title}
              </span>
              <button
                onClick={() => dispatch({ type: 'DELETE_ISSUE', payload: { id: issue.id } })}
                style={{ background: 'transparent', border: 'none', color: '#dc3545', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;