import { useState } from 'react';

export default function Home() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');

  async function sendMessage() {
    if (!input) return;
    const userMsg = { sender: 'أنت', text: input };
    setChat(prev => [...prev, userMsg]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    const botMsg = { sender: 'AI', text: data.reply };
    setChat(prev => [...prev, botMsg]);
    setInput('');
  }

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>© 2025 ADNAN NAOUS AI</h1>
      <div style={{ width: '100%', maxWidth: 600, border: '1px solid #ccc', borderRadius: 8, padding: '1rem', marginBottom: '1rem', height: '400px', overflowY: 'auto' }}>
        {chat.map((m, i) => <div key={i}><strong>{m.sender}:</strong> {m.text}</div>)}
      </div>
      <div style={{ display: 'flex', width: '100%', maxWidth: 600 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="اكتب سؤالك هنا..."
          style={{ flex: 1, padding: '0.5rem', marginRight: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }}
        />
        <button onClick={sendMessage} style={{ padding: '0.5rem 1rem', borderRadius: 4, backgroundColor: '#0059ff', color: '#fff', border: 'none' }}>
          إرسال
        </button>
      </div>
    </div>
  );
}
