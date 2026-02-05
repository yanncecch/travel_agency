'use client';

import { motion } from 'framer-motion';

export type ChatMessageModel = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatMessage({ message }: { message: ChatMessageModel }) {
  const isAssistant = message.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
    >
      <p
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isAssistant ? 'bg-zinc-800 text-zinc-100' : 'bg-gold-500/85 text-black'
        }`}
      >
        {message.content}
      </p>
    </motion.div>
  );
}
