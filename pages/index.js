import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');

  async function sendMessage() {
    if (!input) return;
    setChat(prev => [...prev, { sender: 'أنت', text: input }]);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setChat(prev => [...prev, { sender: 'AI', text: data.reply }]);
    } catch {
      setChat(prev => [...prev, { sender: 'AI', text: '❌ حدث خطأ في الاتصال' }]);
    }
    setInput('');
  }

  return (
    <div className="..."> 
      {/* بقية الكود بدون fences */}
    </div>
  );
}
