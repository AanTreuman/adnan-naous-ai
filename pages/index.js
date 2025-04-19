import { useState } from 'react';

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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { sender: 'ADNAN NAOUS AI', text: data.reply || 'لا يوجد رد.' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: 'ADNAN NAOUS AI', text: '⚠️ حدث خطأ أثناء الاتصال بالخادم.' },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 flex flex-col items-center justify-start">
      <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-8 bg-gradient-to-r from-emerald-400 to-cyan-500 text-transparent bg-clip-text text-center">
        ADNAN NAOUS AI
      </h1>

      <div className="w-full max-w-2xl bg-gray-900 rounded-2xl p-6 shadow-xl overflow-y-auto h-[65vh] border border-gray-700">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-xl max-w-[85%] ${
              msg.sender === 'أنت'
                ? 'ml-auto bg-emerald-600 text-right'
                : 'mr-auto bg-gray-700 text-left'
            }`}
          >
            <strong className="block text-sm opacity-70 mb-1">{msg.sender}</strong>
            <p className="text-md leading-relaxed">{msg.text}</p>
          </div>
        ))}
        {loading && <p className="text-center text-sm text-gray-400 animate-pulse">...جاري الرد</p>}
      </div>

      <div className="w-full max-w-2xl flex gap-2 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="اكتب سؤالك هنا..."
          className="flex-1 p-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          onClick={sendMessage}
          className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-bold transition"
        >
          إرسال
        </button>
      </div>
    </div>
  );
}
