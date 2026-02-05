'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ChatWindow from '@/components/chatbot/ChatWindow';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="mb-3"
          >
            <ChatWindow onClose={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-300/75 bg-gold-500/25 text-2xl text-gold-100 shadow-aura"
        aria-label="Ouvrir le chatbot"
      >
        💬
      </motion.button>
    </div>
  );
}
