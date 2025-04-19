import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');

  async function sendMessage() {
    if (!input) return;
    const userMsg = { sender: 'أنت', text: input };
    setChat(prev => [...prev, userMsg]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      const botMsg = { sender: 'AI', text: data.reply };
      setChat(prev => [...prev, botMsg]);
    } catch (error) {
      setChat(prev => [...prev, { sender: 'AI', text: '❌ حدث خطأ في الاتصال' }]);
    }

    setInput('');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 shadow-lg flex flex-col"
      >
        <h1 className="text-3xl font-extrabold text-white mb-4 text-center">
          © 2025 ADNAN NAOUS AI
        </h1>
        <div className="flex-1 h-96 overflow-y-auto mb-4 space-y-3 flex flex-col" id="chat">
          <AnimatePresence>
            {chat.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: m.sender === 'أنت' ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="flex"
              >
                <div
                  className={`p-3 rounded-xl inline-block ${m.sender === 'أنت' ? 'bg-white text-gray-800 self-start' : 'bg-indigo-700 text-white self-end'}`}>
                  <strong>{m.sender}:</strong> {m.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex">
          <motion.input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="اكتب سؤالك هنا..."
            className="flex-1 px-4 py-2 rounded-l-xl focus:outline-none border-0"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            onClick={sendMessage}
            className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded-r-xl font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            إرسال
          </motion.button>
        </div>
      </motion.div>
    </div>
```jsx
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
