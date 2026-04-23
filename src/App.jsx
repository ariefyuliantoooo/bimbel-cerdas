import React from 'react';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      backgroundColor: '#f8fafc',
      color: '#0f172a',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀 Bimbel Cerdas is Online</h1>
      <p style={{ fontSize: '1.25rem', color: '#475569', maxWidth: '600px' }}>
        Aplikasi sedang dalam pemeliharaan singkat. Jika Anda melihat pesan ini, berarti sistem dasar sudah berjalan dengan baik.
      </p>
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#e2e8f0', borderRadius: '12px' }}>
        Status: <strong>React Mounting Success</strong>
      </div>
    </div>
  );
}

export default App;
