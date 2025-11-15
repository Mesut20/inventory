
import React, { useEffect, useState } from 'react';

function App() {
  const [visible, setVisible] = useState(false);

  // Listen for NUI messages from Lua
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data && event.data.action === 'openInventory') {
        setVisible(true);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // Send closeInventory NUI callback to Lua
  const closeInventory = () => {
    setVisible(false);
    fetch('https://slummen_inventory/closeInventory', { method: 'POST' });
  };

  if (!visible) return null;

  return (
    <div style={{ background: 'rgba(0,0,0,0.8)', color: '#fff', padding: 32, borderRadius: 8, width: 400, margin: '100px auto', textAlign: 'center' }}>
      <h1>Slummen Inventory</h1>
      <p>This is a minimal inventory UI. Extend as needed.</p>
      <button onClick={closeInventory} style={{ marginTop: 20, padding: '8px 24px', fontSize: 16 }}>Close</button>
    </div>
  );
}

export default App;
