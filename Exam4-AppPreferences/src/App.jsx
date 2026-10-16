import React, { createContext, useContext, useState } from 'react';
import './App.css';

// 1. Create Context
const PreferencesContext = createContext(null);

// 2. Preferences Provider Component
function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'
  const [fontSize, setFontSize] = useState(16); // 14, 16, or 18 pixels

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <PreferencesContext.Provider value={{ theme, fontSize, setTheme, setFontSize, toggleTheme }}>
      {children}
    </PreferencesContext.Provider>
  );
}

// 3. Custom Hook with Error Check
function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}

// 4. Component Tree Components
function ArticlePreview() {
  const { theme, fontSize } = usePreferences();

  const bg = theme === 'light' ? '#ffffff' : '#222222';
  const color = theme === 'light' ? '#333333' : '#f0f0f0';

  return (
    <div style={{ background: bg, color: color, padding: '20px', borderRadius: '8px', marginTop: '20px', border: '1px solid #ccc' }}>
      <h3>Article Preview</h3>
      <p style={{ fontSize: `${fontSize}px` }}>
        This text dynamically updates its font size ({fontSize}px) and theme ({theme}) via React Context without prop drilling!
      </p>
    </div>
  );
}

function PreferencesPanel() {
  const { theme, fontSize, setTheme, setFontSize, toggleTheme } = usePreferences();

  return (
    <div style={{ padding: '15px', background: '#f9f9f9', borderRadius: '8px', marginBottom: '20px', color: '#333' }}>
      <h4>Preferences Panel</h4>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={toggleTheme} style={{ padding: '6px 12px', cursor: 'pointer' }}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
      </div>
      <div>
        <label>Font Size: </label>
        {[14, 16, 18].map((size) => (
          <button
            key={size}
            onClick={() => setFontSize(size)}
            style={{
              marginRight: '5px',
              padding: '4px 8px',
              fontWeight: fontSize === size ? 'bold' : 'normal',
              cursor: 'pointer',
            }}
          >
            {size}px
          </button>
        ))}
      </div>
    </div>
  );
}

function Toolbar() {
  return (
    <div style={{ marginBottom: '20px' }}>
      <PreferencesPanel />
    </div>
  );
}

function Dashboard() {
  const { theme } = usePreferences();
  const containerBg = theme === 'light' ? '#f4f4f4' : '#121212';
  const textColor = theme === 'light' ? '#000000' : '#ffffff';

  return (
    <div style={{ background: containerBg, color: textColor, minHeight: '100vh', padding: '30px', transition: 'all 0.3s ease' }}>
      <h2>Application Preferences Dashboard</h2>
      <Toolbar />
      <ArticlePreview />
    </div>
  );
}

// Root App Component
function App() {
  return (
    <PreferencesProvider>
      <Dashboard />
    </PreferencesProvider>
  );
}

export default App;