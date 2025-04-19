import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'أنت', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage = { sender: 'ADNAN NAOUS AI', text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'ADNAN NAOUS AI', text: '⚠️ حدث خطأ في الاتصال' }]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-4 flex flex-col items-center justify-start">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold mb-6 mt-6 text-center bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent"
      >
        ADNAN NAOUS AI
      </motion.h1>

      <div className="w-full max-w-2xl bg-white/5 rounded-2xl p-6 shadow-xl overflow-y-auto h-[65vh] mb-4 border border-white/10">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.sender === 'أنت' ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className={`mb-4 p-3 rounded-xl max-w-[80%] ${
                msg.sender === 'أنت' ? 'ml-auto bg-emerald-500 text-right' : 'mr-auto bg-gray-700 text-left'
              }`}
            >
              <strong className="block text-sm opacity-80 mb-1">{msg.sender}</strong>
              <span className="text-md leading-relaxed">{msg.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="text-center text-gray-400 animate-pulse">...جاري التفكير</div>
        )}
      </div>

      <div className="w-full max-w-2xl flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="اكتب سؤالك هنا..."
          className="flex-1 p-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <button
          onClick={sendMessage}
          className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition font-bold"
        >
          إرسال
        </button>
      </div>
    </div>
  );
}
