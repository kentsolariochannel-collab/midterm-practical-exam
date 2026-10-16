import React, { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext, useReducer } from 'react';
import './App.css';

// ==========================================
// EXAM 1: Smart Task Counter Component
// ==========================================
function SmartTaskCounter() {
  const [count, setCount] = useState(0);
  const target = 5;
  const status = count === 0 ? 'Not started' : count >= target ? 'Target reached' : 'In progress';

  const addTwo = () => {
    setCount((prev) => Math.min(prev + 1, target));
    setCount((prev) => Math.min(prev + 1, target));
  };

  return (
    <div>
      <h3 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '20px' }}>Smart Task Counter Module</h3>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Target: {target} | Current Count: <strong>{count}</strong></p>
      <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
        Status: <span style={{ fontWeight: '700', color: '#2563eb' }}>{status}</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button className="action-button" onClick={() => setCount((c) => Math.min(c + 1, target))} disabled={count >= target}>Increment (+1)</button>
        <button className="action-button" onClick={addTwo} disabled={count >= target}>Add Two (+2)</button>
        <button className="action-button" style={{ background: '#64748b' }} onClick={() => setCount((c) => Math.max(c - 1, 0))}>Decrement (-1)</button>
        <button className="action-button" style={{ background: '#dc2626' }} onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}

// ==========================================
// EXAM 2: Live Search and Timer Component
// ==========================================
const USERS = [
  { id: 1, name: 'Ana Cruz', role: 'Developer' },
  { id: 2, name: 'Ben Lim', role: 'Designer' },
  { id: 3, name: 'Cara Yu', role: 'Tester' },
  { id: 4, name: 'Dan Go', role: 'Developer' },
];

function LiveSearchTimer() {
  const [query, setQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(USERS);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const results = USERS.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));
      setFilteredUsers(results);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '20px' }}>Live Search & Timer Module</h3>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Find a teammate instantly while your session clock keeps running.</p>

      <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Session Elapsed</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>00:{seconds < 10 ? `0${seconds}` : seconds}</div>
        </div>
        <div style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>● LIVE</div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          className="input-field"
          placeholder="Try a name or role..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredUsers.map((user) => (
          <div key={user.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '13px' }}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '14px', color: '#0f172a' }}>{user.name}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{user.role}</div>
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#15803d', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>●</span> Available
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// EXAM 3: Accessible Form Toolkit Component
// ==========================================
function AccessibleForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [prevEmail, setPrevEmail] = useState('');

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) newErrors.email = 'Valid email is required.';
    if (!password || password.length < 8) newErrors.password = 'Password must be at least 8 characters.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (newErrors.name) nameRef.current?.focus();
      else if (newErrors.email) emailRef.current?.focus();
      else if (newErrors.password) passwordRef.current?.focus();
    } else {
      setPrevEmail(email);
      alert('Registration successful!');
      setName(''); setEmail(''); setPassword(''); setErrors({});
    }
  };

  return (
    <div>
      <h3 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '20px' }}>Accessible Form Toolkit Module</h3>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Robust validation with automatic focus redirection on error.</p>
      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Name</label>
          <input type="text" className="input-field" ref={nameRef} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
          {errors.name && <span style={{ color: '#dc2626', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Email Address</label>
          <input type="email" className="input-field" ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
          {errors.email && <span style={{ color: '#dc2626', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Password</label>
          <input type="password" className="input-field" ref={passwordRef} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" />
          {errors.password && <span style={{ color: '#dc2626', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.password}</span>}
        </div>
        <button type="submit" className="action-button" style={{ marginTop: '8px' }}>Register Account</button>
      </form>
      {prevEmail && <p style={{ marginTop: '20px', fontSize: '13px', color: '#15803d' }}>Previous Submitted Email: <strong>{prevEmail}</strong></p>}
    </div>
  );
}

// ==========================================
// EXAM 4: Application Preferences Component
// ==========================================
const PrefsContext = createContext(null);
function PrefsProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(16);
  return (
    <PrefsContext.Provider value={{ theme, fontSize, setTheme, setFontSize }}>
      {children}
    </PrefsContext.Provider>
  );
}
function useAppPrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error('Must be within PrefsProvider');
  return ctx;
}
function AppPreferencesContent() {
  const { theme, fontSize, setTheme, setFontSize } = useAppPrefs();
  const isDark = theme === 'dark';

  return (
    <div style={{ background: isDark ? '#1e293b' : '#f8fafc', color: isDark ? '#f8fafc' : '#1e293b', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', transition: 'all 0.3s' }}>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>Application Preferences Module</h3>
      <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '20px' }}>Context API state sharing across deeply nested components.</p>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button className="action-button" onClick={() => setTheme(isDark ? 'light' : 'dark')}>
          Switch to {isDark ? 'Light' : 'Dark'} Theme
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '12px', fontWeight: '700', marginRight: '10px' }}>Font Size:</span>
        {[14, 16, 18].map((s) => (
          <button key={s} onClick={() => setFontSize(s)} className="action-button" style={{ marginRight: '6px', background: fontSize === s ? '#2563eb' : '#94a3b8', padding: '6px 14px' }}>
            {s}px
          </button>
        ))}
      </div>

      <div style={{ padding: '20px', background: isDark ? '#0f172a' : '#ffffff', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
        <p style={{ fontSize: `${fontSize}px`, margin: 0 }}>Preview text responding dynamically to theme and font size state changes.</p>
      </div>
    </div>
  );
}
function ApplicationPreferences() {
  return (
    <PrefsProvider>
      <AppPreferencesContent />
    </PrefsProvider>
  );
}

// ==========================================
// EXAM 5: Product Explorer Performance Component
// ==========================================
const PRODS = Array.from({ length: 500 }, (_, i) => ({
  id: i + 1,
  name: `Product Item ${i + 1}`,
  price: (i * 13) % 200 + 15,
  category: i % 2 === 0 ? 'Electronics' : 'Clothing',
}));

const ProductListChild = React.memo(({ products }) => {
  return (
    <div style={{ maxHeight: '220px', overflowY: 'auto', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px', background: '#f8fafc' }}>
      <p style={{ margin: '0 0 10px 0', fontSize: '12px', fontWeight: '700', color: '#64748b' }}>Showing {products?.length || 0} items (Memoized Child)</p>
      {products?.slice(0, 6).map(p => (
        <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', borderBottom: '1px solid #e2e8f0', fontSize: '14px' }}>
          <span>{p.name}</span>
          <span style={{ fontWeight: '700', color: '#2563eb' }}>${p.price}</span>
        </div>
      ))}
    </div>
  );
});

function ProductExplorer() {
  const [search, setSearch] = useState('');
  const [parentCount, setParentCount] = useState(0);

  const filtered = useMemo(() => {
    return PRODS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <div>
      <h3 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '20px' }}>Product Explorer Performance Module</h3>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Optimized with `useMemo`, `useCallback`, and `React.memo`.</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background: '#f8fafc', padding: '14px 18px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
        <span style={{ fontSize: '14px', fontWeight: '600' }}>Parent Counter: {parentCount}</span>
        <button className="action-button" onClick={() => setParentCount(c => c + 1)}>Increment Parent</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input type="text" className="input-field" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <ProductListChild products={filtered} />
    </div>
  );
}

// ==========================================
// EXAM 6: Issue Tracker State Engine Component
// ==========================================
function issueReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, issues: [...(state?.issues || []), { id: state.nextId, title: action.payload, done: false }], nextId: state.nextId + 1 };
    case 'TOGGLE':
      return { ...state, issues: (state?.issues || []).map(i => i.id === action.payload ? { ...i, done: !i.done } : i) };
    case 'DELETE':
      return { ...state, issues: (state?.issues || []).filter(i => i.id !== action.payload) };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

function IssueTracker() {
  const [state, dispatch] = useReducer(issueReducer, { issues: [{ id: 1, title: 'Fix performance bug', done: false }, { id: 2, title: 'Update documentation', done: true }], filter: 'all', nextId: 3 });
  const [text, setText] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch({ type: 'ADD', payload: text });
    setText('');
  };

  const visibleIssues = (state?.issues || []).filter(i => {
    if (state.filter === 'open') return !i.done;
    if (state.filter === 'done') return i.done;
    return true;
  });

  return (
    <div>
      <h3 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '20px' }}>Issue Tracker State Engine Module</h3>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Complex state management powered by pure reducers.</p>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input type="text" className="input-field" placeholder="New issue..." value={text} onChange={e => setText(e.target.value)} />
        <button type="submit" className="action-button">Add Issue</button>
      </form>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {['all', 'open', 'done'].map(f => (
          <button
            key={f}
            onClick={() => dispatch({ type: 'SET_FILTER', payload: f })}
            className="action-button"
            style={{
              background: state.filter === f ? '#2563eb' : '#f1f5f9',
              color: state.filter === f ? '#ffffff' : '#475569',
              border: '1px solid #cbd5e1',
              textTransform: 'capitalize',
              padding: '8px 16px',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {visibleIssues.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: '14px', fontStyle: 'italic', textAlign: 'center', padding: '30px' }}>No issues found.</p>
        ) : (
          visibleIssues.map(i => (
            <div key={i.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
              <span
                onClick={() => dispatch({ type: 'TOGGLE', payload: i.id })}
                style={{ textDecoration: i.done ? 'line-through' : 'none', color: i.done ? '#94a3b8' : '#0f172a', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
              >
                {i.title}
              </span>
              <button
                onClick={() => dispatch({ type: 'DELETE', payload: i.id })}
                style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontWeight: '700', fontSize: '16px' }}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ==========================================
// ROOT APP: Sidebar Portal Layout
// ==========================================
export default function App() {
  const [activeTab, setActiveTab] = useState(1);

  const examTitles = {
    1: { lesson: 'Lesson 1 of 6', title: 'Smart Task Counter' },
    2: { lesson: 'Lesson 2 of 6', title: 'Live Search & Timer' },
    3: { lesson: 'Lesson 3 of 6', title: 'Accessible Form Toolkit' },
    4: { lesson: 'Lesson 4 of 6', title: 'Application Preferences' },
    5: { lesson: 'Lesson 5 of 6', title: 'Product Explorer Performance' },
    6: { lesson: 'Lesson 6 of 6', title: 'Issue Tracker State Engine' },
  };

  return (
    <div className="portal-container">
      {/* Left Sidebar Navigation */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Midterm Practical Exam</h2>
          <p className="sidebar-subtitle">Interactive React Portfolio</p>
        </div>
        <div className="sidebar-nav">
          <div className="nav-section-title">Course Modules</div>
          <button className={`sidebar-btn ${activeTab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)}>
            <span>1. Smart Task Counter</span>
            <span className="status-badge">✓</span>
          </button>
          <button className={`sidebar-btn ${activeTab === 2 ? 'active' : ''}`} onClick={() => setActiveTab(2)}>
            <span>2. Live Search & Timer</span>
            <span className="status-badge">✓</span>
          </button>
          <button className={`sidebar-btn ${activeTab === 3 ? 'active' : ''}`} onClick={() => setActiveTab(3)}>
            <span>3. Accessible Form</span>
            <span className="status-badge">✓</span>
          </button>
          <button className={`sidebar-btn ${activeTab === 4 ? 'active' : ''}`} onClick={() => setActiveTab(4)}>
            <span>4. Preferences (Context)</span>
            <span className="status-badge">✓</span>
          </button>
          <button className={`sidebar-btn ${activeTab === 5 ? 'active' : ''}`} onClick={() => setActiveTab(5)}>
            <span>5. Product Explorer</span>
            <span className="status-badge">✓</span>
          </button>
          <button className={`sidebar-btn ${activeTab === 6 ? 'active' : ''}`} onClick={() => setActiveTab(6)}>
            <span>6. Issue Tracker</span>
            <span className="status-badge">✓</span>
          </button>
        </div>
      </div>

      {/* Main Right Content Area */}
      <div className="main-content">
        <div className="top-banner">
          <div className="banner-lesson">{examTitles[activeTab].lesson}</div>
          <h1 className="banner-title">{examTitles[activeTab].title}</h1>
        </div>
        <div className="content-body">
          {activeTab === 1 && <SmartTaskCounter />}
          {activeTab === 2 && <LiveSearchTimer />}
          {activeTab === 3 && <AccessibleForm />}
          {activeTab === 4 && <ApplicationPreferences />}
          {activeTab === 5 && <ProductExplorer />}
          {activeTab === 6 && <IssueTracker />}
        </div>
      </div>
    </div>
  );
}